import "./style.css";
import { encodeUrl } from "./utils";

const formElement = document.querySelector<HTMLFormElement>("#form")!;

formElement.onsubmit = async (e) => {
  e.preventDefault();

  const url = document.querySelector<HTMLInputElement>("#form #url")!.value;
  const password =
    document.querySelector<HTMLInputElement>("#form #password")!.value;

  const result = await encodeUrl({ url, password });

  const newLink = new URL(window.location.href);
  newLink.pathname = "d";
  newLink.searchParams.append("c", result.encoded);

  const headerElement = document.createElement("h3");
  headerElement.className = "text-xl text-center mb-3 text-white";
  headerElement.innerText = "Your page is defended!";

  const linkElement = document.createElement("p");
  linkElement.className =
    "break-all mb-3 bg-white rounded-xl text-gray-600 p-3 text-link";
  linkElement.innerText = newLink.toString();

  const buttonElement = document.createElement("button");
  buttonElement.className =
    "bg-linear-to-b bg-green-500 to-green-600 p-3 px-8 rounded-xl text-white font-bold hover:bg-green-400 focus:ring-4 focus:ring-green-300 cursor-pointer";
  buttonElement.innerText = "Copy Link";
  buttonElement.onclick = () => {
    navigator.clipboard.writeText(newLink.toString());
  };

  const container = formElement.parentElement!;
  container.removeChild(formElement);

  container.appendChild(headerElement);
  container.appendChild(linkElement);
  container.appendChild(buttonElement);
};
