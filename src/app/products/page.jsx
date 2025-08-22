import Link from "next/link";
import Navbar from "@/components/Navbar";
import clientPromise from "@/lib/mongodb";
import { FaStar, FaShoppingCart, FaEye, FaSearch, FaFilter } from "react-icons/fa";

export default async function ProductsPage() {
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB);
    const products = await db.collection("products").find({}).toArray();

    const productsClean = products.map((p) => ({
        ...p,
        _id: p._id.toString(), // Convert ObjectId for React
    }));

    // Generate random ratings for demonstration
    const productsWithRatings = productsClean.map(product => ({
        ...product,
        rating: (Math.random() * 2 + 3).toFixed(1), // Random rating between 3.0 and 5.0
        reviews: Math.floor(Math.random() * 100) + 10 // Random reviews between 10 and 110
    }));

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
            <Navbar />

            {/* Hero Section */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-16">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">Discover Amazing Products</h1>
                    <p className="text-xl max-w-2xl mx-auto mb-8">
                        Explore our curated collection of premium products with exceptional quality and value.
                    </p>

                    {/* Search Bar */}

                </div>
            </div>

            <div className="container mx-auto px-4 py-12">


                {/* Products Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {productsWithRatings.map((product) => (
                        <div
                            key={product._id}
                            className="bg-white rounded-2xl shadow-lg overflow-hidden transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
                        >
                            {/* Product Image */}
                            <div className="relative h-56 bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-6 overflow-hidden">
                                <div className="absolute top-4 right-4 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full z-10">
                                    Popular
                                </div>
                                <div className="w-40 h-40 bg-gradient-to-b from-white to-gray-100 rounded-2xl shadow-inner flex items-center justify-center overflow-hidden p-4">
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="w-full h-full object-contain transition-transform duration-500 hover:scale-110"
                                    />
                                </div>
                            </div>

                            {/* Product Details */}
                            <div className="p-6">
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="text-lg font-bold text-gray-900 line-clamp-1">{product.name}</h3>
                                    <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-1 rounded">
                    {product.category || 'Electronics'}
                  </span>
                                </div>

                                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description}</p>

                                {/* Rating */}
                                <div className="flex items-center mb-4">
                                    <div className="flex text-yellow-400">
                                        {[...Array(5)].map((_, i) => (
                                            <FaStar
                                                key={i}
                                                className={i < Math.floor(parseFloat(product.rating)) ? "fill-current" : "text-gray-300"}
                                                size={14}
                                            />
                                        ))}
                                    </div>
                                    <span className="text-sm text-gray-600 ml-2">
                    {product.rating} ({product.reviews} reviews)
                  </span>
                                </div>

                                {/* Price and CTA */}
                                <div className="flex justify-between items-center">
                                    <div>
                                        <p className="text-2xl font-bold text-gray-900">${product.price}</p>
                                        {product.originalPrice && (
                                            <p className="text-sm text-gray-500 line-through">${product.originalPrice}</p>
                                        )}
                                    </div>

                                    <div className="flex space-x-2">
                                        <Link
                                            href={`/products/${product._id}`}
                                            className="bg-blue-600 text-white p-3 rounded-full hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg"
                                            title="View Details"
                                        >
                                            <FaEye size={16} />
                                        </Link>
                                        <button
                                            className="bg-green-600 text-white p-3 rounded-full hover:bg-green-700 transition-colors shadow-md hover:shadow-lg"
                                            title="Add to Cart"
                                        >
                                            <FaShoppingCart size={16} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Load More Button */}
                <div className="text-center mt-12">
                    <button className="bg-white text-blue-600 border-2 border-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-blue-600 hover:text-white transition-all duration-300 shadow-md hover:shadow-lg">
                        Load More Products
                    </button>
                </div>

                {/* Newsletter Section */}
                <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-8 md:p-12 mt-16 text-center text-white">
                    <h2 className="text-2xl md:text-3xl font-bold mb-4">Stay Updated with New Products</h2>
                    <p className="max-w-2xl mx-auto mb-6">
                        Subscribe to our newsletter to get notified about exclusive deals, new arrivals, and special promotions.
                    </p>
                    <div className="flex flex-col sm:flex-row max-w-md mx-auto gap-2">
                        <input
                            type="email"
                            placeholder="Your email address"
                            className="flex-grow px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
                        />
                        <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                            Subscribe
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}