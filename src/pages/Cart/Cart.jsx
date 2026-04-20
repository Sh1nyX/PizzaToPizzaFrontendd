import { useEffect, useState } from 'react'
import axios from 'axios'
import './Cart.css'

function Cart() {

    const [items, setItems] = useState([])

    useEffect(() => {
        loadCart()
    }, [])

    const loadCart = async () => {

        const token = localStorage.getItem('token')

        const res = await axios.get(
            'https://localhost:7266/api/cart',
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        )

        setItems(res.data)
    }

    const removeItem = async (id) => {

        const token = localStorage.getItem('token')

        await axios.delete(
            `https://localhost:7266/api/cart/${id}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        )

        loadCart()
    }

    const total = items.reduce(
        (sum, item) =>
            sum + item.price * item.quantity,
        0
    )

    return (
        <div className="cart-page">

            <div className="container">

                <h1>Кошик</h1>

                {items.map(item => (

                    <div
                        key={item.id}
                        className="cart-item"
                    >

                        <img src={item.image} />

                        <div>
                            <h4>{item.name}</h4>
                            <p>
                                {item.quantity} x {item.price} грн
                            </p>
                        </div>

                        <button
                            className="btn btn-danger"
                            onClick={() =>
                                removeItem(item.id)
                            }
                        >
                            ✕
                        </button>

                    </div>

                ))}

                <h2 className="cart-total">
                    Разом: {total} грн
                </h2>

            </div>

        </div>
    )
}

export default Cart