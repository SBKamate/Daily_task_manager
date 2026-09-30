let tasks = [];

const currentDate = document.getElementById("currentDate");


const today = new Date();

currentDate.textContent = today.toDateString();
function addTask() {

    const taskInput = document.getElementById("taskInput");

    const title = taskInput.value.trim();

    if (title === "") {
        alert("Please enter a task");
        return;
    }

    const task = {
        id: Date.now(),
        title: title,
        completed: false
    };

    tasks.push(task);
    saveTasks();

    taskInput.value = "";

    renderTasks();
}

const addTaskBtn = document.getElementById("addTaskBtn");

addTaskBtn.addEventListener("click", addTask);




function renderTasks() {

    const taskList = document.getElementById("taskList");

    taskList.innerHTML = "";

    tasks.forEach(function(task) {

        const taskElement = document.createElement("div");

        taskElement.className = "task-item";

        taskElement.innerHTML = `
            
            <div>
                <input 
                    type="checkbox"
                    class="task-checkbox"
                    data-id="${task.id}"
                    ${task.completed ? "checked" : ""}
                >

                <span class="${task.completed ? "completed" : ""}">
                    ${task.title}
                </span>
            </div>

            <div>
                <button 
                    class="btn btn-sm btn-warning edit-btn"
                    data-id="${task.id}">
                    Edit
                </button>

                <button 
                    class="btn btn-sm btn-danger delete-btn"
                    data-id="${task.id}">
                    Delete
                </button>
            </div>

        `;

        taskList.appendChild(taskElement);

    });
}
document.addEventListener("change", function(event) {

    if (event.target.classList.contains("task-checkbox")) {

        const id = Number(event.target.dataset.id);

        const task = tasks.find(function(task) {
            return task.id === id;
        });

        task.completed = event.target.checked;
        saveTasks();

        renderTasks();
    }

});

document.addEventListener("click", function(event) {

    if (event.target.classList.contains("delete-btn")) {

        const id = Number(event.target.dataset.id);

        tasks = tasks.filter(function(task) {
            return task.id !== id;
        });
        saveTasks();

        renderTasks();
    }

});
document.addEventListener("click", function(event) {

    if (event.target.classList.contains("edit-btn")) {

        const id = Number(event.target.dataset.id);

        const task = tasks.find(function(task) {
            return task.id === id;
        });

        const newTitle = prompt("Edit your task:", task.title);

        if (newTitle !== null && newTitle.trim() !== "") {

            task.title = newTitle.trim();
            saveTasks();

            renderTasks();
        }
    }

});
let currentFilter = "all";
function renderTasks() {

    const taskList = document.getElementById("taskList");

    taskList.innerHTML = "";

    let filteredTasks = tasks;

    if (currentFilter === "pending") {

        filteredTasks = tasks.filter(function(task) {
            return !task.completed;
        });

    }

    if (currentFilter === "completed") {

        filteredTasks = tasks.filter(function(task) {
            return task.completed;
        });

    }

    filteredTasks.forEach(function(task) {

        const taskElement = document.createElement("div");

        taskElement.className = "task-item";

        taskElement.innerHTML = `
            
            <div>
                <input 
                    type="checkbox"
                    class="task-checkbox"
                    data-id="${task.id}"
                    ${task.completed ? "checked" : ""}
                >

                <span class="${task.completed ? "completed" : ""}">
                    ${task.title}
                </span>
            </div>

            <div>
                <button 
                    class="btn btn-sm btn-warning edit-btn"
                    data-id="${task.id}">
                    Edit
                </button>

                <button 
                    class="btn btn-sm btn-danger delete-btn"
                    data-id="${task.id}">
                    Delete
                </button>
            </div>

        `;

        taskList.appendChild(taskElement);

    });
}
document.querySelectorAll(".filter-btn").forEach(function(button) {

    button.addEventListener("click", function() {

        currentFilter = button.dataset.filter;

        renderTasks();

    });

});
function saveTasks() {

    localStorage.setItem(
        "tasks",
        JSON.stringify(tasks)
    );

}
function loadTasks() {

    const savedTasks = localStorage.getItem("tasks");

    if (savedTasks) {

        tasks = JSON.parse(savedTasks);

    }

    renderTasks();
}
loadTasks();