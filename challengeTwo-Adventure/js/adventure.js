import Rooms from "./rooms.js";
import Inventory from "./inventory.js";
import { readFromLS, writeToLS } from "./utils.js";

let locks = {"YGate": true, "PGate": true, "GGate": true};

export default class Adventure {
  constructor(id) {
    this.id = id;
    this.inventory = new Inventory(id);
    this.currentRoomID = new Rooms("room_00", document.getElementById("text_window"));
    console.log(`Adventure ID: ${this.id}`);
    console.table(locks);

    this.currentRoomID.displayText(document.getElementById("text_window"));
  }
}