//import {parseJSON} from "./utils.js";
const url = './js/text.json';

export function displayTitleScreenText() {
  fetch(url)
    .then(response => response.json())
    .then(json => {
      console.log(json);
      buildTitleScreen(json);
    });
}

function buildTitleScreen(data) {
  const element = document.getElementById('essential_text');
  const item = document.createElement('h1');

  item.innerHTML = getTitleScreenText(data);
  element.innerHTML = "";

  element.appendChild(item);
}

function getTitleScreenText(data) {
  return `${data.title_screen_text}`;
}

function getNPCText(id, data) {
  const element = document.getElementById('npc_dialogue');
  const item = document.createElement('p');

  item.innerHTML = `${data}`;

  element.innerHTML = "";

  element.appendChild(item);
}