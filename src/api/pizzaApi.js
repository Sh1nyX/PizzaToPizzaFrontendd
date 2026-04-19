import axios from 'axios'

const API_URL = 'https://localhost:7266/api/pizzas'

export const getPizzas = async () => {
    const response = await axios.get(API_URL)
    return response.data
}