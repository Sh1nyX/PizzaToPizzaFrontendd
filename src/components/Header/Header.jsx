import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'
import './Header.css'

function Header() {

    const { isAuth, user, logout } = useContext(AuthContext)

    return (
        <header className="site-header">

            <div className="container">

                <div className="header-row">

                    <nav className="header-side left-side">

                        <Link to="/menu" className="header-link">
                            Меню
                        </Link>

                        <Link to="/categories" className="header-link">
                            Категорії
                        </Link>

                    </nav>

                    <div className="header-logo">
                        <Link to="/">
                            PizzaToPizza
                        </Link>
                    </div>

                    <nav className="header-side right-side">

                        <Link to="/cart" className="header-link">
                            Кошик
                        </Link>

                        {!isAuth ? (
                            <Link to="/login" className="header-link">
                                Увійти
                            </Link>
                        ) : (
                            <Link to="/profile" className="header-link">
                                Профіль
                            </Link>
                        )}

                    </nav>

                    <div className="mobile-header">

                        <button className="burger-btn">
                            ☰
                        </button>

                        <Link to="/" className="mobile-logo">
                            PizzaToPizza
                        </Link>

                        <Link to="/cart" className="mobile-cart">
                            🛒
                        </Link>

                    </div>

                </div>

            </div>

        </header>
    )
}

export default Header