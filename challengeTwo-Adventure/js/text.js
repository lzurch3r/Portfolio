//Read from "./text.json" into arrays of text objects
const url = './js/text.json';

//export an array of text corresponding to NPC objects from 'text.json'
export const npcText = await fetch(url)
  .then(response => {
    if (!response.ok) {
      throw new Error(("Could not fetch \"npcText\""));  //throw error if cannot fetch 'text.json'
    }
      return response.json()
  })
  .then(json => {
    console.log(json);
    return getNPCTextArray(json);
  });

//inserts all data from NPC object in 'text.json' into an array and returns it
function getNPCTextArray(data) {
  let textArray = new Array();
  
  data.npc.forEach(element => {
    textArray.push(element);
  });

  return textArray;
}

//export an array of text corresponding to room objects from 'text.json'
export const roomText = await fetch(url)  //roomText[0] corresponds to 'essential_text', roomText[1] corresponds to 'flavor_text'
  .then(response => {
    if (!response.ok) {
      throw new Error(("Could not fetch \"roomFlavorText\""));  //throw error if cannot fetch 'text.json'
    }
      return response.json()
  })
  .then(json => {
    console.log(json);
    return getRoomTextArray(json);
  });

//inserts all data from NPC object in 'text.json' into an array and returns it
function getRoomTextArray(data) {
  let essentialTextArray = new Array();
  let flavorTextArray = new Array();
  
  data.rooms[2].forEach(element => {
    essentialTextArray.push(element);
  });
  
  data.rooms[3].forEach(element => {
    flavorTextArray.push(element);
  });

  return [essentialTextArray,flavorTextArray];
}