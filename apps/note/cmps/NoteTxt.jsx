export function NoteTxt({ info,style}) {
  
  return (
    <section className='note-txt'style={style}>
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
