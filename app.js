const apiUrl = 'http://localhost:3000/tasks';

async function fetchTasks() {
    const response = await fetch(apiUrl);
    const tasks = await response.json();
    displayTasks(tasks);
}

function displayTasks(tasks) {
    const taskList = document.getElementById('task-list');
    taskList.innerHTML = '';
    tasks.forEach(task => {
        const taskItem = document.createElement('li');
        taskItem.className = 'task-item';
        taskItem.innerHTML = `
            <span>${task.title} - ${task.dueDate}</span>
            <div>
                <button onclick="editTask('${task._id}')">Edit</button>
                <button onclick="deleteTask('${task._id}')">Delete</button>
            </div>
        `;
        taskList.appendChild(taskItem);
    });
}

async function addTask() {
    const title = document.getElementById('task-title').value;
    const description = document.getElementById('task-desc').value;
    const dueDate = document.getElementById('task-date').value;

    const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title, description, dueDate })
    });
    const newTask = await response.json();
    fetchTasks();
}

async function deleteTask(id) {
    await fetch(`${apiUrl}/${id}`, {
        method: 'DELETE'
    });
    fetchTasks();
}

async function editTask(id) {
    const newTitle = prompt("Enter new title:");
    const newDescription = prompt("Enter new description:");
    const newDueDate = prompt("Enter new due date:");

    await fetch(`${apiUrl}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title: newTitle, description: newDescription, dueDate: newDueDate })
    });
    fetchTasks();
}

fetchTasks();
