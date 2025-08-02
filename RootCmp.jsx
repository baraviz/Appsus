const { Route, Routes } = ReactRouterDOM
const Router = ReactRouterDOM.HashRouter

import { AppHeader } from './cmps/AppHeader.jsx'
import { UserMsg } from './cmps/UserMsg.jsx'
import { About } from './pages/About.jsx'
import { Home } from './pages/Home.jsx'

// === MAIL ===
import { MailIndex } from './apps/mail/pages/MailIndex.jsx'
import { MailCompose } from './apps/mail/cmps/MailCompose.jsx'

// === NOTE ===
import { NoteIndex } from './apps/note/pages/NoteIndex.jsx'
import { NoteEdit } from './apps/note/cmps/NoteEdit.jsx'

export function RootCmp() {
  return (
    <Router>
      <section className='root-cmp'>
        <AppHeader />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/mail' element={<MailIndex />}>
            <Route path='/mail/compose' element={<MailCompose />} />
          </Route>
          <Route path='/note' element={<NoteIndex />}>
            <Route path='/note/:noteId' element={<NoteEdit />} />
          </Route>
        </Routes>
        <UserMsg />
      </section>
    </Router>
  )
}
