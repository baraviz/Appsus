import { NotePreview } from './NotePreview.jsx'
import { NoteTools } from './NoteTools.jsx'

const { useState } = React

export function NoteList({ notes, onRemoveNote, onSaveNote }) {

  //   console.log(notes)

  return (
    <div>
      <ul className='note-list'>
        {notes.map((note) => (
          <li key={note.id} style={note.style}>
            <NotePreview note={note} onSaveNote={onSaveNote} />
            <NoteTools note={note} onRemoveNote={onRemoveNote}/>
          </li>
        ))}
      </ul>
    </div>
  )
}
