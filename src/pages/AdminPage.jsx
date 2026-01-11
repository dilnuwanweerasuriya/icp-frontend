import { Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom'
import { LuClipboardList, LuBoxes, LuUsers, LuMessageCircle, LuLogOut } from "react-icons/lu";
import AdminProductsPage from './admin/AdminProductsPage';
import AdminAddProductPage from './admin/AdminAddProductPage';
import AdminEditProductPage from './admin/AdminEditProductPage';
import AdminOrdersPage from './admin/AdminOrdersPage';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Loader from '../components/Loader';
import UserData from '../components/UserData';
import AdminUsersPage from './admin/AdminUsersPage';

export default function AdminPage() {

    const location = useLocation();
    const navigate = useNavigate();

    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token')
        if (!token) {
            window.location.href = '/'
        }

        axios.get(`${import.meta.env.VITE_BACKEND_URL}/users`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((res) => {
            if (res.data.role == 'admin') {
                setUser(res.data)
            } else {
                window.location.href = '/'
            }
        }).catch((err) => {
            console.log(err);
            window.location.href = '/login'
        })
    }, [])

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    const isActive = (path) => {
        if (path === '/admin') return location.pathname === '/admin';
        return location.pathname.startsWith(path);
    };

    const navItems = [
        { path: '/admin', icon: LuClipboardList, label: 'Orders' },
        { path: '/admin/products', icon: LuBoxes, label: 'Products' },
        { path: '/admin/users', icon: LuUsers, label: 'Users' },
        { path: '/admin/reviews', icon: LuMessageCircle, label: 'Reviews' },
    ];

    return (
        <div className="w-full h-full max-h-full bg-accent flex">
            {
                user ?
                    <>
                        {/* Sidebar */}
                        <div className="w-[280px] bg-accent h-full border-r border-secondary/20 flex flex-col">
                            {/* Logo Section */}
                            <div className="w-full h-[100px] px-6 flex items-center gap-3 border-b border-secondary/20">
                                <img src="/logo.png" className="h-14 w-14 object-contain" alt="Logo" />
                                <h1 className="text-xl font-bold text-primary">Admin Panel</h1>
                            </div>

                            {/* Navigation */}
                            <nav className="flex-1 px-4 py-6">
                                <div className="space-y-2">
                                    {navItems.map((item) => {
                                        const Icon = item.icon;
                                        return (
                                            <Link
                                                key={item.path}
                                                to={item.path}
                                                className={`
                                                    w-full h-12 flex items-center gap-3 px-4 rounded-lg
                                                    text-lg font-medium transition-all duration-200
                                                    ${isActive(item.path)
                                                        ? 'bg-gold text-accent shadow-lg shadow-gold/20'
                                                        : 'text-primary/70 hover:text-primary hover:bg-primary/5'
                                                    }
                                                `}
                                            >
                                                <Icon className="text-xl" />
                                                <span>{item.label}</span>
                                            </Link>
                                        );
                                    })}
                                </div>
                            </nav>

                            {/* Logout Section */}
                            <div className="px-4 py-6 border-t border-secondary/20">
                                <button
                                    onClick={handleLogout}
                                    className="w-full h-12 flex items-center gap-3 px-4 rounded-lg
                                        text-lg font-medium transition-all duration-200
                                        text-red-500 hover:bg-red-500/10 hover:text-red-600"
                                >
                                    <LuLogOut className="text-xl" />
                                    <span>Logout</span>
                                </button>
                            </div>
                        </div>

                        {/* Main Content */}
                        <div className="flex-1 h-full max-h-full p-6 overflow-hidden">
                            <div className="w-full h-full bg-primary rounded-2xl shadow-2xl overflow-y-auto">
                                <Routes>
                                    <Route index element={<AdminOrdersPage />} />
                                    <Route path="products" element={<AdminProductsPage />} />
                                    <Route path="add-product" element={<AdminAddProductPage />} />
                                    <Route path="edit-product" element={<AdminEditProductPage />} />
                                    <Route path="users" element={<AdminUsersPage />} />
                                    <Route path="reviews" element={<h1>Reviews</h1>} />
                                </Routes>
                            </div>
                        </div>
                    </>
                    :
                    <Loader />
            }
        </div>
    )
}