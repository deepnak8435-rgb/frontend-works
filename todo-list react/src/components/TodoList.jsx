import { useState } from "react";

function App() {
  // Stores what the user is currently typing
  const [input, setInput] = useState("");

  // Stores all the todo objects
  const [todos, setTodos] = useState([]);

  // Stores which filter is selected
  const [filter, setFilter] = useState("all");

  // Stores the ID of the todo currently being edited
  const [editId, setEditId] = useState(null);

  // Stores the text while editing
  const [editText, setEditText] = useState("");

  // ADD TODO
  const addTodo = () => {
    // Don't add an empty todo
    if (input.trim() === "") {
      return;
    }
    const newTodo = {
      id: Date.now(),
      text: input,
      completed: false,
    };
    // Add new todo to the array
    setTodos([...todos, newTodo]);
    // Clear input box
    setInput("");
  };
  // -------------------------
  // DELETE TODO
  // -------------------------
  const deleteTodo = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  // -------------------------
  // COMPLETE / PENDING
  // -------------------------
  const toggleTodo = (id) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          completed: !todo.completed,
        };
      }

      return todo;
    });

    setTodos(updatedTodos);
  };
  // START EDIT
  const startEdit = (todo) => {
    setEditId(todo.id);
    setEditText(todo.text);
  };
  // SAVE EDIT
  const saveEdit = () => {
    if (editText.trim() === "") {
      return;
    }
    const updatedTodos = todos.map((todo) => {
      if (todo.id === editId) {
        return {
          ...todo,
          text: editText,
        };
      }
      return todo;
    });
    setTodos(updatedTodos);
    // Exit edit mode
    setEditId(null);
    setEditText("");
  };
  // -------------------------
  // FILTER TODOS
  const filteredTodos = todos.filter((todo) => {
    if (filter === "completed") {
      return todo.completed === true;
    }
    if (filter === "pending") {
      return todo.completed === false;
    }
    return true;
  });
  return (
    <div className="app">
          {/* ADD TODO */}
      <div className="add-section">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter your todo...."/>
        <button onClick={addTodo}>Add</button>
      </div>
          {/* FILTER BUTTONS */}
      <div className="filters">
        <button onClick={() => setFilter("all")}>All</button>
        <button onClick={() => setFilter("completed")}>Completed</button>
        <button onClick={() => setFilter("pending")}>Pending</button>
      </div>
          {/* TODO LIST */}
      <div className="todo-list">
        {filteredTodos.map((todo) => (
          <div className="todo-item" key={todo.id}>
            {editId === todo.id ? (
              // EDIT MODE 
              <>
                <input
                  type="text"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                />
                <button onClick={saveEdit}>Save</button>
              </>
            ) : (// NORMAL MODE
              <>
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleTodo(todo.id)}
                />
                <span className={todo.completed ? "completed" : ""}>
                  {todo.text}
                </span>
                <button onClick={() => startEdit(todo)}>Edit</button>
                <button onClick={() => deleteTodo(todo.id)}>
                  {" "}
                  Delete{" "}
                </button>{" "}
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
export default App;
