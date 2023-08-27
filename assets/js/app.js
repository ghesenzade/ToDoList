let createBtn = document.querySelector(".createTodo");
let todoList = document.querySelector(".todoList");
let count = document.querySelector(".todoCount");
todoCount.innerText = 0;
let todos = [];

function todoCount(){
    let unDoneTodos = todos.filter(item => item.done === false);
    count.innerText = unDoneTodos.length;
}
todoCount();

function checkTodos() {
    todoList.innerHTML = "";
    todos.map(item=>{
        todoList.innerHTML+=`
        <li class="todoItem">
        <div class="removeIcon" id="${item.id}" onclick = "removeTodo(id)">
            <img src="assets/images/trash.svg" alt="trash">
        </div>
        <input type="checkbox" name="done" id="${item.id}" class="checkbox" onchange="finishTodo(id)">
        <input type="text" class="todoText" id= "${item.id}" value="${item.todo}" readonly/>
        <button class="edit">Edit</button>
        </li>
        `
    })
    todoCount();
}

createBtn.addEventListener('click', (e)=>{
    e.preventDefault();
    let input = document.querySelector(".todoInp");
    if (input.value.trim().length ===0 ){
        alert('Please fill in the box!')
    }else{
        const newTodo = {
            id: Math.random(),
            todo: input.value,
            done: false,
        }
        todos.push(newTodo);
    }
    input.value = "";
    checkTodos();
})

function removeTodo(todoId){
    let validation = confirm("Silirsiniz ?");
    if(validation){
        let updateTodos = todos.filter(item => item.id !== Number(todoId));
        todos = updateTodos;
    }
    checkTodos();
}

function finishTodo(id){
    let todoTexts = document.querySelectorAll(".todoText");
    todos.map(item=>{
        if(item.id ==id){
            todoTexts.forEach(texts=>{
                if(texts.id == id){
                    if(item.done){
                        item.done = false;
                        texts.classList.remove("done")
                    }else{
                        item.done = true;
                        texts.classList.add("done")
                    }
                }
            })
        }
    })
    todoCount();
}

todoList.addEventListener("click", function (e) {
    let editButton = e.target.closest(".edit");
    if (editButton) {
        let todoItem = editButton.closest(".todoItem");
        let todoText = todoItem.querySelector(".todoText");
        if (editButton.textContent === "Edit") {
            editButton.textContent = "Save";
            todoText.contentEditable = "true";
            todoText.removeAttribute("readonly");
            // todoText.focus();
        } else if (editButton.textContent === "Save") {
            editButton.textContent = "Edit";
            todoText.contentEditable = "false";
            todoText.setAttribute("readonly", "true");
        }
    }
});



