import {parseJSON} from "./utils.js";
const url = './js/text.json';

export function displayText() {
  fetch(url)
    .then(response => response.json())
    .then(json => {
      console.log(json);
      const element = document.getElementById('npc_dialogue');
      const item = document.createElement('p');

      item.innerHTML = `${json.npc_01_dialogue_a}`;

      element.innerHTML = "";

      element.appendChild(item);
    })
  /*const element = document.getElementById('npc_dialogue');
  const item = document.createElement('p');
  const data = parseJSON(url);
  console.log(data);

  item.innerHTML = `${data.npc_01_dialogue_a}`;

  element.innerHTML = "";

  element.appendChild(item);*/
}