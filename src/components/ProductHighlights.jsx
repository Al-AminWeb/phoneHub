'use client';

import Link from "next/link";
import products from "../../data/products.json";
import { useState, useEffect } from "react";

export default function ProductHighlights() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    return (
        <section className="py-16 px-4 bg-gradient-to-b from-gray-50 to-white">
            <div className="container mx-auto max-w-6xl">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Phones</h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Discover our handpicked selection of premium smartphones with cutting-edge technology and stunning designs.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {products.slice(0, 3).map((p, index) => (
                        <div
                            key={p.id}
                            className={`bg-white rounded-2xl overflow-hidden shadow-lg transition-all duration-700 transform hover:-translate-y-2 hover:shadow-xl ${
                                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                            }`}
                            style={{ transitionDelay: `${index * 150}ms` }}
                        >
                            {/* Product Image */}
                            <div className="h-56 bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-6 relative overflow-hidden">
                                <div className="absolute top-4 right-4 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                                    Popular
                                </div>
                                <div className="w-32 h-40 bg-gradient-to-b from-gray-100 to-gray-300 rounded-2xl shadow-inner flex items-center justify-center overflow-hidden">
                                    <img
                                        src={p.image}
                                        alt={p.name}
                                        className="w-full h-full object-contain"
                                    />
                                </div>
                            </div>

                            {/* Product Details */}
                            <div className="p-6">
                                <h3 className="text-xl font-bold text-gray-900 mb-2">{p.name}</h3>
                                <p className="text-gray-600 mb-4 h-12 overflow-hidden">{p.description}</p>

                                {/* Specifications */}
                                <div className="mb-4">
                                    <div className="flex items-center justify-between text-sm text-gray-500 mb-1">
                                        <span>Display</span>
                                        <span className="font-medium">6.1" OLED</span>
                                    </div>
                                    <div className="flex items-center justify-between text-sm text-gray-500 mb-1">
                                        <span>Storage</span>
                                        <span className="font-medium">128GB</span>
                                    </div>
                                    <div className="flex items-center justify-between text-sm text-gray-500">
                                        <span>Camera</span>
                                        <span className="font-medium">48MP</span>
                                    </div>
                                </div>

                                {/* Price and CTA */}
                                <div className="flex items-center justify-between mt-6">
                                    <div>
                                        <p className="text-sm text-gray-500">Starting at</p>
                                        <p className="text-2xl font-bold text-gray-900">${p.price}</p>
                                    </div>
                                    <Link
                                        href={`/products/${p.id}`}
                                        className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg flex items-center"
                                    >
                                        View Details
                                        <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                        </svg>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* View All Button */}
                <div className="text-center mt-12">
                    <Link
                        href="/products"
                        className="inline-flex items-center text-blue-600 hover:text-blue-800 font-semibold transition-colors duration-300"
                    >
                        View All Products
                        <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </Link>
                </div>
            </div>
        </section>
    );
}