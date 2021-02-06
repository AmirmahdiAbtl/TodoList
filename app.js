const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const todoFilter = document.querySelector(".filter-todo");

todoButton.addEventListener("click",todo);
todoList.addEventListener("click",deleteCheck);
todoFilter.addEventListener("click",filterTag);
document.addEventListener("DOMContentLoaded",LSAddedToPage);

function todo(event){
    event.preventDefault();

    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    const newTodo = document.createElement("li");
    newTodo.innerText = todoInput.value;
    todoDiv.appendChild(newTodo);

    LS(todoInput.value);

    const completeBTN = document.createElement("button");
    completeBTN.innerHTML = "<i class='fas fa-check'></i>";
    completeBTN.classList.add("complete-btn");
    todoDiv.appendChild(completeBTN);
    const trashBTN = document.createElement("button");
    trashBTN.innerHTML = "<i class='fas fa-trash'></i>" ;
    trashBTN.classList.add("trash-btn");
    todoDiv.appendChild(trashBTN);

    todoList.append(todoDiv);
    todoInput.value = "";
}
function deleteCheck(event){
    if(event.target.classList[0]=="trash-btn"){
        const parent = event.target.parentElement;
        parent.classList.add("fall");
        removeLocal(parent);
        parent.addEventListener("transitionend",()=>{
            parent.remove();
        })
    }
    else if(event.target.classList[0]=="complete-btn"){
        event.target.parentElement.classList.toggle("completed");
    }
}
function filterTag(event){
    const todos = todoList.childNodes;
    todos.forEach(function(todo){
        switch(event.target.value){
            case "All":
                todo.style.display = "flex";
                break;
            case "completed":
                if(!todo.classList.contains("completed")){
                    todo.style.display = "none";
                }else{
                    todo.style.disply = "flex";
                }
                break;
            case "uncompleted":
                if(todo.classList.contains("completed")){
                    todo.style.display = "none";
                }else{
                    todo.style.display = "flex";
                }
                break;
        }
    })
}
function LS(todo){
    let todos;
    if(localStorage.getItem("todos") === null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem("todos"))
    }
    todos.push(todo);
    localStorage.setItem("todos",JSON.stringify(todos));
}
function LSAddedToPage(){
    let todos;
    if(localStorage.getItem("todos") === null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem("todos"))
    }
    todos.forEach(function (todo){
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todo");
        const newTodo = document.createElement("li");
        newTodo.innerText = todo;
        todoDiv.appendChild(newTodo);
        const completeBTN = document.createElement("button");
        completeBTN.innerHTML = "<i class='fas fa-check'></i>";
        completeBTN.classList.add("complete-btn");
        todoDiv.appendChild(completeBTN);
        const trashBTN = document.createElement("button");
        trashBTN.innerHTML = "<i class='fas fa-trash'></i>" ;
        trashBTN.classList.add("trash-btn");
        todoDiv.appendChild(trashBTN);
        todoList.append(todoDiv);
    })
}
function removeLocal(todo){
    let todos;
    if(localStorage.getItem("todos") === null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem("todos"))
    }
    const index = todo.childNodes[0].innerText;
    todos.splice(todos.indexOf(index),1);
    localStorage.setItem("todos",JSON.stringify(todos));
}