import { mailService, loggedinUser } from '../services/mail.service.js'
import { MailList } from '../cmps/MailList.jsx'
import { MailDetails } from '../cmps/MailDetails.jsx'
const { Link, NavLink, Outlet, useParams, useLocation, useSearchParams } = ReactRouterDOM

const { useState, useEffect } = React

export function MailIndex() {
    const [mails, setMails] = useState([])
    const [searchParams, setSearchParams] = useSearchParams()
    const params = useParams()
    const location = useLocation()

    useEffect(() => {
        mailService.query()
            .then((mails) => {
                setMails(mails)
            })
            .catch((err) => console.error('can not fetch data', err)
            )
    }, [params])

    // === FILTER ===
    let mailsToShow = mails

    if (location.search.includes('search')) {
        const txt = searchParams.get('search') || ''
        mailsToShow = mails.filter(mail =>
            mail.subject.toLowerCase().includes(txt) ||
            mail.body.toLowerCase().includes(txt) ||
            mail.to.toLowerCase().includes(txt))
    } else if (location.pathname.includes('/sent')) {
        mailsToShow = mails.filter(mail => mail.from === loggedinUser.email)
    } else if (location.pathname.includes('/unread')) {
        mailsToShow = mails.filter(mail => !mail.isRead && !mail.removedAt)
    } else if (location.pathname.includes('/trash')) {
        mailsToShow = mails.filter(mail => mail.removedAt)
    } else if (location.pathname.includes('/draft')) {
        mailsToShow = mails.filter(mail => mail.isDraft && !mail.removedAt)
    } else if (location.pathname.includes('/inbox')) {
        mailsToShow = mails.filter(mail => !mail.removedAt && mail.from !== loggedinUser.email)
    } else {
        mailsToShow = mails.filter(mail => !mail.removedAt && mail.from !== loggedinUser.email)
    }


    // === SAVE MAILE (sent to MailCompose.jsx cmp trough Outlet context)
    function onSaveMail(mail) {
        mailService.save(mail)
            .then(mail => setMails(mails => [mail, ...mails]))
    }

    // === BTNS (delete mail, read toggle)

    function onDeleteMail(mailId) {
        const mailToDelete = mails.filter(mail => mail.id === mailId)
        console.log('deleting...', mailToDelete);
        if (!mailToDelete.removedAt) {
            setMails(mails =>
                mails.map(mail =>
                    mail.id === mailId ? { ...mail, removedAt: Date.now() } : mail
                )
            )
        }
        else {
            mailService.remove(mailId)
                .then(() => setMails(mails => mails.filter(mail => mail.id !== mailId)))
                .catch(err => console.error('Could not delete mail', err))
        }
    }

    function onToggleRead(mailId) {
        setMails(mails =>
            mails.map(mail =>
                mail.id === mailId ? { ...mail, isRead: !mail.isRead } : mail
            )
        )
    }

    // === ADD INPUT VALUE TO PARAMS
    function handleChange({ target }) {
        const { name, value } = target
        setSearchParams({
            ...Object.fromEntries([...searchParams]),
            [name]: value
        })
    }



    const unreadMailsCount = mails.filter((mail) => !mail.isRead).length
    const sentMailsCount = mails.filter((mail) => mail.from === loggedinUser.email).length
    const starredMailsCount = mails.filter((mail) => mail.isStarred).length
    const trashMailsCount = mails.filter((mail) => mail.removedAt).length
    const draftMailsCount = mails.filter((mail) => !mail.sentAt).length

    return (
        <section className='mail-index'>
            <header className='flex mail-header'>
                <img src="./assets/icons/Gmail_icon.png" alt="" className='gmail-icon' />
                <h1>Mail app</h1>
                <div className='search-bar'>
                    <img src="./assets/icons/search.svg" alt="" />
                    <input
                        name='search'
                        type="text"
                        placeholder='Search mail'
                        className='input-field'
                        onChange={handleChange}
                    />
                </div>
            </header>
            <div className='mail-layout'>
                <aside>
                    <Link to='/mail/compose'>
                        <button className='compose-btn'>
                            <img src="./assets/icons/editIcon.svg" alt="edit" />
                            Compose
                        </button>
                    </Link>
                    <NavLink to='/mail/inbox' className='mail-folder'>
                        <img src="./assets/icons/inbox.svg" alt="" />
                        Inbox ({mails.length})
                    </NavLink>
                    <NavLink to='/mail/unread' className='mail-folder'>
                        <img src="./assets/icons/mark_mail_as_unread.svg" alt="" />
                        Unread ({unreadMailsCount})
                    </NavLink>
                    <NavLink to='/mail/sent' className='mail-folder'>
                        <img src="./assets/icons/sent.svg" alt="" />
                        Sent ({sentMailsCount})
                    </NavLink>
                    <NavLink to='/mail/starred' className='mail-folder'>
                        <img src="./assets/icons/starred.svg" alt="" />
                        Starred ({starredMailsCount})
                    </NavLink>
                    <NavLink to='/mail/trash' className='mail-folder'>
                        <img src="./assets/icons/delete.svg" alt="" />
                        Trash ({trashMailsCount})
                    </NavLink>
                    <NavLink to='/mail/draft' className='mail-folder'>
                        <img src="./assets/icons/draft.svg" alt="" />
                        Draft ({draftMailsCount})
                    </NavLink>
                </aside>
                <main>
                    {!location.pathname.includes('/details') ?
                        <MailList
                            mails={mailsToShow}
                            onDeleteMail={onDeleteMail}
                            onToggleRead={onToggleRead}
                        /> :
                        <MailDetails />}
                </main>
            </div>
            {params.id ? '' : <Outlet context={{ mails, onSaveMail }} />}
        </section>
    )
}