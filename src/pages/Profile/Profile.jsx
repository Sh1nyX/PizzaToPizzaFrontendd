    import { useContext, useEffect, useState } from 'react'
    import { useNavigate, Link } from 'react-router-dom'
    import axios from 'axios'
    import { AuthContext } from '../../context/AuthContext'
    import './Profile.css'

    function Profile() {

        const { user, logout, token } = useContext(AuthContext)
        const navigate = useNavigate()

        const [promo, setPromo] = useState('')
        const [promos, setPromos] = useState([])

        useEffect(() => {
            if (token) {
                loadPromos()
            }
        }, [token])

        const exit = () => {
            logout()
            navigate('/')
        }

        const activatePromo = () => {
            alert(`Промокод "${promo}" активовано`)
            setPromo('')
        }

        const loadPromos = async () => {

            try {

                console.log('TOKEN TYPE:', typeof token)
                console.log('TOKEN VALUE:', token)
                console.log('HEADER:', `Bearer ${token}`)

                const res = await axios.get(
                    'https://localhost:7266/api/promocodes/my',
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                )

                setPromos(res.data)

            } catch (error) {
                console.log(error)
            }
        }

        const activateSavedPromo = (promo) => {

            localStorage.setItem(
                'activePromo',
                JSON.stringify(promo)
            )

            alert(`Промокод ${promo.code} активовано`)
        }

        return (
            <div className="profile-page">

                <div className="container">

                    <div className="profile-card">

                        <h1>Мій профіль</h1>

                        <div className="profile-info">

                            <div className="profile-row">
                                <span>Ім'я:</span>
                                <strong>
                                    {user?.fullName || 'Не вказано'}
                                </strong>
                            </div>

                            <div className="profile-row">
                                <span>Email:</span>
                                <strong>
                                    {user?.email || 'Не вказано'}
                                </strong>
                            </div>

                        </div>

                        <div className="promo-box">

                            <h3>Активувати промокод</h3>

                            <input
                                value={promo}
                                onChange={(e) =>
                                    setPromo(e.target.value)
                                }
                                placeholder="Введіть код"
                            />

                            <button
                                className="btn btn-warning"
                                onClick={activatePromo}
                            >
                                Активувати
                            </button>

                        </div>

                        <div className="my-promos">

                            <h3>Мої промокоди</h3>

                            {promos.length === 0 && (
                                <p className="empty-promos">
                                    У вас немає промокодів
                                </p>
                            )}

                            {promos.map(promo => (

                                <div
                                    key={promo.id}
                                    className="promo-card"
                                >

                                    <div>

                                        <strong>{promo.code}</strong>

                                        <p>
                                            -{promo.discountPercent}% • {promo.pizzaName}
                                        </p>

                                        <small>
                                            до {
                                            new Date(
                                                promo.expiryDate
                                            ).toLocaleDateString()
                                        }
                                        </small>

                                    </div>

                                    {!promo.isUsed && (
                                        <button
                                            className="btn btn-warning btn-sm"
                                            onClick={() =>
                                                activateSavedPromo(promo)
                                            }
                                        >
                                            Активувати
                                        </button>
                                    )}

                                    {promo.isUsed && (
                                        <span className="used-label">
                                            Використано
                                        </span>
                                    )}

                                </div>

                            ))}

                        </div>

                        <div className="profile-buttons">

                            {user?.role === 'Admin' && (
                                <Link
                                    to="/admin"
                                    className="btn btn-warning"
                                >
                                    Адмін-панель
                                </Link>
                            )}

                            <button className="btn btn-outline-light">
                                Мої замовлення
                            </button>

                            <button
                                className="btn btn-danger"
                                onClick={exit}
                            >
                                Вийти з акаунта
                            </button>

                        </div>

                    </div>

                </div>

            </div>
        )
    }

    export default Profile