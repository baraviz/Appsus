import { noteService } from '../services/note.service.js'
const { useState } = React
const {useLocation, Link}=ReactRouterDOM

export function AddNote({ onSaveNote }) {
  
  const [placeholder, setPlaceholder] = useState('')
  const [nameField, setNameField] = useState('txt')
  const [noteToEdit, setNoteToEdit] = useState(noteService.getEmptyNote())

  const location= useLocation()

  const { info } = noteToEdit
  function handleChange({ target }) {
    const field = target.name
    let value = target.value
    setNoteToEdit((prevNote) => ({
      ...prevNote,
      info: { ...prevNote.info, [field]: value },
    }))
  }

  function onOpenNote(type, placeholder, name) {
    setNoteToEdit((prev) => ({ ...prev, type }))
    setNameField(name)
    setPlaceholder(placeholder)
  }

  function onSave(ev) {
    ev.preventDefault()
    onOpenNote()
    if (!info.title && (!info.txt || !info.url || !info.todos)) return
    if (noteToEdit.type === 'NoteTodos') {
      noteToEdit.info.todos = noteService.strToList(noteToEdit.info.todos)
    }
    onSaveNote(noteToEdit)
    setNoteToEdit(noteService.getEmptyNote())
  }



  return (
    <section className='add-note'>
      {!location.pathname.includes('/add') && (
        <Link to='/note/add'>
        {/* <React.Fragment> */}
          <section className='select'>
          <div>
          <input
            onClick={() => onOpenNote('NoteTxt', 'Take a note', 'txt')}
            type='text'
            name='text'
            id='text'
            placeholder='Take a note'
          />
          </div>
           <img src='./assets/icons/image.svg'  onClick={() => onOpenNote('NoteImg', 'Enter url', 'url')} />
            <img src='./assets/icons/checkdBox.svg'  onClick={() =>onOpenNote('NoteTodos', 'Enter list coma separated', 'todos') } />
          </section>
        {/* </React.Fragment> */}
        </Link>
      )}
      {location.pathname.includes('/add') && (
        <section className='NoteType flex '>
          <form onSubmit={onSave}>
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
          <Link to='/note'> <button type='button'>close</button></Link> 
          </form>
        </section>
      )}
    </section>
  )
}
