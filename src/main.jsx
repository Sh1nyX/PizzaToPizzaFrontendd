import React from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import AuthProvider from './context/AuthContext'
import './index.css'
import App from './App'

ReactDOM.createRoot(document.getElementById('root')).render(

    <React.StrictMode>

        <AuthProvider>

            <HashRouter>

                <App />

            </HashRouter>

        </AuthProvider>

    </React.StrictMode>

)