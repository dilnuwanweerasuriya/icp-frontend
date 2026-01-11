import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Loader from '../../components/Loader'
import ViewOrderInfo from '../../components/ViewOrderInfo'

function AdminUsersPage() {
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(true)
    const token = localStorage.getItem('token')

    useEffect(() => {
        if (loading) {
            axios
                .get(import.meta.env.VITE_BACKEND_URL + '/users/all', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                .then((response) => {
                    setUsers(response.data.users || []);
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
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Email</th>
                                <th>Role</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                users.map((user) => {
                                    return (
                                        <tr key={user._id} className='border-b-2 border-gray-200 hover:bg-gray-100'>
                                            <td className='p-2'>
                                                <img className='w-5 h-5' src={user.image} alt={user.email} />
                                            </td>
                                            <td className='p-2'>{user.firstName}</td>
                                            <td className='p-2'>{user.lastName}</td>
                                            <td className='p-2'>{user.email}</td>
                                            <td className='p-2'>{user.role}</td>
                                            <td className="p-4 text-center">
                                                {/* <ViewOrderInfo order={order} /> */}
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

export default AdminUsersPage