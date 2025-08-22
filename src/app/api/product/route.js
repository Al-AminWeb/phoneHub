import clientPromise from "@/lib/mongodb";

export async function GET() {
    try {
        const client = await clientPromise;
        const db = client.db(process.env.MONGODB_DB);
        const products = await db.collection("products").find({}).toArray();

        // Convert MongoDB objects to plain JavaScript objects
        const cleanProducts = products.map(product => ({
            _id: product._id.toString(),
            name: product.name,
            description: product.description,
            price: product.price,
            image: product.image,
            brand: product.brand,
            specifications: product.specifications,
            createdBy: product.createdBy,
            createdAt: product.createdAt
        }));

        console.log("API: Returning", cleanProducts.length, "products");

        return new Response(JSON.stringify(cleanProducts), {
            status: 200,
            headers: {
                "Content-Type": "application/json",
                "Cache-Control": "no-cache, no-store, must-revalidate"
            },
        });
    } catch (err) {
        console.error("Error fetching products:", err.message);
        return new Response(JSON.stringify({ error: err.message }), { status: 500 });
    }
}