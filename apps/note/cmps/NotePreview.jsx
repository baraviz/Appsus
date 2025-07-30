import { NoteImg } from './NoteImg.jsx'
import { NoteTodos } from './NoteTodos.jsx'
import { NoteTxt } from './NoteTxt.jsx'

export function NotePreview({ note }) {
  const dynamicCmpMap = {
    NoteTxt: <NoteTxt {...note} />,
    NoteImg: <NoteImg {...note} />,
    NoteTodos: <NoteTodos {...note} />,
  }
  const { style, isPinned } = note

  return (
    <section className='note-preview' style={isPinned ? style: {backgroundColor: 'none'}}>
      {dynamicCmpMap[note.type]}
    </section>
  )
}
