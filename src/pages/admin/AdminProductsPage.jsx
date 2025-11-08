import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { BiEdit, BiTrash } from 'react-icons/bi'
import { FaPlus } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import Loader from '../../components/Loader'
import ProductDeleteButton from '../../components/ProductDeleteButton'

function AdminProductsPage() {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (loading) {
            axios
                .get(import.meta.env.VITE_BACKEND_URL + '/products')
                .then((response) => {
                    setProducts(response.data.products || []);
                    setLoading(false)
                });
        }
    }, [loading])

    return (
        <div className='w-full max-h-full flex justify-center bg-gray-50 p-10 relative'>
            {
                !loading ?
                    <table className='w-full text-left border-collapse'>
                        <thead className='bg-accent text-white h-[60px] text-sm uppercase tracking-wide'>
                            <tr>
                                <th>Image</th>
                                <th>Product ID</th>
                                <th>Name</th>
                                <th>Price (LKR)</th>
                                <th>Labelled Price (LKR)</th>
                                <th>Category</th>
                                <th>Brand</th>
                                <th>Model</th>
                                <th>Stock</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                products.map((product) => {
                                    return (
                                        <tr key={product._id} className='border-b-2 border-gray-200 hover:bg-gray-100'>
                                            <td className='p-2'><img src={product.images[0]} className='object-contain' width={50} alt={product.name} /></td>
                                            <td className='p-2'>{product.productId}</td>
                                            <td className='p-2'>{product.name}</td>
                                            <td className='p-2'>LKR {product.price}</td>
                                            <td className='p-2'>LKR {product.labelledPrice}</td>
                                            <td className='p-2'>{product.category}</td>
                                            <td className='p-2'>{product.brand}</td>
                                            <td className='p-2'>{product.model}</td>
                                            <td className='p-2'>{product.stock}</td>
                                            <td className="p-4 text-center">
                                                <div className="flex items-center justify-center gap-3">
                                                    <Link to={'/admin/edit-product'} state={product}><BiEdit className="text-gray-600 hover:text-accent cursor-pointer text-lg transition" /></Link>
                                                    <ProductDeleteButton
                                                        productId={product.productId}
                                                        onDelete={() => setProducts(products.filter((p) => p._id !== product._id))}
                                                    />
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                    : <div className='w-full h-screen fixed bg-black/45 top-0 left-0'>
                        <Loader />
                    </div>
            }
            <Link to="/admin/add-product" className='fixed right-[50px] bottom-[50px] p-2 w-[50px] h-[50px] flex justify-center items-center border-[2px] rounded-full text-accent border-accent hover:text-white hover:bg-accent '><FaPlus /></Link>
        </div>
    )
}

export default AdminProductsPage