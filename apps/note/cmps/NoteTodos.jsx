const { useState } = React

export function NoteTodos({ note, onUpdate }) {
  const { info, id } = note
  const { todos } = info

  const [noteEd, setNote] = useState(note)

  function onChangeTodo(todo) {
    todo.doneAt = todo.doneAt ? null : Date.now()
    onUpdate(note)
  }

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
