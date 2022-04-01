/// JS file for reading data from JSON objects and exporting arrays of text objects
import { createArray, parseJSON } from "./utils.js";

const url = './JSON/text.json';
const data = await parseJSON(url);

function getID(container) {
  return container.id;
}

// Class for all essential text content from 'room_essential_text'
export class RoomEssentialText {
  constructor() {
    this.id = getID(data.room_essential_text);
    this.content = createArray(data.room_essential_text.content);
  }
};

// Class for all flavor text content from 'room_flavor_text'
export class RoomFlavorText {
  constructor() {
    this.id = getID(data.room_flavor_text);
    this.content = createArray(data.room_flavor_text.content);
  }
};

// Class for all text content from 'npc_text'
export class NPCText {
  constructor() {
    this.id = getID(data.npc);
    this.content = createArray(data.npc.content);
  }
};