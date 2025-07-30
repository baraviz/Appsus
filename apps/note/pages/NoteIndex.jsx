import { noteService } from '../../../services/note.service.js'
import { NoteList } from '../cmps/NoteList.jsx'

const { useState, useEffect } = React
const { Link, useSearchParams } = ReactRouterDOM

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
      <header>
        logo
      </header>
      <main>
        <div className='navigation'>
        <Link to='/note'>Notes</Link>
        {/* <Link>Reminders</Link>
        <Link>Archive</Link>
        <Link>Bim</Link> */}
        </div>
        <NoteList notes={notes} />
      </main>
    </section>
  )
}
