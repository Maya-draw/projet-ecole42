window.onload = loadTasks;

const input = document.getElementById('taskInput');
const list = document.getElementById('taskList');
const addBtn = document.getElementById('addBtn');

addBtn.addEventListener('click', addTask);
input.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') addTask();
});

function addTask() {
  const taskText = input.value.trim();
  if (taskText === '') return;

  createTask(taskText);
  input.value = '';
  saveTasks();
}

function createTask(text, isDone = false) {
  const li = document.createElement('li');
  li.textContent = text;

  if (isDone) li.classList.add('done');

  // Marquer comme terminée
  li.onclick = () => {
    li.classList.toggle('done');
    saveTasks();
  };

  // Bouton supprimer
  const delBtn = document.createElement('button');
  delBtn.textContent = 'Supprimer';
  delBtn.className = 'delete';
  delBtn.onclick = (e) => {
    e.stopPropagation();
    li.remove();
    saveTasks();
  };

  li.appendChild(delBtn);
  list.appendChild(li);
}

function saveTasks() {
  const tasks = [];
  document.querySelectorAll('#taskList li').forEach(li => {
    const text = li.firstChild.textContent;
    const done = li.classList.contains('done');
    tasks.push({ text, done });
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
  const saved = JSON.parse(localStorage.getItem('tasks')) || [];
  saved.forEach(task => createTask(task.text, task.done));
}
