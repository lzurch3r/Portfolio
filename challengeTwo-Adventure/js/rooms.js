/// JS file for reading data from JSON objects and exporting arrays of room objects
import { createArray, parseJSON } from "./utils.js";
import { RoomEssentialText, RoomFlavorText, NPCText } from "./objects.js";

const url = './JSON/rooms.json';
const data = await parseJSON(url);

const myEssentialText = new RoomEssentialText();
const myFlavorText = new RoomFlavorText();
const myNPCText = new NPCText();

function getEssentialText(index) {
  return myEssentialText.content[index];
}

function getFlavorText(index) {
  return myFlavorText.content[index];
}

function getNPCText(name, index, subIndex) {
  if (index == -1) {
    return "";
  }
  console.log(myNPCText.content[index]);
  return `${name}: ` + myNPCText.content[index].content[subIndex];
}

function renderRoomText(id, element, content) {
  const obj = content.find((room) => room.id == id);
  element.innerHTML = "";
  if (obj) {
    // Get text data from obj and fill into variables
    const essText = getEssentialText(parseInt(obj.essential_text));
    const flavText = getFlavorText(parseInt(obj.flavor_text));
    const npcText = getNPCText(obj.npc_text.id, parseInt(obj.npc_text.index), parseInt(obj.npc_text.subIndex));

    // Create elements to put into the document
    const item1 = document.createElement('p');
    const item2 = document.createElement('p');
    const item3 = document.createElement('p');

    // Insert text from above variables
    item1.innerHTML = `${essText}`;
    item2.innerHTML = `${flavText}`;
    item3.innerHTML = `${npcText}`;

    // Append each created element to the main element
    element.appendChild(item1);
    element.appendChild(item2);
    element.appendChild(item3);
    
  }
}

export default class Rooms {
  constructor() {
    this.content = createArray(data.rooms);
    console.log(this.content);
  }

  displayText(roomID, element) {
    renderRoomText(roomID, element, this.content);
  }
}