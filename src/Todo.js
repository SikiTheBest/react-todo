import React from 'react'

export default function Todo({ todo, toggleTodo }) {

  function handleTodoClick() {
    toggleTodo(todo.id);
  };

  return (
    <div className="todo">
      <label>
        <input type="checkbox" checked={todo.complete} onChange={handleTodoClick} />
        <span className="todoName">{todo.name}</span>
      </label>
    </div>
  )
}
