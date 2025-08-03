import { noteService } from '../services/note.service.js'

const { useState, useEffect} = React

export function NoteFilter({ filterBy, onSetFilterBy }) {
  const [filterByToEdit, setFilterByToEdit] = useState({...filterBy})
  // const onSetFilterByDebounce = useRef(noteService.debounce(onSetFilterBy, 500)).current
  
  useEffect(() => {
    onSetFilterBy(filterByToEdit)
    //  onSetFilterByDebounce(filterByToEdit)
  }, [filterByToEdit])

  function handleChange({ target }) {
    const field = target.name
    let value = target.value
    setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }))
  }

  const { txt } = filterBy
  return (
    <section className='note-header flex space-between'>
      <img src="./assets/imgs/keep-logo.png" alt="" />

      <input
        onChange={handleChange}
        type='txt'
        name='txt'
        id='txt'
        value={txt}
        placeholder='Search'
      />
    </section>
  )
}
