import { showErrorMsg, showSuccessMsg } from '../../../services/event-bus.service.js'

export function NoteImg({ note }) {
const {info} = note
  if (!info.url) return showErrorMsg('Try different Url')
    
  return (
    <section>
      <img src={info.url} alt={info.title} />
      <h1>{info.title}</h1>
      <p>{info.txt}</p>
    </section>
  )
}


