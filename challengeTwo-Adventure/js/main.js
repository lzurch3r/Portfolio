import Adventure from "./adventure.js";
import { qs, readFromLS, writeToLS, bindTouch } from "./utils.js";

// Creates variables for adventure to use
let myAdventure = null;
let adventureKeys = [];

// Builds title screen on new startup
buildTitleScreen();

// Adds a button for the user to mess around with and bring up Pokemon images
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

  // Get rid of other game buttons and adds only Save Game feature
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

  // Lastly, gets rid of the "Saved Adventures" List
  document.getElementById('saved_adventures_window').innerHTML = "";
}
function createGameButton(id, html) {
  const newButton = document.createElement('button');
  newButton.setAttribute('id', id);
  newButton.innerHTML = html;
  return newButton; 
}
function showAdventureList() {
  // Adds "Saved Adventures" List
  const savedAdventuresWindow = document.getElementById('saved_adventures_header_window');
  savedAdventuresWindow.innerHTML = "";

  adventureKeys = loadAdventure("Adventure Keys");
  if (adventureKeys.length > 0) {
    const savedAdventuresHeader = document.createElement('h3');
    savedAdventuresHeader.setAttribute('id', 'saved_adventures_header');
    savedAdventuresHeader.innerHTML = "Saved Adventures";
  
    savedAdventuresWindow.appendChild(savedAdventuresHeader);
  
    // adds Adventure Keys to a list
    const savedAdventuresList = document.getElementById('saved_adventures');
    savedAdventuresList.innerHTML = "";
    adventureKeys.forEach((key) => {
      const item = document.createElement('li');
      item.setAttribute('class', 'adventure_keys');
      item.innerHTML = key;
  
      savedAdventuresList.appendChild(item);
    })
  }
  else {
    const savedAdventuresHeader = document.createElement('h3');
    savedAdventuresHeader.setAttribute('id', 'saved_adventures_header');
    savedAdventuresHeader.innerHTML = "No Saved Adventures";

    savedAdventuresWindow.appendChild(savedAdventuresHeader);
    
    const savedAdventuresList = document.getElementById('saved_adventures');
    savedAdventuresList.innerHTML = "";
  }
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

  // Add all our items to the appropriate elements
  element.appendChild(title);  // Adds to element with id 'room_header_window'
  element2.appendChild(inputID);       // The following ad to element 'game_buttons'
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

          // Saves new key in localStorage
          adventureKeys.push(key);
          console.log(adventureKeys);
          saveAdventure("Adventure Keys", adventureKeys);


          // Builds a new adventure
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
          console.log(adventureKeys.indexOf(key));
          adventureKeys.splice(adventureKeys.indexOf(key), 1);
          console.log(adventureKeys);
          saveAdventure("Adventure Keys", adventureKeys);
          showAdventureList();

          deleteAdventure(key);
        }
      }
    }
    catch (error) {
      throw error;
    }
  });
  showAdventureList();
}