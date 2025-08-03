import { noteService } from '../services/note.service.js'

const { useState, useEffect} = React

export function NoteFilter({ filterBy, onSetFilterBy }) {
  const [filterByToEdit, setFilterByToEdit] = useState({...filterBy})
 
  
  useEffect(() => {
    onSetFilterBy(filterByToEdit)
  }, [filterByToEdit])

  function handleChange({ target }) {
    const field = target.name
    let value = target.value
    setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }))
  }

  const { txt } = filterBy
  return (
    <section className='note-header flex'>
      <div>LOGO MissKeep</div>
    <div className='search'>
      <input
        onChange={handleChange}
        type='txt'
        name='txt'
        id='txt'
        value={txt}
        placeholder='Search'
      />
      </div>
    </section>
  )
}
