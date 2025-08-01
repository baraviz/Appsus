
const { useSearchParams, useNavigate } = ReactRouterDOM

export function NoteTools({ note, onRemoveNote, onSaveNote, onUpdate }) {
  const { info } = note
  const [mailParams, setMailParams] = useSearchParams({ subject: info.title, body: info.txt })
  const navigate = useNavigate()


  function onSetColor({ target }) {
    note.style = { backgroundColor: target.value }
    onUpdate(note)
  }

  function onCopy() {
    const copyNote = structuredClone(note)
    copyNote.id = ''
    onSaveNote(copyNote)
  }

  return (
    <section className='note-tools flex'>
      <div className='palette'>
        <img src='./assets/icons/palette.svg' alt='' />
        <input onChange={onSetColor} type='color' name='color' />
      </div>
      <img
        src='./assets/icons/delete.svg'
        onClick={() => onRemoveNote(note.id)}
      />
      <img onClick={onCopy} src='./assets/icons/copy.svg' alt='' />
      <img onClick={()=>navigate(`/mail/compose?${mailParams}`)} src='./assets/icons/send.svg' alt='' />
    </section>
  )
}
