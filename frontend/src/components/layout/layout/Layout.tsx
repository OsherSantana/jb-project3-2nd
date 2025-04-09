import { useContext } from 'react'
import Login from '../../auth/login/Login'
import Footer from '../footer/Footer'
import Header from '../header/Header'
import Routing from '../routing/Routing'
import './Layout.css'
import { AuthContext } from '../../auth/auth/Auth'

export default function Layout() {

    const { jwt } = useContext(AuthContext)!
    const isLoggedIn: boolean = !!jwt

    return (
        <div className='Layout'>

            {isLoggedIn && <>
                <header>
                    <Header />
                </header>
                <aside>

                </aside>
                <aside>

                </aside>
                <main>
                    <Routing />
                </main>
                <footer>
                    <Footer />
                </footer>
            </>}

            {!isLoggedIn && <>
                <Login />
            </>}

        </div>
    )
}