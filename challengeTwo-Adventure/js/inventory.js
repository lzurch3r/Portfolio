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

function getItemDescription(content) {
  const item = document.createElement('p');
  item.setAttribute('id', 'item_description');

  item.innerHTML = content;

  return item;
}

function setItemDescription(event, element, content) {
  //console.log(event);
  element.innerHTML = "";
  if (event.type == "mouseover" || event.type == "touchend") {
    const item = getItemDescription(content.description);
    element.appendChild(item);
  }
}

function bindItemEvents(item, element, content) {
  item.addEventListener("mouseover", e => {
    //console.log(e.type);
    setItemDescription(e, element, content);
  });

  item.addEventListener("mouseleave", e => {
    element.innerHTML = "";
    //console.log(e.type);
  });
}

function renderInventory(element, content) {
  element.innerHTML = "";

  if (content.length > 0) {
    content.forEach((item) => {
      const htmlItem = document.createElement('li');
      htmlItem.innerHTML = `${item.name}`;
      //htmlItem.addEventListener("")

      bindItemEvents(htmlItem, document.getElementById('item_description_window'), item);
      
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