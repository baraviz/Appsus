import { utilService } from '../services/util.service.js'
const { Link } = ReactRouterDOM


export function MailPreview({ mail, onDeleteMail, onToggleRead, onToggleStar }) {

    const { subject, body } = mail

    function getMailDate(ts) {
        if (!ts) return ''
        const d = new Date(ts)
        const today = new Date()
        if (d.toDateString() === today.toDateString()) {
            return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        } else {
            return utilService.padNum(d.getDate()) + ' ' + utilService.getMonthName(d)
        }
    }

    return (
        <article className="mail-preview">
            <button className="star-toggle" onClick={() => onToggleStar(mail.id)}>
                {
                    mail.isStarred ?
                        <img src="./assets/icons/star.svg" alt="" /> :
                        <img src="./assets/icons/not-star.svg" alt="" />
                }
            </button>
            <Link to={`/mail/details/${mail.id}`} className="preview-txt">
                {!mail.sentAt ? <h4 className='regular-txt red'>Draft</h4> : ''}
                <h4 className={mail.isRead ? 'regular-txt' : 'bold-txt'}>{subject}</h4>
                <h4 className={mail.isRead ? 'regular-txt' : 'bold-txt'}>{body}</h4>
                <h4 className={mail.isRead ? 'regular-txt' : 'bold-txt'}>{getMailDate(mail.sentAt)}</h4>
            </Link>
            <div className={mail.isRead ? 'is-read preview-btns' : 'preview-btns'}>
                <button className="delete-btn" onClick={() => onDeleteMail(mail.id)}>
                    <img src="./assets/icons/delete.svg" alt="" />
                </button>
                <button className="keep-btn">
                    <Link to={`/note/add?txtn=${body}&title=${subject}`}>
                        <img src="./assets/icons/keep.svg" alt="" />
                    </Link>
                </button>
                <button className="read-toggle" onClick={() => onToggleRead(mail.id)}>
                    {
                        mail.isRead ?
                            <img src="./assets/icons/mark_mail_as_unread.svg" alt="" /> :
                            <img src="./assets/icons/mark_mail_as_read.svg" alt="" />
                    }
                </button>
            </div>
        </article >
    )
}