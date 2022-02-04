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
function changeTask(taskName,status) {
  if (taskName) {
    let newList = readTaskList();
    let index = -1;
    for (let i = 0; i < newList.length; i++) {
      if ((taskName === newList[i].getTaskName()) && (status === newList[i].isActive()))
      index = i;
    }
    newList[index].changeTask();

    saveTaskList(newList);
    displayTaskList(readTaskList());
  }
}
/*************************
 * REMOVE TASK
 * Takes a string and an integer as parameters
 * and removes a Task object from the task list
 **************************/
function removeTask(taskName,status) {
  if (taskName) {
    let newList = readTaskList();
    //console.log("Before splicing: " + newList.length);
      let index = -1;
      for (let i = 0; i < newList.length; i++) {
        if ((taskName === newList[i].getTaskName()) && (status === newList[i].isActive()))
        index = i;
      }

      if (index >= 0) {
        newList.splice(index,1);
        //console.log("After splicing: " + newList.length);
  
        saveTaskList(newList);
        displayTaskList(readTaskList());
      }
    else if (index < 0) {
        const message = "Error: couldn't find task in taskList!";
        console.log(message);
      }
  }
}
/******************************
 * FILTER TASK LIST
 * Takes a string as a parameter
 * and calls different filtering options
 *******************************/
function filterTaskList(filter) {
  const listData = readTaskList();

  switch (filter) {
    case `all`: {
      let filterAll = function (list) {
        displayTaskList(list);
      }
      filterAll(listData);
    }
    break;
    case `active`: {
      let filterActive = function (list) {
        let newList = [];
        for (let i = 0; i < list.length; i++) {
          if (list[i].isActive())
            newList.push(list[i]);
        }
        
        displayTaskList(newList);
      }
      filterActive(listData);
    }
    break;
    case `completed`: {
      let filterActive = function (list) {
        let newList = [];
        for (let i = 0; i < list.length; i++) {
          if (!list[i].isActive())
            newList.push(list[i]);
        }
        
        displayTaskList(newList);
      }
      filterActive(listData);
    }
    break;
    default: { console.log(`Error: couldn't filter task list!`) }
    break;
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
      newHTML += `<tr name="task_row"><td name="task_active" onclick="changeTask('` + list[i].getTaskName() + `',` + list[i].isActive() + `)">`;
      
      ///Checks for task's active status, marks an 'O' for active and 'X' for completed
      if (list[i].isActive())       { newHTML += `O`; }
      else if (!list[i].isActive()) { newHTML += `X`; } 
      
      newHTML +=  `</td><td name="task_name">`;

      ///Checks for task's active status, marks up completed tasks with strikethrough text
      if (list[i].isActive()) { newHTML += list[i].getTaskName(); }
      else if (!list[i].isActive()) { newHTML += `<s>` + list[i].getTaskName() + `</s>` }
      
      newHTML += `</td><td name="task_remove" onclick="removeTask('` + list[i].getTaskName() + `',` + list[i].isActive() + `)">X</td></tr>`;
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