import { useContext, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import AdminPizzas from '../../components/AdminPizzas/AdminPizzas'
import AdminCategories from '../../components/AdminCategories/AdminCategories'
import AdminPromo from '../../components/AdminPromo/AdminPromo'
import AdminOrders from '../../components/AdminOrders/AdminOrders'
import './Admin.css'

function Admin() {

    const { user } = useContext(AuthContext)
    const [tab, setTab] = useState('pizzas')

    if (user?.role !== 'Admin') {
        return <Navigate to="/" />
    }

    return (
        <div className="admin-page">

            <div className="container">

                <h1 className="admin-title">
                    Адмін-панель
                </h1>

                <div className="admin-tabs">

                    <button
                        className={tab === 'pizzas' ? 'active' : ''}
                        onClick={() => setTab('pizzas')}
                    >
                        Піци
                    </button>

                    <button
                        className={tab === 'categories' ? 'active' : ''}
                        onClick={() => setTab('categories')}
                    >
                        Категорії
                    </button>

                    <button
                        className={tab === 'promo' ? 'active' : ''}
                        onClick={() => setTab('promo')}
                    >
                        Промокоди
                    </button>

                    <button
                        className={tab === 'orders' ? 'active' : ''}
                        onClick={() => setTab('orders')}
                    >
                        Замовлення
                    </button>

                </div>

                <div className="admin-content">

                    {tab === 'pizzas' && <AdminPizzas />}

                    {tab === 'categories' && <AdminCategories />}

                    {tab === 'promo' && <AdminPromo />}

                    {tab === 'orders' && <AdminOrders />}

                </div>

            </div>

        </div>
    )
}

export default Admin