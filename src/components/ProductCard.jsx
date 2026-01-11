import React from 'react';
import { Link } from 'react-router-dom';

export default function ProductCard({ product }) {
    if (!product) return null;

    const isOnSale = product.labelledPrice > product.price;
    const isOutOfStock = product.stock <= 0 || !product.isAvailable;

    return (
        <div className='w-[300px] h-[450px] m-4 shadow-xl border border-gray-100 rounded-xl overflow-hidden cursor-pointer relative group bg-white transition-all duration-300 hover:shadow-2xl'>
            
            <div className='w-full h-[300px] relative overflow-hidden bg-gray-50'>
                {isOnSale && !isOutOfStock && (
                    <div className="absolute top-3 left-3 z-20 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                        SALE
                    </div>
                )}

                {isOutOfStock && (
                    <div className="absolute inset-0 z-30 bg-white/60 flex items-center justify-center">
                        <span className="bg-black text-white px-4 py-2 font-bold rounded-md">SOLD OUT</span>
                    </div>
                )}

                {product.images && product.images.length > 0 ? (
                    <>
                        {product.images[1] && (
                            <img
                                src={product.images[1]}
                                alt={`${product.name} alternate`}
                                className='w-full h-full absolute object-cover'
                            />
                        )}
                        <img
                            src={product.images[0]}
                            alt={product.name}
                            className={`w-full h-full absolute object-cover transition-opacity duration-500 z-10 ${
                                product.images[1] ? 'group-hover:opacity-0' : ''
                            }`}
                        />
                    </>
                ) : (
                    <div className='w-full h-full flex items-center justify-center text-gray-400'>
                        No Image
                    </div>
                )}
            </div>

            <div className='w-full h-[150px] flex flex-col justify-center items-center p-4 gap-2 bg-white'>
                <span className="text-xs text-gray-400 uppercase tracking-widest">{product.brand}</span>
                <h1 className='text-lg font-bold text-center line-clamp-1 text-gray-800'>{product.name}</h1>
                
                <div className='flex flex-col items-center'>
                    <p className='text-xl font-bold text-primary'>LKR {product.price?.toLocaleString()}</p>
                    {isOnSale && (
                        <p className='text-sm font-medium line-through text-gray-400'>
                            LKR {product.labelledPrice?.toLocaleString()}
                        </p>
                    )}
                </div>
            </div>

            <div className='absolute inset-x-0 bottom-[150px] z-40 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0 flex justify-center pb-4'>
                <Link 
                    to={`/products/${product.productId}`} 
                    className={`px-8 py-3 rounded-full font-bold shadow-lg transition-transform active:scale-95 ${
                        isOutOfStock 
                        ? 'bg-gray-400 cursor-not-allowed text-white' 
                        : 'bg-black text-white hover:bg-gray-800'
                    }`}
                >
                    {isOutOfStock ? 'View Details' : 'Quick View'}
                </Link>
            </div>
        </div>
    );
}