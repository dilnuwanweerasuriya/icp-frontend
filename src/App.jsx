import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import AdminPage from './pages/AdminPage'
import LoginPage from './pages/LoginPage'
import Register from './pages/Register'
import HomePage from './pages/HomePage'
import { Toaster } from 'react-hot-toast'

function App() {

    return (
        <BrowserRouter>
        <Toaster position='top-right' />
            <div className='w-full h-screen'>
                <Routes path="/">
                    <Route path='/*' element={<HomePage />} />
                    <Route path='/login' element={<LoginPage />} />
                    <Route path='/register' element={<Register />} />
                    <Route path='/admin/*' element={<AdminPage />} />
                </Routes>
            </div>
        </BrowserRouter>
    )
}

export default App
