import React from 'react'
import { FaPlus } from 'react-icons/fa'
import { Link } from 'react-router-dom'

function AdminProductsPage() {
  return (
    <div className='w-full h-full flex justify-center items-center relative'>
        AdminProductsPage
        <Link to="/admin/add-product" className='absolute right-[20px] bottom-[20px] p-2 w-[50px] h-[50px] flex justify-center items-center border-[2px] rounded-full text-accent border-accent hover:text-white hover:bg-accent '><FaPlus /></Link>
    </div>
  )
}

export default AdminProductsPage