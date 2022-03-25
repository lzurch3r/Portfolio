import Items from "./items.js";

const myItems = new Items();
let inventory = [];

function getItem(id, content) {
  const obj = content.find((item) => item.id == id);
  if (obj) {
    console.log(`Getting item: '${obj.name}' with id '${obj.id}'`);

    // Add item to inventory array and return it
    inventory.push(obj);

    return inventory;
  }

  return inventory;
}

function renderInventory(element, content) {
  element.innerHTML = "";

  if (content.length > 0) {
    content.forEach((item) => {
      const htmlItem = document.createElement('li');
      htmlItem.innerHTML = `${item.name}`;

      element.appendChild(htmlItem);
    });
  }
}

export default class Inventory {
  constructor() {
    this.content = inventory;

    this.addItem('item_00');
    console.log(`Inventory: ${this.content}`);
  }

  // Takes an item id and adds it to the inventory
  addItem(id) {
    this.content = getItem(id, myItems.content);

    this.displayInventory();
  }
  
  displayInventory() {
    renderInventory(document.getElementById('inventory'), this.content);
  }
};