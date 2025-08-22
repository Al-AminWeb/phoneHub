import { promises as fs } from 'fs';
import path from 'path';

export default async function ProductDetails({ params }) {
    const filePath = path.join(process.cwd(), 'data', 'products.json');
    const file = await fs.readFile(filePath, 'utf-8');
    const products = JSON.parse(file);
    const product = products.find((p) => p.id === Number(params.id));

    if (!product) {
        return (
            <div className="flex items-center justify-center h-[60vh]">
                <h1 className="text-2xl font-bold text-red-500">Product Not Found</h1>
            </div>
        );
    }

    return (
        <div className="p-6 md:p-12 bg-gray-50 min-h-screen">
            <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
                {/* Top Section */}
                <div className="grid md:grid-cols-2 gap-6 p-6">
                    {/* Product Image */}
                    <div className="flex justify-center items-center">
                        <img
                            src={product.image}
                            alt={product.name}
                            className="rounded-xl w-full h-auto max-h-[500px] object-contain transition-transform duration-300 hover:scale-105"
                        />
                    </div>

                    {/* Product Info */}
                    <div className="flex flex-col justify-center">
                        <h1 className="text-3xl md:text-4xl font-bold mb-3 text-gray-900">
                            {product.name}
                        </h1>
                        <p className="text-gray-600 mb-4">{product.description}</p>
                        <p className="text-2xl font-semibold text-blue-600 mb-6">
                            ${product.price}
                        </p>

                        <button className="bg-blue-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-blue-700 transition">
                            Buy Now
                        </button>
                    </div>
                </div>

                {/* Specifications */}
                <div className="border-t p-6 bg-gray-50">
                    <h2 className="text-2xl font-semibold mb-4 text-gray-800">
                        Specifications
                    </h2>
                    <div className="overflow-x-auto">
                        <table className="min-w-full border border-gray-200 rounded-xl">
                            <tbody className="divide-y divide-gray-200">
                            {Object.entries(product.specifications).map(([key, value]) => (
                                <tr key={key} className="hover:bg-gray-100">
                                    <td className="px-4 py-3 font-medium capitalize text-gray-700 w-40">
                                        {key}
                                    </td>
                                    <td className="px-4 py-3 text-gray-600">{value}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
