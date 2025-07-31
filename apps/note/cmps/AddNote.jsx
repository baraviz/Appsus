import { noteService } from '../services/note.service.js'
const { useState } = React

export function AddNote({onSaveNote}) {
  const [isAddNote, setIsAddNote] = useState(false)
  const [placeholder, setPlaceholder] = useState('Take a note')
  const [noteToEdit, setNoteToEdit] = useState(noteService.getEmptyNote())
  // console.log(noteToEdit)

  function handleChange({ target }) {
    const field = target.name
    let value = target.value
    setNoteToEdit((prevNote) => ({ ...prevNote,info: { ...prevNote.info, [field]: value }, }))
  }

  function onOpenNote() {
    setIsAddNote((isAddNote) => !isAddNote)
  }

  function onSave(ev) {
    ev.preventDefault()
    onOpenNote()
    onSaveNote(noteToEdit)
  }

const {info} = noteToEdit
  return (
    <section className='add-note'>
      {!isAddNote && (
        <React.Fragment>
        <input
          onClick={onOpenNote} type='text'
          name=''
          id=''
          placeholder='Take a note'
        />
        <button>img</button>
        </React.Fragment>
      )}
      {isAddNote && (
        <section className='NoteType flex '>
          <form>
            <input onChange={handleChange} type='text' name='title' id='title'placeholder='Title'/>
            <input onChange={handleChange}type='text'name='txt' id='txt'placeholder={placeholder}/>
            <button onClick={onSave}>close</button>
          </form>
        </section>
      )}
    </section>
  )
}
