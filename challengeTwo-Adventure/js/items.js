/// JS file for reading data from JSON objects and exporting an array of item objects
import { createArray, parseJSON } from "./utils.js";

const url = './JSON/items.json';
const api = 'https://pokeapi.co/api/v2/';
const data = await parseJSON(url);
let images = [];

function fetchPokemonItems() {
  // fetch(api + 'item?limit=100')
  //   .then(response => response.json())
  //   .then(function(items) {
  //     console.log(items);
  //     items.results.forEach(function(item) {
  //       // console.log(item);
  //       fetchItemImgData(item);
  //     })
  //   })
  let array = [];
  data.images.forEach(async function(item) {
    // console.log(item);
    array.push(await fetchItemImgData(item));
  });

  return array;
}

async function fetchItemImgData(item) {
  let imgURL = item;
  let img = null;
  
  await fetch(imgURL)
    .then(response => response.json())
    .then(function(itemData) {
      // console.log(itemData.sprites.default);
      img = itemData.sprites.default;
    }) 
  
  return img;
}

export default class Items {
  constructor() {
    this.content = createArray(data.items);
    
    this.images = fetchPokemonItems();
    console.log(this.content);
    console.log(this.images);
  }
};