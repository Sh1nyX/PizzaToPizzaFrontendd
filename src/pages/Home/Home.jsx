import { useEffect, useState } from 'react'
import { getPizzas } from '../../api/pizzaApi'
import PizzaCard from '../../components/PizzaCard/PizzaCard'
import './Home.css'



function Home() {

    const [pizzas, setPizzas] = useState([])

    useEffect(() => {
        loadPizzas()
    }, [])

    const loadPizzas = async () => {
        try {
            const data = await getPizzas()

            const topPizzas = [...data]
                .sort((a, b) => b.rating - a.rating)
                .slice(0, 5)

            setPizzas(topPizzas)

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="home-page">

            <section className="hero-section">

                <div className="container hero-grid">

                    <div>

                        <span className="hero-tag">
                            ГАРЯЧА • СВІЖА • ШВИДКО
                        </span>

                        <h1 className="hero-title">
                            Найкраща піца <br />
                            у твоєму місті
                        </h1>

                        <p className="hero-text">
                            Свіже тісто, преміум сир та
                            доставка прямо до дверей.
                        </p>

                        <div className="hero-buttons">

                            <a
                                href="#/menu"
                                className="btn btn-warning btn-lg hero-main-btn"
                            >
                                Замовити зараз
                            </a>

                        </div>

                    </div>

                    <div className="hero-right">

                        <img
                            src="https://images.unsplash.com/photo-1513104890138-7c749659a591"
                            alt="Pizza"
                            className="hero-image"
                        />

                    </div>

                </div>

            </section>

            <section className="promo-section">

                <div className="container text-center">

                    <h2>Знижка 20% на перше замовлення</h2>

                    <p>
                        Використай промокод:
                        <span> WELCOME20</span>
                    </p>

                </div>

            </section>

            <section className="recommended-section">

                <div className="container">

                    <h2 className="section-title">
                        Рекомендуємо
                    </h2>

                    <div className="pizza-grid">

                        {pizzas.map(pizza => (
                            <PizzaCard
                                key={pizza.id}
                                pizza={pizza}
                            />
                        ))}

                    </div>

                </div>

            </section>

        </div>
    )
}

export default Home