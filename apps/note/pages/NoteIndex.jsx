import { noteService } from "../../../services/note.service.js"

noteService
export function NoteIndex() {

    noteService.query()
    .then(notes=>console.log(notes))



    return <section className="container">Notes app</section>
}
