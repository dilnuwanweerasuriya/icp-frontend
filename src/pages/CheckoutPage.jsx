import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { emptyCart, getCart, getCartTotal } from '../utils/Cart'
import { BsArrowLeft, BsTruck } from 'react-icons/bs'
import { BiShield, BiCreditCard, BiChevronRight } from 'react-icons/bi'
import axios from 'axios'
import toast from 'react-hot-toast'

export default function CheckoutPage() {
    const navigate = useNavigate()
    const token = localStorage.getItem('token')
    const [cart, setCart] = useState(getCart())
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        paymentMethod: 'card',
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
        // Clear error when user starts typing
        if (error) setError('')
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (token === null) {
            navigate('/login')
            return
        }
        
        // Validate cart is not empty
        if (cart.length === 0) {
            setError('Your cart is empty')
            return
        }

        setLoading(true)
        setError('')

        try {
            // Prepare order data with cart items and totals
            const orderData = {
                ...formData,
                items: cart
            }

            // Send request and wait for response
            const response = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/orders`, 
                orderData,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    }
                }
            )

            // Only navigate on successful response
            if (response.status === 200 || response.status === 201) {
                // Clear cart after successful order (optional - implement clearCart function)
                setCart(emptyCart())
                
                // Navigate with order details
                navigate('/order-success', { 
                    state: { 
                        cart,
                        order: response.data.order, 
                    } 
                })
            }

        } catch (err) {
            toast.error('Order submission error:', err)
            
            // Set user-friendly error messages
            if (err.response) {
                // Server responded with error
                setError(err.response.data.message || 'Failed to place order. Please try again.')
            } else if (err.request) {
                // Request was made but no response
                setError('Network error. Please check your connection and try again.')
            } else {
                // Something else happened
                setError('An unexpected error occurred. Please try again.')
            }
        } finally {
            setLoading(false)
        }
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

            {/* Error Alert */}
            {error && (
                <div className="max-w-7xl mx-auto px-4 mt-4">
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                        {error}
                    </div>
                </div>
            )}

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
                                        disabled={loading}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none disabled:bg-gray-100"
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
                                        disabled={loading}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none disabled:bg-gray-100"
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
                                        disabled={loading}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none disabled:bg-gray-100"
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
                                        disabled={loading}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none disabled:bg-gray-100"
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
                                    disabled={loading}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none disabled:bg-gray-100"
                                />
                            </div>
                            {/* <div>
                                <label className="text-sm text-gray-600 font-medium block mb-1">Postal Code</label>
                                <input
                                    type="text"
                                    name="postalCode"
                                    value={formData.postalCode}
                                    onChange={handleChange}
                                    required
                                    disabled={loading}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none disabled:bg-gray-100"
                                />
                            </div> */}
                            
                            {/* Submit button moved to form for proper form submission */}
                            <button
                                type="submit"
                                disabled={loading || cart.length === 0}
                                className="w-full bg-blue-600 text-white py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 disabled:bg-gray-400 disabled:cursor-not-allowed lg:hidden"
                            >
                                {loading ? (
                                    <>
                                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                                        Processing...
                                    </>
                                ) : (
                                    <>
                                        Place Order
                                        <BiChevronRight size={20} />
                                    </>
                                )}
                            </button>
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
                                    disabled={loading}
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
                                    disabled={loading}
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

                    {/* Cart Items Preview */}
                    {cart.length > 0 && (
                        <div className="space-y-2 mb-4 max-h-40 overflow-y-auto">
                            {cart.slice(0, 3).map((item, index) => (
                                <div key={index} className="flex justify-between text-sm text-gray-600">
                                    <span className="truncate flex-1">{item.name} x{item.quantity}</span>
                                    <span>LKR {(item.price * item.quantity).toLocaleString()}</span>
                                </div>
                            ))}
                            {cart.length > 3 && (
                                <p className="text-xs text-gray-500">+{cart.length - 3} more items</p>
                            )}
                        </div>
                    )}

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
                        disabled={loading || cart.length === 0}
                        className="w-full bg-blue-600 text-white py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 disabled:bg-gray-400 disabled:cursor-not-allowed"
                    >
                        {loading ? (
                            <>
                                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                                Processing...
                            </>
                        ) : (
                            <>
                                Place Order
                                <BiChevronRight size={20} />
                            </>
                        )}
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