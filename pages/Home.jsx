import { showSuccessMsg, scrollToSection } from '../services/event-bus.service.js'
const { useNavigate } = ReactRouterDOM


export function Home() {
    const navigate = useNavigate()

    return <section className="container home">
        {/* <button onClick={() => showSuccessMsg('Yep, that works')}>Show Msg</button> */}
        <div className="box-container hero">
            <div className="box2">
                <img src="./assets/imgs/hero.jpg" alt="" />
            </div>
            <div className="box1">
                <h1>
                    Welcome to Appsus ✨
                </h1>
                <h2>
                    All your emails and notes in one magical place!
                </h2>
                <button className='go-to-app-btn' onClick={() => { document.getElementById('our-apps').scrollIntoView({ behavior: 'smooth' }) }}>
                    Try our Apps
                </button>
            </div>
        </div>

        <h1 className='our-apps' id='our-apps'>Try Our Apps</h1>
        <div className="box-container">
            <div className="box1">
                <h1>
                    Appsus Note
                </h1>
                <h2>
                    With Appsus Note you can keep every thought with one click. now integrated with Mail!
                </h2>
                <button className='go-to-app-btn' onClick={() => navigate('/note')}>
                    Try Appsus Note
                </button>
            </div>
            <div className="box2">
                <img src="./assets/imgs/keep-infographic.webp" alt="" />
            </div>
        </div>

        <div className="box-container">
            <div className="box2">
                <img src="./assets/imgs/mail-infographic.webp" alt="" />
            </div>
            <div className="box1">
                <h1>
                    Appsus Mail
                </h1>
                <h2>
                    With Appsus mail you can stay connected everywhere, with slick design and easy navigation. now integrated with Note!
                </h2>
                <button className='go-to-app-btn' onClick={() => navigate('/mail')}>
                    Try Appsus Mail
                </button>
            </div>
        </div>
    </section>
}
