'use client';

import Link from "next/link";
import { useState } from "react";

export default function Footer() {
    const [email, setEmail] = useState("");
    const [subscribed, setSubscribed] = useState(false);

    const handleSubscribe = (e) => {
        e.preventDefault();
        if (email) {
            // Simulate subscription
            setSubscribed(true);
            setEmail("");
            setTimeout(() => setSubscribed(false), 3000);
        }
    };

    return (
        <footer className="bg-gradient-to-b from-gray-900 to-black text-white pt-16 pb-8">
            <div className="container mx-auto px-4">
                {/* Main Footer Content */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
                    {/* Brand Section */}
                    <div className="lg:col-span-1">
                        <Link href="/" className="flex items-center space-x-2 mb-6">
                            <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-2 rounded-lg">
                                <span className="text-white text-2xl">📱</span>
                            </div>
                            <span className="font-bold text-xl">PhoneHub</span>
                        </Link>
                        <p className="text-gray-400 mb-6 max-w-xs">
                            Your premier destination for the latest smartphones and accessories. Quality products, exceptional service.
                        </p>
                        <div className="flex space-x-4">
                            <a href="#" className="bg-gray-800 hover:bg-gray-700 p-3 rounded-full transition-all duration-300 transform hover:-translate-y-1">
                                <span className="sr-only">Facebook</span>
                                <i className="fab fa-facebook-f">📘</i>
                            </a>
                            <a href="#" className="bg-gray-800 hover:bg-gray-700 p-3 rounded-full transition-all duration-300 transform hover:-translate-y-1">
                                <span className="sr-only">Twitter</span>
                                <i className="fab fa-twitter">🐦</i>
                            </a>
                            <a href="#" className="bg-gray-800 hover:bg-gray-700 p-3 rounded-full transition-all duration-300 transform hover:-translate-y-1">
                                <span className="sr-only">Instagram</span>
                                <i className="fab fa-instagram">📸</i>
                            </a>
                            <a href="#" className="bg-gray-800 hover:bg-gray-700 p-3 rounded-full transition-all duration-300 transform hover:-translate-y-1">
                                <span className="sr-only">YouTube</span>
                                <i className="fab fa-youtube">📺</i>
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-semibold mb-6 relative inline-block">
                            Quick Links
                            <span className="absolute bottom-0 left-0 w-1/2 h-0.5 bg-gradient-to-r from-blue-500 to-purple-600"></span>
                        </h3>
                        <ul className="space-y-3">
                            <li><Link href="/" className="text-gray-400 hover:text-white transition-colors duration-300">Home</Link></li>
                            <li><Link href="/products" className="text-gray-400 hover:text-white transition-colors duration-300">Products</Link></li>
                            <li><Link href="/about" className="text-gray-400 hover:text-white transition-colors duration-300">About Us</Link></li>
                            <li><Link href="/contact" className="text-gray-400 hover:text-white transition-colors duration-300">Contact</Link></li>
                            <li><Link href="/blog" className="text-gray-400 hover:text-white transition-colors duration-300">Blog</Link></li>
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h3 className="text-lg font-semibold mb-6 relative inline-block">
                            Support
                            <span className="absolute bottom-0 left-0 w-1/2 h-0.5 bg-gradient-to-r from-blue-500 to-purple-600"></span>
                        </h3>
                        <ul className="space-y-3">
                            <li><Link href="/faq" className="text-gray-400 hover:text-white transition-colors duration-300">FAQ</Link></li>
                            <li><Link href="/shipping" className="text-gray-400 hover:text-white transition-colors duration-300">Shipping Info</Link></li>
                            <li><Link href="/returns" className="text-gray-400 hover:text-white transition-colors duration-300">Returns & Refunds</Link></li>
                            <li><Link href="/warranty" className="text-gray-400 hover:text-white transition-colors duration-300">Warranty</Link></li>
                            <li><Link href="/support" className="text-gray-400 hover:text-white transition-colors duration-300">Contact Support</Link></li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h3 className="text-lg font-semibold mb-6 relative inline-block">
                            Newsletter
                            <span className="absolute bottom-0 left-0 w-1/2 h-0.5 bg-gradient-to-r from-blue-500 to-purple-600"></span>
                        </h3>
                        <p className="text-gray-400 mb-4">Subscribe to get special offers, free giveaways, and new product alerts.</p>

                        {subscribed ? (
                            <div className="bg-green-900/30 border border-green-800 text-green-400 p-3 rounded-lg text-center">
                                🎉 Thank you for subscribing!
                            </div>
                        ) : (
                            <form onSubmit={handleSubscribe} className="space-y-3">
                                <div className="relative">
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Your email address"
                                        className="w-full bg-gray-800 border border-gray-700 rounded-lg py-3 px-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                                        required
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium py-3 px-4 rounded-lg transition-all duration-300 transform hover:-translate-y-0.5 shadow-lg hover:shadow-xl"
                                >
                                    Subscribe Now
                                </button>
                            </form>
                        )}
                    </div>
                </div>

                {/* Bottom Footer */}
                <div className="border-t border-gray-800 pt-8">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <p className="text-gray-500 text-sm mb-4 md:mb-0">
                            © {new Date().getFullYear()} PhoneHub. All rights reserved.
                        </p>
                        <div className="flex space-x-6">
                            <Link href="/privacy" className="text-gray-500 hover:text-white text-sm transition-colors duration-300">Privacy Policy</Link>
                            <Link href="/terms" className="text-gray-500 hover:text-white text-sm transition-colors duration-300">Terms of Service</Link>
                            <Link href="/cookies" className="text-gray-500 hover:text-white text-sm transition-colors duration-300">Cookie Policy</Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Back to Top Button */}
            <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="fixed bottom-6 right-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 z-10"
                aria-label="Back to top"
            >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                </svg>
            </button>
        </footer>
    );
}