import ToDos from "./todo.js";
import { bindTouch } from "./utils.js";

const list = document.getElementById('toDoList');
const myToDos = new ToDos(list, 'toDo');
bindEvents();

function bindEvents() {
  const toDoInput = document.getElementById('input_toDo');
  bindTouch(('#clear_all'), function () {
    myToDos.clearAllToDos('toDo');
  });
  bindTouch(('#filter_active'), function () {
    myToDos.filterToDos('toDo', false);
  });
  bindTouch(('#filter_completed'), function () {
    myToDos.filterToDos('toDo', true);
  });
  bindTouch(('#filter_all'), function () {
    myToDos.listToDos();
  });
  toDoInput.addEventListener("keyup", function(event) {
    if (event.key === 'Enter') {
      event.preventDefault();
      document.getElementById('add_toDo').click();
    }
  });
}