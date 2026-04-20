import { useEffect, useMemo, useState } from 'react'
import axios from 'axios'
import './AdminPromo.css'

function AdminPromo() {

    const [users, setUsers] = useState([])
    const [pizzas, setPizzas] = useState([])

    const [selectedUser, setSelectedUser] = useState(null)

    const [search, setSearch] = useState('')
    const [sortAsc, setSortAsc] = useState(true)

    const [form, setForm] = useState({
        code: '',
        discountPercent: '',
        pizzaId: 'all',
        expiryDate: ''
    })

    useEffect(() => {
        loadUsers()
        loadPizzas()
    }, [])

    const loadUsers = async () => {
        const res = await axios.get(
            'https://localhost:7266/api/users'
        )

        setUsers(res.data)
    }

    const loadPizzas = async () => {
        const res = await axios.get(
            'https://localhost:7266/api/pizzas'
        )

        setPizzas(res.data)
    }

    const filteredUsers = useMemo(() => {

        let items = [...users]

        if (search.trim()) {
            items = items.filter(x =>
                x.fullName
                    .toLowerCase()
                    .includes(search.toLowerCase())
            )
        }

        items.sort((a, b) =>
            sortAsc
                ? a.fullName.localeCompare(b.fullName)
                : b.fullName.localeCompare(a.fullName)
        )

        return items

    }, [users, search, sortAsc])

    const createPromo = async () => {

        await axios.post(
            'https://localhost:7266/api/promocodes',
            {
                userId: selectedUser.id,
                code: form.code,
                discountPercent: Number(form.discountPercent),
                pizzaId:
                    form.pizzaId === 'all'
                        ? null
                        : Number(form.pizzaId),
                expiryDate: form.expiryDate
            }
        )

        alert('Промокод створено')

        setForm({
            code: '',
            discountPercent: '',
            pizzaId: 'all',
            expiryDate: ''
        })
    }

    return (
        <div className="promo-admin">


            <div className="promo-users">

                <h2>Користувачі</h2>

                <input
                    placeholder="Пошук..."
                    value={search}
                    onChange={(e) =>
                        setSearch(e.target.value)
                    }
                />

                <button
                    className="sort-btn"
                    onClick={() =>
                        setSortAsc(!sortAsc)
                    }
                >
                    Ім'я {sortAsc ? '↑' : '↓'}
                </button>

                <div className="users-list">

                    {filteredUsers.map(user => (

                        <div
                            key={user.id}
                            className={`user-row ${
                                selectedUser?.id === user.id
                                    ? 'active'
                                    : ''
                            }`}
                            onClick={() =>
                                setSelectedUser(user)
                            }
                        >
                            {user.fullName}
                        </div>

                    ))}

                </div>

            </div>

            <div className="promo-form-box">

                <h2>
                    {selectedUser
                        ? selectedUser.fullName
                        : 'Оберіть користувача'}
                </h2>

                {selectedUser && (
                    <>
                        <input
                            placeholder="Промокод"
                            value={form.code}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    code: e.target.value
                                })
                            }
                        />

                        <input
                            placeholder="Знижка %"
                            value={form.discountPercent}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    discountPercent:
                                    e.target.value
                                })
                            }
                        />

                        <select
                            value={form.pizzaId}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    pizzaId: e.target.value
                                })
                            }
                        >

                            <option value="all">
                                Універсальний
                            </option>

                            {pizzas.map(pizza => (
                                <option
                                    key={pizza.id}
                                    value={pizza.id}
                                >
                                    {pizza.name}
                                </option>
                            ))}

                        </select>

                        <input
                            type="date"
                            value={form.expiryDate}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    expiryDate: e.target.value
                                })
                            }
                        />

                        <button
                            className="btn btn-warning"
                            onClick={createPromo}
                        >
                            Створити
                        </button>
                    </>
                )}

            </div>

        </div>
    )
}

export default AdminPromo