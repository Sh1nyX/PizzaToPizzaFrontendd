    import { useContext, useEffect, useState } from 'react'
    import { useNavigate, Link } from 'react-router-dom'
    import axios from 'axios'
    import { AuthContext } from '../../context/AuthContext'
    import './Profile.css'
    import { toast } from 'react-toastify'

    function Profile() {

        const { user, logout, token } = useContext(AuthContext)
        const navigate = useNavigate()

        const [promo, setPromo] = useState('')
        const [promos, setPromos] = useState([])
        const [orders, setOrders] = useState([])

        useEffect(() => {
            if (token) {
                loadPromos()
                loadOrders()
            }


        }, [token])

        const loadOrders = async () => {

            const token =
                localStorage.getItem('token')

            const res = await axios.get(
                'https://localhost:7266/api/orders/my',
                {
                    headers:{
                        Authorization:
                            `Bearer ${token}`
                    }
                }
            )

            setOrders(res.data)
        }

        const exit = () => {
            logout()
            navigate('/')
        }

        const activatePromo = () => {
            toast.success(`Промокод "${promo}" активовано`)
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

        const activateSavedPromo = async (promo) => {

            const token =
                localStorage.getItem('token')

            await axios.put(
                `https://localhost:7266/api/promocodes/${promo.id}/activate`,
                {},
                {
                    headers:{
                        Authorization:
                            `Bearer ${token}`
                    }
                }
            )

            localStorage.setItem(
                'activePromo',
                JSON.stringify(promo)
            )

            setPromos(prev =>
                prev.filter(x => x.id !== promo.id)
            )

            toast.success(
                'Промокод активовано'
            )
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

                        <div className="my-promos">

                            <h3>Мої промокоди</h3>

                            {promos.length === 0 && (
                                <p className="empty-promos">
                                    У вас немає промокодів
                                </p>
                            )}

                            {promos
                                .filter(promo => !promo.isUsed)
                                .map(promo => (

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

                                </div>

                            ))}

                        </div>

                        <div className="section-divider"></div>

                        <div className="orders-box">

                            <h3>Мої замовлення</h3>

                            {orders.length === 0 && (
                                <p className="empty-promos">
                                    Замовлень поки немає
                                </p>
                            )}

                            {orders.map(order => (

                                <div
                                    key={order.id}
                                    className="order-card"
                                >

                                    <div className="order-left">

                                        <strong>
                                            Замовлення #{order.id}
                                        </strong>

                                        <small>
                                            {order.total} грн
                                        </small>

                                    </div>

                                    <span className={`status ${order.status}`}>
                                        {order.status}
                                    </span>

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