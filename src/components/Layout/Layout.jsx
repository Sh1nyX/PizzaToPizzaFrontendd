import { Outlet } from 'react-router-dom'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'

function Layout() {
    return (
        <>
            <Header />
            <main className="container py-4">
                <Outlet />
            </main>
            <Footer />
        </>
    )
}

export default Layout