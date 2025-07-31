import { mailService } from '../services/mail.service.js'
import { MailList } from '../cmps/MailList.jsx'
const { Link, Outlet } = ReactRouterDOM

const { useState, useEffect } = React

export function MailIndex() {
    const [mails, setMails] = useState([])

    useEffect(() => {
        mailService.query()
            .then((mails) => setMails(mails))
            .catch((err) => console.error('can not fetch data', err)
            )
    }, [])

    function onSaveMail(mail) {
        mailService.save(mail)
            .then(mail => setMails(mails => [mail, ...mails]))
    }

    function onDeleteMail(mailId) {
        mailService.remove(mailId)
            .then(() => setMails(mails => mails.filter(mail => mail.id !== mailId)))
            .catch(err => console.error('Could not delete mail', err))
    }

    const unreadMailsCount = mails.filter((mail) => !mail.isRead).length

    return (
        <section className='mail-index'>
            <header className='flex space-between'>
                <h1>Mail app</h1>
            </header>
            <div className='mail-layout'>
                <aside>
                    <Link to='/mail/compose'><button className='compose-btn'><img src="./assets/icons/editIcon.svg" alt="edit" />Compose</button></Link>
                    <Link to='/mail'>All ({mails.length})</Link>
                    <Link to='/mail/unread'>Unread ({unreadMailsCount})</Link>
                </aside>
                <main>
                    <MailList mails={mails} onDeleteMail={ onDeleteMail } />
                </main>
            </div>
            <Outlet context={{ onSaveMail }} />
        </section>
    )
}