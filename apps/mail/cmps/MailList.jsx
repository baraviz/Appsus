import { MailPreview } from "./MailPreview.jsx"

export function MailList({ mails = [] }) {
    return (
        <div>
            <h2>Mail list</h2>
            <ul>
                {mails.map(mail => (
                    <li key={mail.id}>
                        <MailPreview mail={mail} />
                    </li>
                ))}
            </ul>
        </div>
    )
}