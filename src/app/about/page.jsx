'use client';

import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Navbar />
            <main className="flex-1 container mx-auto px-4 py-16">
                <div className="max-w-3xl mx-auto text-center">
                    <h1 className="text-5xl font-bold text-gray-900 mb-6 py-4">About PhoneHub</h1>
                    <p className="text-lg text-gray-700 mb-8">
                        PhoneHub is your trusted destination for discovering, comparing, and purchasing the latest smartphones. We curate the best devices from top brands, making it easy for you to find your perfect phone.
                    </p>
                    <div className="bg-white rounded-xl shadow-md p-8 mb-8">
                        <h2 className="text-2xl font-semibold text-blue-600 mb-4">Our Mission</h2>
                        <p className="text-gray-600">
                            At PhoneHub, our mission is to empower users with transparent information, expert reviews, and seamless shopping experiences. We believe everyone deserves access to the best technology, tailored to their needs and budget.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                        <div className="bg-blue-50 rounded-lg p-6">
                            <h3 className="text-xl font-bold text-blue-700 mb-2">Wide Selection</h3>
                            <p className="text-gray-600">Explore flagship and budget phones from Apple, Samsung, Google, OnePlus, and more.</p>
                        </div>
                        <div className="bg-purple-50 rounded-lg p-6">
                            <h3 className="text-xl font-bold text-purple-700 mb-2">Smart Comparison</h3>
                            <p className="text-gray-600">Compare specifications, prices, and features to make informed decisions.</p>
                        </div>
                        <div className="bg-green-50 rounded-lg p-6">
                            <h3 className="text-xl font-bold text-green-700 mb-2">Expert Insights</h3>
                            <p className="text-gray-600">Read reviews and tips from our tech experts to stay ahead in mobile trends.</p>
                        </div>
                        <div className="bg-yellow-50 rounded-lg p-6">
                            <h3 className="text-xl font-bold text-yellow-700 mb-2">Customer Support</h3>
                            <p className="text-gray-600">Our team is here to help you with any questions or support you need.</p>
                        </div>
                    </div>
                    <Link href="/products" className="inline-block bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold px-8 py-4 rounded-full shadow-lg hover:scale-105 transition-transform">
                        Browse Products
                    </Link>
                </div>
            </main>
            <Footer />
        </div>
    );
}

