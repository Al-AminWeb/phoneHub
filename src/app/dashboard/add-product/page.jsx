'use client';
import { useState } from "react";
import { useRouter } from "next/navigation";
import products from "../../../../data/products.json";

export default function AddProductPage() {
    const router = useRouter();
    const [form, setForm] = useState({
        name: "",
        description: "",
        price: "",
        image: "",
        specifications: {
            display: "",
            chip: "",
            storage: "",
            camera: "",
            battery: "",
            os: ""
        }
    });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [activeSection, setActiveSection] = useState("basic");

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name in form.specifications) {
            setForm({
                ...form,
                specifications: {
                    ...form.specifications,
                    [name]: value
                }
            });
        } else {
            setForm({ ...form, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");
        try {
            const res = await fetch("/api/add-product", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...form,
                    price: parseFloat(form.price),
                    id: Math.max(...products.map(p => p.id)) + 1
                })
            });
            const result = await res.json();
            if (res.ok) {
                setMessage("Product added successfully!");
                setTimeout(() => {
                    router.push("/products");
                }, 1500);
            } else {
                setMessage(result.error || "Failed to add product.");
            }
        } catch (err) {
            setMessage("Server error. Please try again.");
        }
        setLoading(false);
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="container mx-auto px-4 max-w-4xl">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Add New Product</h1>
                    <p className="text-gray-600">Fill in the details below to add a new product to the catalog</p>
                </div>

                {/* Progress Steps */}
                <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
                    <div className="flex justify-center mb-6">
                        <div className="flex items-center">
                            <button
                                onClick={() => setActiveSection("basic")}
                                className={`flex items-center justify-center w-10 h-10 rounded-full ${activeSection === "basic" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-600"} transition-colors`}
                            >
                                1
                            </button>
                            <div className={`w-16 h-1 ${activeSection !== "basic" ? "bg-blue-600" : "bg-gray-300"} mx-2`}></div>
                            <button
                                onClick={() => setActiveSection("specs")}
                                className={`flex items-center justify-center w-10 h-10 rounded-full ${activeSection === "specs" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-600"} transition-colors`}
                            >
                                2
                            </button>
                        </div>
                    </div>
                    <div className="text-center text-sm text-gray-600">
                        {activeSection === "basic" ? "Basic Information" : "Specifications"}
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm p-6">
                    {/* Basic Information Section */}
                    {activeSection === "basic" && (
                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Product Name</label>
                                <input
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                    name="name"
                                    placeholder="e.g., iPhone 15 Pro Max"
                                    value={form.name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                                <textarea
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                    name="description"
                                    placeholder="Describe the product features and benefits..."
                                    rows="4"
                                    value={form.description}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Price ($)</label>
                                    <div className="relative">
                                        <span className="absolute left-3 top-3 text-gray-500">$</span>
                                        <input
                                            className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                            name="price"
                                            placeholder="0.00"
                                            type="number"
                                            step="0.01"
                                            min="0"
                                            value={form.price}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Image URL</label>
                                    <input
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                        name="image"
                                        placeholder="https://example.com/image.jpg"
                                        value={form.image}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>

                            {form.image && (
                                <div className="mt-4">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Image Preview</label>
                                    <div className="w-32 h-32 border rounded-lg overflow-hidden">
                                        <img
                                            src={form.image}
                                            alt="Preview"
                                            className="w-full h-full object-cover"
                                            onError={(e) => {
                                                e.target.style.display = 'none';
                                            }}
                                        />
                                    </div>
                                </div>
                            )}

                            <div className="flex justify-end">
                                <button
                                    type="button"
                                    onClick={() => setActiveSection("specs")}
                                    className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                                >
                                    Next: Specifications →
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Specifications Section */}
                    {activeSection === "specs" && (
                        <div className="space-y-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Technical Specifications</h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Display</label>
                                    <input
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                        name="display"
                                        placeholder="e.g., 6.7-inch Super Retina XDR"
                                        value={form.specifications.display}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Chip/Processor</label>
                                    <input
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                        name="chip"
                                        placeholder="e.g., A17 Pro Chip"
                                        value={form.specifications.chip}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Storage Options</label>
                                    <input
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                        name="storage"
                                        placeholder="e.g., 128GB, 256GB, 512GB"
                                        value={form.specifications.storage}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Camera System</label>
                                    <input
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                        name="camera"
                                        placeholder="e.g., 48MP Main, 12MP Ultra Wide"
                                        value={form.specifications.camera}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Battery</label>
                                    <input
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                        name="battery"
                                        placeholder="e.g., 4323 mAh, up to 29 hours"
                                        value={form.specifications.battery}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Operating System</label>
                                    <input
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                        name="os"
                                        placeholder="e.g., iOS 17"
                                        value={form.specifications.os}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="flex justify-between pt-4">
                                <button
                                    type="button"
                                    onClick={() => setActiveSection("basic")}
                                    className="text-gray-600 px-6 py-3 rounded-lg font-medium hover:text-gray-800 transition-colors"
                                >
                                    ← Back to Basic Info
                                </button>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-300 disabled:opacity-50"
                                >
                                    {loading ? (
                                        <span className="flex items-center">
                                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Adding Product...
                                        </span>
                                    ) : "Add Product"}
                                </button>
                            </div>
                        </div>
                    )}

                    {message && (
                        <div className={`mt-6 p-4 rounded-lg text-center font-medium ${
                            message.includes("success")
                                ? "bg-green-100 text-green-700 border border-green-200"
                                : "bg-red-100 text-red-700 border border-red-200"
                        }`}>
                            {message}
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
}