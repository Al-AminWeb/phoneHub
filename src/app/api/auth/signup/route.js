import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import clientPromise from "@/lib/mongodb";

export const runtime = "nodejs"; // Force Node.js runtime (needed for bcryptjs)

export async function POST(req) {
    try {
        const { name, email, password } = await req.json();
        if (!name || !email || !password) {
            return NextResponse.json({ error: "Missing fields" }, { status: 400 });
        }

        const client = await clientPromise;
        const db = client.db(); // use default db from URI
        const usersCollection = db.collection("users");

        const existingUser = await usersCollection.findOne({ email });
        if (existingUser) {
            return NextResponse.json({ error: "Email already registered" }, { status: 409 });
        }

        const hash = await bcrypt.hash(password, 10);
        const newUser = { name, email, password: hash, createdAt: new Date() };
        const result = await usersCollection.insertOne(newUser);

        return NextResponse.json(
            { ok: true, user: { id: result.insertedId, name, email } },
            { status: 201 }
        );
    } catch (e) {
        console.error("Error in signup API:", e.message);
        console.error("Stack trace:", e.stack);
        return NextResponse.json({ error: "Server error", details: e.message }, { status: 500 });
    }
}
