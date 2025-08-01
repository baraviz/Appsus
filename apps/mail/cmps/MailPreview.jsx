const { Link } = ReactRouterDOM

export function MailPreview({ mail, onDeleteMail, onToggleRead }) {

    const { subject, body } = mail

    return (
        <article className="mail-preview">
            <Link to={`/mail/details/${mail.id}`} className="preview-txt">
                <h4 className={mail.isRead ? 'regular-txt' : 'bold-txt'}>{subject}</h4>
                <h4 className={mail.isRead ? 'regular-txt' : 'bold-txt'}>{body}</h4>
            </Link>
            <div className={mail.isRead ? 'is-read preview-btns' : 'preview-btns'}>
                <button className="delete-btn" onClick={() => onDeleteMail(mail.id)}>
                    <img src="./assets/icons/delete.svg" alt="" />
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