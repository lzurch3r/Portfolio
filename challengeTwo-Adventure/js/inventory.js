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
    element.style.display = "block";
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
    element.style.display = "none";
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

      // const img = document.createElement('img');
      // const imgURL = getItemImg(images[item.index]);
      // console.log(imgURL);
      // console.log(images.length);
      // if (imgURL) {
      //   img.setAttribute('src', images[item.index]);

      //   element.appendChild(img);
      // }
    });
  }
}

function getItemImg(url) {
  const response = fetch(url)
    .then(res => res.json())
    .then(data => {
      console.log(data.sprites.default);
      return data.sprites.default;
    })

  if (response) {
    return response;
  }
  return null;
}

export default class Inventory {
  constructor(id) {
    this.id = id;
    this.content = inventory;
    this.images = createArray(myItems.data.images);

    this.addItem('item_00');
    console.log(this.content);
  }

  
  // Takes an item id and adds it to the inventory
  addItem(id) {
    const obj = getItem(id, myItems.data.items);

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