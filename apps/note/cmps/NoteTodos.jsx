const { useState, useEffect } = React
export function NoteTodos({ note, onSaveNote }) {
  const { info, id } = note

  function onChangeTodo(todo) {
    todo.doneAt = todo.doneAt ? null : Date.now()
    onSaveNote(id)
  }

  const { todos } = info

  return (
    <section className='note-todos'>
      <ul>
        <h1>{info.title}</h1>
        {todos.map((todo) => (
          <li key={todo.txt} className={`todo ${todo.doneAt ? 'active' : ''}`}>
            <button onClick={() => onChangeTodo(todo)}>
              {todo.doneAt ? '✔' : ''}
            </button>
            {todo.txt}
          </li>
        ))}
      </ul>
    </section>
  )
}
