import React from 'react'
import Header from '../components/Header'
import { Route, Routes } from 'react-router-dom'
import ProductPage from './ProductPage'
import CartPage from './CartPage'
import ProductOverviewPage from './ProductOverviewPage'
import CheckoutPage from './CheckoutPage'

export default function HomePage() {
  return (
    <div className='w-full h-full overflow-y-scroll'>
        <Header />
        <div className='w-full min-h-[calc(100%-100px)]'>
          <Routes path="/">
            <Route path='/' element={<h1>Home Page</h1>} />
            <Route path='/products' element={<ProductPage />} />
            <Route path='/about' element={<h1>About Page</h1>} />
            <Route path='/contact' element={<h1>Contact Page</h1>} />
            <Route path='/cart' element={<CartPage />} />
            <Route path='/checkout' element={<CheckoutPage />} />
            <Route path='/products/:productId' element={<ProductOverviewPage />} />
            <Route path='/*' element={<h1>Not Found Page</h1>} />
          </Routes>
        </div>
    </div>
  )
}
