import { NotePreview } from './NotePreview.jsx'

export function NoteList({ notes }) {
  //   console.log(notes)

  return (
    <div>
      <ul className='note-list'>
        {notes.map((note) => (
          <li key={note.id}>
            <NotePreview note={note} />
          </li>
        ))}
      </ul>
    </div>
  )
}
