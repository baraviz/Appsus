import { noteService } from '../services/note.service.js'
const { useState, useEffect } = React
const { useLocation, Link, useSearchParams, useNavigate } = ReactRouterDOM

export function AddNote({ onSaveNote }) {
  const [placeholder, setPlaceholder] = useState('')
  const [nameField, setNameField] = useState('txt')
  const [searchParams, setSearchParams] = useSearchParams()
  const [noteToEdit, setNoteToEdit] = useState(noteService.getEmptyNote())
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    noteToEdit.info.title = searchParams.get('title') || ''
    console.log(searchParams.get('title') || ' ')

    noteToEdit.info[nameField] = searchParams.get('txtN') || ''
    console.log(noteToEdit.info[nameField])
    noteToEdit.type = 'NoteTxt'
    
  }, [searchParams])

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
    if (
      (!info.title && !info.txt) ||
      (!info.title && !info.url) ||
      (!info.title && !info.todos)
    )
      return navigate('/note')
    if (noteToEdit.type === 'NoteTodos') {
      noteToEdit.info.todos = noteService.strToList(noteToEdit.info.todos)
    }
    onSaveNote(noteToEdit)

    setNoteToEdit(noteService.getEmptyNote())
    navigate('/note')
  }

  return (
    <section className='add-note'>
      {!location.pathname.includes('/add') && (
        <Link to='/note/add'>
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
            <img
              src='./assets/icons/image.svg'
              onClick={() => onOpenNote('NoteImg', 'Enter url', 'url')}
            />
            <img
              src='./assets/icons/checkdBox.svg'
              onClick={() =>
                onOpenNote('NoteTodos', 'Enter list coma separated', 'todos')
              }
            />
          </section>
        </Link>
      )}
      {location.pathname.includes('/add') && (
        <section className='note-type'>
          <form onSubmit={onSave}>
            <div >
              <input className='title'
                onChange={handleChange}
                type='text'
                name='title'
                id='title'
                placeholder='Title'
                value={info.title}
              />
            </div>
            <div className='text'> 
              <input
                onChange={handleChange}
                type='text'
                name={nameField}
                id='txt'
                placeholder={placeholder}
                value={info[nameField]}
              />
            </div>
            <button onClick={onSave}>close</button>
          </form>
        </section>
      )}
    </section>
  )
}
