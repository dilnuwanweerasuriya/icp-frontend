import React, { useEffect, useState } from 'react';
import ProductCard from '../ProductCard';
import axios from 'axios';

const FeaturedProducts = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios
            .get(import.meta.env.VITE_BACKEND_URL + '/products')
            .then((response) => {
                setProducts(response.data.products || []);
            });
    }, []);

    const featuredProducts = products.slice(0, 4);

    return (
        <section className="container mx-auto py-12 px-4">
            <h2 className="text-4xl font-extrabold text-gray-800 text-center mb-10">
                Our Top Picks
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {featuredProducts.map(product => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </section>
    );
};

export default FeaturedProducts;