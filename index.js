// Get HTML elements
const todoInput = document.getElementById("todoInput");
const addBtn = document.getElementById("addBtn");
const todoList = document.getElementById("todoList");

const allBtn = document.getElementById("allBtn");
const pendingBtn = document.getElementById("pendingBtn");
const completedBtn = document.getElementById("completedBtn");



// Array to store todos
let todos = [];
// Current filter
let currentFilter = "all";

// ADD TODO
addBtn.addEventListener("click", function () {
  const text = todoInput.value.trim();
  // Don't add empty task
  if (text === "") {
    return;}
  const newTodo = {
    id: Date.now(),
    text: text,
    completed: false};

  // Add todo to array
  todos.push(newTodo);

  // Clear input
  todoInput.value = "";

  // Display todos
  displayTodos();});
// --------------------------------
// DISPLAY TODOS
// --------------------------------
function displayTodos() {
  // Clear existing list
  todoList.innerHTML = "";
  // Filter todos
  let filteredTodos = todos.filter(function (todo) {
  if (currentFilter === "completed") {
      return todo.completed === true; }
    if (currentFilter === "pending") {
      return todo.completed === false; }
    return true;});

  // Create HTML for each todo
  filteredTodos.forEach(function (todo) {
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo-item");
    // Checkbox
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = todo.completed;
    checkbox.addEventListener("change", function () {
      toggleTodo(todo.id);
    });
    // Todo text
    const textSpan = document.createElement("span");
    textSpan.textContent = todo.text;
    textSpan.classList.add("todo-text");
    if (todo.completed) {
      textSpan.classList.add("completed");}
    // Edit button
    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit button";
    editBtn.addEventListener("click", function () {
      editTodo(todo.id);
    });
    // Delete button
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener("click", function () {
      deleteTodo(todo.id);
    });
    // Add everything to todoDiv
    todoDiv.appendChild(checkbox);
    todoDiv.appendChild(textSpan);
    todoDiv.appendChild(editBtn);
    todoDiv.appendChild(deleteBtn);
    // Add todoDiv to todoList
    todoList.appendChild(todoDiv);
  });
}
// --------------------------------
// COMPLETE / PENDING
// --------------------------------

function toggleTodo(id) {
  todos = todos.map(function (todo) {
    if (todo.id === id) {
      return {...todo,completed: !todo.completed  };
    }
    return todo;
  });
  displayTodos();}

// DELETE TODO
function deleteTodo(id) {
  todos = todos.filter(function (todo) {
  return todo.id !== id;
  });
  displayTodos();
}
// EDIT TODO
// --------------------------------

function editTodo(id) {
  const todo = todos.find(function (todo) {
    return todo.id === id;
  });
  const newText = prompt(
    "Edit your task:",
    todo.text);
  if (newText === null || newText.trim() === "") {
    return;
  }
  todos = todos.map(function (todo) {
    if (todo.id === id) {
      return {...todo,text: newText.trim()};
    }
     return todo;
  });
  displayTodos();
}
// FILTER BUTTONS
allBtn.addEventListener("click", function () {
  currentFilter = "all";
  displayTodos();
});
pendingBtn.addEventListener("click", function () {
  currentFilter = "pending";
  displayTodos();
});
completedBtn.addEventListener("click", function () {
  currentFilter = "completed";
  displayTodos();
});