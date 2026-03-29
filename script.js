const btnClearAll = document.querySelector(".clear-all");
const btnAddTask = document.querySelector(".add-task");
const submit = document.querySelector(".submit");

const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
localStorage.setItem("tasks", JSON.stringify(tasks));

const addTask = (tasks) => {
  const taskValue = btnAddTask.value.trim();
  if (taskValue) {
    const uuid = crypto.randomUUID();
    const newTask = { name: taskValue, done: false, id: uuid };

    tasks.push(newTask);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    btnAddTask.value = "";
  }
};

const showTasks = (tasks) => {
  const tasksList = document.querySelector(".tasks-list");
  const tasksHTML = tasks
    .map(
      (task) => `
    <li class="tasks-item ${task.done ? "done" : ""}">
      <span class="tasks-text">${task.name}</span>
      <div class="tasks-actions">
        <button class="btn-done" data-id="${task.id}">done</button>
        <button class="btn-delete" data-id="${task.id}">delete</button>
      </div>
    </li>`,
    )
    .join("");

  tasksList.innerHTML = tasksHTML;
};

submit.addEventListener("click", () => {
  addTask(tasks);
  showTasks(tasks);
});

btnClearAll.addEventListener("click", () => {
  tasks.length = 0;
  localStorage.setItem("tasks", JSON.stringify(tasks));
  showTasks(tasks);
});

const toggleDone = (id) => {
  const task = tasks.find((element) => element.id === id);
  if (task) {
    task.done = !task.done;
    localStorage.setItem("tasks", JSON.stringify(tasks));
    showTasks(tasks);
  }
};

const deleteTask = (id) => {
  const newTasks = tasks.filter((element) => element.id !== id);
  console.log(newTasks);
  localStorage.setItem("tasks", JSON.stringify(newTasks));
  showTasks(newTasks);
};

document.querySelector(".tasks-list").addEventListener("click", (e) => {
  const id = e.target.dataset.id;

  if (e.target.classList.contains("btn-done")) {
    toggleDone(id);
  }

  if (e.target.classList.contains("btn-delete")) {
    deleteTask(id);
  }
});

showTasks(tasks);
