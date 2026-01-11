import React from 'react';
import { Link } from 'react-router-dom';

const Hero = () => {
    return (
        <section
            className="relative bg-cover bg-center h-[550px] flex items-center justify-center text-white"
            style={{
                backgroundImage: "url('https://images.pexels.com/photos/35595053/pexels-photo-35595053.jpeg')",
            }}
        >
            {/* Overlay to improve text readability */}
            <div className="absolute inset-0 bg-black opacity-60"></div>

            <div className="relative z-10 text-center p-4">
                <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-4 drop-shadow-lg">
                    Power Up Your Rig
                </h1>
                <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto drop-shadow-md">
                    Discover the latest CPUs, GPUs, RAM, and more to build your dream PC.
                </p>
                <div className="space-x-4">
                    <Link
                        to="/products"
                        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg text-lg transition-transform transform hover:scale-105 inline-block"
                    >
                        Shop Now
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default Hero;