export function MailPreview({ mail }) {

    const { subject, body } = mail

    return (
        <article className="mail-preview">
            <h4 className={ mail.isRead ? 'regular-txt' : 'bold-txt' }>{subject}</h4>
            <h4 className={ mail.isRead ? 'regular-txt' : 'bold-txt' }>{body} <button>Delete</button></h4>
        </article>
    )
}