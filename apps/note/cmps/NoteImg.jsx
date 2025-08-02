import { showErrorMsg, showSuccessMsg } from '../../../services/event-bus.service.js'
const { useState, useRef, useEffect} = React
export function NoteImg({ note }) {
  const {info} = note
  const [isLoad, setIsLoad] = useState(false)
 useEffect(()=>{
  const img =new Image()
  img.src=`${info.url}`

   img.onload = ()=>{
    // console.log('hi');
    setIsLoad(isLoad=>!isLoad)

 }},[])

// console.log(isLoad);

  if (!isLoad) return <div>lading img...</div>
  return (
    <section>
      {isLoad && <img src={info.url} alt={info.title} />}
      <h1>{info.title}</h1>
      <p>{info.txt}</p>
    </section>
  )
}

