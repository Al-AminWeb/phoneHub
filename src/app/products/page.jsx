'use client';

import { useState, useEffect } from "react";
import Link from "next/link";
import products from "../../../data/products.json";
import Navbar from "@/components/Navbar";

export default function ProductsPage() {
    const [filteredProducts, setFilteredProducts] = useState(products);
    const [searchQuery, setSearchQuery] = useState("");
    const [priceRange, setPriceRange] = useState([0, 2000]);
    const [sortBy, setSortBy] = useState("name");
    const [isLoading, setIsLoading] = useState(true);

    // Simulate loading
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 800);
        return () => clearTimeout(timer);
    }, []);

    // Filter and sort products
    useEffect(() => {
        let result = [...products];

        // Apply search filter
        if (searchQuery) {
            result = result.filter(product =>
                product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                product.description.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        // Apply price filter
        result = result.filter(product =>
            product.price >= priceRange[0] && product.price <= priceRange[1]
        );

        // Apply sorting
        result.sort((a, b) => {
            switch(sortBy) {
                case "price-low":
                    return a.price - b.price;
                case "price-high":
                    return b.price - a.price;
                case "name":
                default:
                    return a.name.localeCompare(b.name);
            }
        });

        setFilteredProducts(result);
    }, [searchQuery, priceRange, sortBy]);

    const maxPrice = Math.max(...products.map(p => p.price));

    return (


        <div className="min-h-screen bg-gray-50 py-8">
            <Navbar/>
            <div className="container mx-auto px-4">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Products</h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Discover our complete collection of premium smartphones with the latest technology and innovative features.
                    </p>
                </div>

                {/* Filters and Search */}
                <div className="bg-white rounded-2xl shadow-md p-6 mb-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Search */}
                        <div>
                            <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-2">
                                Search Products
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <input
                                    id="search"
                                    type="text"
                                    placeholder="Search by name or description..."
                                    className=" text-black block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                        </div>

                        {/* Price Range */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Price Range: ${priceRange[0]} - ${priceRange[1]}
                            </label>
                            <div className="px-2">
                                <input
                                    type="range"
                                    min="0"
                                    max={maxPrice}
                                    step="50"
                                    value={priceRange[1]}
                                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                                />
                            </div>
                        </div>

                        {/* Sort */}
                        <div>
                            <label htmlFor="sort" className="block text-sm font-medium text-gray-700 mb-2">
                                Sort By
                            </label>
                            <select
                                id="sort"
                                className=" text-black block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 rounded-lg"
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                            >
                                <option value="name">Name (A-Z)</option>
                                <option value="price-low">Price (Low to High)</option>
                                <option value="price-high">Price (High to Low)</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Results Count */}
                <div className="flex justify-between items-center mb-6">
                    <p className="text-gray-600">
                        Showing <span className="font-semibold">{filteredProducts.length}</span> of <span className="font-semibold">{products.length}</span> products
                    </p>
                </div>

                {/* Products Grid */}
                {isLoading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[1, 2, 3, 4, 5, 6].map((item) => (
                            <div key={item} className="bg-white rounded-2xl shadow-md overflow-hidden animate-pulse">
                                <div className="h-48 bg-gray-300"></div>
                                <div className="p-6">
                                    <div className="h-6 bg-gray-300 rounded mb-4"></div>
                                    <div className="h-4 bg-gray-300 rounded mb-2"></div>
                                    <div className="h-4 bg-gray-300 rounded w-2/3 mb-6"></div>
                                    <div className="h-10 bg-gray-300 rounded"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : filteredProducts.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredProducts.map((product) => (
                            <div key={product.id} className="bg-white rounded-2xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                                {/* Product Image */}
                                <div className="h-48 bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-6">
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="max-h-40 object-contain rounded-lg shadow-md transition-transform duration-300 hover:scale-105"
                                    />
                                </div>


                                {/* Product Details */}
                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">{product.name}</h3>
                                    <p className="text-gray-600 mb-4 line-clamp-2">{product.description}</p>

                                    {/* Specifications */}
                                    <div className="mb-4">
                                        {Object.entries(product.specifications).slice(0, 3).map(([key, value]) => (
                                            <div key={key} className="flex items-center text-sm text-gray-500 mb-1">
                                                <span className="font-semibold mr-2 capitalize">{key}:</span>
                                                <span>{value}</span>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Price and CTA */}
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-sm text-gray-500">Starting at</p>
                                            <p className="text-2xl font-bold text-gray-900">${product.price}</p>
                                        </div>
                                        <Link
                                            href={`/products/${product.id}`}
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
                ) : (
                    <div className="bg-white rounded-2xl shadow-md p-12 text-center">
                        <svg className="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">No products found</h3>
                        <p className="text-gray-600 mb-6">Try adjusting your search or filter criteria</p>
                        <button
                            onClick={() => {
                                setSearchQuery("");
                                setPriceRange([0, maxPrice]);
                            }}
                            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition-colors duration-300"
                        >
                            Reset Filters
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}