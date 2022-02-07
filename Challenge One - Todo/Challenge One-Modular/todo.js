import { qs, readFromLS, writeToLS, bindTouch } from "./utils.js";
//creates a place 
let liveToDos = null;
//an attempt to recreate the instructor's code from scratch to
//  better understand it while implementing own code from OLDmain.js

function renderList(list, element, toDos, hidden) {
  console.log(list);
  element.innerHTML = "";

  list.forEach(toDo => {
    const item = document.createElement('li');
    ///NOTE TO SELF: I'm confused why this is here, but I'll learn about it
    const formattedDate = new Date(toDo.id).toLocaleDateString("en-US");

    let cb = null;     //creating a callback function to add event listener to item
    if (hidden && toDo.completed) {    //standard HTML writing
        item.innerHTML = `<label><input type="checkbox" checked><s> ${toDo.content}</s></label>` +
                         `<button>X</button>`;
    }
    else {
      item.innerHTML = `<label><input type="checkbox"> ${toDo.content}</label>` +
                       `<button>X<button>`;
    }

    //supposedly to wire listener to the checkbox
    cb = item.childNodes[0].childNodes[0];

    if (cb) {
      console.log(cb); //I want to know what cb shows me
      cb.addEventListener("change", function() {
        toDos.completeToDo(toDo.id);
      });
    }

    element.appendChild(item);
  });
}

function addToDo(value, key) {
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

function getToDos(key) {
  if (liveToDos === null) {
      //reads data from LS; private function from utils.js
      liveToDos = readFromLS(key) || [];
  }

  return liveToDos;
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

  listToDos(hidden = true) {
    renderList(getToDos(this.key), this.listElement, this, hidden);
  }

  clearAllToDos(key) {
    liveToDos = null;

    writeToLS(key, liveToDos);
    this.listToDos();
  }
}