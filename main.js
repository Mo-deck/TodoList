const todoForm = document.querySelector('#todo-form')
const todoInput = document.querySelector('#todo-input')
const todoList = document.querySelector('#todo-list')


document.addEventListener("DOMContentLoaded", loadTasks)

function loadTasks(){

    //getting all tasks from localstroge
    const tasks = getTasksFromLocalStroge()
    tasks.forEach(task => {
        addTaskToDom(task)
    });
}

//Adding submit

todoForm.addEventListener("submit", addTask)

function addTask(e){
    e.preventDefault()

    const taskText = todoInput.value .trim()

    if(taskText !== ''){

        const task = {
            id : Date.now(),
            text: taskText,
            completed : false
        }
        //adding to thr dom
        addTaskToDom(task)
        saveTaskToLocalStroge(task)

        todoInput.value = " ";
    } 
}


function addTaskToDom(task){

    const li = document.createElement('li')
    li.className = 'todo-item ${task.completed ? "completed" : ""}'
    li.dataset.id = task.id
    li.innerHTML = ` <input type="checkbox" class= "complete-checkbox">
                <span class="task">${task.text}</span>
                <button class="edit-btn">Edit</button>
                <button class="delete-btn">Delete</button>`           
    todoList.appendChild(li);

    attachEventListeners(li, task)

}

function attachEventListeners(li, task){

    const deleteBtn = li.querySelector('.delete-btn')
    const editBtn  = li.querySelector('.edit-btn')

    deleteBtn.addEventListener("click", function(){
         handleDelete(task.id,li)  
    })

    editBtn.addEventListener("click", function(){
        handleEdit(task.id, li)
    })
}


function handleDelete(id, li){

        let tasks = getTasksFromLocalStroge()

        tasks = tasks.filter(task => task.id != id)

        localStorage.setItem('tasks', JSON.stringify(tasks))
        li.remove()
        


} 

function handleEdit(id,li){

    const taskSpan = li.querySelector(".task")
    console.log(taskSpan.textContent);

    const newTaskText = prompt("Edit your tasks:", taskSpan.textContent)
    
    if(newTaskText !== null && newTaskText.trim() !== ""){

        //update the local stroge
        updateTask(id, newTaskText);
        //update the DOM
        taskSpan.textContent = newTaskText;
    }
}


function updateTask(id, newTaskText){

        const tasks = getTasksFromLocalStroge()
        const task = tasks.find(task => task.id ==  id)
        if(task){
            task.text = newTaskText;
            localStorage.setItem('tasks', JSON.stringify(tasks))
        }

}

function saveTaskToLocalStroge(task){

    const oldTasks = getTasksFromLocalStroge()

    oldTasks.push(task)

    localStorage.setItem("tasks", JSON.stringify(oldTasks))
}

function getTasksFromLocalStroge(){
    const oldTasks = JSON.parse(localStorage.getItem("tasks")) || []
    return oldTasks
}