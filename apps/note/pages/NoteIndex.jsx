
import { noteService } from '../services/note.service.js'
import { NoteList } from '../cmps/NoteList.jsx'
import { AddNote } from '../cmps/AddNote.jsx'

const { useState, useEffect } = React
const { Link} = ReactRouterDOM

noteService
export function NoteIndex() {
  const [notes, setNotes] = useState(null)

  useEffect(() => {
    loadNotes()
  }, [])

  function loadNotes() {
    noteService
      .query()
      .then((notes) => setNotes(notes))
      .catch((err) => {
        console.log('err:', err)
        showErrorMsg('Cannot get notes!')
      })
  }

  function onSaveNote(note){
    noteService.save(note)
    .then(note=>setNotes(notes=>[...notes,note]))
  }

    // console.log(notes);

  if (!notes) return <div className='loader'>Loading...</div>
  return (
    <section className='container'>
      <header>
      </header>
      <main>
        < AddNote onSaveNote={onSaveNote}/>
        <NoteList notes={notes} />
      </main>
    </section>
  )
}
