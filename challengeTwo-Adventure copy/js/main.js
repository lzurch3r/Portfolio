import Rooms from "./RoomController.js";
import { npcText, roomText } from "./text.js";
import { roomArray } from "./rooms.js";
import { parseJSON } from "./utils.js";

const myRooms = new Rooms('room_00',document.getElementById('game_window'));
console.log("New Stuff");

console.log(npcText[0].content);
console.log(roomText[0] + ", " + roomText[1]);
console.log(roomArray[0].id);

const data = await parseJSON('./js/objects.json');
console.log(data.title.id);