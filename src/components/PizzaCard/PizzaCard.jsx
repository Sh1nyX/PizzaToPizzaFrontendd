import { Link } from 'react-router-dom'
import './PizzaCard.css'

function PizzaCard({ pizza }) {
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
                            ₴{pizza.price}
                        </span>

                    </div>

                </div>

            </div>
        </Link>
    )
}

export default PizzaCard