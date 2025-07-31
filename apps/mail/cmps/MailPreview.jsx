export function MailPreview({ mail, onDeleteMail }) {

    const { subject, body } = mail

    return (
        <article className="mail-preview">
            <h4 className={mail.isRead ? 'regular-txt' : 'bold-txt'}>{subject}</h4>
            <h4 className={mail.isRead ? 'regular-txt' : 'bold-txt'}>
                {body}
                <button className="delete-btn" onClick={() => onDeleteMail(mail.id)}> Delete</button>
            </h4>
        </article>
    )
}