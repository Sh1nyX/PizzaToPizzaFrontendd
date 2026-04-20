import { useEffect, useState } from 'react'
import axios from 'axios'
import './Cart.css'
import { getDiscountedPrice } from '../../utils/promo'
import { useNavigate } from 'react-router-dom'

function Cart() {

    const [items, setItems] = useState([])
    const navigate = useNavigate()

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
            sum +
            getDiscountedPrice(
                item.price,
                item.pizzaId
            ) * item.quantity,
        0
    )

    return (
        <div className="cart-page">

            <div className="container">

                <h1>Кошик</h1>

                {items.map(item => {

                    const discountedPrice =
                        getDiscountedPrice(
                            item.price,
                            item.pizzaId
                        )

                    return (

                        <div
                            key={item.id}
                            className="cart-item"
                        >

                            <img src={item.image} />

                            <div>
                                <h4>{item.name}</h4>

                                <p className="cart-price-row">
                                    <span className="qty">
                                        {item.quantity} x
                                    </span>
                                    {discountedPrice !== item.price ? (
                                        <>
                                        <span className="old-price">
                                            {item.price} грн
                                        </span>

                                            <span className="new-price">
                                                {discountedPrice} грн
                                            </span>
                                        </>
                                        ) :
                                        (
                                        <span className="normal-price">
                                            {item.price} грн
                                        </span>
                                    )}

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

                    )
                })}

                <h2 className="cart-total">
                    Разом: {total} грн
                </h2>

                <button
                    className="btn btn-warning checkout-btn"
                    onClick={() => navigate('/checkout')}
                >
                    Оформити замовлення
                </button>

            </div>

        </div>
    )
}

export default Cart