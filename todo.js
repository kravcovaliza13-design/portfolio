const API = 'https://jsonplaceholder.typicode.com/todos';

const list = document.querySelector('.task-list');
const input = document.querySelector('.todo-input');
const addBtn = document.querySelector('.add-btn');
const search = document.querySelector('.search-input');
const filters = document.querySelectorAll('.filter-btn');
const counter = document.querySelector('.counter');
const loader = document.querySelector('.loader');
const form = document.querySelector('.todo-form');

let tasks = [];
let currentFilter = 'all';
let searchText = '';

/* ===== LOADER ===== */
function showLoader() {
    loader.classList.remove('hidden');
}

function hideLoader() {
    loader.classList.add('hidden');
}

/* ===== COUNTER ===== */
function updateCounter() {
    counter.textContent = tasks.filter(t => !t.completed).length;
}

/* ===== CREATE TASK ===== */
function createTask(task) {
    const li = document.createElement('li');
    li.classList.add('task-item');
    li.dataset.id = task.id;

    li.innerHTML = `
        <input type="checkbox" ${task.completed ? 'checked' : ''}>
        <span class="${task.completed ? 'done' : ''}">${task.title}</span>
        <button class="delete">✖</button>
    `;

    return li;
}

/* ===== RENDER ===== */
function render() {
    list.innerHTML = '';

    let filtered = [...tasks];

    if (currentFilter === 'active') {
        filtered = filtered.filter(t => !t.completed);
    }

    if (currentFilter === 'completed') {
        filtered = filtered.filter(t => t.completed);
    }

    if (searchText) {
        filtered = filtered.filter(t =>
            t.title.toLowerCase().includes(searchText.toLowerCase())
        );
    }

    filtered.forEach(t => list.appendChild(createTask(t)));

    updateCounter();
}

/* ===== LOAD ===== */
async function loadTasks() {
    showLoader();

    try {
        const res = await fetch(`${API}?_limit=10`);
        tasks = await res.json();
        render();
    } catch (e) {
        alert('Помилка завантаження');
    } finally {
        hideLoader();
    }
}

/* ===== ADD ===== */
form.addEventListener('submit', e => {
    e.preventDefault();

    const text = input.value.trim();
    if (!text) return;

    const newTask = {
        id: Date.now(),
        title: text,
        completed: false
    };

    tasks.unshift(newTask);

    input.value = '';
    addBtn.disabled = true;

    render();
});

/* ===== INPUT ===== */
input.addEventListener('input', () => {
    addBtn.disabled = !input.value.trim();
});

/* ===== SEARCH (DEBOUNCE) ===== */
function debounce(fn, delay) {
    let t;
    return (...args) => {
        clearTimeout(t);
        t = setTimeout(() => fn(...args), delay);
    };
}

search.addEventListener('input', debounce(e => {
    searchText = e.target.value;
    render();
}, 300));

/* ===== FILTERS ===== */
filters.forEach(btn => {
    btn.addEventListener('click', () => {
        filters.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        currentFilter = btn.dataset.filter;
        render();
    });
});

/* ===== DELEGATION ===== */
list.addEventListener('click', e => {
    const id = Number(e.target.closest('.task-item')?.dataset.id);
    if (!id) return;

    if (e.target.classList.contains('delete')) {
        tasks = tasks.filter(t => t.id !== id);
    }

    if (e.target.type === 'checkbox') {
        const task = tasks.find(t => t.id === id);
        task.completed = e.target.checked;
    }

    render();
});

/* START */
loadTasks();