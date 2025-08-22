import { MongoClient } from "mongodb";
import fs from "fs/promises";
import path from "path";

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB;

async function uploadProducts() {
    const client = new MongoClient(uri);

    try {
        // Connect to MongoDB
        await client.connect();
        const db = client.db(dbName);
        const productsCollection = db.collection("products");

        // Read products.json
        const filePath = path.join(process.cwd(), "data", "products.json");
        const fileData = await fs.readFile(filePath, "utf-8");
        const products = JSON.parse(fileData);

        // Insert products into the collection
        const result = await productsCollection.insertMany(products);
        console.log(`${result.insertedCount} products uploaded successfully.`);
    } catch (error) {
        console.error("Error uploading products:", error);
    } finally {
        await client.close();
    }
}

uploadProducts();
