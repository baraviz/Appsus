import { mailService } from '../services/mail.service.js'
import { MailList } from '../cmps/MailList.jsx'
const { Link } = ReactRouterDOM

const { useState, useEffect } = React

export function MailIndex() {
    const [mails, setMails] = useState([])

    useEffect(() => {
        mailService.query()
            .then((mails) => setMails(mails))
            .catch((err) => console.error('can not fetch data', err)
            )
    }, [])

    return (
        <section className='container'>
            <header>
                <h1>Mail app</h1>
                <Link to='/mail/compose'>Compose</Link>
            </header>
            <MailList mails={mails} />
        </section>
    )
}