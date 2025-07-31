import { noteService } from '../services/note.service.js'
import { NoteList } from '../cmps/NoteList.jsx'
import { AddNote } from '../cmps/AddNote.jsx'
import { Header } from '../cmps/Header.jsx'
import { Navigation } from '../cmps/Navgatin.jsx'

const { useState, useEffect } = React
const { Link } = ReactRouterDOM

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

  function onSaveNote(note) {
    noteService
      .save(note)
      .then((note) => {
        setNotes((notes) => [...notes, note])
        console.log('save')
      })

      .catch((err) => console.log(err))
  }

  // console.log(notes);

  if (!notes) return <div className='loader'>Loading...</div>
  return (
    <section className='note-index container'>
      <Header />

      <section className='main flex'>
        <Navigation />
        <section className='note-apply'>
          <AddNote onSaveNote={onSaveNote} />
          <NoteList notes={notes} />
        </section>
      </section>
    </section>
  )
}
