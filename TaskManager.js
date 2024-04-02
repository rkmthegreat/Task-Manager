const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
function renderTasks() {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';

    const deleteAllAnchor = document.createElement('a');
    deleteAllAnchor.href = '#';
    deleteAllAnchor.textContent = tasks.length > 0 ? 'Delete All' : '';
    deleteAllAnchor.addEventListener('click', function (e) {
        e.preventDefault();
        deleteAllTasks();
    });
    const deleteAllContainer = document.createElement('li');
    deleteAllContainer.appendChild(deleteAllAnchor);
    taskList.appendChild(deleteAllContainer);

    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span class="task-text ${task.completed ? 'completed' : ''}">${task.text}</span>
            <button onclick="removeTask(${index})">Remove</button>
            <button onclick="editTask(${index})">Edit</button>
        `;
        taskList.appendChild(li);
    });
}
function addTask() {
    const taskInput = document.getElementById('taskInput');
    const text = taskInput.value.trim();
    if (text !== '') {
        const currentDate = new Date().toLocaleString();
        tasks.push({ text: `${text} - ${currentDate}`, completed: false });
        localStorage.setItem('tasks', JSON.stringify(tasks));
        renderTasks();
        taskInput.value = '';
        const deleteAllAnchor = document.querySelector('.delete-all-checkbox a');
        deleteAllAnchor.textContent = 'Delete All';
    }
}
function removeTask(index) {
    tasks.splice(index, 1);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
}
function editTask(index) {
    const newText = prompt("Enter the new task text:");
    if (newText !== null && newText.trim() !== "") {
        tasks[index].text = newText.trim();
        localStorage.setItem('tasks', JSON.stringify(tasks));
        renderTasks();
    }
}
function deleteAllTasks() {
    localStorage.removeItem('tasks');
    tasks.length = 0;
    renderTasks();
}
renderTasks();
const taskInput = document.getElementById('taskInput');
taskInput.addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
        addTask();
    }
});