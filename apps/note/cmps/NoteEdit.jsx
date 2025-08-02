import { utilService } from '../../../services/util.service.js'
import { noteService } from '../services/note.service.js'
import { NoteTools } from './NoteTools.jsx'
const { useParams, useNavigate } = ReactRouter
const { useState, useEffect } = React
const { useOutletContext} = ReactRouterDOM

export function NoteEdit() {
  const [note, setNote] = useState()
  const [fieldName, setFieldName] = useState()
  const { onUpdate, onRemoveNote, onSaveNote, onSetAddNote } = useOutletContext()
  const { noteId } = useParams()
  const navigate = useNavigate()
 
   

  useEffect(() => {
    if (noteId) loadNote()
  }, [])

  function loadNote() {

    noteService
      .get(noteId)
      .then((note) => {
        setNote(note)
        if (note.type === 'NoteTodos') {
          setFieldName((fieldName) => (fieldName = 'todos'))
          const todos = note.info.todos.map((todo) => todo.txt)
          note.info.todos = todos.join(',')
        } else if (note.type === 'NoteImg') setFieldName('url')
        else  setFieldName('txt')
      })
      .catch((err) => console.log('err:', err))
  }

  function handleChange({ target }) {
    const field = target.name
    let value = target.value
    setNote((prevNote) => ({
      ...prevNote,
      info: { ...prevNote.info, [field]: value },
    }))
  }

  function onUpdateNote() {
    if (note.type === 'NoteTodos') {
      note.info.todos = noteService.strToList(note.info.todos)
    }
    onUpdate(note)
    onSetAddNote()
    navigate('/note')
  }

  if (!note) return <div>loading</div>

  const date = new Date(note.createdAt)

  const day = date.getDay()
  const month = utilService.getMonthName(date)

  const { info } = note

  return (
    <section className='note-edit'>
      <form className='modal' style={note.style}>
        <div>
          <input
            className='title'
            onChange={handleChange}
            type='text'
            name='title'
            id='title'
            value={info.title}
            placeholder='Title'
          />
        </div>
        {/* {note.type === 'NoteImg' && <img src={note.url}/>} */}
        <div>
          <input
            className='text'
            onChange={handleChange}
            type='text'
            name={fieldName}
            id='txt'
            value={info[fieldName]}
          />
        </div>
        <div className='date'>
          Edit at
          <span>
            {day} {month}
          </span>
        </div>
        <div className='tools flex'>
          <NoteTools
            note={note}
            onUpdate={onUpdate}
            onRemoveNote={onRemoveNote}
            onSaveNote={onSaveNote}
          />
          <button type='button' onClick={onUpdateNote}>
            close
          </button>
        </div>
      </form>
    </section>
  )
}
