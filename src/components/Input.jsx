import React, { useState } from 'react'

function Input() {

    const [text, setText] = useState('')

    return (
        <div className='w-full h-full flex justify-center items-center'>
            <div className='w-[400px] h-[300px] shadow-2xl'>
                <input type="text" className='w-[100px] h-[50px] border' onChange={(e) => setText(e.target.value)} />
                <h1 className='w-[100px] h-[50px] text-[30px]'>{text}</h1>
            </div>
        </div>
    )
}

export default Input