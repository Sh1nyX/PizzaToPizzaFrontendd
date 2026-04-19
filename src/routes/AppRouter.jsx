import { Routes, Route } from 'react-router-dom'
import Layout from '../components/Layout/Layout'

import Home from '../pages/Home/Home'
import Menu from '../pages/Menu/Menu'
import Login from '../pages/Login/Login'
import Register from '../pages/Register/Register'
import Cart from '../pages/Cart/Cart'
import Profile from '../pages/Profile/Profile'
import NotFound from '../pages/NotFound/NotFound'
import PizzaDetails from '../pages/PizzaDetails/PizzaDetails'

function AppRouter() {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="menu" element={<Menu />} />
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
                <Route path="cart" element={<Cart />} />
                <Route path="profile" element={<Profile />} />
                <Route path="*" element={<NotFound />} />
                <Route path="/pizza/:id" element={<PizzaDetails />} />
            </Route>
        </Routes>
    )
}

export default AppRouter