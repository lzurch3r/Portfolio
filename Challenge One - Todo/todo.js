class Task {
  constructor(name,active) {
    this.taskName = name;
    this.active = active;
  }
  isActive()     { return this.active;   }
  getTaskName()  { return this.taskName; }
  changeTask() {
    if (this.active === false) { this.active = true; }
    else this.active = false;
  }
};

/**************************
 * ADD NEW TASK
 * Takes a string as a parameter
 * and adds a new Task object to the tasklist
 ***************************/
function addNewTask(name) {
  if (name) {
    
      let newList = readTaskList();
      //console.log(newList.length);
      const newTask = new Task(name,true);
      newList.unshift(newTask);

      saveTaskList(newList);
      displayTaskList(readTaskList());
    }
  else {
    const message = "Error: invalid task name!";
    console.log(message);
  }
}
/************************************
 * CHANGE TASK
 * Takes a string and an integer as parameters
 * and changes the active status of an item in the task list
 *************************************/
function changeTask(taskName,index) {
  if (taskName && (index >= 0)) {
    let newList = readTaskList();
    if (taskName === newList[index].getTaskName()) {
      newList[index].changeTask();
    }

    saveTaskList(newList);
    displayTaskList(readTaskList());
  }
}
/*************************
 * REMOVE TASK
 * Takes a string and an integer as parameters
 * and removes a Task object from the task list
 **************************/
function removeTask(taskName,index) {
  if (taskName && (index >= 0)) {
    let newList = readTaskList();
    //console.log("Before splicing: " + newList.length);
    if (taskName === newList[index].getTaskName()) {
      newList.splice(index,1);
      //console.log("After splicing: " + newList.length);

      saveTaskList(newList);
      displayTaskList(readTaskList());
    }
    else {
        const message = "Error: couldn't find task in taskList!";
        console.log(message);
      }
  }
}
/***************************************
 * DISPLAY TASK LIST
 * Takes an array as a parameter and 
 ****************************************/
function displayTaskList(list) {  
  let newHTML = "";
  if (list.length > 0) {
    for (let i = 0; i < list.length; i = i + 1) {
      newHTML += `<tr name="task_row"><td name="task_active" onclick="changeTask('` + list[i].getTaskName() + `',` + i + `)">`;
      if (list[i].isActive())       { newHTML += `O`; }
      else if (!list[i].isActive()) { newHTML += `X`; } 
      
      newHTML +=  `</td><td name="task_name">`;

      if (list[i].isActive()) { newHTML += list[i].getTaskName(); }
      else if (!list[i].isActive()) { newHTML += `<s>` + list[i].getTaskName() + `</s>` }
      
      newHTML += `</td><td name="task_remove" onclick="removeTask('` + list[i].getTaskName() + `',` + i + `)">X</td></tr>`;
      //console.log(newHTML);
    }
  }
  else if (list.length === 0) {
    newHTML = "<em>There's nothing here!</em>";
  }
  
  document.getElementById('table_tasks').innerHTML = newHTML;
  clearTaskInput();
}
/***********************************
 * CLEAR TASK INPUT
 * Clears user input and sets it to null
 ************************************/
function clearTaskInput(id='input_task') {
  document.getElementById(id).value = null;
}
/*************************************
 * READ TASK LIST
 * Reads a JSON string from localStorage, parses it,
 * and returns it as an array
 **************************************/
function readTaskList() {
  const nameChallenge = "Challenge One";
  const data = localStorage.getItem(nameChallenge);
  const parseData = JSON.parse(data);
  let taskList = [];
  
  if (parseData.length > 0) {
    for (let i = 0; i < parseData.length; i++) {
      const newTask = new Task(parseData[i].taskName,parseData[i].active);
      taskList.push(newTask);
    }
  }

  return taskList;
}
/********************************
 * LOAD TASK LIST
 * Reads from localStorage and displays the task list
 *********************************/
function loadTaskList() {
  if (readTaskList()) {
    if (readTaskList().length != 0) {
    //console.log(readTaskList().length);
      displayTaskList(readTaskList());
    }
    else {
      const message = "<em>There's nothing here!</em>";
      document.getElementById('table_tasks').innerHTML = message;
    }
  }
  else if (!readTaskList()) {
    clearAll();
  }
}
/********************************************
 * SAVE TASK LIST
 * Takes an array as a parameter, stringifies it,
 * and writes it to localStorage
 *********************************************/
function saveTaskList(list) {
  const nameChallenge = "Challenge One";
  const taskList = list;
  localStorage.setItem(nameChallenge, JSON.stringify(taskList));
  console.log(JSON.stringify(taskList));
}
/********************************************
 * CLEAR ALL
 * Saves a blank array to  localStorage
 *********************************************/
function clearAll() {
  const blankList = [];
  saveTaskList(blankList);

  const message = "List length: " + readTaskList().length;
  displayTaskList(readTaskList());
  console.log(message);
}