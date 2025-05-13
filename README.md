# 🛡️ Defend My Page

**Defend My Page** is a simple, frontend-only URL protector that lets you encrypt and share URLs with a password. Built using **Vite Vanilla** and styled with **Tailwind CSS**, it uses the Web Crypto API (`crypto.subtle`) to securely encrypt URLs with the **AES-GCM** algorithm.

## 🔐 How It Works

1. You enter a URL and a password.
2. The URL is encrypted using the AES-GCM algorithm with a key derived from the password (via PBKDF2).
3. A protected link is generated with the encrypted payload in the query string.
4. To access the original URL, the user must enter the correct password to decrypt it.

## 🧪 Example

1. Go to `index.html`
2. Enter a URL and a password
3. Receive a shareable, password-protected link (e.g., `/d?c=<encrypted>`)

The decryption happens in `d.html` after the correct password is provided.

## 🧠 Crypto Details

* **Encryption algorithm**: AES-GCM (256-bit)
* **Key derivation**: PBKDF2 with SHA-256, 100,000 iterations
* **IV**: 12-byte random value
* **Salt**: 16-byte random value

### Encryption Format

```ts
`${base64(salt)}.${base64(ciphertext)}.${base64(iv)}`
```

## 🧰 Core Utils

### `encodeUrl({ url, password })`

Encrypts a URL with a password and returns the base64-encoded payload.

### `decodeUrl({ salt, cipher, password, iv })`

Decrypts the payload using the provided password and returns the original URL.

## 🚀 Build & Run

Install dependencies and start the dev server:

```bash
pnpm install
pnpm run dev
```

To build:

```bash
pnpm run build
```

## 📦 Tech Stack

* [Vite](https://vitejs.dev/)
* [Tailwind CSS](https://tailwindcss.com/)
* Web Crypto API (`crypto.subtle`)
* TypeScript

## 🧙‍♂️ Easter Egg

If the password is wrong, expect fun error messages like:

> **"You shall not pass"**
> **"This is not the password you're looking for"**
> **"Access denied, muggle"**

*(Fully customizable list, see `errorTexts` array.)*

## ⚠️ Disclaimer

This is a **frontend-only** project. While it uses secure encryption, **do not** use it for high-stakes secrets—there’s no server-side protection or rate limiting. Perfect for casual use or internal tools.

## 📜 License

MIT © Victor Mamede
