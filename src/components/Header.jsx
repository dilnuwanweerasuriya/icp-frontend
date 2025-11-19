import React, { useState } from 'react'
import { FaShoppingCart } from 'react-icons/fa'
import { Link } from 'react-router-dom'

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const toggleMenu = () => setIsMenuOpen((prev) => !prev)
    const closeMenu = () => setIsMenuOpen(false)

    return (
        <div className="w-full h-[80px] md:h-[100px] bg-accent flex justify-between items-center px-4 md:px-6 relative">
            {/* Logo */}
            <img src="/logo.png" className="h-[60px] md:h-full py-2" alt="logo" />

            {/* Desktop Navigation */}
            <div className="hidden md:flex flex-1 justify-center items-center text-lg lg:text-xl text-primary gap-[20px] lg:gap-[30px]">
                <Link to="/" className="hover:opacity-80 transition-opacity">Home</Link>
                <Link to="/products" className="hover:opacity-80 transition-opacity">Products</Link>
                <Link to="/about" className="hover:opacity-80 transition-opacity">About</Link>
                <Link to="/contact" className="hover:opacity-80 transition-opacity">Contact</Link>
            </div>

            {/* Desktop Cart */}
            <div className="hidden md:flex items-center text-lg lg:text-xl text-primary gap-[20px] lg:gap-[30px]">
                <Link to="/cart" className="hover:opacity-80 transition-opacity">
                    <FaShoppingCart />
                </Link>
            </div>

            {/* Hamburger Menu */}
            <button
                onClick={toggleMenu}
                className="md:hidden ml-auto flex flex-col justify-center items-center gap-1.5 p-2"
                aria-label="Toggle menu"
                aria-expanded={isMenuOpen}
            >
                <span
                    className={`block w-6 h-0.5 bg-primary transition-transform duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''
                        }`}
                ></span>
                <span
                    className={`block w-6 h-0.5 bg-primary transition-opacity duration-300 ${isMenuOpen ? 'opacity-0' : ''
                        }`}
                ></span>
                <span
                    className={`block w-6 h-0.5 bg-primary transition-transform duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''
                        }`}
                ></span>
            </button>

            {/* Mobile Menu */}
            <div
                className={`absolute z-[9999] top-[80px] left-0 w-full bg-accent md:hidden transition-all duration-300 ease-in-out ${isMenuOpen
                        ? 'max-h-screen opacity-100'
                        : 'max-h-0 opacity-0 overflow-hidden'
                    }`}
            >
                <div className="flex flex-col text-lg text-primary py-4">
                    <Link to="/" onClick={closeMenu} className="px-6 py-3 hover:bg-primary/10 transition-colors">
                        Home
                    </Link>
                    <Link to="/products" onClick={closeMenu} className="px-6 py-3 hover:bg-primary/10 transition-colors">
                        Products
                    </Link>
                    <Link to="/about" onClick={closeMenu} className="px-6 py-3 hover:bg-primary/10 transition-colors">
                        About
                    </Link>
                    <Link to="/contact" onClick={closeMenu} className="px-6 py-3 hover:bg-primary/10 transition-colors">
                        Contact
                    </Link>
                    <Link to="/cart" onClick={closeMenu} className="px-6 py-3 hover:bg-primary/10 transition-colors">
                        <FaShoppingCart />
                    </Link>
                </div>
            </div>
        </div>
    )
}
