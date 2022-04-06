import Rooms from "./rooms.js";
import Inventory from "./inventory.js";

let locks = {"YGate": true, "PGate": true, "GGate": true};

export default class Adventure {
  constructor(id, content) {
    this.id = id;
    this.roomID = content.currentRoomID.roomID;
    this.inventory = content.inventory;
    console.log(this.content);
    console.log(`Adventure ID: ${this.id}`);
      console.table(locks);
  }
  init() {
      this.inventory = new Inventory(this.inventory.id);
      this.currentRoom = new Rooms(this.roomID, document.getElementById("text_window"));
      console.log(`Current Room ID: ${this.currentRoom}`);
  }
  getCurrentRoomID() {
    this.roomID = this.currentRoom.getRoomID();
    return this.roomID;
  }
}