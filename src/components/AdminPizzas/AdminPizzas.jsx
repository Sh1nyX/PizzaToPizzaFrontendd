import { useEffect, useMemo, useState } from 'react'
import axios from 'axios'
import './AdminPizzas.css'

function AdminPizzas() {

    const emptyForm = {
        name: '',
        description: '',
        price: '',
        image: '',
        categoryId: 1
    }

    const [pizzas, setPizzas] = useState([])
    const [form, setForm] = useState(emptyForm)
    const [editId, setEditId] = useState(null)

    const [search, setSearch] = useState('')
    const [sortField, setSortField] = useState('')
    const [sortDir, setSortDir] = useState('asc')
    const [categories, setCategories] = useState([])

    useEffect(() => {
        loadPizzas()
        loadCategories()
    }, [])

    const loadPizzas = async () => {
        const res = await axios.get(
            'https://localhost:7266/api/pizzas'
        )

        setPizzas(res.data)
    }

    const change = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const savePizza = async () => {

        if (editId) {
            await axios.put(
                `https://localhost:7266/api/pizzas/${editId}`,
                form
            )
        } else {
            await axios.post(
                'https://localhost:7266/api/pizzas',
                form
            )
        }

        setForm(emptyForm)
        setEditId(null)
        loadPizzas()
    }

    const editPizza = (pizza) => {
        setEditId(pizza.id)

        setForm({
            name: pizza.name,
            description: pizza.description,
            price: pizza.price,
            image: pizza.image,
            categoryId: 1
        })
    }

    const removePizza = async (id) => {
        await axios.delete(
            `https://localhost:7266/api/pizzas/${id}`
        )

        loadPizzas()
    }

    const sortBy = (field) => {

        if (sortField !== field) {
            setSortField(field)
            setSortDir('asc')
            return
        }

        if (sortDir === 'asc') {
            setSortDir('desc')
            return
        }

        setSortField('')
        setSortDir('asc')
    }

    const arrow = (field) => {

        if (sortField !== field) return ''

        return sortDir === 'asc' ? ' ↑' : ' ↓'
    }

    const loadCategories = async () => {

        const res = await axios.get(
            'https://localhost:7266/api/categories'
        )

        setCategories(res.data)
    }

    const filteredPizzas = useMemo(() => {

        let items = [...pizzas]

        if (search.trim()) {
            items = items.filter(x =>
                x.name
                    .toLowerCase()
                    .includes(search.toLowerCase())
            )
        }

        if (sortField) {

            items.sort((a, b) => {

                let first = a[sortField]
                let second = b[sortField]

                if (sortField === 'name') {
                    first = first.toLowerCase()
                    second = second.toLowerCase()
                }

                if (first > second)
                    return sortDir === 'asc' ? 1 : -1

                if (first < second)
                    return sortDir === 'asc' ? -1 : 1

                return 0
            })
        }

        return items

    }, [pizzas, search, sortField, sortDir])

    return (
        <div className="admin-pizzas">

            <h2>Піци</h2>

            <div className="pizza-form">

                <input
                    name="name"
                    placeholder="Назва"
                    value={form.name}
                    onChange={change}
                />

                <input
                    name="description"
                    placeholder="Опис"
                    value={form.description}
                    onChange={change}
                />

                <input
                    name="price"
                    placeholder="Ціна"
                    value={form.price}
                    onChange={change}
                />

                <input
                    name="image"
                    placeholder="Посилання на фото"
                    value={form.image}
                    onChange={change}
                />

                <select
                    name="categoryId"
                    value={form.categoryId}
                    onChange={change}
                    className="category-select"
                >

                    {categories.map(cat => (
                        <option
                            key={cat.id}
                            value={cat.id}
                        >
                            {cat.name}
                        </option>
                    ))}

                </select>

                <input
                    className="search-input"
                    placeholder="Пошук за назвою..."
                    value={search}
                    onChange={(e) =>
                        setSearch(e.target.value)
                    }
                />

                <button
                    className="btn btn-warning"
                    onClick={savePizza}
                >
                    {editId
                        ? 'Зберегти зміни'
                        : 'Додати піцу'}
                </button>

            </div>

            <table className="admin-table">

                <thead>
                <tr>

                    <th
                        onClick={() => sortBy('id')}
                        className="sortable"
                    >
                        ID{arrow('id')}
                    </th>

                    <th
                        onClick={() => sortBy('name')}
                        className="sortable"
                    >
                        Назва{arrow('name')}
                    </th>

                    <th
                        onClick={() => sortBy('price')}
                        className="sortable"
                    >
                        Ціна{arrow('price')}
                    </th>

                    <th></th>

                </tr>
                </thead>

                <tbody>

                {filteredPizzas.map(pizza => (
                    <tr key={pizza.id}>

                        <td>{pizza.id}</td>
                        <td>{pizza.name}</td>
                        <td>{pizza.price} ₴</td>

                        <td>

                            <button
                                className="btn btn-sm btn-outline-light me-2"
                                onClick={() =>
                                    editPizza(pizza)
                                }
                            >
                                Edit
                            </button>

                            <button
                                className="btn btn-sm btn-danger"
                                onClick={() =>
                                    removePizza(pizza.id)
                                }
                            >
                                Delete
                            </button>

                        </td>

                    </tr>
                ))}

                </tbody>

            </table>

        </div>
    )
}

export default AdminPizzas