/// JS file for reading data from JSON objects and exporting arrays of room objects
import { createArray, parseJSON, bindTouch } from "./utils.js";
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

function getNPCText(name, index, subIndex) {
  if (index == -1) {
    return "";
  }
  console.log(myNPCText.content[index]);
  return `${name}: "` + myNPCText.content[index].content[subIndex] + `"`;
}

function renderRoomText(id, element, content) {
  const obj = content.find((room) => room.id == id);
  console.log(id);
  element.innerHTML = "";
  if (obj) {
    // Get text data from obj and fill into variables
    const essText = getEssentialText(parseInt(obj.essential_text));
    const flavText = getFlavorText(parseInt(obj.flavor_text));
    const npcText = getNPCText(obj.npc_text.id, parseInt(obj.npc_text.index), parseInt(obj.npc_text.subIndex));

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

    const buttonUp    = createDirButton("button_up",    "UP",    obj.adj_room_id[0], element, content);
    const buttonDown  = createDirButton("button_down",  "DOWN",  obj.adj_room_id[1], element, content);
    const buttonLeft  = createDirButton("button_left",  "LEFT",  obj.adj_room_id[2], element, content);
    const buttonRight = createDirButton("button_right", "RIGHT", obj.adj_room_id[3], element, content);

    if (buttonUp)    element2.appendChild(buttonUp);
    if (buttonDown)  element2.appendChild(buttonDown);
    if (buttonLeft)  element2.appendChild(buttonLeft);
    if (buttonRight) element2.appendChild(buttonRight);
  }
}

// Creates and returns a directional button
function createDirButton(name, direction, id, element, content) {
  
  if (id != "-1") {  // Checks for an unusable direction; otherwise, return null
    const newButton = document.createElement('button');  //First, we create a button
    newButton.setAttribute('type', 'button');  // Set attributes 'type'
    newButton.setAttribute('id', name);        //   and 'id'
    newButton.innerHTML = direction;  // Set button value
  
      //Adds touch and click capabilities to newButton
      newButton.addEventListener("touchend", e => {
        e.preventDefault();
        renderRoomText(id, element, content);
      });
      newButton.addEventListener("click", e => {
        e.preventDefault();
        renderRoomText(id, element, content);
      });
      
      return newButton;  // Return the whole thing
  }
  return null;
}

export default class Rooms {
  constructor(id, element) {
    this.content = createArray(data.rooms);
    console.log(this.content);

    this.displayText(id, element);
  }

  displayText(roomID, element) {
    renderRoomText(roomID, element, this.content);
  }
}