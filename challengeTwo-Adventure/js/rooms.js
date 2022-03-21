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

function renderRoomText(id, content) {
  const obj = content.find((room) => room.id == id);
  if (obj) {
    const essText = getEssentialText(parseInt(obj.essential_text));
    const flavText = getFlavorText(parseInt(obj.flavor_text));
    console.log(essText);
    console.log(flavText);
  }
}

export default class Rooms {
  constructor() {
    this.content = createArray(data.rooms);
    console.log(this.content);
  }

  displayText(roomID) {
    renderRoomText(roomID, this.content);
  }
}