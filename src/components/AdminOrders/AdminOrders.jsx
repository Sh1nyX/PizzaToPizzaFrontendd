import { useEffect, useState } from 'react'
import axios from 'axios'
import './AdminOrders.css'

function AdminOrders() {

    const [orders, setOrders] = useState([])

    useEffect(() => {
        loadOrders()
    }, [])

    const loadOrders = async () => {

        const token =
            localStorage.getItem('token')

        const res = await axios.get(
            'https://localhost:7266/api/orders',
            {
                headers:{
                    Authorization:
                        `Bearer ${token}`
                }
            }
        )

        setOrders(res.data)
    }

    const approve = async (id) => {

        const token =
            localStorage.getItem('token')

        await axios.put(
            `https://localhost:7266/api/orders/${id}/approve`,
            {},
            {
                headers:{
                    Authorization:
                        `Bearer ${token}`
                }
            }
        )

        loadOrders()
    }

    const reject = async (id) => {

        const token =
            localStorage.getItem('token')

        await axios.put(
            `https://localhost:7266/api/orders/${id}/reject`,
            {},
            {
                headers:{
                    Authorization:
                        `Bearer ${token}`
                }
            }
        )

        loadOrders()
    }

    return (
        <div className="admin-orders">

            <h2>Замовлення</h2>

            {orders.map(order => (

                <div
                    key={order.id}
                    className="admin-order-card"
                >

                    <div className="order-top">

                        <div>

                            <strong>
                                #{order.id}
                            </strong>

                            <p>
                                {order.userName}
                            </p>

                            <small>
                                {order.total} грн
                            </small>

                        </div>

                        <span className={`status ${order.status}`}>
                            {order.status}
                        </span>

                    </div>

                    <div className="order-items">

                        {order.items.map((x,i) => (
                            <p key={i}>{x}</p>
                        ))}

                    </div>

                    {order.status === 'Pending' && (

                        <div className="order-actions">

                            <button
                                className="btn btn-success"
                                onClick={() =>
                                    approve(order.id)
                                }
                            >
                                Схвалити
                            </button>

                            <button
                                className="btn btn-danger"
                                onClick={() =>
                                    reject(order.id)
                                }
                            >
                                Відхилити
                            </button>

                        </div>

                    )}

                </div>

            ))}

        </div>
    )
}

export default AdminOrders