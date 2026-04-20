import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'
import './Register.css'

function Register() {

    const navigate = useNavigate()

    const [form, setForm] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    })

    const [error, setError] = useState('')

    const change = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const submit = async (e) => {
        e.preventDefault()

        try {

            await axios.post(
                'https://localhost:7266/api/users/register',
                {
                    email: form.email,
                    password: form.password,
                    fullName:
                        `${form.firstName} ${form.lastName}`.trim()
                }
            )

            navigate('/login')

        } catch {
            setError('Помилка реєстрації')
        }
    }

    return (
        <div className="register-page">

            <div className="register-box">

                <h1>Реєстрація</h1>

                <form onSubmit={submit}>

                    <input
                        name="firstName"
                        placeholder="Ім'я"
                        onChange={change}
                    />

                    <input
                        name="lastName"
                        placeholder="Прізвище"
                        onChange={change}
                    />

                    <input
                        name="email"
                        placeholder="Email"
                        onChange={change}
                    />

                    <input
                        type="password"
                        name="password"
                        placeholder="Пароль"
                        onChange={change}
                    />

                    {error && (
                        <p className="reg-error">
                            {error}
                        </p>
                    )}

                    <button className="btn btn-warning w-100">
                        Зареєструватися
                    </button>

                </form>

                <p className="reg-link">
                    Вже є акаунт?
                    <Link to="/login">
                        Увійти
                    </Link>
                </p>

            </div>

        </div>
    )
}

export default Register