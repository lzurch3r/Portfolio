import Adventure from "./adventure.js";
import { qs, readFromLS, writeToLS, bindTouch } from "./utils.js";

const myAdventure = new Adventure("Lev");
// const key = "Lev";
// const myAdventure = new Adventure(key);
// saveAdventure(key, myAdventure);
/*let myAdventure = null;
buildTitleScreen();
const btn = document.getElementById('btnClick');
const image = document.getElementById('image');

btn.addEventListener('click', async function () {
    const url = "https://pokeapi.co/api/v2/item/1/";
    
    const response = await fetch(url)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        return data;
      });
    
    if (response)
      image.src = response.sprites.default;
});

function saveAdventure(key, data) {
  writeToLS(key, data);
  
  console.log(`Adventure saved; Key: ${key}`);
}

function loadAdventure(key) {
  const data = readFromLS(key);
  console.table(data);

  return data;
}
// ***NEXT POINT OF FOCUS***
function buildAdventure() {
  
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

  const buttonPlay = document.createElement('button');
  buttonPlay.setAttribute('id', 'play_button');
  buttonPlay.innerHTML = "PLAY";
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
  element2.appendChild(buttonPlay);
  
  // Configure PLAY button
  bindTouch('#play_button', function () {
    const key = qs('#key_input').value;

    if (key) {
      myAdventure = loadAdventure(key);
      if (myAdventure)
        buildAdventure(myAdventure);
    }
    else console.log(`Error: cannot find adventure`);
  });
}*/