import React, { useState, useEffect } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import { v4 as uuidv4 } from "uuid";

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const todoString = localStorage.getItem("todos");
    if (todoString) {
      const todos = JSON.parse(todoString);
      setTodos(todos);
    }
  }, []);

  const saveTOLS = (newTodos) => {
    localStorage.setItem("todos", JSON.stringify(newTodos));
  };

  const handleEdit = (e, id) => {
    const t = todos.find((i) => i.id === id);
    setTodo(t.todo);
    const newTodos = todos.filter((item) => item.id !== id);
    setTodos(newTodos);
    saveTOLS(newTodos);
  };

  const handleDelete = (e, id) => {
    const newTodos = todos.filter((item) => item.id !== id);
    setTodos(newTodos);
    saveTOLS(newTodos);
  };

  const handleAdd = () => {
    const newTodos = [...todos, { id: uuidv4(), todo, isCompleted: false }];
    setTodos(newTodos);
    setTodo("");
    saveTOLS(newTodos);
  };

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const handleCheckbox = (e) => {
    const id = e.target.name;
    const index = todos.findIndex((item) => item.id === id);
    const newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
    saveTOLS(newTodos);
  };

  return (
    <>
      <Navbar />
      <div className="container my-5 mx-auto rounded-xl p-5 bg-purple-100 min-h-[80vh]">
        <div className="addTodo my-5">
          <h2 className="text-lg font-bold">Add a Todo</h2>
          <input
            onChange={handleChange}
            value={todo}
            type="text"
            className="w-1/2"
          />
          <button
            onClick={handleAdd}
            className="bg-purple-400 hover:bg-purple-950 p-2 py-1 text-sm font-bold text-white rounded-md mx-6"
          >
            Save
          </button>
        </div>
        <h2 className="text-lg font-bold">Your Todos</h2>
        <div className="todos">
          {todos.length === 0 ? (
            <div className="m-5">No Todos to display</div>
          ) : (
            todos.map((item) => (
              <TodoItem
                key={item.id}
                item={item}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
                handleCheckbox={handleCheckbox}
              />
            ))
          )}
        </div>
      </div>
    </>
  );
}

function TodoItem({ item, handleEdit, handleDelete, handleCheckbox }) {
  return (
    <div className="todo flex w-1/4 my-3 justify-between">
      <div className="flex gap-5">
        <input
          name={item.id}
          onChange={handleCheckbox}
          type="checkbox"
          checked={item.isCompleted}
        />
        <div className={item.isCompleted ? "line-through" : ""}>
          {item.todo}
        </div>
      </div>
      <div className="buttons flex h-full">
        <button
          onClick={(e) => handleEdit(e, item.id)}
          className="bg-purple-400 hover:bg-purple-950 p-2 py-1 text-sm font-bold text-white rounded-md mx-1"
        >
          Edit
        </button>
        <button
          onClick={(e) => handleDelete(e, item.id)}
          className="bg-purple-400 hover:bg-purple-950 p-2 py-1 text-sm font-bold text-white rounded-md mx-1"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default App;
