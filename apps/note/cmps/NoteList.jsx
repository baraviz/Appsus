import { NotePreview } from './NotePreview.jsx'
import { NoteTools } from './NoteTools.jsx'

export function NoteList({ notes, onRemoveNote, onUpdate,onSaveNote }) {
  return (
    <div>
      <ul className='note-list'>
        {notes.map((note) => (
          <li key={note.id} style={note.style}>
            <NotePreview note={note} onUpdate={onUpdate} />
            <NoteTools note={note} onRemoveNote={onRemoveNote} onSaveNote={onSaveNote} onUpdate={onUpdate} />
          </li>
        ))}
      </ul>
    </div>
  )
}
