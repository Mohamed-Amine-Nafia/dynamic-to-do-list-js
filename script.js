document.addEventListener("DOMContentLoaded", function () {
  const addButton = document.getElementById("add-task-btn");
  const taskInput = document.getElementById("task-input");
  const taskList = document.getElementById("task-list");

  // Load tasks from Local Storage and populate the list
  function loadTasks() {
    const storedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    storedTasks.forEach((taskText) => addTask(taskText, false));
  }

  // Add a new task to the DOM and optionally save to Local Storage
  function addTask(taskText, save = true) {
    // If called from button/input, get value from input
    if (typeof taskText !== "string") {
      taskText = taskInput.value.trim();
    }

    if (taskText === "") {
      alert("Please enter a task.");
      return;
    }

    const li = document.createElement("li");
    li.textContent = taskText;

    const removeBtn = document.createElement("button");
    removeBtn.textContent = "Remove";
    removeBtn.classList.add("remove-btn");

    removeBtn.onclick = function () {
      taskList.removeChild(li);
      // Remove from Local Storage
      let storedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
      storedTasks = storedTasks.filter((task) => task !== taskText);
      localStorage.setItem("tasks", JSON.stringify(storedTasks));
    };

    li.appendChild(removeBtn);
    taskList.appendChild(li);

    // Save to Local Storage if needed
    if (save) {
      const storedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
      storedTasks.push(taskText);
      localStorage.setItem("tasks", JSON.stringify(storedTasks));
    }

    taskInput.value = "";
  }

  addButton.addEventListener("click", () => addTask());

  taskInput.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      addTask();
    }
  });

  // Load tasks on page load
  loadTasks();
});
