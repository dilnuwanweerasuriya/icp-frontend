import axios from 'axios';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { BiTrash } from 'react-icons/bi';
import { IoClose } from 'react-icons/io5';

export default function ProductDeleteButton(props) {
    const productId = props.productId;
    const token = localStorage.getItem("token");
    const [loading, setLoading] = useState(false);
    const [isMessageOpen, setIsMessageOpen] = useState(false);

    async function handleDelete() {
        if (!token) {
            toast.error("Authentication required");
            return;
        }

        setLoading(true);
        await axios.delete(
            `${import.meta.env.VITE_BACKEND_URL}/products/${productId}`,
            { 
                headers: { 
                    Authorization: `Bearer ${token}` 
                } 
            }
        ).then(() => {
            toast.success("Product deleted successfully");
            setLoading(false);
            setIsMessageOpen(false);
        }).catch((err) => {
            toast.error(err.response.data.message);
            setLoading(false);
            setIsMessageOpen(false);
        })
        
        // Reload or update parent component
        if (props.onDelete) {
            props.onDelete(productId);
        } else {
            window.location.reload();
        }
    }

    return (
        <>
            <BiTrash 
                onClick={() => setIsMessageOpen(true)} 
                className='text-danger hover:text-danger/80 cursor-pointer text-xl transition-colors' 
            />
            
            {isMessageOpen && (
                <div className='fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50'>
                    <div className='bg-accent-light border border-secondary/20 rounded-2xl p-8 w-[90%] max-w-[450px] shadow-2xl'>
                        {/* Header */}
                        <div className='flex justify-between items-start mb-6'>
                            <h2 className='text-2xl font-bold text-primary'>Confirm Delete</h2>
                            <IoClose 
                                onClick={() => setIsMessageOpen(false)} 
                                className='text-primary/70 hover:text-primary cursor-pointer text-2xl transition-colors'
                            />
                        </div>
                        
                        {/* Message */}
                        <p className='text-primary/80 text-lg mb-8'>
                            Are you sure you want to delete this product? This action cannot be undone.
                        </p>
                        
                        {/* Buttons */}
                        <div className='flex gap-4'>
                            <button 
                                onClick={() => setIsMessageOpen(false)}
                                className='flex-1 h-12 bg-secondary/20 text-primary border-2 border-transparent hover:border-secondary/50 rounded-lg font-semibold transition-all'
                                disabled={loading}
                            >
                                Cancel
                            </button>
                            <button 
                                onClick={handleDelete}
                                className='flex-1 h-12 bg-danger text-white border-2 border-danger hover:bg-danger/90 rounded-lg font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed'
                                disabled={loading}
                            >
                                {loading ? 'Deleting...' : 'Delete'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}