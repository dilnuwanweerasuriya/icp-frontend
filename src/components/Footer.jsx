import { Facebook, Instagram, Twitter } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-gray-400 py-10 mt-12">
            <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8 text-center md:text-left">
                <div>
                    <h3 className="text-xl font-bold text-white mb-4">ICP Computers</h3>
                    <p className="text-sm">
                        Your one-stop shop for high-performance computer parts. We provide the latest hardware to build your ultimate gaming rig or workstation.
                    </p>
                </div>

                <div>
                    <h3 className="text-xl font-bold text-white mb-4">Quick Links</h3>
                    <ul className="space-y-2">
                        <li><Link to="/about" className="hover:text-blue-400 transition-colors">About Us</Link></li>
                        <li><Link to="/contact" className="hover:text-blue-400 transition-colors">Contact</Link></li>
                        <li><Link to="#" className="hover:text-blue-400 transition-colors">Privacy Policy</Link></li>
                        <li><Link to="#" className="hover:text-blue-400 transition-colors">Terms of Service</Link></li>
                    </ul>
                </div>

                {/* Categories */}
                <div>
                    <h3 className="text-xl font-bold text-white mb-4">Categories</h3>
                    <ul className="space-y-2">
                        <li><Link to="/products" className="hover:text-blue-400 transition-colors">CPUs</Link></li>
                        <li><Link to="/products" className="hover:text-blue-400 transition-colors">GPUs</Link></li>
                        <li><Link to="/products" className="hover:text-blue-400 transition-colors">RAM</Link></li>
                        <li><Link to="/products" className="hover:text-blue-400 transition-colors">Storage</Link></li>
                    </ul>
                </div>

                {/* Social Media */}
                <div>
                    <h3 className="text-xl font-bold text-white mb-4">Follow Us</h3>
                    <div className="flex justify-center md:justify-start space-x-6">
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-2xl hover:text-blue-400 transition-colors">
                            <Facebook />
                        </a>
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-2xl hover:text-blue-400 transition-colors">
                            <Twitter />
                        </a>
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-2xl hover:text-blue-400 transition-colors">
                            <Instagram />
                        </a>
                    </div>
                </div>
            </div>

            <div className="border-t border-gray-700 mt-8 pt-6 text-center text-sm">
                &copy; {new Date().getFullYear()} Dilnuwan Weerasuriya. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;