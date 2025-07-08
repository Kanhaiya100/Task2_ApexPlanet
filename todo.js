window.onload = function () {
  loadTasks();
  loadHistory();
};

function addTask() {
  const taskInput = document.getElementById('taskInput');
  const taskText = taskInput.value.trim();

  if (taskText === '') {
    alert("Please enter a task.");
    return;
  }

  const time = new Date().toLocaleString();
  const task = `${taskText} (${time})`;

  // Add to Task List in DOM
  createTaskElement(task);

  // Save to LocalStorage
  saveTaskToLocal(task);

  // Save to History
  saveToHistory(taskText, time);

  taskInput.value = '';
}

function createTaskElement(task) {
  const li = document.createElement('li');
  li.textContent = task;

  const removeBtn = document.createElement('button');
  removeBtn.textContent = "X";
  removeBtn.onclick = function () {
    removeTask(task);
    this.parentElement.remove();
  };

  li.appendChild(removeBtn);
  document.getElementById('taskList').appendChild(li);
}

function saveTaskToLocal(task) {
  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.forEach(task => {
    createTaskElement(task);
  });
}

function removeTask(task) {
  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks = tasks.filter(t => t !== task);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function saveToHistory(taskText, time) {
  let history = JSON.parse(localStorage.getItem('taskHistory')) || [];
  history.push({ task: taskText, time });
  localStorage.setItem('taskHistory', JSON.stringify(history));

  updateHistoryList();
}

function loadHistory() {
  updateHistoryList();
}

function updateHistoryList() {
  const historyList = document.getElementById('historyList');
  historyList.innerHTML = '';

  const history = JSON.parse(localStorage.getItem('taskHistory')) || [];

  history.forEach(item => {
    const li = document.createElement('li');
    li.textContent = `${item.task} (${item.time})`;
    historyList.appendChild(li);
  });
}

function clearAllTasks() {
  if (confirm("Are you sure you want to clear all tasks and history?")) {
    localStorage.removeItem('tasks');
    localStorage.removeItem('taskHistory');
    document.getElementById('taskList').innerHTML = '';
    document.getElementById('historyList').innerHTML = '';
  }
}
