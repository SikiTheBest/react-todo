import React, { useState, useRef, useEffect } from 'react';
import TodoList from './TodoList';
import uuidv4 from 'uuid/dist/v4';

const LOCAL_STORAGE_KEY = 'todoApp.todos';

function App() {
  const [todos, setTodos] = useState([]);
  const todoNameRef = useRef();

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY, JSON.stringify(todos)));
    if(storedTodos) setTodos(storedTodos);
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  function toggleTodo(id) {
    const newTodos = [...todos];
    const todo = newTodos.find(todo => todo.id === id);
    todo.complete = !todo.complete;
    setTodos(newTodos);
  }

  function handleAddTodo(e) {
    const name = todoNameRef.current.value;
    if(name === '') return;
    setTodos(prevTodos => {
      return [...prevTodos, { id: uuidv4(), name: name, completed: false }]
    });
    todoNameRef.current.value = null;
  }

  function handleClearTodos() {
    const newTodos = todos.filter(todo => !todo.complete);
    setTodos(newTodos);
  }

  return (
    <div className="container">
      <input ref={todoNameRef} type="text" className="newTodo" />
      <div className="buttons">
        <button onClick={handleAddTodo} className="button addTodo">Add Todo</button>
        <button onClick={handleClearTodos} className="button clearTodos">Clear Completed Todos</button>
      </div>
      <TodoList todos={todos} toggleTodo={toggleTodo} />
      <div className="leftTodos">{todos.filter(todo => !todo.complete).length} left to do</div>
    </div>
  );
}

export default App;
