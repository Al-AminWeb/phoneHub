'use client';

import { useState, useEffect } from "react";
import Link from "next/link";
import products from "../../data/products.json";

const colorList = [
    "from-blue-500 to-purple-600",
    "from-purple-500 to-pink-600",
    "from-green-500 to-teal-600",
    "from-red-500 to-orange-600",
    "from-yellow-500 to-orange-600",
    "from-indigo-500 to-blue-600",
    "from-pink-500 to-red-600",
    "from-teal-500 to-green-600"
];

const phones = products.map((product, idx) => ({
    name: product.name,
    color: colorList[idx % colorList.length]
}));

export default function Hero() {
    const [currentPhoneIndex, setCurrentPhoneIndex] = useState(0);


    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentPhoneIndex((prev) => (prev + 1) % phones.length);
        }, 3000);

        return () => clearInterval(interval);
    }, [phones.length]);

    return (
        <section className="relative h-screen flex flex-col justify-center items-center overflow-hidden">
            {/* Animated background */}
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-purple-900 to-blue-900 z-0"></div>

            {/* Floating elements */}
            <div className="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl animate-pulse"></div>
            <div className="absolute top-40 right-20 w-16 h-16 bg-purple-500/20 rounded-full blur-lg animate-bounce"></div>
            <div className="absolute bottom-32 left-1/4 w-24 h-24 bg-blue-400/30 rounded-full blur-xl animate-pulse"></div>

            {/* Content */}
            <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
                <div className="mb-6">
                    <div className="inline-block bg-white/10 backdrop-blur-md px-4 py-2 rounded-full mb-4">
                        <span className="text-white text-sm font-medium">✨ New iPhone 15 Pro Available Now</span>
                    </div>
                </div>

                <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
                    Discover Your <br />
                    <span className={`bg-gradient-to-r ${phones[currentPhoneIndex].color} bg-clip-text text-transparent transition-all duration-1000`}>
            {phones[currentPhoneIndex].name}
          </span>
                </h1>

                <p className="text-xl md:text-2xl text-white/90 mb-10 max-w-2xl mx-auto leading-relaxed">
                    Experience the future of mobile technology with our premium collection of smartphones. Cutting-edge features, stunning designs, and unbeatable performance.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <Link
                        href="/products"
                        className="group relative bg-white text-gray-900 font-semibold py-4 px-8 rounded-full overflow-hidden transition-all duration-300 hover:shadow-2xl hover:scale-105"
                    >
                        <span className="relative z-10">Shop Now</span>
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
                    </Link>

                    <Link
                        href="/about"
                        className="group border-2 border-white/30 text-white font-semibold py-4 px-8 rounded-full overflow-hidden transition-all duration-300 hover:border-white hover:bg-white/10 hover:shadow-lg"
                    >
                        <span className="relative z-10">Learn More</span>
                    </Link>
                </div>
            </div>

            {/* Scrolling indicator */}


            {/* Background pattern */}
            <div className="absolute inset-0 opacity-10 z-0">
                <div className="absolute top-0 left-0 right-0 h-px bg-white animate-moveLine"></div>
                <div className="absolute top-20 left-0 right-0 h-px bg-white animate-moveLine delay-1000"></div>
                <div className="absolute top-40 left-0 right-0 h-px bg-white animate-moveLine delay-2000"></div>
            </div>

            <style jsx>{`
        @keyframes moveLine {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-moveLine {
          animation: moveLine 15s linear infinite;
        }
      `}</style>
        </section>
    );
}