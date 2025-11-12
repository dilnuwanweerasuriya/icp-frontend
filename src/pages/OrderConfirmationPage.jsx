import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { BsCheckCircleFill, BsPrinter, BsEnvelope, BsHouseDoor, BsTruck, BsBox, BsArrowLeft } from 'react-icons/bs'
import { BiPackage, BiCopy, BiDownload } from 'react-icons/bi'
import { MdContentCopy } from 'react-icons/md'

export default function OrderConfirmationPage() {
    const location = useLocation()
    const navigate = useNavigate()
    const [copied, setCopied] = useState(false)

    // Get order data from navigation state
    const { order, cart } = location.state || {}
    
    // Generate order number if not provided
    const orderNumber = order.orderId || `ORD${Date.now()}`
    
    // Calculate estimated delivery date (5-7 business days)
    const estimatedDelivery = new Date()
    estimatedDelivery.setDate(estimatedDelivery.getDate() + 7)
    
    // Calculate totals
    const subtotal = cart?.reduce((sum, item) => sum + (item.price * item.quantity), 0) || 0
    const shipping = subtotal > 50000 ? 0 : 1000
    const total = subtotal + shipping

    // Redirect if no order data
    useEffect(() => {
        if (!cart) {
            navigate('/')
        }
    }, [cart, navigate])

    const handleCopyOrderNumber = () => {
        navigator.clipboard.writeText(orderNumber)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    const handlePrint = () => {
        window.print()
    }

    const handleDownloadInvoice = () => {
        // Implement invoice download logic
        console.log('Downloading invoice...')
    }

    if (!cart) {
        return null
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Success Header */}
            <div className="bg-green-50 border-b border-green-200">
                <div className="max-w-4xl mx-auto px-4 py-8 text-center">
                    <BsCheckCircleFill className="w-16 h-16 text-green-500 mx-auto mb-4" />
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Order Confirmed!</h1>
                    <p className="text-gray-600 mb-4">
                        Thank you for your purchase. Your order has been successfully placed.
                    </p>
                    
                    {/* Order Number */}
                    <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm">
                        <span className="text-sm text-gray-600">Order Number:</span>
                        <span className="font-mono font-bold text-gray-900">{orderNumber}</span>
                        <button
                            onClick={handleCopyOrderNumber}
                            className="ml-2 text-gray-500 hover:text-gray-700 transition"
                            title="Copy order number"
                        >
                            {copied ? (
                                <BsCheckCircleFill className="w-5 h-5 text-green-500" />
                            ) : (
                                <MdContentCopy className="w-5 h-5" />
                            )}
                        </button>
                    </div>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
                {/* Order Status Timeline */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Order Status</h2>
                    <div className="relative">
                        <div className="absolute left-8 top-8 bottom-0 w-0.5 bg-gray-200"></div>
                        <div className="space-y-6">
                            {/* Order Placed */}
                            <div className="flex items-start gap-4">
                                <div className="relative z-10 w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                                    <BsCheckCircleFill className="w-8 h-8 text-green-600" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-semibold text-gray-900">Order Placed</h3>
                                    <p className="text-sm text-gray-600">
                                        {new Date().toLocaleDateString('en-US', { 
                                            weekday: 'short', 
                                            year: 'numeric', 
                                            month: 'short', 
                                            day: 'numeric',
                                            hour: '2-digit',
                                            minute: '2-digit'
                                        })}
                                    </p>
                                </div>
                            </div>

                            {/* Processing */}
                            <div className="flex items-start gap-4">
                                <div className="relative z-10 w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                                    <BiPackage className="w-8 h-8 text-gray-400" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-semibold text-gray-400">Processing</h3>
                                    <p className="text-sm text-gray-400">Your order is being prepared</p>
                                </div>
                            </div>

                            {/* Shipped */}
                            <div className="flex items-start gap-4">
                                <div className="relative z-10 w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                                    <BsTruck className="w-8 h-8 text-gray-400" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-semibold text-gray-400">Shipped</h3>
                                    <p className="text-sm text-gray-400">On the way to you</p>
                                </div>
                            </div>

                            {/* Delivered */}
                            <div className="flex items-start gap-4">
                                <div className="relative z-10 w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                                    <BsHouseDoor className="w-8 h-8 text-gray-400" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-semibold text-gray-400">Delivered</h3>
                                    <p className="text-sm text-gray-600">
                                        Estimated: {estimatedDelivery.toLocaleDateString('en-US', { 
                                            weekday: 'short', 
                                            month: 'short', 
                                            day: 'numeric' 
                                        })}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Order Details Grid */}
                <div className="grid md:grid-cols-2 gap-6">
                    {/* Shipping Information */}
                    <div className="bg-white rounded-xl shadow-sm p-6">
                        <div className="flex items-center gap-2 mb-4">
                            <BsTruck className="w-5 h-5 text-blue-600" />
                            <h2 className="text-lg font-semibold text-gray-900">Shipping Information</h2>
                        </div>
                        <div className="space-y-2 text-sm">
                            <p className="text-gray-900 font-medium">{order.fullName}</p>
                            <p className="text-gray-600">{order.address}</p>
                            <p className="text-gray-600">{order.city}, {order.postalCode}</p>
                            <p className="text-gray-600">{order.phone}</p>
                            <p className="text-gray-600">{order.email}</p>
                        </div>
                    </div>

                    {/* Payment Information */}
                    <div className="bg-white rounded-xl shadow-sm p-6">
                        <div className="flex items-center gap-2 mb-4">
                            <BsBox className="w-5 h-5 text-green-600" />
                            <h2 className="text-lg font-semibold text-gray-900">Payment Information</h2>
                        </div>
                        <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                                <span className="text-gray-600">Payment Method:</span>
                                <span className="text-gray-900 font-medium">
                                    {order.paymentMethod === 'cod' ? 'Cash on Delivery' : 'Credit/Debit Card'}
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Payment Status:</span>
                                <span className="text-yellow-600 font-medium">
                                    {order.paymentMethod === 'cod' ? 'Pending' : 'Paid'}
                                </span>
                            </div>
                            {order.paymentMethod === 'cod' && (
                                <div className="mt-3 p-3 bg-yellow-50 rounded-lg">
                                    <p className="text-xs text-yellow-800">
                                        Please keep LKR {total.toLocaleString()} ready for payment upon delivery
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Order Items */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Order Items</h2>
                    <div className="space-y-4">
                        {cart.map((item, index) => (
                            <div key={index} className="flex items-center gap-4 pb-4 border-b last:border-0">
                                <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden">
                                    {item.image ? (
                                        <img 
                                            src={item.image} 
                                            alt={item.name}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center">
                                            <BiPackage className="w-8 h-8 text-gray-400" />
                                        </div>
                                    )}
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-medium text-gray-900">{item.name}</h3>
                                    <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                                </div>
                                <div className="text-right">
                                    <p className="font-semibold text-gray-900">
                                        LKR {(item.price * item.quantity).toLocaleString()}
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        LKR {item.price.toLocaleString()} each
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Order Summary */}
                    <div className="mt-6 pt-6 border-t space-y-2">
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Subtotal</span>
                            <span className="text-gray-900">LKR {subtotal.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Shipping</span>
                            <span className="text-gray-900">
                                {shipping === 0 ? 'FREE' : `LKR ${shipping.toLocaleString()}`}
                            </span>
                        </div>
                        <div className="flex justify-between text-lg font-semibold pt-2 border-t">
                            <span className="text-gray-900">Total</span>
                            <span className="text-gray-900">LKR {total.toLocaleString()}</span>
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                    <div className="flex flex-col sm:flex-row gap-4">
                        <button
                            onClick={() => navigate('/')}
                            className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition flex items-center justify-center gap-2"
                        >
                            Continue Shopping
                        </button>
                        <button
                            onClick={handlePrint}
                            className="flex-1 bg-gray-100 text-gray-700 py-3 px-6 rounded-lg font-semibold hover:bg-gray-200 transition flex items-center justify-center gap-2"
                        >
                            <BsPrinter className="w-5 h-5" />
                            Print Order
                        </button>
                        <button
                            onClick={handleDownloadInvoice}
                            className="flex-1 bg-gray-100 text-gray-700 py-3 px-6 rounded-lg font-semibold hover:bg-gray-200 transition flex items-center justify-center gap-2"
                        >
                            <BiDownload className="w-5 h-5" />
                            Download Invoice
                        </button>
                    </div>
                </div>

                {/* Additional Information */}
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                    <h3 className="font-semibold text-blue-900 mb-2">What's Next?</h3>
                    <ul className="space-y-2 text-sm text-blue-800">
                        <li className="flex items-start gap-2">
                            <BsEnvelope className="w-4 h-4 mt-0.5 flex-shrink-0" />
                            <span>You will receive an order confirmation email shortly</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <BsTruck className="w-4 h-4 mt-0.5 flex-shrink-0" />
                            <span>We'll notify you when your order ships</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <BiPackage className="w-4 h-4 mt-0.5 flex-shrink-0" />
                            <span>Track your order using order number: <strong>{orderNumber}</strong></span>
                        </li>
                    </ul>
                </div>

                {/* Customer Support */}
                <div className="text-center text-sm text-gray-600">
                    <p>Need help? Contact our customer support</p>
                    <p className="font-semibold text-gray-900 mt-1">
                        Email: support@store.com | Phone: +94 11 234 5678
                    </p>
                </div>
            </div>

            {/* Print Styles */}
            <style>{`
                @media print {
                    body * {
                        visibility: hidden;
                    }
                    .max-w-4xl, .max-w-4xl * {
                        visibility: visible;
                    }
                    .max-w-4xl {
                        position: absolute;
                        left: 0;
                        top: 0;
                    }
                    button {
                        display: none !important;
                    }
                }
            `}</style>
        </div>
    )
}