// ProductPage.jsx
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';
import Header from '../components/Header';

export default function ProductPage() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_BACKEND_URL}/products`
                );
                setProducts(response.data.products || []);
            } catch (err) {
                setError(err.response?.data?.message || err.message || 'Failed to fetch products');
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    if (loading) {
        return (
            <div className='w-full h-screen flex flex-col'>
                <div className='flex-grow flex items-center justify-center'>
                    <div className='animate-pulse text-lg'>Loading products...</div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className='w-full h-screen flex flex-col'>
                <div className='flex-grow flex items-center justify-center'>
                    <div className='text-red-500 text-lg'>{error}</div>
                </div>
            </div>
        );
    }

    if (products.length === 0) {
        return (
            <div className='w-full h-screen flex flex-col'>
                <div className='flex-grow flex items-center justify-center'>
                    <div className='text-gray-500 text-lg'>No products found</div>
                </div>
            </div>
        );
    }

    return (
        <div className='w-full h-screen flex flex-col overflow-hidden'>
            <div className='flex-grow overflow-y-auto p-4'>
                {/* <div className='px-[300px] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-4 md:gap-6'> */}
                <div className='w-full flex justify-center p-4 flex-row flex-wrap'>
                    {products.map((product) => (
                        <ProductCard key={product._id} product={product} />
                    ))}
                </div>
            </div>
        </div>
    );
}