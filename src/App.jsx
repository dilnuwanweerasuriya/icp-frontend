import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import AdminPage from './pages/AdminPage'
import LoginPage from './pages/LoginPage'
import Register from './pages/Register'
import HomePage from './pages/HomePage'

function App() {

    return (
        <BrowserRouter>
            <div className='w-full h-screen'>
                <Routes path="/">
                    <Route path='/' element={<HomePage />} />
                    <Route path='/login' element={<LoginPage />} />
                    <Route path='/register' element={<Register />} />
                    <Route path='/admin' element={<AdminPage />} />
                </Routes>
            </div>
        </BrowserRouter>
    )
}

export default App
