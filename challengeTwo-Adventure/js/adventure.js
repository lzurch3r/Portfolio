import Rooms from "./rooms.js";
import Inventory from "./inventory.js";
import { readFromLS, writeToLS } from "./utils.js";

let locks = {"YGate": true, "PGate": true, "GGate": true};

export default class Adventure {
  constructor(id, content) {
    this.id = id;
    this.content = content;
    console.log(this.content);
    console.log(`Adventure ID: ${this.id}`);
      console.table(locks);
  }

  init(exists) {
    if (exists) {
      this.inventory = new Inventory(this.id);
      this.currentRoom = new Rooms(this.content.currentRoom.roomID, document.getElementById("text_window"));
      console.log(`Current Room ID: ${this.currentRoom}`);
    }
    else if (!exists) {
      this.inventory = new Inventory(this.id);
      this.currentRoom = new Rooms("room_00", document.getElementById("text_window"));
  
      // this.currentRoom.displayText(document.getElementById("text_window"));
    }
  }
}