export function NoteTxt({ note}) {
  const{info}= note
  return (
    <section className='note-txt'>
      <h1>{info.title}</h1>
      <p>{info.txt}</p>
    </section>
  )
}
