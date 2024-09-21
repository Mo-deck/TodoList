const todoForm = document.querySelector('#todo-form')
const todoInput = document.querySelector('#todo-input')
const todoList = document.querySelector('#todo-list')


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
        todoInput.value = "";

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

}