const todos = localStorage.getItem("todos")
  ? JSON.parse(localStorage.getItem("todos"))
  : [];

function todoItem(item, index) {
  const todoElement = document.createElement("li");
  todoElement.className =
    "list-group-item d-flex justify-content-between align-items-center border-start-0 border-top-0 border-end-0 border-bottom rounded-0 mb-2";
  todoElement.innerHTML = `<div class="d-flex align-items-center">
  <input class="form-check-input ms-2" type="checkbox" onInput="handleChecked(${index})" ${
    item.isDone && "checked"
  } />
  ${item.isDone ? `<s>${item.text}</s>` : item.text}
</div>
<a href="#!" data-mdb-toggle="tooltip" title="Remove item" onClick="removeTodo(${index})">
  <i class="bi bi-x"></i>
</a>`;

  return todoElement;
}

function removeTodo(index) {
  todos.splice(index, 1);
  renderTodos();
}

function handleChecked(index) {
  const currentTodoItem = todos[index];
  todos[index] = {
    text: currentTodoItem.text,
    isDone: !currentTodoItem.isDone,
  };
  renderTodos();
}

function renderTodos() {
  if (todos.length) {
    const todosUL = document.createElement("ul");
    todosUL.className = "list-group mb-0 p-0";

    todos.forEach((item, index) => {
      todosUL.append(todoItem(item, index));
    });

    document.getElementById("todos").innerHTML = todosUL.outerHTML;
  }

  window.localStorage.setItem("todos", JSON.stringify(todos));
}

document.forms[0].addEventListener('formdata', console.log)

document.forms[0].addEventListener("submit", (e) => {
  e.preventDefault();
  const todoInput = e.target.elements.todoInput;
  if (todoInput.value) {
    todos.unshift({
      text: todoInput.value,
      isDone: false,
    });
    renderTodos();
    todoInput.value = "";
  } else {
    alert("لطفا متن تسک را بنویسید!");
  }
});

renderTodos();
