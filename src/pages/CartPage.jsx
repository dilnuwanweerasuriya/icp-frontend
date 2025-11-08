import React, { useState } from 'react'
import { addToCart, getCart, getCartTotal, removeFromCart } from '../utils/Cart';
import { BsArrowLeft, BsTruck } from 'react-icons/bs';
import { BiChevronRight, BiHeart, BiMinus, BiPlus, BiShield, BiTag, BiX } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';

export default function CartPage() {
    const [cart, setCart] = useState(getCart());

    const navigate = useNavigate()

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="bg-white shadow-sm sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <h1 className="text-2xl font-bold text-gray-900">Shopping Cart ({cart.length})</h1>
                        <button
                            onClick={() => navigate('/products')}
                            className="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
                        >
                            <BsArrowLeft size={20} />
                            Continue Shopping
                        </button>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Cart Items */}
                    <div className="lg:col-span-2 space-y-4">
                        {cart.map((item) => (
                            <div
                                key={item.productId}
                                className={`bg-white rounded-xl p-6 shadow-sm hover:shadow-md hover:[&_.tooltip]:opacity-100 transition-shadow ${!item.isAvailable ? 'opacity-75' : ''
                                    }`}
                            >
                                <div className="flex gap-4">
                                    {/* Product Image */}
                                    <div className="w-32 h-32 flex-shrink-0">
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="w-full h-full object-cover rounded-lg"
                                        />
                                    </div>

                                    {/* Product Details */}
                                    <div className="flex-1">
                                        <div className="flex justify-between mb-2 relative">
                                            <div>
                                                <span className='opacity-0 tooltip text-sm bg-black rounded-lg text-white p-3 absolute bottom-6'>{item.name}</span>
                                                <h3 className="font-semibold text-gray-900 text-lg hover:text-blue-600 cursor-pointer">
                                                    {
                                                        item.name.length > 20 ? item.name.slice(0, 20) + '...' : item.name
                                                    }
                                                </h3>
                                                <p className="text-sm text-gray-500">{item.category}</p>
                                            </div>
                                            <button
                                                onClick={() => {
                                                    removeFromCart(item.productId)
                                                    setCart(getCart())
                                                }
                                                }
                                                className="text-gray-400 hover:text-red-500 transition-colors"
                                            >
                                                <BiX size={20} />
                                            </button>
                                        </div>

                                        {/* Product Variants */}
                                        <div className="flex gap-4 text-sm text-gray-600 mb-3">
                                            {item.color && (
                                                <span>Color: <span className="font-medium">{item.color}</span></span>
                                            )}
                                            {item.size && (
                                                <span>Size: <span className="font-medium">{item.size}</span></span>
                                            )}
                                        </div>

                                        {/* Stock Status */}
                                        {/* {!item.inStock && (
                                            <p className="text-red-500 text-sm mb-2">Out of Stock</p>
                                        )} */}

                                        {/* Price and Quantity */}
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-4">
                                                {/* Quantity Selector */}
                                                <div className="flex items-center border border-gray-300 rounded-lg">
                                                    <button
                                                        onClick={
                                                            () => {
                                                                addToCart(item, -1)
                                                                setCart(getCart())
                                                            }
                                                        }
                                                        className="p-2 hover:bg-gray-100 transition-colors"
                                                    >
                                                        <BiMinus size={16} className={item.quantity <= 1 ? 'text-gray-300' : 'text-gray-600'} />
                                                    </button>
                                                    <span className="px-4 py-2 font-medium min-w-[50px] text-center">
                                                        {item.quantity}
                                                    </span>
                                                    <button
                                                        onClick={() => {
                                                            addToCart(item, 1)
                                                            setCart(getCart())
                                                        }
                                                        }
                                                        className="p-2 hover:bg-gray-100 transition-colors"
                                                    >
                                                        <BiPlus size={16} className={!item.inStock ? 'text-gray-300' : 'text-gray-600'} />
                                                    </button>
                                                </div>

                                                {/* Action Buttons */}
                                                <button
                                                    // onClick={() => moveToWishlist(item.id)}
                                                    className="text-gray-500 hover:text-red-500 transition-colors flex items-center gap-1 text-sm"
                                                >
                                                    <BiHeart size={16} />
                                                    <span className="hidden sm:inline">Save for later</span>
                                                </button>
                                            </div>

                                            {/* Price */}
                                            <div className="text-right">
                                                <div className="text-xl font-bold text-gray-900">
                                                    LKR {(item.price * item.quantity).toLocaleString()}
                                                </div>
                                                {item.originalPrice > item.price && (
                                                    <div className="text-sm text-gray-500 line-through">
                                                        LKR {(item.originalPrice * item.quantity).toLocaleString()}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}

                        {/* Trust Badges */}
                        <div className="bg-white rounded-xl p-6 shadow-sm">
                            <div className="grid grid-cols-3 gap-4">
                                <div className="text-center">
                                    <BsTruck className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                                    <p className="text-xs text-gray-600">Free Shipping</p>
                                    <p className="text-xs font-semibold">Orders over LKR 50,000</p>
                                </div>
                                <div className="text-center">
                                    <BiShield className="w-8 h-8 mx-auto mb-2 text-green-600" />
                                    <p className="text-xs text-gray-600">Secure Payment</p>
                                    <p className="text-xs font-semibold">100% Protected</p>
                                </div>
                                <div className="text-center">
                                    <BiTag className="w-8 h-8 mx-auto mb-2 text-purple-600" />
                                    <p className="text-xs text-gray-600">Best Price</p>
                                    <p className="text-xs font-semibold">Guaranteed</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Order Summary */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-xl p-6 shadow-sm sticky top-24">
                            <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>

                            {/* Promo Code */}
                            <div className="mb-6">
                                <label className="text-sm font-medium text-gray-700 mb-2 block">
                                    Promo Code
                                </label>
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        // value={promoCode}
                                        // onChange={(e) => setPromoCode(e.target.value)}
                                        placeholder="Enter code"
                                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                    <button
                                        // onClick={applyPromoCode}
                                        className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
                                    >
                                        Apply
                                    </button>
                                </div>
                                {/* {appliedPromo && (
                                    <p className="text-green-600 text-sm mt-2">
                                        ✓ Code {appliedPromo.code} applied!
                                    </p>
                                )} */}
                            </div>

                            {/* Price Breakdown */}
                            <div className="space-y-3 mb-6">
                                <div className="flex justify-between text-gray-600">
                                    <span>Subtotal</span>
                                    <span>LKR {getCartTotal().toLocaleString()}</span>
                                </div>
                                {/* {savings > 0 && (
                                    <div className="flex justify-between text-green-600">
                                        <span>Savings</span>
                                        <span>-LKR {savings.toLocaleString()}</span>
                                    </div>
                                )}
                                {appliedPromo && (
                                    <div className="flex justify-between text-green-600">
                                        <span>Promo Discount</span>
                                        <span>-LKR {discount.toLocaleString()}</span>
                                    </div>
                                )}
                                <div className="flex justify-between text-gray-600">
                                    <span>Shipping</span>
                                    <span>{shipping === 0 ? 'FREE' : `LKR ${shipping.toLocaleString()}`}</span>
                                </div>
                                <div className="flex justify-between text-gray-600">
                                    <span>Tax</span>
                                    <span>LKR {tax.toLocaleString()}</span>
                                </div> */}
                                <div className="border-t pt-3">
                                    <div className="flex justify-between text-xl font-bold text-gray-900">
                                        <span>Total</span>
                                        <span>LKR {getCartTotal().toLocaleString()}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Checkout Button */}
                            <button
                                onClick={() => navigate('/checkout')}
                                state={cart}
                                className="w-full bg-blue-600 text-white py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                                Proceed to Checkout
                                <BiChevronRight size={20} />
                            </button>

                            {/* Payment Methods */}
                            <div className="mt-6 pt-6 border-t">
                                <p className="text-sm text-gray-500 mb-3">We accept</p>
                                <div className="flex gap-2">
                                    <div className="w-12 h-8 bg-gray-100 rounded flex items-center justify-center text-xs font-bold">VISA</div>
                                    <div className="w-12 h-8 bg-gray-100 rounded flex items-center justify-center text-xs font-bold">MC</div>
                                    <div className="w-12 h-8 bg-gray-100 rounded flex items-center justify-center text-xs font-bold">AMEX</div>
                                    <div className="w-12 h-8 bg-gray-100 rounded flex items-center justify-center text-xs font-bold">PayPal</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
