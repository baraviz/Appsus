import { noteService } from '../../../services/note.service.js'
import { NoteList } from '../cmps/NoteList.jsx'

const { useState, useEffect } = React

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

  //   console.log(notes);

  if (!notes) return <div className='loader'>Loading...</div>
  return (
    <section className='container'>
      <header>Notes header</header>
      <main>
        <NoteList notes={notes} />
      </main>
    </section>
  )
}
