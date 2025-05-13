import "./style.css";
import { decodeUrl } from "./utils";

const errorTexts = [
  "You shall not pass", // Lord of the Rings
  "Incorrect, young Padawan", // Star Wars
  "This is not the password you're looking for", // Star Wars
  "Access denied, muggle", // Harry Potter
  "404: Password not found in the Matrix", // The Matrix
  "Intruder alert! Intruder alert!", // Portal / generic sci-fi
  "Wrong key, adventurer", // RPG-themed
  "The cake is a lie", // Portal
  "Nice try, Stark", // Marvel (Tony Stark / Iron Man)
  "This isn't Wakanda tech", // Black Panther
  "By Grabthar’s hammer, you shall not pass", // Galaxy Quest / LOTR mashup
  "That’s not very effective", // Pokémon
  "Expecto… nope", // Harry Potter
  "I find your lack of correct password disturbing", // Star Wars
  "Danger, Will Robinson! Wrong input!", // Lost in Space
  "You've taken an arrow to the wrong field", // Skyrim
  "Bzzzt! Try again, human", // Sci-fi general / Futurama vibe
  "You activated my trap card: Wrong password", // Yu-Gi-Oh!
  "Access denied. Try the Konami Code instead", // Video game reference
  "You must construct additional attempts", // StarCraft
];

document.querySelector<HTMLFormElement>("#form")!.onsubmit = async (e) => {
  e.preventDefault();

  const params = new URLSearchParams(window.location.search);

  const cipherText = params.get("c");
  if (!cipherText) throw new Error("Nothing to decode");

  const [salt, cipher, iv] = cipherText.split(".");

  const password =
    document.querySelector<HTMLInputElement>("#form #password")!.value;

  try {
    const result = await decodeUrl({ cipher, password, salt, iv });

    window.location.replace(result);
  } catch (e) {
    document.querySelector<HTMLParagraphElement>("#error-text")!.innerText =
      errorTexts[Math.floor(Math.random() * errorTexts.length)];
  }
};
