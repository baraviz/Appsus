import { mailService } from '../services/mail.service.js'
import { MailList } from '../cmps/MailList.jsx'

const { useState, useEffect } = React

export function MailIndex() {
    const [mails, setMails] = useState([])

    useEffect(() => {
        mailService.query().then(setMails)
    }, [])

    return (
        <section className='container'>
            <h1>Mail app</h1>
            <MailList mails={mails} />
        </section>
    )
}