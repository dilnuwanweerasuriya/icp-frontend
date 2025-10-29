import axios from 'axios'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

export default function AdminAddProductPage() {

    const [productId, setProductId] = useState('')
    const [name, setName] = useState('')
    const [altName, setAltName] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState(0)
    const [labelledPrice, setLabelledPrice] = useState(0)
    const [images, setImages] = useState('')
    const [category, setCategory] = useState('')
    const [brand, setBrand] = useState('')
    const [model, setModel] = useState('')
    const [stock, setStock] = useState(0)
    const [isAvailable, setIsAvailable] = useState(false)

    const navigate = useNavigate()

    async function addProduct() {
        const token = localStorage.getItem("token")

        if (token == null) {
            toast.error('Please login first');
            navigate('/login')
            return
        } else {
            if (productId == '' || name == '' || altName == '' || description == '' || price == 0 || labelledPrice == 0 || images == '' || category == '' || brand == '' || model == '' || stock == 0) {
                toast.error('Please fill all the fields');
                return
            } else {
                try {
                    const altNameArray = altName.split(',')
                    const imagesArray = images.split(',')

                    await axios.post(import.meta.env.VITE_BACKEND_URL + '/products', {
                        productId: productId,
                        name: name,
                        altName: altNameArray,
                        description: description,
                        price: price,
                        labelledPrice: labelledPrice,
                        images: imagesArray,
                        category: category,
                        brand: brand,
                        model: model,
                        stock: stock,
                        isAvailable: isAvailable
                    }, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    })

                    toast.success('Product added successfully')
                    navigate('/admin/products')
                } catch (err) {
                    console.log(err);
                    toast.error('Failed to add product')
                }
            }
        }
    }

    return (
        <div className="w-full h-full min-h-screen flex justify-center items-start p-10 overflow-y-auto">
            <div className="w-full max-w-4xl bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl p-10 m-1">
                <h1 className="text-3xl font-bold text-accent mb-8 text-center">Add New Product</h1>

                <div className="space-y-6">
                    {/* Product ID */}
                    <div>
                        <label className="block font-semibold mb-2 text-gray-700">Product ID</label>
                        <input
                            type="text"
                            value={productId}
                            onChange={(e) => setProductId(e.target.value)}
                            className="w-full h-11 rounded-xl focus:ring-2 focus:ring-accent border border-gray-300 focus:border-accent shadow-sm px-4"
                            placeholder="e.g. PROD-001"
                        />
                        <p className="text-xs text-gray-500 mt-1 text-right">Provide a unique product ID</p>
                    </div>

                    {/* Name */}
                    <div>
                        <label className="block font-semibold mb-2 text-gray-700">Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full h-11 rounded-xl focus:ring-2 focus:ring-accent border border-gray-300 shadow-sm px-4"
                            placeholder="Product name"
                        />
                    </div>

                    {/* Alternative Names */}
                    <div>
                        <label className="block font-semibold mb-2 text-gray-700">Alternative Names</label>
                        <input
                            type="text"
                            value={altName}
                            onChange={(e) => setAltName(e.target.value)}
                            className="w-full h-11 rounded-xl focus:ring-2 focus:ring-accent border border-gray-300 shadow-sm px-4"
                            placeholder="Comma-separated alternative names"
                        />
                        <p className="text-xs text-gray-500 mt-1 text-right">Use commas to separate alternative names</p>
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block font-semibold mb-2 text-gray-700">Description</label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full min-h-[100px] rounded-xl focus:ring-2 focus:ring-accent border border-gray-300 shadow-sm px-4 py-2"
                            placeholder="Write a short description..."
                        />
                    </div>

                    {/* Price fields */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block font-semibold mb-2 text-gray-700">Price</label>
                            <input
                                type="number"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                className="w-full h-11 rounded-xl focus:ring-2 focus:ring-accent border border-gray-300 shadow-sm px-4"
                                placeholder="0.00"
                            />
                        </div>
                        <div>
                            <label className="block font-semibold mb-2 text-gray-700">Labelled Price</label>
                            <input
                                type="number"
                                value={labelledPrice}
                                onChange={(e) => setLabelledPrice(e.target.value)}
                                className="w-full h-11 rounded-xl focus:ring-2 focus:ring-accent border border-gray-300 shadow-sm px-4"
                                placeholder="0.00"
                            />
                        </div>
                    </div>

                    {/* Images */}
                    <div>
                        <label className="block font-semibold mb-2 text-gray-700">Images (URLs)</label>
                        <input
                            type="text"
                            value={images}
                            onChange={(e) => setImages(e.target.value)}
                            className="w-full h-11 rounded-xl focus:ring-2 focus:ring-accent border border-gray-300 shadow-sm px-4"
                            placeholder="https://example.com/image.jpg"
                        />
                    </div>

                    {/* Category */}
                    <div>
                        <label className="block font-semibold mb-2 text-gray-700">Category</label>
                        <select
                            className="w-full h-11 rounded-xl focus:ring-2 focus:ring-accent border border-gray-300 shadow-sm px-4"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                        >
                            <option>CPU</option>
                            <option>Graphic Cards</option>
                            <option>RAM</option>
                            <option>Storage Devices</option>
                            <option>Motherboards</option>
                            <option>Power Supplies</option>
                            <option>Mouse and Keyboards</option>
                            <option>Monitors</option>
                            <option>Other</option>
                        </select>
                    </div>

                    {/* Brand & Model */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block font-semibold mb-2 text-gray-700">Brand</label>
                            <input
                                type="text"
                                value={brand}
                                onChange={(e) => setBrand(e.target.value)}
                                className="w-full h-11 rounded-xl focus:ring-2 focus:ring-accent border border-gray-300 shadow-sm px-4"
                                placeholder="e.g. Intel, AMD"
                            />
                        </div>
                        <div>
                            <label className="block font-semibold mb-2 text-gray-700">Model</label>
                            <input
                                type="text"
                                value={model}
                                onChange={(e) => setModel(e.target.value)}
                                className="w-full h-11 rounded-xl focus:ring-2 focus:ring-accent border border-gray-300 shadow-sm px-4"
                                placeholder="e.g. i9-13900K"
                            />
                        </div>
                    </div>

                    <div className='grid grid-cols-2 gap-4'>
                        {/* Stock */}
                        <div>
                            <label className="block font-semibold mb-2 text-gray-700">Stock</label>
                            <input
                                type="number"
                                value={stock}
                                onChange={(e) => setStock(e.target.value)}
                                className="w-full h-11 rounded-xl focus:ring-2 focus:ring-accent border border-gray-300 shadow-sm px-4"
                                placeholder="Available units"
                            />
                        </div>

                        {/* Availability */}
                        <div>
                            <label className="block font-semibold mb-2 text-gray-700">Is Available?</label>
                            <select
                                className="w-full h-11 rounded-xl focus:ring-2 focus:ring-accent border border-gray-300 shadow-sm px-4"
                                value={isAvailable}
                                onChange={(e) => setIsAvailable(e.target.value)}
                            >
                                <option value="true">Yes</option>
                                <option value="false">No</option>
                            </select>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-center pt-6">
                        <button
                            onClick={addProduct}
                            className="w-48 h-12 bg-accent text-white text-lg font-semibold rounded-xl shadow-lg hover:bg-accent/80 transition-all duration-200 cursor-pointer"
                        >
                            Add Product
                        </button>
                    </div>
                </div>
            </div>
        </div>

    )
}
