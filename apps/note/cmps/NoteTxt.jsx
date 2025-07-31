export function NoteTxt({ info}) {
  
  return (
    <section className='note-txt'>
      <h1>{info.title}</h1>
      <p>{info.txt}</p>
      <div className='btns'>
        <input type='color' name='color' />
        <button>delete</button>
        <button>copy</button>
      </div>
    </section>
  )
}
