import React, { useState } from 'react'
import { FaShoppingCart, FaBars, FaTimes } from 'react-icons/fa'
import { Link, useLocation } from 'react-router-dom'
import UserData from './UserData'

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const location = useLocation()

    const toggleMenu = () => setIsMenuOpen((prev) => !prev)
    const closeMenu = () => setIsMenuOpen(false)

    const isActive = (path) => location.pathname === path

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Products', path: '/products' },
        { name: 'About', path: '/about' },
        { name: 'Contact', path: '/contact' },
    ]

    return (
        <header 
            className='fixed top-0 w-full z-[1000] transition-all duration-300 px-6 md:px-12 
                h-[70px] bg-white backdrop-blur-md shadow-lg border-b border-gray-100'
        >
            <div className="max-w-7xl mx-auto h-full flex justify-between items-center">
                
                <Link to="/" onClick={closeMenu} className="flex-shrink-0">
                    <img src="/logo.png" className="h-[40px] md:h-[50px] object-contain" alt="logo" />
                </Link>

                <nav className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            to={link.path}
                            className={`relative text-sm font-semibold uppercase tracking-wider transition-colors duration-300
                                ${isActive(link.path) ? 'text-accent' : 'text-gray-700 hover:text-accent'}
                                after:content-[""] after:absolute after:left-0 after:bottom-[-4px] after:w-0 after:h-[2px] 
                                after:bg-accent after:transition-all hover:after:w-full
                                ${isActive(link.path) ? 'after:w-full' : ''}`}
                        >
                            {link.name}
                        </Link>
                    ))}
                </nav>


                <div className="hidden md:flex items-center gap-6">
                    <div className="hover:scale-105 transition-transform cursor-pointer">
                        <UserData />
                    </div>
                    <Link to="/cart" className="relative group p-2 bg-gray-100 rounded-full hover:bg-accent hover:text-white transition-all">
                        <FaShoppingCart size={20} />
                        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full border-2 border-white">
                            0
                        </span>
                    </Link>
                </div>

                {/* Mobile Toggle */}
                <button
                    onClick={toggleMenu}
                    className="md:hidden text-gray-800 p-2 focus:outline-none"
                    aria-label="Toggle menu"
                >
                    {isMenuOpen ? <FaTimes size={28} /> : <FaBars size={28} />}
                </button>
            </div>

            <div 
                className={`fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 md:hidden
                ${isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
                onClick={closeMenu}
            />

            <div
                className={`fixed top-0 right-0 h-screen w-[75%] max-w-[300px] bg-white shadow-2xl z-[1001] transition-transform duration-300 ease-in-out md:hidden
                ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
            >
                <div className="flex flex-col p-8 pt-24 space-y-6">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            to={link.path}
                            onClick={closeMenu}
                            className={`text-xl font-bold ${isActive(link.path) ? 'text-accent' : 'text-gray-800'}`}
                        >
                            {link.name}
                        </Link>
                    ))}
                    
                    <hr className="border-gray-100" />
                    
                    <div className="flex flex-col gap-6">
                        <UserData />
                        <Link to="/cart" onClick={closeMenu} className="flex items-center gap-4 text-xl font-bold">
                            <FaShoppingCart /> Cart
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    )
}