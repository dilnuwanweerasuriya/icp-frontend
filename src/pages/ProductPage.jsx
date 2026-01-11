import React, { useState, useEffect, useMemo } from 'react';
import ProductCard from '../components/ProductCard';
import axios from 'axios';

const ProductsPage = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filters, setFilters] = useState({
        category: 'All',
        brand: 'All',
        minPrice: 0,
        maxPrice: 100000,
        searchTerm: '',
    });
    const [sortBy, setSortBy] = useState('name-asc');

    const fetchProducts = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/products`);
            // Standardizing the data extraction
            const data = response.data.products || response.data;
            setProducts(Array.isArray(data) ? data : []);
        } catch (err) {
            setError(err.response?.data?.message || err.message || "Failed to fetch products");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const uniqueCategories = useMemo(() => {
        const categories = [...new Set(products.map(p => p.category))].filter(Boolean);
        return ['All', ...categories];
    }, [products]);

    const uniqueBrands = useMemo(() => {
        const brands = [...new Set(products.map(p => p.brand))].filter(Boolean);
        return ['All', ...brands];
    }, [products]);

    const filteredProducts = useMemo(() => {
        let result = [...products];

        result = result.filter(p => p.isAvailable !== false);

        if (filters.searchTerm) {
            const term = filters.searchTerm.toLowerCase();
            result = result.filter(p => 
                p.name?.toLowerCase().includes(term) || 
                p.description?.toLowerCase().includes(term) ||
                p.altNames?.some(alt => alt.toLowerCase().includes(term))
            );
        }

        if (filters.category !== 'All') {
            result = result.filter(p => p.category === filters.category);
        }

        if (filters.brand !== 'All') {
            result = result.filter(p => p.brand === filters.brand);
        }

        result = result.filter(p => 
            p.price >= filters.minPrice && p.price <= filters.maxPrice
        );
        

        result.sort((a, b) => {
            switch (sortBy) {
                case 'price-asc': return a.price - b.price;
                case 'price-desc': return b.price - a.price;
                case 'name-asc': return a.name.localeCompare(b.name);
                case 'name-desc': return b.name.localeCompare(a.name);
                default: return 0;
            }
        });

        return result;
    }, [products, filters, sortBy]);

    const handleFilterChange = (e) => {
        const { name, value, type } = e.target;
        setFilters(prev => ({
            ...prev,
            [name]: type === 'number' ? (value === '' ? 0 : parseFloat(value)) : value,
        }));
    };

    if (loading) return <div className="flex justify-center items-center h-screen">Loading...</div>;
    if (error) return <div className="text-red-500 text-center py-10">{error}</div>;

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4">
            <div className="max-w-7xl mx-auto">
                <header className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Shop Catalog</h1>
                </header>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Filter Sidebar */}
                    <aside className="w-full lg:w-64 space-y-6">
                        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200">
                            <h2 className="font-semibold mb-4">Search</h2>
                            <input
                                type="text"
                                name="searchTerm"
                                placeholder="Search name or keywords..."
                                value={filters.searchTerm}
                                onChange={handleFilterChange}
                                className="w-full p-2 border rounded-lg text-sm"
                            />

                            <h2 className="font-semibold mt-6 mb-4">Category</h2>
                            <select 
                                name="category" 
                                value={filters.category} 
                                onChange={handleFilterChange}
                                className="w-full p-2 border rounded-lg text-sm"
                            >
                                {uniqueCategories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                            </select>

                            <h2 className="font-semibold mt-6 mb-4">Brand</h2>
                            <select 
                                name="brand" 
                                value={filters.brand} 
                                onChange={handleFilterChange}
                                className="w-full p-2 border rounded-lg text-sm"
                            >
                                {uniqueBrands.map(brand => <option key={brand} value={brand}>{brand}</option>)}
                            </select>

                            <h2 className="font-semibold mt-6 mb-4">Price Range</h2>
                            <div className="flex gap-2">
                                <input 
                                    type="number" 
                                    name="minPrice" 
                                    value={filters.minPrice} 
                                    onChange={handleFilterChange} 
                                    className="w-1/2 p-2 border rounded-lg text-sm" 
                                />
                                <input 
                                    type="number" 
                                    name="maxPrice" 
                                    value={filters.maxPrice} 
                                    onChange={handleFilterChange} 
                                    className="w-1/2 p-2 border rounded-lg text-sm" 
                                />
                            </div>
                            
                            <button 
                                onClick={() => setFilters({ category: 'All', brand: 'All', minPrice: 0, maxPrice: 5000, searchTerm: '' })}
                                className="w-full mt-6 text-sm text-blue-600 hover:underline"
                            >
                                Reset all filters
                            </button>
                        </div>
                    </aside>

                    <div className="flex-1">
                        <div className="flex justify-between items-center mb-6">
                            <span className="text-sm text-gray-500">{filteredProducts.length} products found</span>
                            <select 
                                value={sortBy} 
                                onChange={(e) => setSortBy(e.target.value)}
                                className="p-2 bg-transparent border-none text-sm font-medium focus:ring-0"
                            >
                                <option value="name-asc">Sort by: A-Z</option>
                                <option value="price-asc">Price: Low to High</option>
                                <option value="price-desc">Price: High to Low</option>
                            </select>
                        </div>

                        {filteredProducts.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                                {filteredProducts.map(product => (
                                    <ProductCard 
                                        key={product.productId} 
                                        product={product} 
                                    />
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-20 bg-white rounded-xl border border-dashed">
                                <p className="text-gray-500">No products match your criteria.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductsPage;