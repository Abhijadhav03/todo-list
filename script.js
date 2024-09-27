const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

// Load tasks from localStorage on page load
window.onload = function () {
    loadTasks();
};

function addTask() {
    if (inputBox.value === '') {
        alert("You must write something!");
    } else {
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;

        let span = document.createElement("span");
        span.innerHTML = "\u00d7"; // Unicode for "×" symbol (delete)
        li.appendChild(span);

        listContainer.appendChild(li);
        saveTasks(); 
        inputBox.value = "";  

        saveTaskListeners();
    }
}


function saveTaskListeners() {
    const listItems = document.querySelectorAll('#list-container li');
    listItems.forEach(item => {
        item.addEventListener('click', function () {
            item.classList.toggle('checked');
            saveTasks();
        });
    });

    const deleteButtons = document.querySelectorAll('#list-container li span');
    deleteButtons.forEach(btn => {
        
        btn.addEventListener('click', function () {
            btn.parentElement.remove();
            saveTasks();
        });
    });
}


function saveTasks() {
    const tasks = [];
    const listItems = document.querySelectorAll('#list-container li');
    listItems.forEach(item => {
        const task = {
            text: item.firstChild.textContent,
            isChecked: item.classList.contains('checked')
        };
        tasks.push(task);
    });
    localStorage.setItem("tasks", JSON.stringify(tasks)); 
}


function loadTasks() {
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
        const tasks = JSON.parse(savedTasks); 
        tasks.forEach(task => {
            let li = document.createElement("li");
            li.innerHTML = task.text;

            if (task.isChecked) {
                li.classList.add('checked');   }

            let span = document.createElement("span");
            span.innerHTML = "\u00d7"; 
            li.appendChild(span);

            listContainer.appendChild(li);
        });
        saveTaskListeners(); 
    }
}

inputBox.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
        addTask();
    }
});
