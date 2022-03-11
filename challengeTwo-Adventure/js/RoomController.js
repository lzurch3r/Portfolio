import { displayTitleScreenText } from "./TextController.js";

function renderRoomText(array,id,element) {
  element.innerHTML = id + " text rendered " + array[0] + " " + array[1] + " " + array[2];
}

function getRoomText(id,element) {
  return element;
}

export default class Rooms {
  constructor(id,element) {
    this.id = id;
    this.element = element;
    this.textArray = [getRoomText(this.id,'essential_text'), getRoomText(this.id,'flavor_text'), getRoomText(this.id,'npc_dialogue')];

    this.displayRoomText(this.id,this.element);
  }

  displayRoomText(id,element) {
    renderRoomText(this.textArray,id,element);
  }
};