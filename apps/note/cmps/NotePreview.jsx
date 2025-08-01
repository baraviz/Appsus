import { NoteImg } from './NoteImg.jsx'
import { NoteTodos } from './NoteTodos.jsx'
import { NoteTxt } from './NoteTxt.jsx'

export function NotePreview(props) {
  const dynamicCmpMap = {
    NoteTxt: <NoteTxt {...props} />,
    NoteImg: <NoteImg {...props} />,
    NoteTodos: <NoteTodos {...props} />,
  }

  const{note}=props
  
  return (
    <section className='note-preview' >
      {dynamicCmpMap[note.type]}
    </section>
  )
}
