class Task {
  constructor(name) {
    this.taskName = name;
    this.active = true;
  }
  isActive() {
    return this.active;
  }
  getTaskName() {
    return this.taskName;
  }
  completeTask() {
    this.active = false;
  }
};
/**************************
 * CREATE TASK LIST
 * Test code for creating a list of tasks on startup
 ***************************/
function createTaskList() {
  let firstTask = new Task("First Task");
  let secondTask = new Task("Second Task");
  let thirdTask = new Task("Third Task");
  let taskArray = [firstTask, secondTask, thirdTask];
  const taskList = document.getElementById('table_tasks').innerHTML;

  let newHTML = "";
  for (let i = 0; i < taskArray.length; i++) {
    newHTML =  newHTML + `<tr name="task_row"><td name="task_check"></td>` +
               `<td name="task_name">` + taskArray[i].getTaskName() +
               `</td><td name="task_remove">X</td></tr>`;
  }
  
  document.getElementById('table_tasks').innerHTML = newHTML + taskList;
}
function addNewTask(name) {
  if (name) {
    const newTask = new Task(name);
    const taskList = document.getElementById('table_tasks').innerHTML;
    let newHTML = "";
  
    if (newTask.isActive()) {
      newHTML += `<tr name="task_row"><td name="task_check"></td>` +
                 `<td name="task_name">` + newTask.getTaskName() +
                 `</td><td name="task_remove">X</td></tr>`;
    }
    document.getElementById('table_tasks').innerHTML = newHTML + taskList;
  }
}

//createTaskList();
//addNewTask("New Task");