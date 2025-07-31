const { useState } = React

export function NoteImg({ note }) {
const {info} = note
  if (!info.url) return <div>Try different Url</div>
  return (
    <section>
      <img src={info.url} alt={info.title} />
      <h1>{info.title}</h1>
      <p>{info.txt}</p>
    </section>
  )
}


