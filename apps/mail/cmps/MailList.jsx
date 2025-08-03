import { MailPreview } from "./MailPreview.jsx"

export function MailList({ mails, onDeleteMail, onToggleRead, onToggleStar }) {

    return (
        <div className="mail-list-container">
            <ul className="mail-list">
                {mails.map(mail => (
                    <li key={mail.id} className={mail.isRead ? 'is-read' : ''}>
                        <MailPreview
                            mail={mail}
                            onDeleteMail={onDeleteMail}
                            onToggleRead={onToggleRead}
                            onToggleStar={onToggleStar} />
                    </li>
                ))}
            </ul>
        </div>
    )
}