import React from 'react'

export default function Loader() {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
            <div className="relative w-32 h-32 flex items-center justify-center">

                {/* Rotating Ring */}
                <div className="absolute inset-0 rounded-full border-4 border-black border-t-transparent animate-spin"></div>

                {/* Center Circle */}
                <div className="w-24 h-24 flex items-center justify-center rounded-full bg-black">
                    <img
                        src="/logo.png"
                        alt="Loading..."
                        className="w-14"
                    />
                </div>

            </div>
        </div>
    )
}
