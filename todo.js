let tasks = [];

const taskList = document.getElementById("list");
const addTaskInput = document.getElementById("add");
const totaltask = document.getElementById("tasks-counter");

function addTasktoDom(task) {
  const li = document.createElement("li");
  li.innerHTML = `
    <input type="checkbox" id="${task.id}" ${task.done ? 'checked' : ''} class="custom-checkbox">
    <label for="${task.id}">${task.text}</label>
    <img src="bin.png" class="delete" data-id="${task.id}">
  `;
  taskList.append(li);
}

function renderList() {
  taskList.innerHTML = '';
  tasks.forEach((task) => {
    addTasktoDom(task);
  });
  totaltask.innerHTML = tasks.length;
}

function addTask(task) {
  if (task) {
    tasks.push(task);
    renderList();
    shownotice("Todo Added Successfully");
    return;
  }
  shownotice("Task not added");
}

function removeTask(taskId) {
    Newtasks = tasks.filter((task) => task.id !== taskId);
    tasks=Newtasks;
    renderList();
    totaltask.innerHTML = tasks.length;
    shownotice("Todo Deleted Successfully");
  }
  

function toggleTask(taskId) {
  const task = tasks.find((task) => task.id === taskId);
  if (task) {
    task.done = !task.done;

    renderList();
    shownotice("Task Toggle Successfully");
  } else {
    shownotice("Toggled error");
  }
}

function shownotice(text) {
  alert(text);
}

function handleKeyEvent(e) {
  if (e.key === "Enter") {
    const text = e.target.value.trim();

    if (!text) {
      shownotice("Enter Todo Task");
    } else {
      const task = {
        text: text,
        id: new Date().getTime(),
        done: false,
      };

      e.target.value = "";
      addTask(task);
    }
  }
}

function handleClickEvent(e) {
  const target = e.target;

  if (target.className ==='delete') {
    const taskId = Number(target.dataset.id);
    removeTask(taskId);
  } else if (target.classList.contains("custom-checkbox")) {
    const taskId = Number(target.id);
    toggleTask(taskId);
  }
}


function appIntiallize(){

  addTaskInput.addEventListener("keyup", handleKeyEvent);
  taskList.addEventListener("click", handleClickEvent);

}

appIntiallize();