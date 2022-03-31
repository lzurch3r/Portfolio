import Items from "./items.js";
import { parseJSON, createArray } from "./utils.js";

const myItems = new Items();
let inventory = [];

function getItem(id, content) {
  const obj = content.find((item) => item.id == id);
  if (obj) {
    console.log(`Getting item: '${obj.name}' with id '${obj.id}'`);

    return obj;
  }

  return null;
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

function getItemUsage(obj, success) {
    // Check for success in item usage
    if (success) {
    // Return success text if success == true
      return obj.onSuccess;
    }
    
    // Return failure text if success == false
    else if (!success) {
    // Return error text as default value
      return obj.onFail;
    }

  return `Error: Cannot find item or return text`;
}

function isPerishable(obj) {
  return obj.perishable;
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

function renderInventory(element, content, images) {
  element.innerHTML = "";

  if (content.length > 0) {
    content.forEach((item) => {
      const htmlItem = document.createElement('li');
      htmlItem.innerHTML = `${item.name}`;

      bindItemEvents(htmlItem, document.getElementById('item_description_window'), item);
      
      element.appendChild(htmlItem);

      const img = document.createElement('img');
      console.log(images);
      console.log(images[item.index]);
      img.setAttribute('src', images[item.index]);

      element.appendChild(img);
    });
  }
}

export default class Inventory {
  constructor(id) {
    this.id = id;
    this.content = inventory;
    this.images = myItems.images;

    this.addItem('item_00');
    console.log(`Inventory: ${this.content}`);
  }

  // Takes an item id and adds it to the inventory
  addItem(id) {
    const obj = getItem(id, myItems.content);

    if (obj) {
      // Add item to inventory array
      inventory.push(obj);
      this.content = inventory;
  
      this.displayInventory();
    }
  }

  useItem(id, element, success) {
    const obj = getItem(id, this.content);

    if (obj) {
      console.log(getItemUsage(obj, success));

      element.innerHTML = getItemUsage(obj, success);

      // Check if an item is perishable and successfully used;
      //   if so, delete it from inventory[]
      if (success && isPerishable(obj)) {
        inventory.splice(inventory.indexOf(obj),1);

        this.content = inventory;
        this.displayInventory();
      }
    }
  }
  
  displayInventory() {
    renderInventory(document.getElementById('inventory'), this.content, this.images);
  }
};