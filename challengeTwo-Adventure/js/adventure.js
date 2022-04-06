import Rooms from "./rooms.js";
import Inventory from "./inventory.js";
import Events from "./events.js";
import { bindTouch, createArray, qsAll } from "./utils.js";

function assignButtonEvents(Room, element) {
  console.log("Assigning button events...");
  // const element = document.getElementById('game_message');
  const newRoom = getNewRoom(Room.roomID, Room.content);
  console.log(newRoom.id);
  const buttons = createArray(qsAll('.direction_buttons'));
  console.log(buttons);
  buttons.forEach((btn) => {
    console.log(btn.id);
    assignDirButton(btn.id, newRoom.adj_room_id, Room.displayText, element);
  })

  console.log("Button events assigned!");
  return Room;
}
function assignDirButton(id, rooms, callback, element) {
  console.log(`Assigning button: ${id}`);
  let adjRoomID = null;
  
  switch (id) {
    case "button_up": {
      adjRoomID = 0;
    }
    break;
    case "button_down": {
      adjRoomID = 1;
    }
    break;
    case "button_left": {
      adjRoomID = 2;
    }
    break;
    case "button_right": {
      adjRoomID = 3;
    }
    break;
    default: {
      console.log("Couldn't assign button...");
      return;
    }
  }
  console.log(element);

  bindTouch('#' + id, function () {
    console.log("BindingTouch...");
    callback(rooms[adjRoomID], element);
  });
}
function getNewRoom(id, content) {
  const obj = content.find((room) => room.id == id);
  return obj;
}
function checkRooms(id, events) {
  // events.events[0] corresponds to Lock Event
  const lockEvent = events.events[0].find((roomEvent) => roomEvent.id == id );
  if (lockEvent) {
    return lockEvent;
  }
  else {
    // events.events[1] corresponds to Key Event
    const keyEvent = events.events[1].find((roomEvent) => roomEvent.id == id);
    if (keyEvent)
      return keyEvent;
  }
  return null;
}

function assignRoomEvents(id, events, callback) {
  const roomEvent = callback(id, events);
    if (roomEvent) {
      if (roomEvent.isLockEvent) {
        if (roomEvent.isLocked) {
          console.log("Assigning Button events...");
          assignLockEvent(roomEvent);
        }
      }
      else if (!roomEvent.isLockEvent) {
        const eventKey = events.keys.find((key) => key.id == roomEvent.itemGet);
        assignKeyEvent(roomEvent, eventKey);
      }
    }
}
function assignLockEvent(roomEvent) {
  const holdButtons = createArray(roomEvent.idLockRoom);
  console.log(holdButtons);
  holdButtons.forEach((holdButton) => {
    const oldButton = qs(holdButton);
    const newButton = oldButton.cloneNode(true);
    const element = document.getElementById('game_message');
    newButton.addEventListener("touchend", e => {
      e.preventDefault();
      console.log(`Required Item: ${roomEvent.itemReq}`);
      element.innerHTML = roomEvent.itemReqText;
    });
    newButton.addEventListener("click", e => {
      console.log(`Required Item: ${roomEvent.itemReq}`);
      element.innerHTML = roomEvent.itemReqText;
    });
    oldButton.parentNode.replaceChild(newButton, oldButton);
  });

}
function assignKeyEvent(roomEvent, key) {
  const element = document.getElementById('game_message');
  element.innerHTML = roomEvent.eventText;

  key.isGet = true;
}
export default class Adventure {
  constructor(id, content) {
    this.id = id;
    this.roomID = content.currentRoomID.roomID;
    this.inventory = content.inventory;
    this.events = content.events;
    console.log(`Adventure ID: ${this.id}`);

  }

  init() {
    // const element = document.getElementById("text_window");
    this.inventory = new Inventory(this.inventory.id);
    this.events = new Events();
    this.currentRoom = new Rooms(this.roomID, document.getElementById("text_window"), this.events);
    console.log(`Current Room ID: ${this.currentRoom.getRoomID()}`);

    this.currentRoom = assignButtonEvents(this.currentRoom, document.getElementById("text_window"));
    // this.currentRoom.displayText(this.getCurrentRoomID(), document.getElementById("text_window"));
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