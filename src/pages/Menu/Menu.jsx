import { useEffect, useState } from 'react'
import axios from 'axios'
import PizzaCard from '../../components/PizzaCard/PizzaCard'
import './Menu.css'

function Menu() {

    const [pizzas, setPizzas] = useState([])

    useEffect(() => {
        load()
    }, [])

    const load = async () => {

        const res = await axios.get(
            'https://localhost:7266/api/pizzas'
        )

        setPizzas(res.data)
    }

    return (
        <div className="menu-page">

            <div className="container">

                <h1>Меню</h1>

                <div className="pizza-grid">

                    {pizzas.map(pizza => (

                        <PizzaCard
                            key={pizza.id}
                            pizza={pizza}
                        />

                    ))}

                </div>

            </div>

        </div>
    )
}

export default Menu