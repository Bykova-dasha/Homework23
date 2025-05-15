const API_URL = 'http://localhost:5000/api/todos';

async function fetchTodos() {
    const res = await fetch(API_URL);
    const todos = await res.json();

    const list = document.getElementById('todo-list');
    list.innerHTML = '';
    todos.forEach(todo => {
        const li = document.createElement('li');
        li.innerHTML = `
            <strong>${todo.title}</strong><br/>
            ${todo.description || ''}<br/>
            Статус: ${todo.completed ? '✅' : '⏳'}<br/>
            <button onclick="completeTodo('${todo._id}')">Завершити</button>
            <button onclick="deleteTodo('${todo._id}')">Видалити</button>
        `;
        list.appendChild(li);
    });
}
async function addTodo() {
    const title = document.getElementById('title').value.trim();
    const description = document.getElementById('description').value.trim();
    if (!title) return;

    await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, description }),
    });
    document.getElementById('title').value = '';
    document.getElementById('description').value = '';
    fetchTodos();
}
async function deleteTodo(id) {
    await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    fetchTodos();
}

async function completeTodo(id) {
    await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completed: true }),
    });
    fetchTodos();
}

document.addEventListener('DOMContentLoaded', fetchTodos);
