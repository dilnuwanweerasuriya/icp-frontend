import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { FaPlus } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import Loader from '../../components/Loader'
import { BsEye } from 'react-icons/bs'

function AdminOrdersPage() {
    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(true)
    const token = localStorage.getItem('token')

    useEffect(() => {
        if (loading) {
            axios
                .get(import.meta.env.VITE_BACKEND_URL + '/orders', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                .then((response) => {
                    setOrders(response.data.orders || []);
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
                                <th>Order ID</th>
                                <th>Customer Email</th>
                                <th>Customer Name</th>
                                <th>Date</th>
                                <th>Status</th>
                                <th>Total Amount</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                orders.map((order) => {
                                    return (
                                        <tr key={order._id} className='border-b-2 border-gray-200 hover:bg-gray-100'>
                                            <td className='p-2'>{order.orderId}</td>
                                            <td className='p-2'>{order.email}</td>
                                            <td className='p-2'>{order.fullName}</td>
                                            <td className='p-2'>{order.date}</td>
                                            <td className='p-2'>{order.status}</td>
                                            <td className='p-2'>LKR {order.total.toFixed(2)}</td>
                                            <td className="p-4 text-center">
                                                <div className="flex items-center justify-center gap-3">
                                                    <Link to={'/admin/view-order'} state={order}><BsEye className="text-gray-600 hover:text-accent cursor-pointer text-lg transition" /></Link>
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
        </div>
    )
}

export default AdminOrdersPage