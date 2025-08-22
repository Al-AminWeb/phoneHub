'use client';

import Link from "next/link";
import { useState, useEffect } from "react";

export default function ProductHighlights() {
    const [products, setProducts] = useState([]);
    const [isVisible, setIsVisible] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setIsVisible(true);

        // Fetch products from API
        async function fetchProducts() {
            try {
                setLoading(true);
                const res = await fetch("/api/product"); // Corrected the API endpoint

                if (!res.ok) {
                    throw new Error(`Failed to fetch: ${res.status}`);
                }

                const data = await res.json();
                setProducts(data);
                setError(null);
            } catch (err) {
                console.error("Failed to load products", err);
                setError("Failed to load products. Please try again later.");
            } finally {
                setLoading(false);
            }
        }

        fetchProducts();
    }, []);

    if (loading) {
        return (
            <section className="py-16 px-4 bg-gradient-to-b from-gray-50 to-white">
                <div className="container mx-auto max-w-6xl">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Phones</h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Discover our handpicked selection of premium smartphones...
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-lg animate-pulse">
                                <div className="h-56 bg-gray-300"></div>
                                <div className="p-6">
                                    <div className="h-6 bg-gray-300 rounded mb-4"></div>
                                    <div className="h-4 bg-gray-300 rounded mb-2"></div>
                                    <div className="h-4 bg-gray-300 rounded w-3/4 mb-6"></div>
                                    <div className="h-10 bg-gray-300 rounded"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        );
    }

    if (error) {
        return (
            <section className="py-16 px-4 bg-gradient-to-b from-gray-50 to-white">
                <div className="container mx-auto max-w-6xl text-center">
                    <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Phones</h2>
                    <p className="text-red-500 mb-8">{error}</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
                    >
                        Try Again
                    </button>
                </div>
            </section>
        );
    }

    return (
        <section className="py-16 px-4 bg-gradient-to-b from-gray-50 to-white">
            <div className="container mx-auto max-w-6xl">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Phones</h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Discover our handpicked selection of premium smartphones with cutting-edge technology and stunning designs.
                    </p>
                </div>

                {products.length === 0 ? (
                    <div className="text-center py-12">
                        <p className="text-gray-500 text-lg">No products found.</p>
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {products.slice(0, 3).map((p, index) => (
                                <div
                                    key={p._id}
                                    className={`bg-white rounded-2xl overflow-hidden shadow-lg transition-all duration-700 transform hover:-translate-y-2 hover:shadow-xl ${
                                        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
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
                                                onError={(e) => {
                                                    e.target.style.display = 'none';
                                                    // You could add a fallback image here
                                                }}
                                            />
                                        </div>
                                    </div>

                                    {/* Product Details */}
                                    <div className="p-6">
                                        <h3 className="text-xl font-bold text-gray-900 mb-2">{p.name}</h3>
                                        <p className="text-gray-600 mb-4 h-12 overflow-hidden">{p.description}</p>

                                        {/* Price and CTA */}
                                        <div className="flex items-center justify-between mt-6">
                                            <div>
                                                <p className="text-sm text-gray-500">Starting at</p>
                                                <p className="text-2xl font-bold text-gray-900">${p.price}</p>
                                            </div>
                                            <Link
                                                href={`/products/${p._id}`}
                                                className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg flex items-center"
                                            >
                                                View Details
                                                <svg
                                                    className="w-4 h-4 ml-2"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                                                    />
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
                                <svg
                                    className="w-5 h-5 ml-2"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                                    />
                                </svg>
                            </Link>
                        </div>
                    </>
                )}
            </div>
        </section>
    );
}