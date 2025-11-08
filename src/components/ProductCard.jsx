import React from 'react';
import { Link } from 'react-router-dom';

export default function ProductCard(props) {
    const product = props.product;
    return (
        <div className='w-[300px] h-[450px]  m-4 shadow-2xl cursor-pointer relative hover:[&_.buttons]:opacity-100 hover:[&_.primary-image]:opacity-0'>
            <div className='w-full h-[300px] relative'>
                {product.images?.[0] ? (
                    <>
                        <img
                            src={product.images[1]}
                            alt={product.name}
                            className='w-full h-full absolute bg-white object-cover'
                        />
                        {product.images?.[0] && (
                            <img
                                src={product.images[0]}
                                alt={product.name}
                                className='w-full h-full absolute primary-image bg-white hover:opacity-0 transition-opacity duration-300 object-cover'
                            />
                        )}
                    </>
                ) : (
                    <div className='w-full h-full bg-gray-200 flex items-center justify-center'>
                        No image available
                    </div>
                )}
            </div>

            <div className='w-full h-[150px] flex flex-col justify-center items-center p-2 gap-3'>
                <h1 className='text-lg font-bold text-center line-clamp-1'>{product.name}</h1>
                <div className='flex justify-center items-center gap-3'>
                    <p className='text-lg font-semibold'>LKR {product.price?.toFixed(2)}</p>
                    {
                        product.labelledPrice > product.price && (
                            <p className='text-sm font-semibold line-through text-gray-600'>LKR {product.labelledPrice?.toFixed(2)}</p>
                        )
                    }
                </div>
            </div>

            <div className='w-full h-[150px] bottom-0 opacity-0 absolute buttons flex flex-row px-5 gap-4 justify-center items-center bg-white transition-opacity duration-300'>
                <Link to={`/products/${product.productId}`}><button className='w-[200px] h-[50px] bg-primary border-2 border-accent text-black font-bold rounded-lg cursor-pointer hover:bg-accent hover:text-white hover:scale-105'>View Details</button></Link>
            </div>
        </div>
    );
}