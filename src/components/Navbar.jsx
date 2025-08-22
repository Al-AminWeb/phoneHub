'use client';

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { useSession, signIn, signOut } from "next-auth/react";

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const pathname = usePathname();
    const { data: session } = useSession();

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
                    ? "bg-white/95 backdrop-blur-md shadow-lg py-1"
                    : "bg-gradient-to-r from-indigo-900 to-purple-800 py-2"
            }`}
        >
            <div className="container mx-auto px-4 flex justify-between items-center">
                {/* Logo */}
                <Link href="/" className="flex items-center space-x-2 group">
                    <span
                        className={`font-bold text-xl ${
                            isScrolled ? "text-gray-800" : "text-white"
                        }`}
                    >
            PhoneHub
          </span>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center space-x-1">
                    <Link
                        href="/"
                        className={`px-4 py-2 rounded-lg transition-all duration-300 flex items-center ${
                            isActive("/")
                                ? "bg-white/20 text-black font-medium"
                                : isScrolled
                                    ? "text-gray-700 hover:bg-gray-100 hover:text-purple-600"
                                    : "text-white/90 hover:bg-white/10 hover:text-white"
                        }`}
                    >
                        Home
                    </Link>
                    <Link
                        href="/products"
                        className={`px-4 py-2 rounded-lg transition-all duration-300 flex items-center ${
                            isActive("/products")
                                ? "bg-white/20 text-black font-medium"
                                : isScrolled
                                    ? "text-gray-700 hover:bg-gray-100 hover:text-purple-600"
                                    : "text-white/90 hover:bg-white/10 hover:text-white"
                        }`}
                    >
                        Products
                    </Link>
                    <Link
                        href="/about"
                        className={`px-4 py-2 rounded-lg transition-all duration-300 flex items-center ${
                            isActive("/about")
                                ? "bg-white/20 text-black font-medium"
                                : isScrolled
                                    ? "text-gray-700 hover:bg-gray-100 hover:text-purple-600"
                                    : "text-white/90 hover:bg-white/10 hover:text-white"
                        }`}
                    >
                        About
                    </Link>
                    {session && (
                        <Link
                            href="/dashboard/add-product"
                            className={`px-4 py-2 rounded-lg transition-all duration-300 flex items-center ${
                                isActive("/dashboard/add-product")
                                    ? "bg-white/20 text-black font-medium"
                                    : isScrolled
                                        ? "text-gray-700 hover:bg-gray-100 hover:text-purple-600"
                                        : "text-white/90 hover:bg-white/10 hover:text-white"
                            }`}
                        >
                            Add Product
                        </Link>
                    )}
                </div>

                {/* Auth Buttons */}
                <div className="hidden md:flex items-center space-x-2">
                    {session ? (
                        <button
                            onClick={() => signOut()}
                            className="px-4 py-2 rounded-lg transition-all duration-300 font-medium bg-red-600 text-white hover:bg-red-700"
                        >
                            Logout
                        </button>
                    ) : (
                        <>
                            <Link
                                href="/login"
                                className={`px-4 py-2 rounded-lg transition-all duration-300 font-medium ${
                                    isActive("/login")
                                        ? "bg-blue-600 text-white"
                                        : isScrolled
                                            ? "text-gray-700 hover:bg-gray-100 hover:text-blue-600"
                                            : "text-white/90 hover:bg-white/10 hover:text-white"
                                }`}
                            >
                                Login
                            </Link>
                            <Link
                                href="/signup"
                                className={`px-4 py-2 rounded-lg transition-all duration-300 font-medium ${
                                    isActive("/signup")
                                        ? "bg-purple-600 text-white"
                                        : isScrolled
                                            ? "text-gray-700 hover:bg-gray-100 hover:text-purple-600"
                                            : "text-white/90 hover:bg-white/10 hover:text-white"
                                }`}
                            >
                                Signup
                            </Link>
                        </>
                    )}
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
                    {/* Links */}
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
                         Home
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
                         Products
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
                         About
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
                         Add Product
                    </Link>

                    {/* Auth Section Mobile */}
                    <div className="border-t pt-3 mt-3 border-gray-200/30">
                        {!session ? (
                            <>
                                <Link
                                    href="/login"
                                    className={`block text-center py-3 px-4 rounded-lg transition-all duration-300 font-medium ${
                                        isScrolled
                                            ? "text-purple-600 hover:bg-purple-50 border border-purple-600"
                                            : "bg-white/20 text-white hover:bg-white/30"
                                    }`}
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    🔒 Login
                                </Link>
                                <Link
                                    href="/signup"
                                    className="block text-center py-3 px-4 mt-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 font-medium"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    ✨ Sign Up
                                </Link>
                            </>
                        ) : (
                            <button
                                onClick={() => {
                                    signOut();
                                    setIsMenuOpen(false);
                                }}
                                className="block w-full text-center py-3 px-4 mt-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all duration-300 font-medium"
                            >
                                🚪 Logout
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}
