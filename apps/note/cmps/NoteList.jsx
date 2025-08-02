import { NotePreview } from './NotePreview.jsx'
import { NoteTools } from './NoteTools.jsx'

const { useNavigate } = ReactRouter

export function NoteList({ notes, onRemoveNote, onUpdate, onSaveNote }) {
  const navigate = useNavigate()



  return (
    <div>
      <ul className='note-list'>
        {notes.map((note) => (
   <li onClick={() => {navigate(`/note/${note.id}`)}}
            style={note.style}
            key={note.id} className="false"
          >
            <NotePreview note={note} onUpdate={onUpdate} />
            <div onClick={(ev)=>{ev.stopPropagation()}}> 
            <NoteTools 
              note={note}
              onRemoveNote={onRemoveNote}
              onSaveNote={onSaveNote}
              onUpdate={onUpdate}
            />
            </div>
          </li>
          
        ))}
      </ul>
    </div>
  )
}
