import { qs, readFromLS, writeToLS, bindTouch } from "./utils.js";
//creates a place 
let liveToDos = null;
//an attempt to recreate the instructor's code from scratch to
//  better understand it while implementing own code from OLDmain.js

function renderList(list, element, toDos, hidden) {
  //console.log(list);
  element.innerHTML = "";
  let numIncomplete = 0;

  list.forEach(toDo => {
    const item = document.createElement('li');
    const att = document.createAttribute("class");
    ///NOTE TO SELF: I'm confused why this is here, but I'll learn about it
    const formattedDate = new Date(toDo.id).toLocaleDateString("en-US");

    att.value = "demoClass";
    item.setAttributeNode(att);
    let cb = null;     //creating a callback function to add event listener to item
    let rb = null;
    if (hidden && toDo.completed) {    //standard HTML writing
        item.innerHTML = `<label><input type="checkbox" class="checkbox" checked><s> ${toDo.content}</s></label><button type="button" class="removeButton">X</button>`;
    }
    else {
      item.innerHTML = `<label><input type="checkbox" class="checkbox"> ${toDo.content}</label><button type="button" class="removeButton">X</button>`;
      numIncomplete += 1;
    }

    //supposedly to wire listener to the checkbox
    cb = item.childNodes[0].childNodes[0];

    if (cb) {
      cb.addEventListener("change", function () {
        toDos.completeToDo(toDo.id);
      });
    }

    //wire listener to the remove button
    rb = item.childNodes[1];

    if (rb) {
      rb.addEventListener("touchend", function () {
        toDos.removeToDo(toDo.id);
      });
      rb.addEventListener("click", function () {
        toDos.removeToDo(toDo.id);
      })
    }

      element.appendChild(item);
  });
  
  if (element.innerHTML === "") {
    const item = document.createElement('li');
    item.innerHTML = `<em>There's nothing here!</em>`;
    element.appendChild(item);
  }

  document.getElementById('filter_title').innerHTML = `${numIncomplete} task(s) left`;
}

function addToDo(value, key) {
  if (value !== "") {
  const newToDo = {  //creates a new ToDo task
    id: new Date(),
    content: value,
    completed: false
  };

  try {
    liveToDos.push(newToDo);   //pushes newToDo into liveToDos array

    if (liveToDos) //checks if liveToDos array exists
      //writes liveToDos array to LS; private function from utils.js
      writeToLS(key, liveToDos);
    else throw (`ERROR: Cannot find array 'liveToDos' to write to localStorage`);
  }
  catch (e) {
    console.log(e);
  }
  }
}

function getToDos(key) {
  if (liveToDos === null) {
      //reads data from LS; private function from utils.js
      liveToDos = readFromLS(key) || [];
  }

  return liveToDos;
}

function filterToDos(key, hidden = true) {
  let toDos = getToDos(key);

  return toDos.filter(item => item.completed === hidden);
}

export default class ToDos {
  constructor(listElement, key) {
    this.listElement = listElement;
    this.key = key;

    bindTouch(("#add_toDo"), this.newToDo.bind(this));
    this.listToDos();
  }

  newToDo() {
    const task = document.getElementById('input_toDo');
    addToDo(task.value, this.key);
    task.value = "";
    this.listToDos();
  }

  findToDo(id) {
    let toDo = liveToDos.find( element => {  //uses the find() function in the array to find the right element id
      return element.id === id;  //makes a total comparison between ids and returns a bool
    });

    return toDo;
  }

  completeToDo(id) {
    console.log(id + "checked");
    let toDo = this.findToDo(id);  //checks to make sure toDo exists in liveToDos

    if (toDo) {
      toDo.completed = !toDo.completed;  //an extremely simple way of switching bool variables. I'm shocked
      writeToLS(this.key, liveToDos);
      renderList(liveToDos, this.listElement, this, true);
    }
  }

  removeToDo(id) {
    console.log(id + "removed");
    let toDo = this.findToDo(id);

    if (toDo) {
      liveToDos.splice(liveToDos.indexOf(toDo),1);
      writeToLS(this.key, liveToDos);
      renderList(liveToDos, this.listElement, this, true);
    }
  }

  listToDos(hidden = true) {
    renderList(getToDos(this.key), this.listElement, this, hidden);
  }

  clearAllToDos(key) {
    liveToDos = null;

    writeToLS(key, liveToDos);
    this.listToDos();
  }

  filterToDos(key, hidden = true) {
    renderList(filterToDos(key, hidden), this.listElement, this, true);
  }
}