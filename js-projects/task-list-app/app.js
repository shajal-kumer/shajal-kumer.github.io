// Define UI vars
const form = document.querySelector('#task-form');
const taskInput = document.querySelector('#task');
const filter = document.querySelector('#filter');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-task');


// Load all event listeners
loadEventListeenrs();

// Load all event listeners
function loadEventListeenrs() {
    // Get task
    document.addEventListener('DOMContentLoaded', getTasks);
    // Add Task
    form.addEventListener('submit', addTask);
    // Remove Task
    taskList.addEventListener('click', removeTask);
    // Clear Task
    clearBtn.addEventListener('click', clearTasks);
    // Filter Task
    filter.addEventListener('keyup', filterTask);

}
// getTasks
function getTasks() {
    let tasks;
    if(localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task) {
         // Create li
        const li = document.createElement('li');
        // Add Class
        li.className = 'collection-item'
        // Create text node and appent it to li
        li.appendChild(document.createTextNode(task));
        // Create new link element
        const link = document.createElement('a');
        // Add Class
        link.className = 'delete-item secondary-content';
        // Add icon html
        link.innerHTML = '<i class="fa fa-remove"></i>';
        // Apend the link to the li
        li.appendChild(link);
        // Append li to ul
        taskList.appendChild(li);
        });
}
// Add Task
function addTask(e) {
    if(taskInput.value === '') {
        alert('Add a task');
    } else {

    // Create li
    const li = document.createElement('li');
    // Add Class
    li.className = 'collection-item'
    // Create text node and appent it to li
    li.appendChild(document.createTextNode(taskInput.value));
    // Create new link element
    const link = document.createElement('a');
    // Add Class
    link.className = 'delete-item secondary-content';
    // Add icon html
    link.innerHTML = '<i class="fa fa-remove"></i>';
    // Apend the link to the li
    li.appendChild(link);
    // Append li to ul
    taskList.appendChild(li);

    // Local Storage
    storeTaskInLocalStorage(taskInput.value);

    // Clear input
    taskInput.value = '';

}

    e.preventDefault();
}


// storeTaskInLocalStorage
function storeTaskInLocalStorage(task) {
    let tasks;
    if(localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.push(task);

    localStorage.setItem('tasks', JSON.stringify(tasks));
    

}
// Remove Task
function removeTask(e) {
    if(e.target.parentElement.classList.contains('delete-item')) {
        if(confirm('Are You sure?'))  {
            e.target.parentElement.parentElement.remove();

            // Remove from LS
            removeTaskFromLocalStorage(e.target.parentElement.parentElement);
        }
            
    }
    
}

// removeTaskFromLocalStorage

function removeTaskFromLocalStorage(taskItem) {
    let tasks;
    if(localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function (task, index) { 
        if(taskItem.textContent === task) {
            tasks.splice(index, 1);
        }
     });

     localStorage.setItem('tasks', JSON.stringify(tasks));

}
// Clear Tasks
function clearTasks() {
    // taskList.innerHTML = '';

    // Faster 
    while(taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);
    }
    // Note
    // InnerHTML VS removeChild

    // Clear from LS
    clearTaskFromLocalStorage();
}

//clearTaskFromLocalStorage
function clearTaskFromLocalStorage() {
    localStorage.clear();
}

// filterTask
function filterTask(e) {
    const text = e.target.value.toLowerCase();

    document.querySelectorAll('.collection-item').forEach(function(task) {
        const item = task.textContent.toLowerCase();
        // const item = task.textContent.toLocaleLowerCase();
        if(item.indexOf(text) != -1) {
            task.style.display = 'block';
        } else {
            task.style.display = 'none';
        }
        
    });
    
}



