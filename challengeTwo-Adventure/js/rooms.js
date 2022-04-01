/// JS file for reading data from JSON objects and exporting arrays of room objects
import { createArray, parseJSON, bindTouch } from "./utils.js";
import { RoomEssentialText, RoomFlavorText, NPCText } from "./text.js";

const url = './JSON/rooms.json';
const data = await parseJSON(url);
let currentRoomID = null;

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
  if (!index) {
    return "";
  }
  console.log(myNPCText.content[index]);
  return `${name}: "` + myNPCText.content[index].content[subIndex] + `"`;
}

function getNewRoom(id, content) {
  const obj = content.find((room) => room.id == id);

  return obj;
}

function renderRoomText(id, element, content) {
  const room = getNewRoom(id, content);
  element.innerHTML = "";
  if (room) {
    console.log(`Current room id: ${room.id}`);
    // Create a header for the room (uses room.name)
    const headerElement = document.getElementById('room_header_window');
    headerElement.innerHTML = "";
    const headerItem = document.createElement('h2');
    headerItem.innerHTML = `${room.name}`;
    headerElement.appendChild(headerItem);

    // Get text data from room and fill into variables
    const essText = getEssentialText(room.essential_text);
    const flavText = getFlavorText(room.flavor_text);
    const npcText = getNPCText(room.npc_text.id, room.npc_text.index, room.npc_text.subIndex);

    // Create elements to put into the document
    const item1 = document.createElement('p');
    const item2 = document.createElement('p');
    const item3 = document.createElement('p');

    // Set attributes of newly created HTML elements
    item1.setAttribute('id', 'essential_text');
    item2.setAttribute('id', 'flavor_text');
    item3.setAttribute('id', 'npc_text');

    // Insert text from above variables
    item1.innerHTML = `${essText}`;
    item2.innerHTML = `${flavText}`;
    item3.innerHTML = `${npcText}`;

    // Append each created element to the main element
    element.appendChild(item1);
    element.appendChild(item2);
    element.appendChild(item3);

    // Create a directional map for the player to go
    // 'adj_room_id' follows four cardinal directions in this order:
    //   [ UP, DOWN, LEFT, RIGHT] 

    const element2 = document.getElementById('movement_options');
    element2.innerHTML = "";

    const buttonUp    = createDirButton("button_up",    "UP",    room.adj_room_id[0], element, content);
    const buttonDown  = createDirButton("button_down",  "DOWN",  room.adj_room_id[1], element, content);
    const buttonLeft  = createDirButton("button_left",  "LEFT",  room.adj_room_id[2], element, content);
    const buttonRight = createDirButton("button_right", "RIGHT", room.adj_room_id[3], element, content);

    if (buttonUp)    element2.appendChild(buttonUp);
    if (buttonDown)  element2.appendChild(buttonDown);
    if (buttonLeft)  element2.appendChild(buttonLeft);
    if (buttonRight) element2.appendChild(buttonRight);
  }
}

// Creates and returns a directional button
function createDirButton(name, direction, id, element, content) {
  
  if (id) {  // Checks for an unusable direction; otherwise, return null
    const newButton = document.createElement('button');  //First, we create a button
    newButton.setAttribute('type', 'button');  // Set attributes 'type'
    newButton.setAttribute('id', name);        //   and 'id'
    newButton.innerHTML = direction;  // Set button value
  
      //Adds touch and click capabilities to newButton
      newButton.addEventListener("touchend", e => {
        e.preventDefault();
        currentRoomID = id;
        console.log(currentRoomID);
        renderRoomText(id, element, content);
      });
      newButton.addEventListener("click", e => {
        currentRoomID = id;
        console.log(currentRoomID);
        renderRoomText(id, element, content);
      });
      
      return newButton;  // Return the whole thing
  }
  return null;
}

export default class Rooms {
  constructor(id, element) {
    this.content = createArray(data.rooms);
    this.roomID = id;
    currentRoomID = this.roomID;
    console.log(this.content);

    this.displayText(element);
  }

  getRoomID() {
    this.roomID = currentRoomID;
    console.log(this.roomID);
    return this.roomID;
  }

  displayText(element) {
    renderRoomText(this.roomID, element, this.content);
  }
}