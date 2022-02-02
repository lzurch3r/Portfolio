class Task {
  constructor(name) {
    this.taskName = name;
    this.active = true;
  }
  isActive()     { return this.active; }
  getTaskName()  { return this.taskName; }
  completeTask() { this.active = false; }
};

let taskList = [];
loadTaskList();

/**************************
 * ADD NEW TASK
 * Takes a string as a parameter and adds a new Task object
 * to the tasklist
 ***************************/
function addNewTask(name) {
  if (name) {
    let newList = taskList;
    const newTask = new Task(name);
    newList.unshift(newTask);

    taskList = newList;
    displayTaskList(taskList);
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
function removeTask(taskName,index) {
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
}
function displayTaskList(taskList) {
  let newHTML = "";
  if (taskList.length > 0) {
    for (let i = 0; i < taskList.length; i = i + 1) {
      if (taskList[i].isActive()) {
      newHTML += `<tr name="task_row"><td name="task_check"></td>` +
                 `<td name="task_name">` +
                 taskList[i].getTaskName() + `</td><td name="task_remove" onclick="removeTask('` + taskList[i].getTaskName() + `',` + i + `)">X</td></tr>`;
      }
      //console.log(newHTML);
    }
  }
  else if (taskList.length === 0) {
    newHTML = "<em>There's nothing here!</em>";
  }
  
  document.getElementById('table_tasks').innerHTML = newHTML;
  clearTaskInput();
}
function clearTaskInput(id='input_task') {
  document.getElementById(id).value = null;
}
function loadTaskList() {
  //let taskList = [];
  //console.log(taskList.length);
  displayTaskList(taskList);
}

//createTaskList();
//addNewTask("New Task");