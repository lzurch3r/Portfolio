import {parseJSON} from "../utils.js";

export default function displayText() {
  const element = document.getElementById('npc_dialogue');
  const item = document.createElement('p');
  const data = parseJSON("text.json");

  item.innerHTML = `${data.npc_01_dialogue_a}`;

  element.innerHTML = "";

  element.appendChild(item);
}