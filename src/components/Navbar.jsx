'use client';

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const isActive = (path) => pathname === path;

    return (
        <nav
            className={`fixed top-0 w-full z-50 transition-all duration-300 ${
                isScrolled
                    ? "bg-white/95 backdrop-blur-md shadow-lg py-2"
                    : "bg-gradient-to-r from-indigo-900 to-purple-800 py-4"
            }`}
        >
            <div className="container mx-auto px-4 flex justify-between items-center">
                {/* Logo */}
                <Link
                    href="/"
                    className="flex items-center space-x-2 group"
                >
                    <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-2 rounded-lg transform group-hover:scale-105 transition-transform duration-300">
                        <span className="text-white text-2xl">📱</span>
                    </div>
                    <span className={`font-bold text-xl ${isScrolled ? "text-gray-800" : "text-white"}`}>
            PhoneHub
          </span>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center space-x-1">
                    <Link
                        href="/"
                        className={`px-4 py-2 rounded-lg transition-all duration-300 flex items-center ${
                            isActive("/")
                                ? "bg-white/20 text-white font-medium"
                                : isScrolled
                                    ? "text-gray-700 hover:bg-gray-100 hover:text-purple-600"
                                    : "text-white/90 hover:bg-white/10 hover:text-white"
                        }`}
                    >
                        <i className="mr-2">🏠</i> Home
                    </Link>
                    <Link
                        href="/products"
                        className={`px-4 py-2 rounded-lg transition-all duration-300 flex items-center ${
                            isActive("/products")
                                ? "bg-white/20 text-white font-medium"
                                : isScrolled
                                    ? "text-gray-700 hover:bg-gray-100 hover:text-purple-600"
                                    : "text-white/90 hover:bg-white/10 hover:text-white"
                        }`}
                    >
                        <i className="mr-2">📦</i> Products
                    </Link>
                    <Link
                        href="/about"
                        className={`px-4 py-2 rounded-lg transition-all duration-300 flex items-center ${
                            isActive("/about")
                                ? "bg-white/20 text-white font-medium"
                                : isScrolled
                                    ? "text-gray-700 hover:bg-gray-100 hover:text-purple-600"
                                    : "text-white/90 hover:bg-white/10 hover:text-white"
                        }`}
                    >
                        <i className="mr-2">ℹ️</i> About
                    </Link>
                    <Link
                        href="/contact"
                        className={`px-4 py-2 rounded-lg transition-all duration-300 flex items-center ${
                            isActive("/contact")
                                ? "bg-white/20 text-white font-medium"
                                : isScrolled
                                    ? "text-gray-700 hover:bg-gray-100 hover:text-purple-600"
                                    : "text-white/90 hover:bg-white/10 hover:text-white"
                        }`}
                    >
                        <i className="mr-2">📞</i> Contact
                    </Link>
                    <Link
                        href="/dashboard/add-product"
                        className={`px-4 py-2 rounded-lg transition-all duration-300 flex items-center ${
                            isActive("/dashboard/add-product")
                                ? "bg-white/20 text-white font-medium"
                                : isScrolled
                                    ? "text-gray-700 hover:bg-gray-100 hover:text-purple-600"
                                    : "text-white/90 hover:bg-white/10 hover:text-white"
                        }`}
                    >
                        <i className="mr-2">➕</i> Add Product
                    </Link>
                </div>

                {/* Auth Buttons */}
                <div className="hidden md:flex items-center space-x-2">
                    <Link
                        href="/login"
                        className={`px-4 py-2 rounded-lg transition-all duration-300 font-medium ${
                            isScrolled
                                ? "text-purple-600 hover:bg-purple-50 border border-purple-600"
                                : "bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm"
                        }`}
                    >
                        <i className="mr-2">🔒</i> Login
                    </Link>
                    <Link
                        href="/signup"
                        className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 font-medium shadow-md hover:shadow-lg"
                    >
                        <i className="mr-2">✨</i> Sign Up
                    </Link>
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden p-2 rounded-lg focus:outline-none"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    aria-label="Toggle menu"
                >
                    <div
                        className={`w-6 h-0.5 bg-current transition-all duration-300 ${
                            isScrolled ? "text-gray-800" : "text-white"
                        } ${isMenuOpen ? "rotate-45 translate-y-1.5" : ""}`}
                    ></div>
                    <div
                        className={`w-6 h-0.5 bg-current my-1.5 transition-all duration-300 ${
                            isScrolled ? "text-gray-800" : "text-white"
                        } ${isMenuOpen ? "opacity-0" : "opacity-100"}`}
                    ></div>
                    <div
                        className={`w-6 h-0.5 bg-current transition-all duration-300 ${
                            isScrolled ? "text-gray-800" : "text-white"
                        } ${isMenuOpen ? "-rotate-45 -translate-y-1.5" : ""}`}
                    ></div>
                </button>
            </div>

            {/* Mobile Menu */}
            <div
                className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out ${
                    isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                } ${isScrolled ? "bg-white" : "bg-indigo-900"}`}
            >
                <div className="container mx-auto px-4 py-4 flex flex-col space-y-3">
                    <Link
                        href="/"
                        className={`py-3 px-4 rounded-lg transition-all duration-300 flex items-center ${
                            isActive("/")
                                ? "bg-indigo-700 text-white font-medium"
                                : isScrolled
                                    ? "text-gray-700 hover:bg-gray-100"
                                    : "text-white/90 hover:bg-white/10"
                        }`}
                        onClick={() => setIsMenuOpen(false)}
                    >
                        <i className="mr-3">🏠</i> Home
                    </Link>
                    <Link
                        href="/products"
                        className={`py-3 px-4 rounded-lg transition-all duration-300 flex items-center ${
                            isActive("/products")
                                ? "bg-indigo-700 text-white font-medium"
                                : isScrolled
                                    ? "text-gray-700 hover:bg-gray-100"
                                    : "text-white/90 hover:bg-white/10"
                        }`}
                        onClick={() => setIsMenuOpen(false)}
                    >
                        <i className="mr-3">📦</i> Products
                    </Link>
                    <Link
                        href="/about"
                        className={`py-3 px-4 rounded-lg transition-all duration-300 flex items-center ${
                            isActive("/about")
                                ? "bg-indigo-700 text-white font-medium"
                                : isScrolled
                                    ? "text-gray-700 hover:bg-gray-100"
                                    : "text-white/90 hover:bg-white/10"
                        }`}
                        onClick={() => setIsMenuOpen(false)}
                    >
                        <i className="mr-3">ℹ️</i> About
                    </Link>
                    <Link
                        href="/contact"
                        className={`py-3 px-4 rounded-lg transition-all duration-300 flex items-center ${
                            isActive("/contact")
                                ? "bg-indigo-700 text-white font-medium"
                                : isScrolled
                                    ? "text-gray-700 hover:bg-gray-100"
                                    : "text-white/90 hover:bg-white/10"
                        }`}
                        onClick={() => setIsMenuOpen(false)}
                    >
                        <i className="mr-3">📞</i> Contact
                    </Link>
                    <Link
                        href="/dashboard/add-product"
                        className={`py-3 px-4 rounded-lg transition-all duration-300 flex items-center ${
                            isActive("/dashboard/add-product")
                                ? "bg-indigo-700 text-white font-medium"
                                : isScrolled
                                    ? "text-gray-700 hover:bg-gray-100"
                                    : "text-white/90 hover:bg-white/10"
                        }`}
                        onClick={() => setIsMenuOpen(false)}
                    >
                        <i className="mr-3">➕</i> Add Product
                    </Link>
                    <div className="border-t pt-3 mt-3 border-gray-200/30">
                        <Link
                            href="/login"
                            className={`block text-center py-3 px-4 rounded-lg transition-all duration-300 font-medium ${
                                isScrolled
                                    ? "text-purple-600 hover:bg-purple-50 border border-purple-600"
                                    : "bg-white/20 text-white hover:bg-white/30"
                            }`}
                            onClick={() => setIsMenuOpen(false)}
                        >
                            <i className="mr-2">🔒</i> Login
                        </Link>
                        <Link
                            href="/signup"
                            className="block text-center py-3 px-4 mt-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 font-medium"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            <i className="mr-2">✨</i> Sign Up
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}