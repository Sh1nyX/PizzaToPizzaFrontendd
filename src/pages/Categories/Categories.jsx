import { useEffect, useState } from 'react'
import axios from 'axios'
import PizzaCard from '../../components/PizzaCard/PizzaCard'
import './Categories.css'

function Categories() {

    const [categories, setCategories] = useState([])
    const [opened, setOpened] = useState({})

    useEffect(() => {
        load()
    }, [])

    const load = async () => {

        const cats = await axios.get(
            'https://localhost:7266/api/categories'
        )

        const pizzas = await axios.get(
            'https://localhost:7266/api/pizzas'
        )

        const data = cats.data.map(cat => ({
            ...cat,
            pizzas: pizzas.data.filter(
                x =>
                    x.category?.trim().toLowerCase() ===
                    cat.name?.trim().toLowerCase()
            )
        }))

        setCategories(data)
    }

    const toggle = id => {

        setOpened(prev => ({
            ...prev,
            [id]: !prev[id]
        }))
    }

    return (
        <div className="categories-page">

            <div className="container">

                <h1>Категорії</h1>

                {categories.map(cat => (

                    <div
                        key={cat.id}
                        className="category-block"
                    >

                        <div
                            className="category-title"
                            onClick={() =>
                                toggle(cat.id)
                            }
                        >

                            <span>
                                {opened[cat.id]
                                    ? '▼'
                                    : '▶'}
                            </span>

                            {cat.name}

                        </div>

                        {opened[cat.id] && (

                            <div className="pizza-grid">

                                {cat.pizzas.map(pizza => (

                                    <PizzaCard
                                        key={pizza.id}
                                        pizza={pizza}
                                    />

                                ))}

                            </div>

                        )}

                    </div>

                ))}

            </div>

        </div>
    )
}

export default Categories