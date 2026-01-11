import React, { useState } from 'react'
import { FaShoppingCart } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import UserData from './UserData'

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const toggleMenu = () => setIsMenuOpen((prev) => !prev)
    const closeMenu = () => setIsMenuOpen(false)

    return (
        <header className="w-full h-[80px] md:h-[100px] bg-accent flex justify-between items-center px-4 md:px-10 relative z-[100] shadow-sm">
            <Link to="/" onClick={closeMenu}>
                <img src="/logo.png" className="h-[50px] md:h-[70px] object-contain" alt="logo" />
            </Link>

            <nav className="hidden md:flex flex-1 justify-center items-center text-lg lg:text-xl text-primary gap-[20px] lg:gap-[40px] font-medium">
                <Link to="/" className="hover:text-white transition-colors">Home</Link>
                <Link to="/products" className="hover:text-white transition-colors">Products</Link>
                <Link to="/about" className="hover:text-white transition-colors">About</Link>
                <Link to="/contact" className="hover:text-white transition-colors">Contact</Link>
            </nav>

            <div className="hidden md:flex items-center text-lg lg:text-xl text-primary gap-[20px] lg:gap-[30px]">
                <UserData />
                <Link to="/cart" className="relative hover:text-white transition-colors">
                    <FaShoppingCart size={24} />
                </Link>
            </div>

            <button
                onClick={toggleMenu}
                className="md:hidden flex flex-col justify-center items-center gap-1.5 p-2 z-[10001]"
                aria-label="Toggle menu"
            >
                <span
                    className={`block w-6 h-0.5 bg-primary transition-all duration-300 ${
                        isMenuOpen ? 'rotate-45 translate-y-2' : ''
                    }`}
                ></span>
                <span
                    className={`block w-6 h-0.5 bg-primary transition-all duration-300 ${
                        isMenuOpen ? 'opacity-0' : 'opacity-100'
                    }`}
                ></span>
                <span
                    className={`block w-6 h-0.5 bg-primary transition-all duration-300 ${
                        isMenuOpen ? '-rotate-45 -translate-y-2' : ''
                    }`}
                ></span>
            </button>

            <div
                className={`fixed inset-0 bg-accent z-[10000] md:hidden transition-all duration-500 ease-in-out ${
                    isMenuOpen 
                        ? 'translate-x-0 opacity-100' 
                        : 'translate-x-full opacity-0 pointer-events-none'
                }`}
            >
                <div className="flex flex-col items-center justify-center h-full space-y-8 text-2xl text-primary font-semibold">
                    <Link to="/" onClick={closeMenu} className="hover:text-white">Home</Link>
                    <Link to="/products" onClick={closeMenu} className="hover:text-white">Products</Link>
                    <Link to="/about" onClick={closeMenu} className="hover:text-white">About</Link>
                    <Link to="/contact" onClick={closeMenu} className="hover:text-white">Contact</Link>
                    
                    <hr className="w-1/2 border-primary/20" />
                    
                    <div className="flex items-center gap-8">
                        <UserData />
                        <Link to="/cart" onClick={closeMenu} className="relative">
                            <FaShoppingCart size={30} />
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    )
}