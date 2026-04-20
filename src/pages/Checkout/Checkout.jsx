import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { AuthContext } from '../../context/AuthContext'
import './Checkout.css'
import { toast } from 'react-toastify'

function Checkout() {

    const { user } = useContext(AuthContext)
    const navigate = useNavigate()

    const [form, setForm] = useState({
        email: user?.email || '',
        name: user?.fullName || '',
        phone: '',
        street: '',
        house: '',
        flat: '',
        comment: ''
    })

    const change = e => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const submit = async () => {

        const token =
            localStorage.getItem('token')

        if (
            !form.email ||
            !form.name ||
            !form.phone ||
            !form.street ||
            !form.house ||
            !form.email.includes('@')
        ){
            toast.warning(
                'Заповніть обов’язкові поля'
            )
            return
        }

        await axios.post(
            'https://localhost:7266/api/orders/create',
            form,
            {
                headers:{
                    Authorization:
                        `Bearer ${token}`
                }
            }
        )

        toast.success('Замовлення оформлено')


        localStorage.removeItem('activePromo')

        navigate('/profile')
    }

    return (
        <div className="checkout-page">

            <div className="checkout-card">

                <h1>Оформлення замовлення</h1>

                <div className="checkout-grid">

                    <div>

                        <label>Email</label>

                        <input
                            name="email"
                            value={form.email}
                            onChange={change}
                        />

                    </div>

                    <div>

                        <label>Ім'я</label>

                        <input
                            name="name"
                            value={form.name}
                            onChange={change}
                        />

                    </div>

                    <div>

                        <label>Телефон</label>

                        <input
                            name="phone"
                            value={form.phone}
                            onChange={change}
                        />

                    </div>

                    <div>

                        <label>Вулиця</label>

                        <input
                            name="street"
                            value={form.street}
                            onChange={change}
                        />

                    </div>

                    <div>

                        <label>Будинок</label>

                        <input
                            name="house"
                            value={form.house}
                            onChange={change}
                        />

                    </div>

                    <div>

                        <label>Квартира</label>

                        <input
                            name="flat"
                            value={form.flat}
                            onChange={change}
                        />

                    </div>

                </div>

                <label>Коментар</label>

                <textarea
                    rows="4"
                    name="comment"
                    value={form.comment}
                    onChange={change}
                />

                <div className="checkout-actions">

                    <button
                        className="btn btn-outline-light"
                        onClick={() => navigate('/cart')}
                    >
                        Скасувати
                    </button>

                    <button
                        className="btn btn-warning"
                        onClick={submit}
                    >
                        Оформити замовлення
                    </button>

                </div>

            </div>

        </div>
    )
}

export default Checkout