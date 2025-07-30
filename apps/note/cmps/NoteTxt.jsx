export function NoteTxt({ info,title}) {
  return (
    <section className='note-txt'>
      <h1>{title}</h1>
      <p>{info.txt}</p>
      <div className='btns'>
        <input type='color' name='color' />
        <button>delete</button>
        <button>copy</button>
      </div>
    </section>
  )
}
