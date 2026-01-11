import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { Route, Routes } from 'react-router-dom'
import ProductPage from './ProductPage'
import CartPage from './CartPage'
import ProductOverviewPage from './ProductOverviewPage'
import CheckoutPage from './CheckoutPage'
import OrderConfirmationPage from './OrderConfirmationPage'
import OrdersPage from './OrdersPage'
import IndexPage from './IndexPage'
import AboutPage from './AboutPage'
import ContactPage from './ContactPage'
import NotFoundPage from './NotFoundPage'

export default function HomePage() {
  return (
    <div className='w-full h-full overflow-y-scroll'>
        <Header />
        <div className='w-full min-h-[calc(100%-100px)]'>
          <Routes path="/">
            <Route path='/' element={<IndexPage />} />
            <Route path='/products' element={<ProductPage />} />
            <Route path='/about' element={<AboutPage />} />
            <Route path='/contact' element={<ContactPage />} />
            <Route path='/cart' element={<CartPage />} />
            <Route path='/checkout' element={<CheckoutPage />} />
            <Route path='/my-orders' element={<OrdersPage />} />
            <Route path='/products/:productId' element={<ProductOverviewPage />} />
            <Route path='/order-success' element={<OrderConfirmationPage />} />
            <Route path='/*' element={<NotFoundPage />} />
          </Routes>
        </div>
        <Footer />
    </div>
  )
}
