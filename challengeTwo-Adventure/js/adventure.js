import Rooms from "./rooms.js";
import Inventory from "./inventory.js";
import { qsAll, createArray, bindTouch } from "./utils.js";

let locks = {"YGate": true, "PGate": true, "GGate": true};
let events = [ 
  { "id": "room_01", "lock": locks.GGate, "itemReq": "item_03" },
  { "id": "room_03", "lock": locks.YGate, "itemReq": "item_01" },
  { "id": "room_26", "lock": locks.PGate, "itemReq": "item_02" }
]

function checkRooms(id) {
  switch (id) {
    case "room_01":
    case "room_03":
    case "room_26":
      return true;
    default:
      return false;
  }

  return false;
}

function assignButtonMovement(id) {

  if (checkRooms(id)) {
    const dirBtns = qsAll('.direction_buttons');
    console.log(dirBtns);
    
    for(let i=0; i < dirBtns.length; i++) {
      bindTouch('#' + dirBtns[i].id, function() {
        const obj = events.find((event) => event.id == id);
        console.log(obj.itemReq);
      });
    }
  }

  
}

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

      assignButtonMovement(this.getCurrentRoomID());
  }

  getCurrentRoomID() {
    this.roomID = this.currentRoom.getRoomID();
    return this.roomID;
  }
}