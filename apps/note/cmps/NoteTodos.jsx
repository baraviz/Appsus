// const { useState } = React

export function NoteTodos({ note, onUpdate }) {
  const { info} = note
  const { todos } = info

  // const [noteEd, setNote] = useState(note)

  function onChangeTodo(ev,todo) {
    ev.stopPropagation()
    todo.doneAt = todo.doneAt ? null : Date.now()
    onUpdate(note)
  }


  return (
    <section className='note-todos'>
      <ul>
        <h1>{info.title}</h1>
        {todos.map((todo) => (
          <li key={todo.txt} className={`todo ${todo.doneAt ? 'active' : ''}` }>
        <div>  {todo.doneAt &&  <img src='./assets/icons/checkdBox.svg'  onClick={(ev) =>{onChangeTodo(ev,todo)}} />}
          {!todo.doneAt &&  <img src='./assets/icons/blankcheck.svg' onClick={(ev) =>{onChangeTodo(ev,todo)}}  />}</div>
           <div>{todo.txt}</div> 
          </li>
        ))}
      </ul>
    </section>
  )
}
