const list = document.querySelector('.task-list');
const input = document.querySelector('.task-input');
const addBtn = document.querySelector('.add-btn');
const search = document.querySelector('.search-input');
const filters = document.querySelectorAll('[data-filter]');

let tasks = [];
let currentFilter = 'all';

// ===== LOAD API =====
async function loadTasks() {
  try {
    const res = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=10');
    tasks = await res.json();
    renderTasks();
  } catch (e) {
    console.error('API error', e);
  }
}

// ===== RENDER =====
function renderTasks() {
  list.innerHTML = '';

  let filtered = tasks;

  // filter
  if (currentFilter === 'active') {
    filtered = tasks.filter(t => !t.completed);
  }
  if (currentFilter === 'done') {
    filtered = tasks.filter(t => t.completed);
  }

  // search
  const searchValue = search.value.toLowerCase();
  filtered = filtered.filter(t =>
    t.title.toLowerCase().includes(searchValue)
  );

  filtered.forEach(task => {
    const li = document.createElement('li');
    li.className = 'task-item';
    li.dataset.id = task.id;

    li.innerHTML = `
      <input type="checkbox" ${task.completed ? 'checked' : ''}>
      <span class="${task.completed ? 'done' : ''}">${task.title}</span>
      <button class="delete">✖</button>
    `;

    list.appendChild(li);
  });
}

// ===== ADD TASK =====
addBtn.addEventListener('click', () => {
  const text = input.value.trim();
  if (!text) return;

  tasks.unshift({
    id: Date.now(),
    title: text,
    completed: false
  });

  input.value = '';
  addBtn.disabled = true;
  renderTasks();
});

// enable button
input.addEventListener('input', () => {
  addBtn.disabled = input.value.trim() === '';
});

// ===== DELETE + TOGGLE (DELEGATION) =====
list.addEventListener('click', (e) => {
  const id = Number(e.target.closest('.task-item')?.dataset.id);
  if (!id) return;

  if (e.target.classList.contains('delete')) {
    tasks = tasks.filter(t => t.id !== id);
  }

  if (e.target.type === 'checkbox') {
    const task = tasks.find(t => t.id === id);
    task.completed = e.target.checked;
  }

  renderTasks();
});

// ===== FILTERS =====
filters.forEach(btn => {
  btn.addEventListener('click', () => {
    currentFilter = btn.dataset.filter;
    renderTasks();
  });
});

// ===== DEBOUNCE SEARCH =====
function debounce(fn, delay) {
  let t;
  return (...args) => {
    clearTimeout(t);
    t = setTimeout(() => fn(...args), delay);
  };
}

search.addEventListener('input', debounce(renderTasks, 300));

// start
loadTasks();