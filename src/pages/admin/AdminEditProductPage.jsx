import axios from 'axios'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import uploadFile from '../../utils/MediaUpload'
import { useLocation, useNavigate } from 'react-router-dom'

export default function AdminEditProductPage() {
    const location = useLocation();
    const product = location.state;

    const [productId, setProductId] = useState(product?.productId || '')
    const [name, setName] = useState(product?.name || '')
    const [altNames, setAltNames] = useState(product?.altNames?.join(",") || '')
    const [description, setDescription] = useState(product?.description || '')
    const [price, setPrice] = useState(product?.price || 0)
    const [labelledPrice, setLabelledPrice] = useState(product?.labelledPrice || 0)
    const [files, setFiles] = useState([])
    const [category, setCategory] = useState(product?.category || '')
    const [brand, setBrand] = useState(product?.brand || '')
    const [model, setModel] = useState(product?.model || '')
    const [stock, setStock] = useState(product?.stock || 0)
    const [isAvailable, setIsAvailable] = useState(product?.isAvailable || false)

    const navigate = useNavigate()

    useEffect(() => {
        if (!location.state) navigate("/admin/products");
    }, [location.state, navigate]);

    async function updateProduct() {
        const token = localStorage.getItem("token")

        if (!token) {
            toast.error("Please login first");
            navigate("/login");
            return;
        }

        // Validate required fields first
        if (productId === "" || name === "" || description === "" || category === "" || brand === "" || model === "") {
            toast.error("Please fill in all required fields.");
            return;
        }

        let images = [];
        
        // Upload new images if any files are selected
        if (files && files.length > 0) {
            const imagePromises = []
            for (let i = 0; i < files.length; i++) {
                const promise = uploadFile(files[i])
                imagePromises.push(promise);
            }

            try {
                const uploadedImages = await Promise.all(imagePromises);
                images = uploadedImages;
            } catch (err) {
                toast.error("Error uploading images. Please try again.");
                console.log("Error uploading images:", err);
                // Don't return here - allow update with existing images
            }
        }

        // Combine new images with existing ones, or use only existing if no new uploads
        if (images && images.length > 0) {
            images = images.concat(product.images || []);
        } else {
            images = product.images || [];
        }

        try {
            const altNamesInArray = altNames.split(",").map(n => n.trim()).filter(n => n.length > 0)

            await axios.put(import.meta.env.VITE_BACKEND_URL + "/products/" + productId, {
                name: name,
                altNames: altNamesInArray,
                description: description,
                price: parseFloat(price) || 0,
                labelledPrice: parseFloat(labelledPrice) || 0,
                images: images,
                category: category,
                brand: brand,
                model: model,
                stock: parseInt(stock) || 0,
                isAvailable: isAvailable,
            }, {
                headers: {
                    Authorization: "Bearer " + token
                }
            })
            toast.success("Product updated successfully!");
            navigate("/admin/products");

        } catch (err) {
            toast.error("Error updating product. Please try again.");
            console.log("Error updating product:", err);
        }
    }

    // Add null check for product
    if (!product) {
        return <div>Loading...</div>;
    }

    return (
        <div className="w-full h-full min-h-screen flex justify-center items-start p-10 overflow-y-auto">
            <div className="w-full max-w-4xl bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl p-10 m-1">
                <h1 className="text-3xl font-bold text-accent mb-8 text-center">Update Product - {product.name}</h1>

                <div className="space-y-6">
                    {/* Product ID */}
                    <div>
                        <label className="block font-semibold mb-2 text-gray-700">Product ID</label>
                        <input
                            type="text"
                            value={productId}
                            disabled
                            onChange={(e) => setProductId(e.target.value)}
                            className="w-full h-11 rounded-xl focus:ring-2 focus:ring-accent border border-gray-300 focus:border-accent shadow-sm px-4"
                            placeholder="e.g. PROD-001"
                        />
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
                            value={altNames}
                            onChange={(e) => setAltNames(e.target.value)}
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
                                step="0.01"
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
                                step="0.01"
                            />
                        </div>
                    </div>

                    {/* Images */}
                    <div>
                        <label className="block font-semibold mb-2 text-gray-700">Add New Images</label>
                        <input
                            type="file"
                            multiple={true}
                            onChange={(e) => setFiles(e.target.files)}
                            className="w-full h-11 rounded-xl focus:ring-2 focus:ring-accent border border-gray-300 shadow-sm px-4"
                            accept="image/*"
                        />
                        <p className="text-xs text-gray-500 mt-1">Upload new images to add to existing ones</p>
                    </div>

                    {/* Category */}
                    <div>
                        <label className="block font-semibold mb-2 text-gray-700">Category</label>
                        <select
                            className="w-full h-11 rounded-xl focus:ring-2 focus:ring-accent border border-gray-300 shadow-sm px-4"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                        >
                            <option value="">Select a category</option>
                            <option value="CPU">CPU</option>
                            <option value="Graphic Cards">Graphic Cards</option>
                            <option value="RAM">RAM</option>
                            <option value="Storage Devices">Storage Devices</option>
                            <option value="Motherboards">Motherboards</option>
                            <option value="Power Supplies">Power Supplies</option>
                            <option value="Mouse and Keyboards">Mouse and Keyboards</option>
                            <option value="Monitors">Monitors</option>
                            <option value="Other">Other</option>
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
                                min="0"
                            />
                        </div>

                        {/* Availability */}
                        <div>
                            <label className="block font-semibold mb-2 text-gray-700">Is Available?</label>
                            <select
                                className="w-full h-11 rounded-xl focus:ring-2 focus:ring-accent border border-gray-300 shadow-sm px-4"
                                value={isAvailable ? "true" : "false"}
                                onChange={(e) => setIsAvailable(e.target.value === "true")}
                            >
                                <option value="true">Yes</option>
                                <option value="false">No</option>
                            </select>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-center gap-6 pt-6">
                        <button onClick={() => navigate('/admin/products')} className="w-48 h-12 bg-gray-400 text-white text-lg font-semibold rounded-xl shadow-lg hover:bg-gray-500 transition-all duration-200 cursor-pointer">Cancel</button>
                        <button
                            onClick={updateProduct}
                            className="w-48 h-12 bg-accent text-white text-lg font-semibold rounded-xl shadow-lg hover:bg-accent/80 transition-all duration-200 cursor-pointer"
                        >
                            Update Product
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}