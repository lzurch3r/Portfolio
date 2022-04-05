import Rooms from "./rooms.js";
import Inventory from "./inventory.js";
import Events from "./events.js";

export default class Adventure {
  constructor(id, content) {
    this.id = id;
    this.roomID = content.currentRoomID.roomID;
    this.inventory = content.inventory;
    this.events = content.events;
    console.log(`Adventure ID: ${this.id}`);

  }

  init() {
      this.inventory = new Inventory(this.inventory.id);
      this.events = new Events();
      this.currentRoom = new Rooms(this.roomID, document.getElementById("text_window"), this.events);
      console.log(`Current Room ID: ${this.currentRoom.getRoomID()}`);
  }
  getCurrentInventory() {
    return this.inventory;
  }
  getCurrentRoomID() {
    this.roomID = this.currentRoom.getRoomID();
    return this.roomID;
  }
  getCurrentEvents() {
    this.events = this.currentRoom.getEvents();
    return this.events;
  }
}