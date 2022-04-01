/// JS file for reading data from JSON objects and exporting an array of item objects
import { parseJSON } from "./utils.js";

const url = './JSON/items.json';
const api = 'https://pokeapi.co/api/v2/';
const data = await parseJSON(url);

export default class Items {
  constructor() {
    this.data = data;
  }
};