import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import AdminPage from './pages/AdminPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import HomePage from './pages/HomePage'
import { Toaster } from 'react-hot-toast'
import Input from './components/Input'
import ProductPage from './pages/ProductPage'
import ProductOverviewPage from './pages/ProductOverviewPage'
import CartPage from './pages/CartPage'
import { GoogleOAuthProvider } from '@react-oauth/google'
import ForgetPasswordPage from './pages/ForgetPasswordPage'

function App() {

    return (
        <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
            <BrowserRouter>
                <Toaster position='top-right' />
                <div className='w-full h-screen'>
                    <Routes path="/">
                        <Route path='/*' element={<HomePage />} />
                        <Route path='/test' element={<Input />} />
                        <Route path='/login' element={<LoginPage />} />
                        <Route path='/register' element={<RegisterPage />} />
                        <Route path='/forgot-password' element={<ForgetPasswordPage />} />
                        <Route path='/admin/*' element={<AdminPage />} />
                    </Routes>
                </div>
            </BrowserRouter>
        </GoogleOAuthProvider>
    )
}

export default App
