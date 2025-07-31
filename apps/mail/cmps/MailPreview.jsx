export function MailPreview({ mail }) {

    const { subject, body } = mail

    return (
        <article className="mail-preview">
            <h4 className={ mail.isRead ? 'bold-txt' : 'regular-txt' }>{subject}</h4>
            <h4 className={ mail.isRead ? 'bold-txt' : 'regular-txt' }>{body}</h4>
        </article>
    )
}