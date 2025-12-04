import axios from "axios";
import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";

export default function ProductPage() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [query, setQuery] = useState("");

    // Fetch all products
    const fetchProducts = async () => {
        try {
            setLoading(true);
            const response = await axios.get(
                `${import.meta.env.VITE_BACKEND_URL}/products`
            );
            setProducts(response.data.products || []);
        } catch (err) {
            setError(
                err.response?.data?.message ||
                    err.message ||
                    "Failed to fetch products"
            );
        } finally {
            setLoading(false);
        }
    };

    // Fetch products by query
    const fetchSearch = async (value) => {
        try {
            setLoading(true);
            const response = await axios.get(
                `${import.meta.env.VITE_BACKEND_URL}/products/search/${value}`
            );
            setProducts(response.data.products || []);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    // Debounce search (300ms)
    useEffect(() => {
        if (query === "") {
            fetchProducts();
            return;
        }

        const delay = setTimeout(() => {
            fetchSearch(query);
        }, 300);

        return () => clearTimeout(delay);
    }, [query]);

    if (loading) {
        return (
            <div className="w-full h-screen flex items-center justify-center">
                <div className="animate-pulse text-lg">Loading products...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="w-full h-screen flex items-center justify-center">
                <div className="text-red-500 text-lg">{error}</div>
            </div>
        );
    }

    return (
        <div className="w-full h-screen flex flex-col overflow-hidden">
            {/* Search Bar */}
            <div className="w-full p-4 bg-white shadow-md z-10">
                <input
                    type="text"
                    placeholder="Search products..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="w-full max-w-xl mx-auto block border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
            </div>

            {/* Products */}
            <div className="flex-grow overflow-y-auto p-4">
                <div className="w-full flex justify-center p-4 flex-row flex-wrap gap-4">
                    {products.length > 0 ? (
                        products.map((product) => (
                            <ProductCard key={product._id} product={product} />
                        ))
                    ) : (
                        <div className="text-gray-500 text-lg">
                            No products found
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
