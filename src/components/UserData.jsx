import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom';

export default function UserData() {
    const [user, setUser] = useState(null);
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const token = localStorage.getItem('token')
        if (token != null) {
            axios.get(`${import.meta.env.VITE_BACKEND_URL}/users`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then((res) => {
                setUser(res.data)
            }).catch((err) => {
                setUser(null)
                console.log(err);
            })
        }
    }, [])

    useEffect(() => {
        const handleClick = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setOpen(false);
            }
        }

        document.addEventListener('click', handleClick);

        return () => {
            document.removeEventListener('click', handleClick);
        }
    })

    return (
        <>
            {
                user ?
                    <div className='relative' ref={dropdownRef}>
                        <img src={user.image} referrerPolicy='no-referrer' alt="avatar" className="w-[40px] h-[40px] rounded-full cursor-pointer" onClick={() => setOpen((prev) => !prev)} />

                        {open && (
                            <div className="absolute top-12 right-0 w-52 bg-white shadow-xl rounded-xl p-3 z-50">
                                {/* User info */}
                                <div className="border-b pb-3 mb-3">
                                    <p className="font-semibold text-gray-600">{user.firstName} {user.lastName}</p>
                                    {/* <p className="text-sm text-gray-600">{user.email}</p> */}
                                </div>

                                {/* Menu links */}
                                <ul className="space-y-2 text-accent">
                                    <li>
                                        <Link className="block text-sm hover:text-blue-600" to="/account">
                                            My Account
                                        </Link>
                                    </li>
                                    <li>
                                        <Link className="block text-sm hover:text-blue-600" to="/my-orders">
                                            Orders
                                        </Link>
                                    </li>
                                    <li>
                                        <Link className="block text-sm hover:text-blue-600" to="/wishlist">
                                            Wishlist
                                        </Link>
                                    </li>
                                    <li>
                                        <button
                                            onClick={() => {
                                                localStorage.removeItem('token');
                                                window.location.reload('/');
                                                setUser(null);
                                            }}
                                            className="block text-left w-full text-sm text-red-600 hover:opacity-80"
                                        >
                                            Logout
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        )}
                    </div>
                    :
                    <div className='flex flex-row text-sm gap-3'>
                        <Link to="/login"> <button className="hover:opacity-80 transition-opacity cursor-pointer">Login</button></Link>
                        <Link to="/register"><button className="hover:opacity-80 transition-opacity cursor-pointer">Register</button></Link>
                    </div>
            }
        </>
    )
}
