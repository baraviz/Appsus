import { NoteImg } from './NoteImg.jsx'
import { NoteTodos } from './NoteTodos.jsx'
import { NoteTxt } from './NoteTxt.jsx'

export function NotePreview({ note }) {
  const dynamicCmpMap = {
    NoteTxt: <NoteTxt {...note} />,
    NoteImg: <NoteImg {...note} />,
    NoteTodos: <NoteTodos {...note} />,
  }
  return (
    <section className='note-preview' >
      {dynamicCmpMap[note.type]}
    </section>
  )
}
