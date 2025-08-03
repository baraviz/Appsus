import { mailService } from '../../mail/services/mail.service.js'
const { useSearchParams, useOutletContext, useNavigate } = ReactRouterDOM
const { useState, useEffect } = React

export function MailCompose() {
    const [searchParams, setSearchParams] = useSearchParams()
    const { onSaveMail } = useOutletContext() || {}
    const navigate = useNavigate()

    const [mailToEdit, setMailToEdit] = useState(() => ({
        ...mailService.getEmptyMail(),
        to: searchParams.get('to') || '',
        subject: searchParams.get('subject') || '',
        body: searchParams.get('body') || ''
    }))

    useEffect(() => {
        setMailToEdit(prev => ({
            ...prev,
            to: searchParams.get('to') || '',
            subject: searchParams.get('subject') || '',
            body: searchParams.get('body') || ''
        }))
    }, [searchParams])

    function handleChange({ target }) {
        const { name, value } = target
        setMailToEdit(prev => ({ ...prev, [name]: value }))
        setSearchParams({
            ...Object.fromEntries([...searchParams]),
            [name]: value
        })
    }


    function onSend(ev) {
        ev.preventDefault()
        const newMail = {
            ...mailToEdit,
            createdAt: Date.now(),
            isRead: false,
            sentAt: Date.now(),
        }
        onSaveMail(newMail)
        setMailToEdit(mailService.getEmptyMail())
        setTimeout(() => {
            setSearchParams({})
            navigate('/mail')
        }, 101)
    }

    function onCancel() {
        const newMail = {
            ...mailToEdit,
            createdAt: Date.now(),
        }
        onSaveMail(newMail)
        setMailToEdit(mailService.getEmptyMail())
        setTimeout(() => {
            setSearchParams({})
            navigate('/mail')
        }, 101)
    }

    return (
        <div>
            <div className='dialog-backdrop'></div>
            <section className='MailType flex'>
                <h1>New Message</h1>
                <form onSubmit={onSend}>
                    <input
                        onChange={handleChange}
                        type='text'
                        name='to'
                        id='to'
                        placeholder='To'
                        value={mailToEdit.to}
                        autoFocus
                    />
                    <input
                        onChange={handleChange}
                        type='text'
                        name='subject'
                        id='subject'
                        placeholder='Subject'
                        value={mailToEdit.subject}
                    />
                    <input
                        onChange={handleChange}
                        type='text'
                        name='body'
                        id='body'
                        placeholder='Body'
                        value={mailToEdit.body}
                    />
                    <button type='submit' className='send'>Send</button>
                    <button type='button' onClick={onCancel} className='cancel'>Cancel</button>
                </form>
            </section>
        </div>
    )
}