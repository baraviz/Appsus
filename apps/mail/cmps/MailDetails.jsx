import { mailService } from "../../mail/services/mail.service.js"
const { useParams, useNavigate, Link } = ReactRouterDOM

const { useState, useEffect } = React

export function MailDetails() {

    // console.log('hihi')

    const [mail, setMail] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const params = useParams()
    const navigate = useNavigate()

    console.log('params.id', params.id);


    useEffect(() => {
        loadMail()
    }, [params.id])

    function loadMail() {
        // console.log('hihihi')
        setIsLoading(true)
        mailService.get(params.id)
            .then(mail => {
                mail.isRead = true
                setMail(mail)
                mailService.save(mail)
            })
            .catch(err => console.log('err:', err))
            .finally(() => {
                setIsLoading(false)
            })
    }


    function onBack() {
        navigate('/mail')
        // navigate(-1)
    }

    if (isLoading) return <div className="loader">Loading...</div>

    const { subject, body } = mail
    return (
        <section className="mail-details container">
            <h1>Mail Subject: {subject}</h1>
            <h1>Mail Details: {body}</h1>
            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Facilis quae fuga eveniet, quisquam ducimus modi optio in alias accusantium corrupti veritatis commodi tenetur voluptate deserunt nihil quibusdam. Expedita, architecto omnis?</p>
            {/* <img src={`../assets/img/${ subject }.png`} alt="Mail Image" /> */}
            <button onClick={onBack}>Back</button>
        </section>
    )

}