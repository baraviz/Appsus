import { noteService } from '../services/note.service.js'
const { useState } = React

export function AddNote({ onSaveNote }) {
  const [isAddNote, setIsAddNote] = useState(false)
  const [placeholder, setPlaceholder] = useState('')
  const [nameField, setNameField] = useState('txt')
  const [noteToEdit, setNoteToEdit] = useState(noteService.getEmptyNote())
 

  function handleChange({ target }) {
    const field = target.name
    let value = target.value
    setNoteToEdit((prevNote) => ({
       ...prevNote,info: { ...prevNote.info, [field]: value },
    }))
  }

  function onOpenNote(type, placeholder, name) {
    setNoteToEdit((prev) => ({ ...prev, type }))
    setNameField(name)
    setPlaceholder(placeholder)
    setIsAddNote((isAddNote) => !isAddNote)
  }

  function onSave(ev) {
    ev.preventDefault()
    onOpenNote()
    if (noteToEdit.type === 'NoteTodos') {
      noteToEdit.info.todos = strToList(noteToEdit.info.todos)
    }
    
    onSaveNote(noteToEdit)
    setNoteToEdit(noteService.getEmptyNote())
  }

  function strToList(str) {
    const todos = str.split(',')
    const newTodos = todos.map((todo) => ({ txt: todo }))
    console.log(newTodos)

    return newTodos
  }

  return (
    <section className='add-note'>
      {!isAddNote && (
        <React.Fragment>
          <input
            onClick={() => onOpenNote('NoteTxt', 'Take a note', 'txt')}
            type='text'
            name='text'
            id='text'
            placeholder='Take a note'
          />
          <button onClick={() => onOpenNote('NoteImg', 'Enter url', 'url')}>
            img
          </button>
          <button
            onClick={() =>
              onOpenNote('NoteTodos', 'Enter list coma separated', 'todos')
            }
          >
            list
          </button>
        </React.Fragment>
      )}
      {isAddNote && (
        <section className='NoteType flex '>
          <form>
            <input
              onChange={handleChange}
              type='text'
              name='title'
              id='title'
              placeholder='Title'
            />
            <input
              onChange={handleChange}
              type='text'
              name={nameField}
              id='txt'
              placeholder={placeholder}
            />
            <button onClick={onSave}>close</button>
          </form>
        </section>
      )}
    </section>
  )
}
