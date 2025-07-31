export function NoteTools({ note, onRemoveNote, onSaveNote, onUpdate }) {
  function onSetColor({ target }) {
    note.style = { backgroundColor: target.value }
    onUpdate(note)
  }

  function onCopy(){     
    const copyNote = structuredClone(note)
    copyNote.id = ''
    onSaveNote(copyNote)
  }

  return (
    <section className='note-tools flex'>
      <div className='palette'>
        <img src='../assets/icons/palette.svg' alt='' />
        <input onChange={onSetColor} type='color' name='color' />
      </div>
      <img
        src='../assets/icons/delete.svg'
        onClick={() => onRemoveNote(note.id)}
      />
      <img onClick={onCopy}
        src='../assets/icons/copy.svg'
        alt=''
        
      />
    </section>
  )
}
