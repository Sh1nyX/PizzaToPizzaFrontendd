import { useContext, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'
import { AuthContext } from '../../context/AuthContext'
import './Login.css'

function Login() {

    const { login } = useContext(AuthContext)
    const navigate = useNavigate()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const response = await axios.post(
                'https://localhost:7266/api/users/login',
                {
                    email,
                    password
                }
            )

            login(response.data)

            navigate('/')

        } catch {
            setError('Невірний логін або пароль')
        }
    }

    return (
        <div className="login-page">

            <div className="login-box">

                <h1>Вхід</h1>

                <form onSubmit={handleSubmit}>

                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />

                    <input
                        type="password"
                        placeholder="Пароль"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />

                    {error && (
                        <p className="login-error">
                            {error}
                        </p>
                    )}

                    <button
                        className="btn btn-warning w-100"
                    >
                        Увійти
                    </button>

                </form>

                <p className="login-link">
                    Немає акаунта?
                    <Link to="/register">
                        Реєстрація
                    </Link>
                </p>

            </div>

        </div>
    )
}

export default Login