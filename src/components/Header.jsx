import React from 'react'

export default function Header() {
  return (
    <div className='w-full h-[50px] bg-secondary flex justify-around'>
        <img src="/logo.svg" className='w-[50px] h-[50px]' alt="logo" />
        <h1 className='text-primary'>My Shop</h1>
    </div>
  )
}
