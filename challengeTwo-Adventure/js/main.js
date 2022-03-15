import Rooms from "./RoomController.js";
import { npcText, roomText } from "./text.js";

const myRooms = new Rooms('room_00',document.getElementById('game_window'));
console.log("New Stuff");

console.log(npcText[1][0]);
console.log(roomText[0][0] + ", " + roomText[1][0]);