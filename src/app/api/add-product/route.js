import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route"; // 👈 adjust path if needed
import clientPromise from "@/lib/mongodb";

export async function POST(request) {
    try {
        // 🔒 Check authentication
        const session = await getServerSession(authOptions);
        if (!session) {
            return new Response(
                JSON.stringify({ success: false, error: "Unauthorized" }),
                { status: 401, headers: { "Content-Type": "application/json" } }
            );
        }

        const data = await request.json();

        // ✅ Basic validation
        if (!data.name || !data.price || !data.description) {
            return new Response(
                JSON.stringify({ success: false, error: "Missing required fields." }),
                { status: 400, headers: { "Content-Type": "application/json" } }
            );
        }

        const client = await clientPromise;
        const db = client.db(process.env.MONGODB_DB);
        const products = db.collection("products");

        // 🚫 Check duplicate name
        const existingProduct = await products.findOne({ name: data.name });
        if (existingProduct) {
            return new Response(
                JSON.stringify({ success: false, error: "Product name already exists." }),
                { status: 400, headers: { "Content-Type": "application/json" } }
            );
        }

        // 🆕 Insert new product
        const newProduct = { ...data, createdBy: session.user.email, createdAt: new Date() };
        const result = await products.insertOne(newProduct);

        return new Response(
            JSON.stringify({ success: true, product: { ...newProduct, _id: result.insertedId } }),
            { status: 201, headers: { "Content-Type": "application/json" } }
        );
    } catch (err) {
        return new Response(
            JSON.stringify({ success: false, error: err.message }),
            { status: 500, headers: { "Content-Type": "application/json" } }
        );
    }
}
