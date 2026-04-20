import { Link } from 'react-router-dom'
import { getDiscountedPrice } from '../../utils/promo'
import './PizzaCard.css'

function PizzaCard({ pizza }) {
    const finalPrice =
        getDiscountedPrice(
            pizza.price,
            pizza.id
        )

    return (
        <Link
            to={`/pizza/${pizza.id}`}
            className="pizza-card-link"
        >
            <div className="pizza-card">

                <img
                    src={pizza.image}
                    alt={pizza.name}
                    className="pizza-card-img"
                />

                <div className="pizza-card-body">

                    <h3>{pizza.name}</h3>

                    <p className="pizza-card-desc">
                        {pizza.description}
                    </p>

                    <div className="pizza-meta">

                        <span className="pizza-rating">
                            ⭐ {pizza.ratingAverage}
                        </span>

                        <span className="pizza-price">
                            {finalPrice !== pizza.price && (
                                <span className="old-price">
                                    ₴{pizza.price}
                                </span>
                            )}
                        <span>₴{finalPrice}</span>
                        </span>

                    </div>

                </div>

            </div>
        </Link>
    )
}

export default PizzaCard