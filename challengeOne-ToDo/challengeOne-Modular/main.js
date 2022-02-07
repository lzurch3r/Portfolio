import ToDos from "./todo.js";
import { bindTouch } from "./utils.js";

const list = document.getElementById('toDoList');
const myToDos = new ToDos(list, 'toDo');
bindEvents();
document.getElementById('filter_all').style.borderStyle = "solid";

function bindEvents() {
  const toDoInput = document.getElementById('input_toDo');
  bindTouch(('#clear_all'), function () {
    myToDos.clearAllToDos('toDo');
  });
  bindTouch(('#filter_active'), function () {
    myToDos.filterToDos('toDo', false);
    changeFilterHighlight('filter_active');
  });
  bindTouch(('#filter_completed'), function () {
    myToDos.filterToDos('toDo', true);
    changeFilterHighlight('filter_completed');
  });
  bindTouch(('#filter_all'), function () {
    myToDos.listToDos();
    changeFilterHighlight('filter_all');
  });
  toDoInput.addEventListener("keyup", function(event) {
    if (event.key === 'Enter') {
      event.preventDefault();
      document.getElementById('add_toDo').click();
    }
  });
}

function changeFilterHighlight(filterType) {
  const elementFilterAll = document.getElementById('filter_all');
  const elementFilterActive = document.getElementById('filter_active');
  const elementFilterCompleted = document.getElementById('filter_completed');

  elementFilterAll.style.borderStyle = "none";
  elementFilterActive.style.borderStyle = "none";
  elementFilterCompleted.style.borderStyle = "none";

  document.getElementById(filterType).style.borderStyle = "solid";
}