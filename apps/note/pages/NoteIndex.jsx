import { noteService } from '../services/note.service.js'
import { NoteList } from '../cmps/NoteList.jsx'
import { AddNote } from '../cmps/AddNote.jsx'
import { Navigation } from '../cmps/Navgatin.jsx'
import { showErrorMsg, showSuccessMsg } from '../../../services/event-bus.service.js'
import { NoteFilter } from '../cmps/NoteFilter.jsx'

const { useState, useEffect } = React
const { useSearchParams } = ReactRouterDOM

export function NoteIndex() {
  const [notes, setNotes] = useState(null)
  const [searchParams, setSearchParams] = useSearchParams()
  const [filterBy, setFilterBy] = useState(noteService.getFilterFromSearchParams(searchParams))


  useEffect(() => {
    setSearchParams(noteService.getTruthyValues(filterBy))
    loadNotes()
  }, [filterBy])

  function loadNotes() {
    noteService.query(filterBy)
      .then((notes) => setNotes(notes))
      .catch((err) => {
        console.log('err:', err)
        showErrorMsg('Cannot get notes!')
      })
  }

  function onUpdate(note) {
    noteService.save(note).then((note) => loadNotes())
  }

  function onSaveNote(note) {
    noteService.save(note)
      .then((note) => {
        setNotes((notes) => [note, ...notes])
        showSuccessMsg('saved')
      })
      .catch((err) => console.log(err))
  }

  function onRemoveNote(noteId) { 
    noteService.remove(noteId)
      .then(() => {
        setNotes((prevNotes) => prevNotes.filter((note) => note.id !== noteId))
        showSuccessMsg(`Note (${noteId}) removed successfully!`)
      })
      .catch((err) => {
        console.log('Problem removing note:', err)
        showErrorMsg('Problem removing note!')
      })
  }


   function onSetFilterBy(filterByToEdit) {
        setFilterBy({ ...filterByToEdit })
    }

  if (!notes) return <div className='loader'>Loading...</div>
  const pinnedList = notes.filter((note) => note.isPinned)  
  const notPinnedList = notes.filter((note) => !note.isPinned)

  return (
    <section className='note-index container'>
      <NoteFilter filterBy={filterBy} onSetFilterBy={onSetFilterBy} />

      <section className='main flex'>
        <Navigation />
        <section className='note-apply'>
          <AddNote onSaveNote={onSaveNote} />
          {!!pinnedList.length && (
            <React.Fragment>
              <h2>Pinned</h2>
              <NoteList
                notes={pinnedList}
                onRemoveNote={onRemoveNote}
                onUpdate={onUpdate}
                onSaveNote={onSaveNote}
              />
            </React.Fragment>
          )}
          {notPinnedList && (
            <React.Fragment>
             {!!pinnedList.length && <h2>Others</h2>}
              <NoteList
                notes={notPinnedList}
                onRemoveNote={onRemoveNote}
                onUpdate={onUpdate}
                onSaveNote={onSaveNote}
              />
            </React.Fragment>
          )}
        </section>
      </section>
    </section>
  )
}
