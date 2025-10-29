import React from 'react'

export default function Loader() {
    return (
        <div className='w-full h-full flex justify-center items-center'>
            <div className="animate-spin inline-block w-10 h-10 border-[3px] border-current border-t-transparent text-accent rounded-full" role="status" aria-label="loading">
                <span className="sr-only">Loading...</span>
            </div>
        </div>
    )
}
