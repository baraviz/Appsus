export function NoteTools({note,onRemoveNote}) {
  return (
    <section className='note-tools'>
      <input type='color' name='color' />
      <button onClick={()=>onRemoveNote(note.id)}>Delete</button>
      <button>copy</button>
    </section>
  )
}
