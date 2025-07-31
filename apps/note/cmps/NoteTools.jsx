export function NoteTools({ note, onRemoveNote }) {
  return (
    <section className='note-tools flex'>
      {/* <input type='color' name='color' /> */}
      {/* <button onClick={()=>onRemoveNote(note.id)}>Delete</button> */}
      <div className='palette'>
        <img src='../assets/icons/palette.svg' alt='' />
        <input type='color' name='color' />
      </div>
      <img
        src='../assets/icons/delete.svg'
        onClick={() => onRemoveNote(note.id)}
      />
      <img src='../assets/icons/copy.svg' alt='' />
    </section>
  )
}
