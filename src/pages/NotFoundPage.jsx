import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const NotFoundPage = () => {
    return (
        <div className="min-h-screen bg-gray-100 font-sans antialiased text-gray-800 flex flex-col">
            <main className="flex-grow flex items-center justify-center py-16 px-4">
                <div className="text-center bg-white p-10 rounded-xl shadow-lg max-w-lg mx-auto">
                    <h1 className="text-9xl font-extrabold text-blue-600 mb-4 animate-bounce">
                        404
                    </h1>
                    <h2 className="text-4xl font-bold text-gray-800 mb-4">
                        Page Not Found
                    </h2>
                    <p className="text-lg text-gray-600 mb-8">
                        Oops! It looks like the page you're looking for doesn't exist.
                        It might have been moved or deleted.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <Link
                            to="/"
                            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-300 transform hover:scale-105"
                        >
                            Go to Homepage
                        </Link>
                        <Link
                            to="/shop"
                            className="inline-block bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-3 px-6 rounded-lg transition-colors duration-300 transform hover:scale-105"
                        >
                            Explore Our Shop
                        </Link>
                    </div>
                    <p className="mt-8 text-sm text-gray-500">
                        If you believe this is an error, please{' '}
                        <Link to="/contact" className="text-blue-500 hover:underline">
                            contact us
                        </Link>
                        .
                    </p>
                </div>
            </main>
        </div>
    );
};

export default NotFoundPage;