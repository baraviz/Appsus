const { Link, NavLink } = ReactRouterDOM

export function AppHeader() {

    return <header className="app-header">
        <Link to="/">
            <h3>Appsus ✨</h3>
        </Link>
        <nav>
            <NavLink to="/" className='header-title'>
                <img src="./assets/icons/home.svg" alt="" />
                Home
            </NavLink>
            <NavLink to="/about" className='header-title'>
                <img src="./assets/icons/about.svg" alt="" />
                About
            </NavLink>
            <NavLink to="/mail/inbox" className='header-title'>
                <img src="./assets/icons/mail-logo.svg" alt="" />
                Mail
            </NavLink>
            <NavLink to="/note" className='header-title'>
                <img src="./assets/icons/keep.svg" alt="" />
                Note
            </NavLink>
        </nav>
    </header>
}
