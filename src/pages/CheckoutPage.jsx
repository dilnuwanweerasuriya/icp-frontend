import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getCart, getCartTotal } from '../utils/Cart'
import { BsArrowLeft, BsTruck } from 'react-icons/bs'
import { BiShield, BiCreditCard, BiChevronRight } from 'react-icons/bi'

export default function CheckoutPage() {
    const navigate = useNavigate()
    const [cart, setCart] = useState(getCart())
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        postalCode: '',
        paymentMethod: 'card',
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        // Save order or navigate to confirmation
        navigate('/order-confirmation', { state: { cart, formData } })
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white shadow-sm sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-gray-900">Checkout</h1>
                    <button
                        onClick={() => navigate('/cart')}
                        className="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
                    >
                        <BsArrowLeft size={20} /> Back to Cart
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left: Shipping + Payment */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Shipping Info */}
                    <div className="bg-white rounded-xl p-6 shadow-sm">
                        <h2 className="text-xl font-bold text-gray-900 mb-4">Shipping Information</h2>
                        <form className="space-y-4" onSubmit={handleSubmit}>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="text-sm text-gray-600 font-medium block mb-1">Full Name</label>
                                    <input
                                        type="text"
                                        name="fullName"
                                        value={formData.fullName}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="text-sm text-gray-600 font-medium block mb-1">Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="text-sm text-gray-600 font-medium block mb-1">Phone</label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="text-sm text-gray-600 font-medium block mb-1">City</label>
                                    <input
                                        type="text"
                                        name="city"
                                        value={formData.city}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="text-sm text-gray-600 font-medium block mb-1">Address</label>
                                <input
                                    type="text"
                                    name="address"
                                    value={formData.address}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                />
                            </div>
                            <div>
                                <label className="text-sm text-gray-600 font-medium block mb-1">Postal Code</label>
                                <input
                                    type="text"
                                    name="postalCode"
                                    value={formData.postalCode}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                />
                            </div>
                        </form>
                    </div>

                    {/* Payment Method */}
                    <div className="bg-white rounded-xl p-6 shadow-sm">
                        <h2 className="text-xl font-bold text-gray-900 mb-4">Payment Method</h2>
                        <div className="space-y-4">
                            <label className="flex items-center gap-3 border border-gray-300 rounded-lg p-3 cursor-pointer hover:border-blue-500 transition">
                                <input
                                    type="radio"
                                    name="paymentMethod"
                                    value="card"
                                    checked={formData.paymentMethod === 'card'}
                                    onChange={handleChange}
                                    className="accent-blue-600"
                                />
                                <BiCreditCard size={20} className="text-blue-600" />
                                <span className="font-medium text-gray-700">Credit / Debit Card</span>
                            </label>

                            <label className="flex items-center gap-3 border border-gray-300 rounded-lg p-3 cursor-pointer hover:border-blue-500 transition">
                                <input
                                    type="radio"
                                    name="paymentMethod"
                                    value="cod"
                                    checked={formData.paymentMethod === 'cod'}
                                    onChange={handleChange}
                                    className="accent-blue-600"
                                />
                                <BsTruck size={20} className="text-green-600" />
                                <span className="font-medium text-gray-700">Cash on Delivery</span>
                            </label>
                        </div>
                    </div>
                </div>

                {/* Right: Order Summary */}
                <div className="bg-white rounded-xl p-6 shadow-sm h-fit sticky top-24">
                    <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>

                    <div className="space-y-3 mb-6">
                        <div className="flex justify-between text-gray-600">
                            <span>Subtotal</span>
                            <span>LKR {getCartTotal().toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-gray-600">
                            <span>Shipping</span>
                            <span>{getCartTotal() > 50000 ? 'FREE' : 'LKR 1,000'}</span>
                        </div>
                        <div className="border-t pt-3">
                            <div className="flex justify-between text-xl font-bold text-gray-900">
                                <span>Total</span>
                                <span>
                                    LKR {(getCartTotal() + (getCartTotal() > 50000 ? 0 : 1000)).toLocaleString()}
                                </span>
                            </div>
                        </div>
                    </div>

                    <button
                        onClick={handleSubmit}
                        className="w-full bg-blue-600 text-white py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                    >
                        Place Order
                        <BiChevronRight size={20} />
                    </button>

                    {/* Trust Badges */}
                    <div className="mt-6 pt-6 border-t grid grid-cols-3 gap-4 text-center">
                        <div>
                            <BsTruck className="w-6 h-6 mx-auto text-blue-600 mb-1" />
                            <p className="text-xs text-gray-600">Fast Delivery</p>
                        </div>
                        <div>
                            <BiShield className="w-6 h-6 mx-auto text-green-600 mb-1" />
                            <p className="text-xs text-gray-600">Secure Payment</p>
                        </div>
                        <div>
                            <BiCreditCard className="w-6 h-6 mx-auto text-purple-600 mb-1" />
                            <p className="text-xs text-gray-600">Multiple Options</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
