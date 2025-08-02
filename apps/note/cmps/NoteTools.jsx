import { noteService } from '../services/note.service.js'
const { useSearchParams, useNavigate } = ReactRouterDOM
const { useState } = React

export function NoteTools({ note, onRemoveNote, onSaveNote, onUpdate }) {
  const { info } = note
  const [mailParams, setMailParams] = useSearchParams({
    subject: info.title,
    body: info.txt,
  })
  const navigate = useNavigate()


  function onSetColor(ev) {
    note.style = { backgroundColor: ev.target.value }
    // if (noteToEdit.type === 'NoteTodos') {
    //   noteToEdit.info.todos = noteService.strToList(noteToEdit.info.todos)}
    // onUpdate(note)
    
  }

  function onCopy() {
    const copyNote = structuredClone(note)
    copyNote.id = ''
    onSaveNote(copyNote)
  }

  return (
    <section className='note-tools flex'>
      <div className='palette'>
        <img src='./assets/icons/palette.svg' alt='' />
        <input onChange={onSetColor} type='color' name='color' />
      </div>
      <img
        src='./assets/icons/delete.svg'
        onClick={() => onRemoveNote(note.id)}
      />
      <img onClick={onCopy} src='./assets/icons/copy.svg' alt='' />
      <img
        onClick={() => navigate(`/mail/compose?${mailParams}`)}
        src='./assets/icons/send.svg'
        alt=''
      />
    </section>
  )
}
