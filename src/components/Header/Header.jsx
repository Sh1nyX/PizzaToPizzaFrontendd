import { Link } from 'react-router-dom'
import { useContext, useState } from 'react'
import { AuthContext } from '../../context/AuthContext'
import './Header.css'
import { toast } from 'react-toastify'


function Header() {

    const {
        isAuth,
        user,
        logout,
        token
    } = useContext(AuthContext)

    const [menuOpen, setMenuOpen] = useState(false)

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

                        <Link
                            to="/cart"
                            className="header-link"
                            onClick={(e) => {

                                if (!token) {
                                    e.preventDefault()

                                    toast.error(
                                        'Для замовлення увійдіть в акаунт'
                                    )
                                }

                            }}
                        >
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
                        {menuOpen && (

                            <div className="mobile-menu">

                                <Link
                                    to="/menu"
                                    onClick={() => setMenuOpen(false)}
                                >
                                    Меню
                                </Link>

                                <Link
                                    to="/categories"
                                    onClick={() => setMenuOpen(false)}
                                >
                                    Категорії
                                </Link>

                                <Link
                                    to="/cart"
                                    onClick={() => setMenuOpen(false)}
                                >
                                    Кошик
                                </Link>

                                {!isAuth ? (

                                    <Link
                                        to="/login"
                                        onClick={() => setMenuOpen(false)}
                                    >
                                        Увійти
                                    </Link>

                                ) : (

                                    <Link
                                        to="/profile"
                                        onClick={() => setMenuOpen(false)}
                                    >
                                        Профіль
                                    </Link>

                                )}

                            </div>

                        )}

                        <button
                            className="burger-btn"
                            onClick={() =>
                                setMenuOpen(!menuOpen)
                            }
                        >
                            ☰
                        </button>

                        <Link to="/" className="mobile-logo">
                            PizzaToPizza
                        </Link>

                    </div>

                </div>

            </div>

        </header>
    )
}

export default Header