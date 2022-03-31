import Adventure from "./adventure.js";
import { qs, readFromLS, writeToLS, bindTouch } from "./utils.js";

// const myAdventure = new Adventure("Lev");
// const key = "Lev";
// const myAdventure = new Adventure(key);
// saveAdventure(key, myAdventure);
let myAdventure = null;
buildTitleScreen();
const btn = document.getElementById('btnClick');
const image = document.getElementById('image');

btn.addEventListener('click', async function () {
    const int = Math.floor(Math.random() * 1000);
    console.log(int);
    const url = `https://pokeapi.co/api/v2/item/${int}/`;
    
    const response = await fetch(url)
      .then(response => response.json())
      .then(data => {
        console.log(data.id + " " + data.name + " " + data.sprites.default);
        return data;
      });
    
      image.src = response.sprites.default;
});

function saveAdventure(key, data) {
  writeToLS(key, data);
  
  console.log(`Adventure saved; Key: ${key}`);
}

function loadAdventure(key) {
  const data = readFromLS(key);
  console.table(data);

  if (data)
    return data;
  else return null;
}
function deleteAdventure(key) {
  writeToLS(key, null);

  console.log(`Adventure '${key}' deleted`);
}

function buildAdventure(adventure, exists) {
  if (adventure) {
    console.log(adventure);
    adventure.init(exists);
  }

  saveAdventure(adventure.id, adventure.content);

  const buttonSaveGame = document.createElement('button');
}
function createTitleButton(id, html) {
  const newButton = document.createElement('button');
  newButton.setAttribute('id', id);
  newButton.innerHTML = html;

  return newButton; 
}

function buildTitleScreen() {
  // Build the title
  const element = document.getElementById('room_header_window');
  
  const title = document.createElement('h1');
  title.setAttribute('id', 'title_screen_text');

  title.innerHTML = "Challenge Two - Adventure";

  // Build input and 'play' button
  const element2 = document.getElementById('text_window');

  const inputID = document.createElement('input');
  inputID.setAttribute('id', 'key_input');
  inputID.setAttribute('placeholder', "type adventure ID");

  const buttonNewGame = createTitleButton('new_game_button', "New Game");
  const buttonLoadGame = createTitleButton('load_game_button', "Load Game");
  const buttonDelGame = createTitleButton('delete_game_button', "Delete Game");
//   buttonPlay.addEventListener('keyup', function(event) {
//     if (event.key === 'Enter') {
//       event.preventDefault();
//     const value = qs('#key_input').value;

//     if (value)
//       loadAdventure(value);
//     else console.log(`Error: cannot find adventure`);
//     }
//   });

  element.appendChild(title);
  element2.appendChild(inputID);
  element2.appendChild(buttonNewGame);
  element2.appendChild(buttonLoadGame);
  element2.appendChild(buttonDelGame);
  
  // Configure NEW GAME button
  bindTouch('#new_game_button', function () {
    const key = qs('#key_input').value;

    try {
      if (!key)
        throw new Error("Must enter a key in #key_input");
      else if (key) {
        if (loadAdventure(key)) {
          throw new Error("Adventure already exists with that key!");
        }
        else if (!loadAdventure(key)) {
          const content = {
    "id": key,
    "inventory": {
        "id": key,
        "content": [
        ]
    },
    "currentRoomID": {
        "content": [
            {
                "id": "room_00",
                "name": "The Beginning",
                "essential_text": 0,
                "flavor_text": 0,
                "npc_text": {
                    "id": null,
                    "index": null,
                    "subIndex": null
                },
                "adj_room_id": [
                    "room_01",
                    null,
                    null,
                    null
                ]
            },
            {
                "id": "room_01",
                "name": "Directions",
                "essential_text": 1,
                "flavor_text": 1,
                "npc_text": {
                    "id": null,
                    "index": null,
                    "subIndex": null
                },
                "adj_room_id": [
                    "room_29",
                    "room_00",
                    "room_26",
                    "room_02"
                ]
            },
            {
                "id": "room_02",
                "name": "The First Hallway",
                "essential_text": 2,
                "flavor_text": 2,
                "npc_text": {
                    "id": null,
                    "index": null,
                    "subIndex": null
                },
                "adj_room_id": [
                    null,
                    null,
                    "room_01",
                    "room_03"
                ]
            },
            {
                "id": "room_03",
                "name": "The First Roadblock",
                "essential_text": 3,
                "flavor_text": 3,
                "npc_text": {
                    "id": null,
                    "index": null,
                    "subIndex": null
                },
                "adj_room_id": [
                    "room_08",
                    "room_04",
                    "room_02",
                    null
                ]
            },
            {
                "id": "room_04",
                "name": "Salmon Spread",
                "essential_text": 4,
                "flavor_text": 4,
                "npc_text": {
                    "id": null,
                    "index": null,
                    "subIndex": null
                },
                "adj_room_id": [
                    "room_03",
                    "room_05",
                    null,
                    "room_07"
                ]
            },
            {
                "id": "room_05",
                "name": "Down On the Corner",
                "essential_text": 5,
                "flavor_text": 5,
                "npc_text": {
                    "id": null,
                    "index": null,
                    "subIndex": null
                },
                "adj_room_id": [
                    "room_04",
                    null,
                    "room_06",
                    null
                ]
            },
            {
                "id": "room_06",
                "name": "The First Solution",
                "essential_text": 6,
                "flavor_text": 6,
                "npc_text": {
                    "id": null,
                    "index": null,
                    "subIndex": null
                },
                "adj_room_id": [
                    null,
                    null,
                    null,
                    "room_05"
                ]
            },
            {
                "id": "room_07",
                "name": "Time to Be an Extrovert",
                "essential_text": 7,
                "flavor_text": 7,
                "npc_text": {
                    "id": "Jikenwa",
                    "index": "0",
                    "subIndex": "0"
                },
                "adj_room_id": [
                    null,
                    null,
                    "room_04",
                    null
                ]
            },
            {
                "id": "room_08",
                "name": "Feeling Good",
                "essential_text": 8,
                "flavor_text": 8,
                "npc_text": {
                    "id": null,
                    "index": null,
                    "subIndex": null
                },
                "adj_room_id": [
                    "room_09",
                    "room_03",
                    null,
                    null
                ]
            },
            {
                "id": "room_09",
                "name": "The Second Hallway",
                "essential_text": 9,
                "flavor_text": 9,
                "npc_text": {
                    "id": null,
                    "index": null,
                    "subIndex": null
                },
                "adj_room_id": [
                    "room_10",
                    "room_08",
                    null,
                    null
                ]
            },
            {
                "id": "room_10",
                "name": "The Choice",
                "essential_text": 10,
                "flavor_text": 10,
                "npc_text": {
                    "id": "??",
                    "index": "1",
                    "subIndex": "0"
                },
                "adj_room_id": [
                    null,
                    "room_09",
                    "room_11",
                    "room_25"
                ]
            },
            {
                "id": "room_11",
                "name": "Finding Your Way",
                "essential_text": 11,
                "flavor_text": 11,
                "npc_text": {
                    "id": null,
                    "index": null,
                    "subIndex": null
                },
                "adj_room_id": [
                    null,
                    null,
                    "room_12",
                    "room_10"
                ]
            },
            {
                "id": "room_12",
                "name": "The Second Hallway",
                "essential_text": 12,
                "flavor_text": 12,
                "npc_text": {
                    "id": null,
                    "index": null,
                    "subIndex": null
                },
                "adj_room_id": [
                    "room_13",
                    null,
                    null,
                    "room_11"
                ]
            },
            {
                "id": "room_13",
                "name": "Meetin' Up With the Homie",
                "essential_text": 13,
                "flavor_text": 13,
                "npc_text": {
                    "id": "??",
                    "index": "1",
                    "subIndex": "1"
                },
                "adj_room_id": [
                    "room_14",
                    null,
                    "room_12",
                    "room_23"
                ]
            },
            {
                "id": "room_14",
                "name": "A Delicate Situation",
                "essential_text": 14,
                "flavor_text": 14,
                "npc_text": {
                    "id": null,
                    "index": null,
                    "subIndex": null
                },
                "adj_room_id": [
                    "room_15",
                    "room_13",
                    null,
                    null
                ]
            },
            {
                "id": "room_15",
                "name": "Look Both Ways",
                "essential_text": 15,
                "flavor_text": 15,
                "npc_text": {
                    "id": null,
                    "index": null,
                    "subIndex": null
                },
                "adj_room_id": [
                    "room_21",
                    "room_14",
                    "room_16",
                    "room_19"
                ]
            },
            {
                "id": "room_16",
                "name": "Something's Going Down",
                "essential_text": 16,
                "flavor_text": 16,
                "npc_text": {
                    "id": null,
                    "index": null,
                    "subIndex": null
                },
                "adj_room_id": [
                    null,
                    null,
                    "room_17",
                    "room_15"
                ]
            },
            {
                "id": "room_17",
                "name": "A New Hope",
                "essential_text": 17,
                "flavor_text": 17,
                "npc_text": {
                    "id": null,
                    "index": null,
                    "subIndex": null
                },
                "adj_room_id": [
                    null,
                    "room_18",
                    null,
                    "room_16"
                ]
            },
            {
                "id": "room_18",
                "name": "The Color of Royalty",
                "essential_text": 18,
                "flavor_text": 18,
                "npc_text": {
                    "id": null,
                    "index": null,
                    "subIndex": null
                },
                "adj_room_id": [
                    "room_17",
                    null,
                    null,
                    null
                ]
            },
            {
                "id": "room_19",
                "name": "The Smell of Fear",
                "essential_text": 19,
                "flavor_text": 19,
                "npc_text": {
                    "id": null,
                    "index": null,
                    "subIndex": null
                },
                "adj_room_id": [
                    null,
                    null,
                    "room_15",
                    "room_20"
                ]
            },
            {
                "id": "room_20",
                "name": "Sweet and Pungent Shrimp",
                "essential_text": 20,
                "flavor_text": 20,
                "npc_text": {
                    "id": null,
                    "index": null,
                    "subIndex": null
                },
                "adj_room_id": [
                    null,
                    null,
                    "room_19",
                    null
                ]
            },
            {
                "id": "room_21",
                "name": "What's for Dinner?",
                "essential_text": 21,
                "flavor_text": 21,
                "npc_text": {
                    "id": null,
                    "index": null,
                    "subIndex": null
                },
                "adj_room_id": [
                    null,
                    "room_15",
                    "room_22",
                    null
                ]
            },
            {
                "id": "room_22",
                "name": "Unsettling Aura",
                "essential_text": 22,
                "flavor_text": 22,
                "npc_text": {
                    "id": "This guy",
                    "index": "2",
                    "subIndex": "0"
                },
                "adj_room_id": [
                    null,
                    null,
                    null,
                    "room_21"
                ]
            },
            {
                "id": "room_23",
                "name": "The Arrival",
                "essential_text": 23,
                "flavor_text": 23,
                "npc_text": {
                    "id": null,
                    "index": null,
                    "subIndex": null
                },
                "adj_room_id": [
                    null,
                    "room_24",
                    "room_13",
                    null
                ]
            },
            {
                "id": "room_24",
                "name": "The Long Hallway",
                "essential_text": 24,
                "flavor_text": 24,
                "npc_text": {
                    "id": null,
                    "index": null,
                    "subIndex": null
                },
                "adj_room_id": [
                    "room_23",
                    null,
                    "room_25",
                    null
                ]
            },
            {
                "id": "room_25",
                "name": "You Can Go Your Own Way",
                "essential_text": 25,
                "flavor_text": 25,
                "npc_text": {
                    "id": null,
                    "index": null,
                    "subIndex": null
                },
                "adj_room_id": [
                    null,
                    null,
                    "room_10",
                    "room_24"
                ]
            },
            {
                "id": "room_26",
                "name": "The Royal Gates",
                "essential_text": 26,
                "flavor_text": 26,
                "npc_text": {
                    "id": null,
                    "index": null,
                    "subIndex": null
                },
                "adj_room_id": [
                    "room_28",
                    "room_27",
                    null,
                    "room_01"
                ]
            },
            {
                "id": "room_27",
                "name": "Rigorous Dissonance",
                "essential_text": 27,
                "flavor_text": 27,
                "npc_text": {
                    "id": "Weary man",
                    "index": "3",
                    "subIndex": "0"
                },
                "adj_room_id": [
                    "room_26",
                    null,
                    null,
                    null
                ]
            },
            {
                "id": "room_28",
                "name": "Harmonious Loyalty",
                "essential_text": 28,
                "flavor_text": 28,
                "npc_text": {
                    "id": "Dilapidated man",
                    "index": "4",
                    "subIndex": "0"
                },
                "adj_room_id": [
                    null,
                    "room_26",
                    null,
                    null
                ]
            },
            {
                "id": "room_29",
                "name": "Out",
                "essential_text": 29,
                "flavor_text": 29,
                "npc_text": {
                    "id": null,
                    "index": null,
                    "subIndex": null
                },
                "adj_room_id": [
                    null,
                    "room_01",
                    null,
                    null
                ]
            }
        ],
        "roomID": "room_00"
    }
}
          myAdventure = new Adventure(content.id, content);
          buildAdventure(myAdventure, false);
        }
      }
    }
    catch (error) {
      throw error;
    }
  });
  // Configure LOAD GAME button
  bindTouch('#load_game_button', function () {
    const key = qs('#key_input').value;

    try {
      if (!key)
        throw new Error("Must enter a key in #key_input");
      else if (key) {
        if (!loadAdventure(key))
          throw new Error("Failed to load obj 'myAdventure'");
        if (loadAdventure(key)) {
          myAdventure = new Adventure(key, loadAdventure(key));
          buildAdventure(myAdventure, true);
        }
      }
    }
    catch (error) {
      throw error;
    }
  });
  // Configure DELETE GAME button
  bindTouch('#delete_game_button', function () {
    const key = qs('#key_input').value;

    try {
      if (!key)
        throw new Error("Must enter a key in #key_input");
      else if (key) {
        if (!loadAdventure(key))
          throw new Error("Failed to delete obj 'myAdventure'");
        if (loadAdventure(key)) {
          deleteAdventure(key);
        }
      }
    }
    catch (error) {
      throw error;
    }
  });

}