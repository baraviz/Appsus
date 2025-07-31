import { NotePreview } from './NotePreview.jsx'
import { NoteTools } from './NoteTools.jsx'

export function NoteList({ notes, onRemoveNote }) {
  //   console.log(notes)

  return (
    <div>
      <ul className='note-list'>
        {notes.map((note) => (
          <li key={note.id} style={note.style}>
            <NotePreview note={note}  />
            <NoteTools note={note} onRemoveNote={onRemoveNote}/>
          </li>
        ))}
      </ul>
    </div>
  )
}
