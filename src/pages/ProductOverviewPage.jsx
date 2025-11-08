import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast'
import Loader from '../components/Loader'
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi'
import {
    AiOutlineShoppingCart,
    AiOutlineHeart,
    AiFillHeart,
    AiOutlineCreditCard
} from 'react-icons/ai';
import { BsLightningCharge } from 'react-icons/bs';
import { FiShare2 } from 'react-icons/fi';
import { addToCart, getCart } from '../utils/Cart'

export default function ProductOverviewPage() {
    const params = useParams()
    const { productId } = params
    const [product, setProduct] = useState(null)
    const [status, setStatus] = useState('loading')

    const navigate = useNavigate()

    //
    const [selectedImage, setSelectedImage] = useState(0)

    useEffect(() => {
        if (status === 'loading') {
            axios.get(`${import.meta.env.VITE_BACKEND_URL}/products/${productId}`)
                .then((response) => {
                    setProduct(response.data.product)
                    setStatus('success')
                }).catch((err) => {
                    setStatus('error')
                    toast.error('Product not found!')
                    console.log(err)
                })
        }
    })

    const prevImage = () => {
        setSelectedImage((prev) => prev === 0 ? product.images.length - 1 : prev - 1)
    }

    const nextImage = () => {
        setSelectedImage((prev) => prev === product.images.length - 1 ? 0 : prev + 1)
    }

    const [isWishlisted, setIsWishlisted] = useState(false);
    const [quantity, setQuantity] = useState(1);

    const toggleWishlist = () => {
        setIsWishlisted(!isWishlisted);
        // Add your wishlist logic here
        console.log('Wishlist toggled:', !isWishlisted);
    };


    return (
        <div className='w-full h-screen flex flex-col'>
            {
                status === 'loading' && (
                    <Loader />
                )
            }
            {
                status === 'success' && (
                    // <div className="w-full h-[calc(100vh-100px)] flex ">
                    //     <div className="w-1/2 h-full flex justify-center items-center">
                    //         <img src={product.images[0]} className="max-w-[80%] max-h-[80%] object-contain" />
                    //     </div>
                    //     <div className="w-1/2 h-full p-10 flex flex-col gap-6">
                    //         <h1 className="text-4xl font-semibold">{product.name}</h1>
                    //         {/* Category */}
                    //         <h2 className="text-2xl font-semibold">LKR {product.price}</h2>
                    //         <p className='line-through'>LKR {product.labelledPrice}</p>
                    //         {/* Brand */}
                    //         {/* Model */}

                    //         <p className="text-lg">{product.description}</p>
                    //     </div>

                    // </div>
                    <div className='w-full h-[calc(100vh-100px)]'>
                        <div className='max-w-7xl mx-auto px-4'>
                            <div className='flex flex-col lg:flex-row gap-8'>
                                <div className='lg:w-1/2 flex flex-col gap-4'>
                                    <div className='relative bg-gray-50 rounded-2xl overflow-hidden aspect-square group'>
                                        <img src={product.images[selectedImage]} alt={product.name} className='w-full h-full object-contain p-8 transform transition-transform duration-500 group-hover:scale-105' />
                                        {product.images.length > 1 && (
                                            <>
                                                <button onClick={prevImage} className='absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur p-2 rounded-full shadow-lg hover:bg-white transition-all opacity-0 group-hover:opacity-100'>
                                                    <BiChevronLeft size={20} />
                                                </button>
                                                <button onClick={nextImage} className='absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur p-2 rounded-full shadow-lg hover:bg-white transition-all opacity-0 group-hover:opacity-100'>
                                                    <BiChevronRight size={20} />
                                                </button>
                                            </>
                                        )}
                                    </div>
                                    {
                                        product.images.length > 1 && (
                                            <div className='flex justify-center gap-2 overflow-x-auto pb-2'>
                                                {
                                                    product.images.map((image, index) => (
                                                        <button key={index} onClick={() => setSelectedImage(index)} className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${selectedImage === index ? 'border-blue-500 shadow-md' : 'border-gray-200 hover:border-gray-300'}`}>
                                                            <img src={image} alt={product.name} className='w-full h-full object-cover' />
                                                        </button>
                                                    ))
                                                }
                                            </div>
                                        )
                                    }
                                </div>

                                <div className='lg:w-1/2 flex flex-col gap-6'>
                                    <div className='flex items-center gap-2 text-sm text-gray-500 mt-3'>
                                        <span onClick={() => navigate('/products')} className='hover:text-gray-700 cursor-pointer'>Products</span>
                                        <span>/</span>
                                        <span className='hover:text-gray-700 cursor-pointer'>{product.category}</span>
                                        <span>/</span>
                                        <span className='text-gray-700'>{product.name}</span>
                                    </div>

                                    <div>
                                        <h1 className='text-3xl lg:text-4xl font-bold text-gray-900 mb-2'>
                                            {product.name}
                                        </h1>
                                    </div>

                                    <div className='border-t border-b py-4'>
                                        <div className='flex items-baseline gap-3'>
                                            <span className='text-3xl font-bold text-gray-300'>
                                                LKR {product.price.toLocaleString()}
                                            </span>
                                            {
                                                product.labelledPrice && (
                                                    <>
                                                        <span className='text-xl line-through text-gray-400'>LKR {product.labelledPrice.toLocaleString()}</span>
                                                        <span className='bg-green-100 text-green-700 px-2 py-1 rounded text-sm font-semibold'>
                                                            Save LKR {(product.labelledPrice - product.price).toLocaleString()}
                                                        </span>
                                                    </>
                                                )
                                            }
                                        </div>
                                    </div>

                                    <div className='flex flex-col gap-2'>
                                        <h2 className='text-2xl font-semibold mb-2'>
                                            Description
                                        </h2>
                                        <p className='text-gray-600'>
                                            {product.description}
                                        </p>
                                    </div>

                                    {/* buttons */}
                                    <div className='flex items-center gap-4'>
                                        <span className='text-gray-700 font-medium'>Quantity:</span>
                                        <div className='flex items-center border border-gray-300 rounded-lg'>
                                            <button
                                                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                                className='px-3 py-2 hover:bg-gray-100 transition-colors'
                                                disabled={quantity <= 1}
                                            >
                                                <span className='text-gray-600 text-xl'>−</span>
                                            </button>
                                            <input
                                                type='number'
                                                value={quantity}
                                                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                                                className='w-16 text-center border-x border-gray-300 py-2 focus:outline-none'
                                            />
                                            <button
                                                onClick={() => setQuantity(quantity + 1)}
                                                className='px-3 py-2 hover:bg-gray-100 transition-colors'
                                            >
                                                <span className='text-gray-600 text-xl'>+</span>
                                            </button>
                                        </div>
                                    </div>

                                    {/* Action Buttons - Replace all your button divs with this */}
                                    <div className='flex flex-col gap-3'>
                                        {/* Primary Actions - Add to Cart & Buy Now */}
                                        <div className='flex gap-3'>
                                            <button
                                                onClick={() => addToCart(product, quantity)}
                                                className='flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-semibold transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 shadow-lg'
                                            >
                                                <AiOutlineShoppingCart size={22} />
                                                Add to Cart
                                            </button>

                                            <button
                                                onClick={() => console.log(getCart())}
                                                className='flex-1 bg-black hover:bg-gray-800 text-white py-3 px-6 rounded-lg font-semibold transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 shadow-lg'
                                            >
                                                <BsLightningCharge size={20} />
                                                Buy Now
                                            </button>
                                        </div>

                                        {/* Secondary Actions - Wishlist & Share */}
                                        <div className='flex gap-3'>
                                            <button
                                                onClick={toggleWishlist}
                                                className={`flex-1 border-2 py-3 px-6 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${isWishlisted
                                                    ? 'bg-red-50 border-red-500 text-red-600 hover:bg-red-100'
                                                    : 'border-gray-300 text-gray-700 hover:border-gray-400 hover:bg-gray-50'
                                                    }`}
                                            >
                                                {isWishlisted ? (
                                                    <>
                                                        <AiFillHeart size={22} className='text-red-500' />
                                                        Added to Wishlist
                                                    </>
                                                ) : (
                                                    <>
                                                        <AiOutlineHeart size={22} />
                                                        Add to Wishlist
                                                    </>
                                                )}
                                            </button>

                                            <button
                                                onClick={() => {/* Add share logic */ }}
                                                className='border-2 border-gray-300 text-gray-700 py-3 px-6 rounded-lg font-semibold transition-all duration-300 hover:border-gray-400 hover:bg-gray-50 flex items-center justify-center gap-2'
                                            >
                                                <FiShare2 size={20} />
                                                Share
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
            {
                status === 'error' && (
                    <div className='flex-grow flex items-center justify-center'>
                        <div className='w-[400px] h-[300px] shadow-2xl flex justify-center items-center'>
                            No image available
                        </div>
                    </div>
                )
            }
        </div>
    )
}
