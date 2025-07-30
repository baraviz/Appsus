export function MailPreview({ mail }) {
    
    const { subject, body } = mail

    return (
        <article className="mail-preview">
            <h2>Subject: {subject}</h2>
            <h4>Mail Body: {body}</h4>
        </article>
    )
}