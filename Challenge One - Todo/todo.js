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

function createTaskList() {
  let firstTask = new Task("First Task");
  let secondTask = new Task("Second Task");
  let thirdTask = new Task("Third Task");
  let taskArray = [firstTask, secondTask, thirdTask];
  console.log(document.getElementById('table_tasks').innerHTML);
  let taskList = document.getElementById('table_tasks').innerHTML;

  let newHTML = "";
  for (let i = 0; i < taskArray.length; i++) {
    newHTML = `<tr name="task_row"><td name="task_check"></td>` +
               `<td name="task_name">` + taskArray[i].getTaskName +
               `</td><td name="task_remove">X</td></tr>` + newHTML;
  }
  
  taskList = newHTML + taskList;
}

createTaskList();