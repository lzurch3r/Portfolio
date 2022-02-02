class Task {
  constructor(name) {
    this.taskName = name;
    this.active = true;
  }
  isActive()     { return this.active; }
  getTaskName()  { return this.taskName; }
  completeTask() { this.active = false; }
};

//let taskList = [];

/**************************
 * ADD NEW TASK
 * Takes a string as a parameter and adds a new Task object
 * to the tasklist
 ***************************/
function addNewTask(name) {
  if (name) {
    
      let newList = [];
      newList = newList + readTaskList();
      console.log(newList.length);
      const newTask = new Task(name);
      newList.unshift(newTask);

      saveTaskList(newList);
      displayTaskList(readTaskList());
      delete newTask;
      newTask = null;
    }

  else {
    const message = "Error: invalid task name!";
    console.log(message);
  }
}
/*************************
 * REMOVE TASK
 * Takes a string and a number as parameters and removes a Task
 * object from the taskList array
 **************************/
/*function removeTask(taskName,index) {
  if (taskName && (index >= 0)) {
    let newList = taskList;
    
    if (taskName === newList[index].getTaskName()) {
      newList.splice(index,1);

      taskList = newList;
      displayTaskList(taskList);
    }
    else {
        const message = "Error: couldn't find task in taskList!";
        console.log(message);
      }
  }
}*/
/***************************************
 * DISPLAY TASK LIST
 * Takes an array as a parameter and 
 ****************************************/
function displayTaskList(list) {
  console.log(list.length);
  
  {
    let message = "";
  for (let i = 0; i < list.length; i++) {
    message += list[i];
  }
  console.log(message);
  }
  let newHTML = "";
  if (list && (list.length > 0)) {
    for (let i = 0; i < list.length; i = i + 1) {
      if (list[i].isActive()) {
      newHTML += `<tr name="task_row"><td name="task_check"></td>` +
                 `<td name="task_name">` +
                 list[i].getTaskName() + `</td><td name="task_remove" onclick="removeTask('` + list[i].getTaskName() + `',` + i + `)">X</td></tr>`;
      }
      //console.log(newHTML);
    }
  }
  else if (!list || list.length === 0) {
    newHTML = "<em>There's nothing here!</em>";
  }
  
  document.getElementById('table_tasks').innerHTML = newHTML;
  clearTaskInput();                                           //clears user input
}
/*********************************
 * CLEAR TASK INPUT
 * Uses a default string parameter and clears the input element
 **********************************/
function clearTaskInput(id='input_task') {
  document.getElementById(id).value = null;
}

function readTaskList() {
  const nameChallenge = "Challenge One";
  const taskList = localStorage.getItem(nameChallenge);

  return taskList;
}
/********************************
 * LOAD TASK LIST
 * Reads from localStorage and displays the task list
 *********************************/
function loadTaskList() {
  if (readTaskList()) {
    if (readTaskList().length != 0) {
    console.log(readTaskList().length);
      displayTaskList(readTaskList());
}    else {
    const message = "<em>There's nothing here!</em>";
    document.getElementById('table_tasks').innerHTML = message;
  }
}
}
function saveTaskList(list) {
  const nameChallenge = "Challenge One";
  const taskList = list;
  localStorage.setItem(nameChallenge,taskList);
}
function clearAll() {
  const blankList = [];
  saveTaskList(blankList);

  const message = "List length: " + readTaskList().length;
  displayTaskList(readTaskList());
  console.log(message);
}