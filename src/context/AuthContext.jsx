import { createContext, useEffect, useState } from 'react'

export const AuthContext = createContext()

function AuthProvider({ children }) {

    const [token, setToken] = useState(
        localStorage.getItem('token')
    )

    const [user, setUser] = useState(
        JSON.parse(localStorage.getItem('user'))
    )

    const login = (data) => {

        localStorage.setItem('token', data.token)
        localStorage.setItem('user', JSON.stringify(data))

        setToken(data.token)
        setUser(data)
    }

    const logout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('user')

        setToken(null)
        setUser(null)
    }

    return (
        <AuthContext.Provider
            value={{
                token,
                user,
                isAuth: !!token,
                login,
                logout
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider