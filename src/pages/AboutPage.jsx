import React from 'react';
import { Link } from 'react-router-dom';
import { HelpingHand, Microchip, RocketIcon, Shield } from 'lucide-react';

const AboutPage = () => {
    return (
        <div className="min-h-screen bg-gray-100 font-sans antialiased text-gray-800">
            <main>
                {/* Hero Section for About Us */}
                <section className="relative bg-cover bg-center h-[550px] flex items-center justify-center text-white py-20 px-4 text-center">
                    <img src="https://images.unsplash.com/photo-1571624436279-b272aff752b5?q=80&w=1172&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" className="absolute inset-0 object-cover w-full h-full" alt="About Hero" />
                    <div className="container mx-auto">
                        <h1 className="text-5xl md:text-6xl font-extrabold mb-4 drop-shadow-lg">
                            About ICP Computers
                        </h1>
                        <p className="text-xl md:text-2xl max-w-3xl mx-auto opacity-90">
                            Your Ultimate Destination for High-Performance PC Hardware.
                        </p>
                    </div>
                </section>

                {/* Our Story Section */}
                <section className="container mx-auto py-16 px-4">
                    <div className="bg-white rounded-xl shadow-lg p-8 md:p-12">
                        <h2 className="text-4xl font-bold text-gray-900 mb-8 text-center border-b-2 border-blue-500 pb-4">
                            Our Story
                        </h2>
                        <div className="md:flex md:items-center md:space-x-12">
                            <div className="md:w-1/2 mb-8 md:mb-0">
                                <img
                                    src="https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                    alt="Our Story"
                                    className="rounded-lg shadow-xl w-full h-auto object-cover"
                                />
                            </div>
                            <div className="md:w-1/2">
                                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                                    Founded in 2023 by a group of passionate PC enthusiasts, ByteBazaar was born
                                    from a simple idea: to make cutting-edge computer components accessible to
                                    everyone, from seasoned builders to first-time upgraders. We experienced
                                    the thrill of building dream machines and the frustration of sifting
                                    through countless options, so we decided to create a platform that
                                    streamlines the process and builds a community.
                                </p>
                                <p className="text-lg text-gray-700 leading-relaxed">
                                    From our humble beginnings in a small garage, meticulously testing each component,
                                    to becoming a trusted online retailer, our journey has been fueled by a relentless
                                    pursuit of quality, innovation, and customer satisfaction. We believe in the power
                                    of technology to inspire and empower, and we're here to help you unlock your PC's full potential.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Our Mission & Values Section */}
                <section className="bg-gray-50 py-16 px-4">
                    <div className="container mx-auto">
                        <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">
                            Our Mission & Values
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {/* Value 1: Innovation */}
                            <div className="bg-white p-8 rounded-xl shadow-md text-center transform transition-transform duration-300 hover:scale-105 hover:shadow-xl">
                                <RocketIcon className="text-blue-500 text-5xl mb-6" />
                                <h3 className="text-2xl font-semibold text-gray-800 mb-3">Innovation</h3>
                                <p className="text-gray-600">
                                    We constantly seek out the latest and greatest in PC hardware, ensuring you have access to cutting-edge technology.
                                </p>
                            </div>

                            {/* Value 2: Quality Assurance */}
                            <div className="bg-white p-8 rounded-xl shadow-md text-center transform transition-transform duration-300 hover:scale-105 hover:shadow-xl">
                                <Shield className="text-green-500 text-5xl mb-6" />
                                <h3 className="text-2xl font-semibold text-gray-800 mb-3">Quality Assurance</h3>
                                <p className="text-gray-600">
                                    Every product is rigorously vetted and sourced from reputable manufacturers for reliability and performance.
                                </p>
                            </div>

                            {/* Value 3: Customer Support */}
                            <div className="bg-white p-8 rounded-xl shadow-md text-center transform transition-transform duration-300 hover:scale-105 hover:shadow-xl">
                                <HelpingHand className="text-purple-500 text-5xl mb-6" />
                                <h3 className="text-2xl font-semibold text-gray-800 mb-3">Customer Focus</h3>
                                <p className="text-gray-600">
                                    Your satisfaction is our priority. We offer expert advice and responsive support to help you build confidently.
                                </p>
                            </div>

                            {/* Value 4: Community */}
                            <div className="bg-white p-8 rounded-xl shadow-md text-center transform transition-transform duration-300 hover:scale-105 hover:shadow-xl">
                                <Microchip className="text-yellow-500 text-5xl mb-6" />
                                <h3 className="text-2xl font-semibold text-gray-800 mb-3">Empowerment</h3>
                                <p className="text-gray-600">
                                    We empower builders of all levels with the tools and knowledge to create their perfect system.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Call to Action Section */}
                <section className="container mx-auto py-16 px-4 text-center">
                    <div className="bg-blue-700 text-white p-12 rounded-xl shadow-lg">
                        <h2 className="text-4xl font-bold mb-6">
                            Ready to Build Your Dream PC?
                        </h2>
                        <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
                            Explore our extensive catalog of high-quality components and start creating
                            the ultimate machine tailored to your needs.
                        </p>
                        <Link
                            to="/shop"
                            className="bg-white text-blue-700 hover:bg-gray-200 font-bold py-4 px-10 rounded-full text-lg transition-colors duration-300 transform hover:scale-105 inline-block shadow-lg"
                        >
                            Start Shopping Now
                        </Link>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default AboutPage;