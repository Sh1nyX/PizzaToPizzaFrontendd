import { useEffect, useState, useContext } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import './PizzaDetails.css'
import PizzaCard from '../../components/PizzaCard/PizzaCard'
import { getDiscountedPrice } from '../../utils/promo'
import { AuthContext } from '../../context/AuthContext'
import { toast } from 'react-toastify'

function PizzaDetails() {

    const { id } = useParams()

    const [pizza, setPizza] = useState(null)
    const [quantity, setQuantity] = useState(1)
    const [related, setRelated] = useState([])
    const { isAuth, token } = useContext(AuthContext)

    useEffect(() => {
        loadPizza()
    }, [id])


    const loadPizza = async () => {
        try {
            const response = await axios.get(
                `https://localhost:7266/api/pizzas/${id}`
            )

            setPizza(response.data)

            loadRelated(response.data)

        } catch (error) {
            console.log(error)
        }
    }

    const loadRelated = async (currentPizza) => {
        try {
            const response = await axios.get(
                'https://localhost:7266/api/pizzas'
            )

            const items = response.data
                .filter(x =>
                    x.category === currentPizza.category &&
                    x.id !== currentPizza.id
                )
                .slice(0, 4)

            setRelated(items)

        } catch (error) {
            console.log(error)
        }
    }

    const increase = () => {
        setQuantity(prev => prev + 1)
    }

    const decrease = () => {
        if (quantity > 1) {
            setQuantity(prev => prev - 1)
        }
    }

    const ratePizza = async (value) => {

        if (!isAuth) {
            toast.error(
                'Увійдіть щоб оцінювати піци'
            )
            return
        }

        try {

            await axios.post(
                `https://localhost:7266/api/pizzas/${pizza.id}/rate`,
                {
                    stars: value
                },
                {
                    headers:{
                        Authorization:
                            `Bearer ${token}`
                    }
                }
            )

            toast.success('Оцінку збережено')

        } catch (error) {

            console.log(error.response.data)

            toast.error('Помилка оцінки')
        }
    }

    const addToCart = async () => {
        const rawToken = localStorage.getItem('token');
        if (!rawToken) {
            toast.warning('Увійдіть в акаунт!')
            return;
        }

        const token = rawToken.replace(/'/g, '').trim();

        try {
            await axios.post(
                'https://localhost:7266/api/cart/add',
                {
                    pizzaId: pizza.id,
                    quantity: Number(quantity)   // ← тоже исправь здесь!
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            toast.success('Додано до кошика')
        } catch (error) {
            console.log(error.response?.data || error);
            toast.warning('Помилка при додаванні')
        }
    }



    if (!pizza) return <div className="loading">Loading...</div>

    const finalPrice =
        getDiscountedPrice(
            pizza.price,
            pizza.id
        )

    return (
        <div className="pizza-details-page">

            <div className="container">

                <div className="pizza-details-grid">

                    <div>
                        <img
                            src={pizza.image}
                            alt={pizza.name}
                            className="pizza-big-image"
                        />
                    </div>

                    <div className="pizza-info">

                        <h1>{pizza.name}</h1>

                        <p className="pizza-category">
                            {pizza.category}
                        </p>

                        <p className="pizza-description">
                            {pizza.description}
                        </p>

                        <div className="pizza-rating-big">
                            ⭐ {pizza.ratingAverage}
                        </div>

                        <div className="stars-block">

                            {[1,2,3,4,5].map(star => (
                                <button
                                    key={star}
                                    className="star-btn"
                                    onClick={() => ratePizza(star)}
                                >
                                    ★
                                </button>
                            ))}

                        </div>

                        <div className="pizza-price-big">
                            ₴{finalPrice}
                        </div>

                        <div className="buy-block">

                            <div className="qty-box">

                                <button onClick={decrease}>
                                    -
                                </button>

                                <span>{quantity}</span>

                                <button onClick={increase}>
                                    +
                                </button>

                            </div>

                            <button
                                className="btn btn-warning add-btn"
                                onClick={addToCart}
                            >
                                Додати до кошика
                            </button>

                        </div>

                    </div>

                </div>

                <hr className="details-divider" />

                <section className="related-section">

                    <h2 className="related-title">
                        Вам також можуть сподобатись
                    </h2>

                    <div className="pizza-grid">

                        {related.map(item => (
                            <PizzaCard
                                key={item.id}
                                pizza={item}
                            />
                        ))}

                    </div>

                </section>

            </div>

        </div>
    )
}

export default PizzaDetails