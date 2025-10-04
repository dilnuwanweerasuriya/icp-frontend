import React from 'react'

function tailwind() {
    return (
        <div className='w-[600px] h-[600px] border bg-gray-400 relative'>
            <div className='w-[500px] h-[500px] bg-yellow-100 flex flex-col items-center justify-center'>
                <div className='w-[100px] h-[100px] bg-blue-400'></div>
                <div className='w-[100px] h-[100px] bg-red-400 fixed left-[500px] top-[500px]'></div>
                <div className='w-[100px] h-[100px] bg-green-400'></div>
                <div className='w-[100px] h-[100px] bg-orange-400 absolute right-[20px] bottom-[20px]'></div>
            </div>
        </div>
    )
}

export default tailwind