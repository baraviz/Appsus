import { mailService } from '../../mail/services/mail.service.js'
const { useState } = React
const { useOutletContext } = ReactRouterDOM

export function MailCompose() {
    console.log('Hi Im Here');

    const [isAddMail, setIsAddMail] = useState(false)
    const [mailToEdit, setMailToEdit] = useState(mailService.getEmptyMail())
    const { onSaveMail } = useOutletContext() || {}

    function handleChange({ target }) {
        const field = target.name
        let value = target.value
        setMailToEdit(prevMail => ({ ...prevMail, [field]: value }))
    }

    function onOpenMail() {
        setIsAddMail(isAddMail => !isAddMail)
    }

    function onSave(ev) {
        ev.preventDefault()
        onOpenMail()
        const newMail = {
            ...mailToEdit,
            createdAt: Date.now(),
            isRead: false,
        }
        onSaveMail(newMail)
        setMailToEdit({ subject: '', body: '' })
    }

    return (
        <div>
            <div className='dialog-backdrop'></div>
            <section className='new-mail-dialog'>
                {!isAddMail && (
                    <input
                        onClick={onOpenMail}
                        type='text'
                        name=''
                        id=''
                        placeholder='Compose a mail...'
                        readOnly
                    />
                )}
                {isAddMail && (
                    <section className='MailType flex'>
                        <form onSubmit={onSave}>
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
                            <button type='submit'>Send</button>
                            <button type='button' onClick={onOpenMail}>Cancel</button>
                        </form>
                    </section>
                )}
            </section>
        </div>
    )
}
