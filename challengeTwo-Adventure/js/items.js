/// JS file for reading data from JSON objects and exporting an array of item objects
import { createArray, parseJSON } from "./utils.js";

const url = './JSON/items.json';
const data = await parseJSON(url);

export default class Items {
  constructor() {
    this.content = createArray(data.items);
    console.log(this.content);
  }
};