const API_URL = 'https://jsonplaceholder.typicode.com/todos';

const taskList = document.querySelector('.task-list');
const todoForm = document.querySelector('.todo-form');
const todoInput = document.querySelector('.todo-input');
const addBtn = document.querySelector('.add-btn');

const filterButtons = document.querySelectorAll('.filter-btn');

const searchInput = document.querySelector('.search-input');

const loader = document.querySelector('.loader');

const counter = document.querySelector('.counter');

let tasks = [];
let currentFilter = 'all';
let searchText = '';

/* ===== Loader ===== */

function showLoader() {
    loader.classList.remove('hidden');
}

function hideLoader() {
    loader.classList.add('hidden');
}

/* ===== Counter ===== */

function updateCounter() {
    const activeTasks = tasks.filter(task => !task.completed);
    counter.textContent = activeTasks.length;
}

/* ===== Create task ===== */

function createTaskElement(task) {

    const li = document.createElement('li');
    li.classList.add('task-item');

    if (task.completed) {
        li.classList.add('completed');
    }

    li.dataset.id = task.id;

    li.innerHTML = `
        <div class="task-content">
            <input
                type="checkbox"
                class="task-checkbox"
                ${task.completed ? 'checked' : ''}
            >

            <span class="task-title">
                ${task.title}
            </span>
        </div>

        <button class="task-delete">
            Видалити
        </button>
    `;

    return li;
}

/* ===== Render ===== */

function renderTasks(tasksToRender) {

    taskList.innerHTML = '';

    tasksToRender.forEach(task => {
        const taskElement = createTaskElement(task);
        taskList.append(taskElement);
    });

    updateCounter();
}

/* ===== Filters ===== */

function getFilteredTasks() {

    let filteredTasks = [...tasks];

    if (currentFilter === 'active') {
        filteredTasks = filteredTasks.filter(task => !task.completed);
    }

    if (currentFilter === 'completed') {
        filteredTasks = filteredTasks.filter(task => task.completed);
    }

    if (searchText.trim() !== '') {
        filteredTasks = filteredTasks.filter(task =>
            task.title.toLowerCase().includes(searchText.toLowerCase())
        );
    }

    return filteredTasks;
}

function updateUI() {
    renderTasks(getFilteredTasks());
}

/* ===== Load tasks ===== */

async function loadTasks() {

    showLoader();

    try {

        const response = await fetch(`${API_URL}?_limit=20`);

        if (!response.ok) {
            throw new Error('Помилка завантаження');
        }

        tasks = await response.json();

        updateUI();

    } catch (error) {

        alert('Не вдалося завантажити завдання');

        console.error(error);

    } finally {

        hideLoader();
    }
}

/* ===== Add task ===== */

async function addTask(title) {

    showLoader();

    try {

        const response = await fetch(API_URL, {
            method: 'POST',

            headers: {
                'Content-Type': 'application/json'
            },

            body: JSON.stringify({
                title,
                completed: false,
                userId: 1
            })
        });

        if (!response.ok) {
            throw new Error('Помилка створення');
        }

        const newTask = await response.json();

        tasks.unshift(newTask);

        updateUI();

        todoInput.value = '';

        addBtn.disabled = true;

    } catch (error) {

        alert('Не вдалося додати завдання');

        console.error(error);

    } finally {

        hideLoader();
    }
}

/* ===== Toggle task ===== */

async function toggleTask(id, completed) {

    try {

        const response = await fetch(`${API_URL}/${id}`, {

            method: 'PATCH',

            headers: {
                'Content-Type': 'application/json'
            },

            body: JSON.stringify({
                completed
            })
        });

        if (!response.ok) {
            throw new Error('Помилка оновлення');
        }

        tasks = tasks.map(task => {

            if (task.id === id) {
                return {
                    ...task,
                    completed
                };
            }

            return task;
        });

        updateUI();

    } catch (error) {

        alert('Не вдалося оновити завдання');

        console.error(error);
    }
}

/* ===== Delete task ===== */

async function deleteTask(id) {

    try {

        const response = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE'
        });

        if (!response.ok) {
            throw new Error('Помилка видалення');
        }

        tasks = tasks.filter(task => task.id !== id);

        updateUI();

    } catch (error) {

        alert('Не вдалося видалити завдання');

        console.error(error);
    }
}

/* ===== Form submit ===== */

todoForm.addEventListener('submit', event => {

    event.preventDefault();

    const title = todoInput.value.trim();

    if (!title) return;

    addTask(title);
});

/* ===== Input ===== */

todoInput.addEventListener('input', () => {

    addBtn.disabled = todoInput.value.trim() === '';
});

/* ===== Keyboard ===== */

todoInput.addEventListener('keydown', event => {

    if (event.key === 'Escape') {
        todoInput.value = '';
        addBtn.disabled = true;
    }
});

/* ===== Event delegation ===== */

taskList.addEventListener('click', event => {

    const target = event.target;

    const taskItem = target.closest('.task-item');

    if (!taskItem) return;

    const taskId = Number(taskItem.dataset.id);

    if (target.classList.contains('task-delete')) {
        deleteTask(taskId);
    }
});

taskList.addEventListener('change', event => {

    const target = event.target;

    const taskItem = target.closest('.task-item');

    if (!taskItem) return;

    const taskId = Number(taskItem.dataset.id);

    if (target.classList.contains('task-checkbox')) {
        toggleTask(taskId, target.checked);
    }
});

/* ===== Filters ===== */

filterButtons.forEach(button => {

    button.addEventListener('click', () => {

        filterButtons.forEach(btn => {
            btn.classList.remove('active');
        });

        button.classList.add('active');

        currentFilter = button.dataset.filter;

        updateUI();
    });
});

/* ===== Debounce ===== */

function debounce(func, delay) {

    let timeoutId;

    return (...args) => {

        clearTimeout(timeoutId);

        timeoutId = setTimeout(() => {
            func(...args);
        }, delay);
    };
}

searchInput.addEventListener(
    'input',

    debounce(event => {

        searchText = event.target.value;

        updateUI();

    }, 300)
);

/* ===== Start ===== */

loadTasks();