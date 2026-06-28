// Select Elements
const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const searchTask = document.getElementById("searchTask");
const totalTask = document.getElementById("totalTask");
const completedTask = document.getElementById("completedTask");
const pendingTask = document.getElementById("pendingTask");
const clearAll = document.getElementById("clearAll");
const themeBtn = document.getElementById("themeBtn");

// Load Data
window.onload = function () {
    loadTasks();
    loadTheme();
};

// Add Task
addBtn.addEventListener("click", addTask);
taskInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
        addTask();
    }
});

function addTask() {
    const text = taskInput.value.trim();
    if (text === "") {
        alert("Please enter a task.");
        return;
    }
    createTask(text, false);
    taskInput.value = "";
    saveTasks();
    updateStats();
}

// Create Task
function createTask(text, completed) {
    const li = document.createElement("li");
    const span = document.createElement("span");
    span.className = "task-text";
    span.innerText = text;
    if (completed) {
        span.classList.add("completed");
    }
    const actions = document.createElement("div");
    actions.className = "actions";

    // Complete Button
    const completeBtn = document.createElement("button");
    completeBtn.className = "complete-btn";
    completeBtn.innerHTML = '<i class="fa-solid fa-check"></i>';
    completeBtn.onclick = function () {
        span.classList.toggle("completed");
        saveTasks();
        updateStats();
    };

    // Edit Button
    const editBtn = document.createElement("button");
    editBtn.className = "edit-btn";
    editBtn.innerHTML = '<i class="fa-solid fa-pen"></i>';
    editBtn.onclick = function () {
        let newTask = prompt("Edit your task", span.innerText);
        if (newTask !== null && newTask.trim() !== "") {
            span.innerText = newTask;
            saveTasks();
        }

    };
    // Delete Button
    const deleteBtn = document.createElement("button");
    deleteBtn.className = "delete-btn";
    deleteBtn.innerHTML = '<i class="fa-solid fa-trash"></i>';
    deleteBtn.onclick = function () {
        if (confirm("Delete this task?")) {
            li.remove();
            saveTasks();
            updateStats();
        }
    };
    actions.appendChild(completeBtn);
    actions.appendChild(editBtn);
    actions.appendChild(deleteBtn);
    li.appendChild(span);
    li.appendChild(actions);
    taskList.appendChild(li);
}

// Search
searchTask.addEventListener("keyup", function () {
    let value = searchTask.value.toLowerCase();
    const tasks = document.querySelectorAll("#taskList li");
    tasks.forEach(task => {
        let text = task.querySelector(".task-text").innerText.toLowerCase();
        if (text.includes(value)) {
            task.style.display = "flex";
        } else {
            task.style.display = "none";
        }
    });
});

// Statistics
function updateStats() {
    const total = document.querySelectorAll("#taskList li").length;
    const completed = document.querySelectorAll(".completed").length;
    const pending = total - completed;
    totalTask.innerText = total;
    completedTask.innerText = completed;
    pendingTask.innerText = pending;
}
// Save Local Storage
function saveTasks() {
    const tasks = [];
    document.querySelectorAll("#taskList li").forEach(function (task) {
        tasks.push({
            text: task.querySelector(".task-text").innerText,
            completed: task.querySelector(".task-text").classList.contains("completed")
        });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}
// Load Local Storage
function loadTasks() {

    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    tasks.forEach(function (task) {

        createTask(task.text, task.completed);

    });

    updateStats();

}

// Clear All
clearAll.addEventListener("click", function () {

    if (confirm("Delete all tasks?")) {

        taskList.innerHTML = "";

        localStorage.removeItem("tasks");

        updateStats();

    }

});

// Dark Mode
themeBtn.addEventListener("click", function () {
    document.body.classList.toggle("dark");
    if (document.body.classList.contains("dark")) {
        themeBtn.innerHTML = '<i class="fa-solid fa-sun"></i>';
        localStorage.setItem("theme", "dark");
    } else {
        themeBtn.innerHTML = '<i class="fa-solid fa-moon"></i>';
        localStorage.setItem("theme", "light");
    }
});
function loadTheme() {
    const theme = localStorage.getItem("theme");
    if (theme === "dark") {
        document.body.classList.add("dark");
        themeBtn.innerHTML = '<i class="fa-solid fa-sun"></i>';
    } else {
        document.body.classList.remove("dark");
        themeBtn.innerHTML = '<i class="fa-solid fa-moon"></i>';
    }
}