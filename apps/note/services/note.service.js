// note service
import { storageService } from '../../../services/async-storage.service.js'
import { utilService } from '../../../services/util.service.js'

const NOTE_KEY = 'noteDB'
_createNotes()

export const noteService = {
  query,
  get,
  remove,
  save,
  getEmptyNote,
  debounce,
  getFilterFromSearchParams,
  getTruthyValues,
  strToList,

}

function query(filterBy = {}) {
  return storageService.query(NOTE_KEY).then((notes) => {
    if (filterBy.txt) {
      const regExp = new RegExp(filterBy.txt, 'i')
      notes = notes.filter((note) => {
        return regExp.test(note.info.title) || regExp.test(note.info.txt)
      })
    }
    return notes
  })
}

function get(noteId) {
  return storageService.get(NOTE_KEY, noteId)
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

function getEmptyNote() {
  return {
    createdAt: Date.now(),
    type: '',
    style: { backgroundColor: 'none' },
    info: { title: '' },
  }
}
function getFilterFromSearchParams(searchParams) {
    const txt = searchParams.get('txt') || ''
    // const minSpeed = searchParams.get('minSpeed') || ''
    return {
        txt,
    }
}

function getTruthyValues(obj) {
    const newObj = {}
    for (const key in obj) {
        const value = obj[key]
        if (value) {
            newObj[key] = value
        }
    }
    return newObj
}

function debounce(func, delay) {
  let timeoutId
  return (...args) => {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => {
      func(...args)
    }, delay)
  }
}

  function strToList(str) {
    const todos = str.split(',')
    const newTodos = todos.map((todo) => ({ txt: todo }))
   
    return newTodos
  }

function _createNotes() {
  let notes = utilService.loadFromStorage(NOTE_KEY)
  if (!notes || !notes.length) {
    notes = [
      {
        id: 'n101',
        createdAt: 1112222,
        type: 'NoteTxt',
        title: 'Fullstack',
        isPinned: true,
        style: { backgroundColor: '#baf074ff' },
        info: { title: 'Fullstack', txt: 'Fullstack Me Baby!' },
      },
      {
        id: 'n102',
        createdAt: 1112223,
        type: 'NoteImg',
        isPinned: false,
        info: { url: 'http://unsplash.it/460/340/?1', title: 'Bobi and Me' },
        style: { backgroundColor: '#f074a6ff' },
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
        info: { title: '', txt: 'Remember to call mom!' },
        style: { backgroundColor: '#f0e474ff' },
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

      {
        id: 'n106',
        createdAt: 1112223,
        type: 'NoteImg',
        isPinned: false,
        info: { url: 'http://unsplash.it/460/340/?2', title: 'Loli and Me' },
        style: { backgroundColor: '#878ef3ff' },
      },
    ]
    utilService.saveToStorage(NOTE_KEY, notes)
  }
}
