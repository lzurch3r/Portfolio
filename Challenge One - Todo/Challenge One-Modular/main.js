import ToDos from "./todo.js";
import { qs, bindTouch } from "./utils.js";

const list = document.getElementById('toDoList');
const myToDos = new ToDos(list, 'toDo');

bindTouch(('#clear_all'), function () {
  myToDos.clearAllToDos('toDo');
});