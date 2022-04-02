import Adventure from "./adventure.js";
import { qs, readFromLS, writeToLS, bindTouch } from "./utils.js";

//*** DEBUG TESTING ***/
const myAdventure = new Adventure("Lev", loadAdventure("Lev"));
buildAdventure(myAdventure);

// let myAdventure = null;
// buildTitleScreen();
const btn = document.getElementById('btnClick');
const image = document.getElementById('image');

btn.addEventListener('click', async function () {
    const int = Math.floor(Math.random() * 1000);
    console.log(int);
    const url = `https://pokeapi.co/api/v2/item/${int}/`;
    let response = null;
    
    while(!response) {
      response = await fetch(url)
      .then(response => response.json())
      .then(data => {
        console.log(data.id + " " + data.name + " " + data.sprites.default);
        return data;
      });
    }
    
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

function buildAdventure(adventure) {
  if (adventure) {
    // console.log(adventure);
    adventure.init();

  const content =  {
    "inventory": {
        "id": adventure.inventory.id,
        "content": adventure.inventory.content
    },
    "currentRoomID": {
        "roomID": adventure.getCurrentRoomID()
    }
  }

  saveAdventure(adventure.id, content);

  const btnSaveGame = createGameButton('save_game_button', "Save Game");
  const btnElement = document.getElementById('game_buttons');
  btnElement.innerHTML = "";

  btnElement.appendChild(btnSaveGame);

  bindTouch('#save_game_button', function() {
    const content = {
    "inventory": {
        "id": adventure.inventory.id,
        "content": adventure.inventory.content
    },
    "currentRoomID": {
        "roomID": adventure.getCurrentRoomID()
    }
  }
      saveAdventure(adventure.id, content);
    });
  }
}
function createGameButton(id, html) {
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
  const element2 = document.getElementById('game_buttons');

  const inputID = document.createElement('input');
  inputID.setAttribute('id', 'key_input');
  inputID.setAttribute('placeholder', "type adventure ID");

  const buttonNewGame  = createGameButton('new_game_button', "New Game");
  const buttonLoadGame = createGameButton('load_game_button', "Load Game");
  const buttonDelGame  = createGameButton('delete_game_button', "Delete Game");
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
        throw new Error("Must enter a key in #key_input to make a New Game");
      else if (key) {
        if (loadAdventure(key)) {
          throw new Error("Adventure already exists with that key!");
        }
        else if (!loadAdventure(key)) {
          const content = {
            "inventory": {
                "id": key,
                "content": []
            },
            "currentRoomID": {
                "roomID": "room_00"
            }
          }
          myAdventure = new Adventure(key, content);
          buildAdventure(myAdventure);
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
        throw new Error("Must enter a key in #key_input to load an existing game");
      else if (key) {
        if (!loadAdventure(key))
          throw new Error("Failed to load obj 'myAdventure'");
        if (loadAdventure(key)) {
          myAdventure = new Adventure(key, loadAdventure(key));
          buildAdventure(myAdventure);
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
        throw new Error("Must enter a key in #key_input to delete an existing game");
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