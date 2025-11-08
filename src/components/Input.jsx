import React, { useState } from 'react'
import uploadFile from '../utils/MediaUpload.js'

function Input() {

    const [file, setFile] = useState(null)
    
    async function handleUpload(){
        const link = await uploadFile(file)
        console.log(link);
    }

    return (
        <div className='w-full h-full flex justify-center items-center'>
            <input type="file" onChange={(e) => setFile(e.target.files[0])} accept={"image/*"} className='bg-gray-500' />
            <button className='bg-gray-500' onClick={handleUpload}>Upload</button>
        </div>
    )
}

export default Input