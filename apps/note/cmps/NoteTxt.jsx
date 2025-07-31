export function NoteTxt({ info}) {
  
  return (
    <section className='note-txt'>
      <h1>{info.title}</h1>
      <p>{info.txt}</p>
    </section>
  )
}
