import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'

const NOTE_KEY = 'noteDB'
_createNotes()

export const noteService = {
  query,
  get,
  remove,
  save,
}

function query() {
  return storageService.query(NOTE_KEY)
}

function get(noteId) {
  return storageService.get(NOTE_KEY, noteId).then(_setNextPrevNoteId)
}

function remove(noteId) {
  return storageService.remove(NOTE_KEY, noteId)
}

function save(note) {
  if (note.id) {
    return storageService.put(NOTE_KEY, note)
  } else {
    return storageService.post(NOTE_KEY, note)
  }
}

function _createNotes() {
  let notes = utilService.loadFromStorage(NOTE_KEY)
  if (!notes || !notes.length) {
    notes = [
      {
        id: 'n101',
        createdAt: 1112222,
        type: 'NoteTxt',
        title:'Fullstack',
        isPinned: true,
        style: { backgroundColor: '#00d' },
        info: { txt: 'Fullstack Me Baby!' },
      },
      {
        id: 'n102',
        createdAt: 1112223,
        type: 'NoteImg',
        title:'some image',
        isPinned: false,
        info: { url: 'http://some-img/me', title: 'Bobi and Me' },
        style: { backgroundColor: '#00d' },
      },
      {
        id: 'n103',
        createdAt: 1112224,
        type: 'NoteTodos',
        isPinned: false,
        info: {
          title: 'Get my stuff together',
          todos: [
            { txt: 'Driving license', doneAt: null },
            { txt: 'Coding power', doneAt: 187111111 },
          ],
        },
      },
      {
        id: 'n104',
        createdAt: 1115555,
        type: 'NoteTxt',
        isPinned: true,
         title:'',
        info: { txt: 'Remember to call mom!' },
        style: { backgroundColor: '#ffeb3b' },
      },
      {
        id: 'n105',
        createdAt: 1118888,
        type: 'NoteTodos',
        isPinned: false,
        info: {
          title: 'Shopping List',
          todos: [
            { txt: 'Milk', doneAt: null },
            { txt: 'Eggs', doneAt: 1119999 },
            { txt: 'Bread', doneAt: null },
          ],
        },
      },
    ]
    utilService.saveToStorage(NOTE_KEY, notes)
  }
}
