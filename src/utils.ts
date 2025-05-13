const ab2b64 = (v: Uint8Array) => btoa(String.fromCharCode.apply(null, [...v]));

const b642ab = (v: string) => Uint8Array.from(atob(v), (c) => c.charCodeAt(0));

const getKey = async (salt: Uint8Array<ArrayBuffer>, password: string) => {
  const encoder = new TextEncoder();

  const keyMaterial = await crypto.subtle.importKey(
    "raw",
    encoder.encode(password),
    { name: "PBKDF2" },
    false,
    ["deriveKey"]
  );

  const key = await crypto.subtle.deriveKey(
    {
      name: "PBKDF2",
      salt,
      iterations: 100000,
      hash: "SHA-256",
    },
    keyMaterial,
    { name: "AES-GCM", length: 256 },
    false,
    ["encrypt", "decrypt"]
  );

  return key;
};

export async function encodeUrl(data: { url: string; password: string }) {
  const encoder = new TextEncoder();

  const salt = crypto.getRandomValues(new Uint8Array(16));
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const key = await getKey(salt, data.password);

  const cipher = await crypto.subtle.encrypt(
    {
      name: "AES-GCM",
      iv,
    },
    key,
    encoder.encode(data.url)
  );

  return {
    encoded: `${ab2b64(salt)}.${ab2b64(new Uint8Array(cipher))}.${ab2b64(iv)}`,
  };
}

export async function decodeUrl(data: {
  salt: string;
  cipher: string;
  password: string;
  iv: string;
}) {
  const salt = b642ab(data.salt);
  const iv = b642ab(data.iv);
  const key = await getKey(salt, data.password);

  const cipher = b642ab(data.cipher);

  const result = await crypto.subtle.decrypt(
    {
      name: "AES-GCM",
      iv,
    },
    key,
    cipher
  );

  const decoder = new TextDecoder();
  return decoder.decode(result);
}
