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

    async function addProduct(){
        const token = localStorage.getItem("token")

        if(token == null){
            toast.error('Please login first');
            navigate('/login')
            return
        }else{
            if(productId == '' || name == '' || altName == '' || description == '' || price == 0 || labelledPrice == 0 || images == '' || category == '' || brand == '' || model == '' || stock == 0){
                toast.error('Please fill all the fields');
                return
            }else{
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
                    },{
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
    <div className='w-full h-full p-[50px] flex justify-center items-start overflow-y-scroll'>
        <div className='w-[600px] bg-accent/75 rounded-2xl p-[40px]'>
            <div className='w-full bg-white p-[20px]'>
                <div className='my-[10px]'>
                    <label>Product ID</label>
                    <input type="text" value={productId} onChange={(e) => setProductId(e.target.value)} className='w-full h-[40px] rounded-2xl focus:ring-accent border border-accent shadow-2xl px-[20px]'/>
                    <p className='text-sm text-gray-500 text-right'>Provide a unique product ID</p>
                </div>
                <div className='my-[10px]'>
                    <label>Name</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} className='w-full h-[40px] rounded-2xl focus:ring-accent border border-accent shadow-2xl px-[20px]'/>
                </div>
                <div className='my-[10px]'>
                    <label>Alternative Names</label>
                    <input type="text" value={altName} onChange={(e) => setAltName(e.target.value)} className='w-full h-[40px] rounded-2xl focus:ring-accent border border-accent shadow-2xl px-[20px]'/>
                    <p className='text-sm text-gray-500 text-right'>Use comma to separate alternative names</p>
                </div>
                <div className='my-[10px]'>
                    <label>Description</label>
                    <textarea value={description} onChange={(e) => setDescription(e.target.value)} className='w-full h-[100px] rounded-2xl focus:ring-accent border border-accent shadow-2xl px-[20px] py-[10px]' />
                </div>
                <div className='my-[10px]'>
                    <label>Price</label>
                    <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} className='w-full h-[40px] rounded-2xl focus:ring-accent border border-accent shadow-2xl px-[20px]'/>
                </div>
                <div className='my-[10px]'>
                    <label>Labelled Price</label>
                    <input type="number" value={labelledPrice} onChange={(e) => setLabelledPrice(e.target.value)} className='w-full h-[40px] rounded-2xl focus:ring-accent border border-accent shadow-2xl px-[20px]'/>
                </div>
                <div className='my-[10px]'>
                    <label>Images</label>
                    <input type="text" value={images} onChange={(e) => setImages(e.target.value)} className='w-full h-[40px] rounded-2xl focus:ring-accent border border-accent shadow-2xl px-[20px]'/>
                </div>
                <div className='my-[10px]'>
                    <label>Category</label>
                    <select className='w-full h-[40px] rounded-2xl focus:ring-accent border border-accent shadow-2xl px-[20px]' value={category} onChange={(e) => setCategory(e.target.value)}>
                        <option value='CPU'>CPU</option>
                        <option value='Graphic Cards'>Graphic Cards</option>
                        <option value='RAM'>RAM</option>
                        <option value='Storage Devices'>Storage Devices</option>
                        <option value='Motherboards'>Motherboards</option>
                        <option value='Power Supplies'>Power Supplies</option>
                        <option value='Mouse and Keyboards'>Mouse and Keyboards</option>
                        <option value='Monitors'>Monitors</option>
                        <option value='Other'>Other</option>
                    </select>
                </div>
                <div className='my-[10px]'>
                    <label>Brand</label>
                    <input type="text" value={brand} onChange={(e) => setBrand(e.target.value)} className='w-full h-[40px] rounded-2xl focus:ring-accent border border-accent shadow-2xl px-[20px]'/>
                </div>
                <div className='my-[10px]'>
                    <label>Model</label>
                    <input type="text" value={model} onChange={(e) => setModel(e.target.value)} className='w-full h-[40px] rounded-2xl focus:ring-accent border border-accent shadow-2xl px-[20px]'/>
                </div>
                <div className='my-[10px]'>
                    <label>Stock</label>
                    <input type="number" value={stock} onChange={(e) => setStock(e.target.value)} className='w-full h-[40px] rounded-2xl focus:ring-accent border border-accent shadow-2xl px-[20px]'/>
                </div>
                <div className='my-[10px]'>
                    <label>Is Available?</label>
                    <select className='w-full h-[40px] rounded-2xl focus:ring-accent border border-accent shadow-2xl px-[20px]' value={isAvailable} onChange={(e) => setIsAvailable(e.target.value)}>
                        <option value='true'>Yes</option>
                        <option value='false'>No</option>
                    </select>
                </div>
                <div>
                    <button onClick={addProduct} className="w-[200px] h-[50px] bg-accent text-white text-[20px] border-[2px] border-accent hover:bg-transparent hover:text-accent font-bold rounded-2xl">
                        Submit
                    </button>
                </div>
            </div>
        </div>
    </div>
  )
}
