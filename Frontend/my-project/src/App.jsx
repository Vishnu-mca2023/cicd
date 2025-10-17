import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  const API_URL = "http://localhost:5000/api/todos";

  // Fetch todos from backend
  useEffect(() => {
    axios
      .get(API_URL)
      .then((res) => setTodos(res.data))
      .catch((err) => console.error("❌ Error fetching todos:", err));
  }, []);

  // Add new todo
  const addTodo = async () => {
    if (!newTodo.trim()) return;
    try {
      const res = await axios.post(API_URL, { text: newTodo });
      setTodos([...todos, res.data]);
      setNewTodo("");
    } catch (err) {
      console.error("❌ Error adding todo:", err);
    }
  };

  // Delete todo
  const deleteTodo = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setTodos(todos.filter((t) => t._id !== id));
    } catch (err) {
      console.error("❌ Error deleting todo:", err);
    }
  };

  return (
    <div style={{ padding: "30px", maxWidth: "500px", margin: "auto" }}>
      <h1>📝 Todo App</h1>
      <div>
        <input
          type="text"
          placeholder="Enter new task..."
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <button onClick={addTodo}>Add</button>
      </div>

      <ul>
        {todos.map((todo) => (
          <li key={todo._id}>
            {todo.text}{" "}
            <button onClick={() => deleteTodo(todo._id)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
