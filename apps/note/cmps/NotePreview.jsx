import { NoteTxt } from "./NoteTxt.jsx"

export function NotePreview({ note }) {

  const dynamicCmpMap = {
    NoteTxt: <NoteTxt {...note} />,
    // NoteImg: <NoteImg {...props} />,
    // NoteTodos: <NoteTodos {...props} />,
  }

  return dynamicCmpMap[note.type]
}
 