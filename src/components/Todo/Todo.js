import React, { useState, useEffect } from "react"; 
import "./Todo.css";

const TodoApp = ({ onLogout, isAdmin }) => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  useEffect(() => {
    const storedTodos = localStorage.getItem("todos"); 
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []); 

 
  const handleAddTodo = () => {
    if (newTodo.trim()) { 
      const updatedTodos = [...todos, { text: newTodo, completed: false }]; 
      setTodos(updatedTodos); 
      localStorage.setItem("todos", JSON.stringify(updatedTodos)); 
      setNewTodo("");
    }
  };

 
  const handleToggleComplete = (index) => {
    const updatedTodos = todos.map((todo, i) =>
      i === index ? { ...todo, completed: !todo.completed } : todo
    ); 
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos)); 
  };

   const handleRemoveTodo = (index) => {
    const updatedTodos = todos.filter((_, i) => i !== index);
    setTodos(updatedTodos); 
    localStorage.setItem("todos", JSON.stringify(updatedTodos)); 
  };

  return (
    <div className="todo-container">
      <h2>{isAdmin ? "Admin Todo App" : "User Todo App"}</h2>

    
      <input
        type="text"
        placeholder="Add a new todo..."
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)} 
      />
      <button onClick={handleAddTodo}>Add Todo</button>

      {isAdmin ? (
        <ul>
          {todos.map((todo, index) => (
            <li key={index} className={`todo ${todo.completed ? "completed" : ""}`}>
              <div className="list">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => handleToggleComplete(index)}
                />
                <span> {todo.text}</span>
                
                <button onClick={() => handleRemoveTodo(index)}>Remove</button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>Todo list is hidden for non-admin users.</p>
      )}
      <button onClick={onLogout}>Logout</button> 
    </div>
  );
};

export default TodoApp;
