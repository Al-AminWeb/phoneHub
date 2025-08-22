import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import fs from "fs/promises";
import path from "path";

const usersFile = path.join(process.cwd(), "data", "users.json");

export async function POST(req) {
    try {
        const { name, email, password } = await req.json();
        if (!name || !email || !password) {
            return NextResponse.json({ error: "Missing fields" }, { status: 400 });
        }

        const json = await fs.readFile(usersFile, "utf-8").catch(() => "[]");
        const users = JSON.parse(json);

        if (users.some((u) => u.email === email)) {
            return NextResponse.json({ error: "Email already registered" }, { status: 409 });
        }

        const hash = await bcrypt.hash(password, 10);
        const newUser = { id: Date.now(), name, email, password: hash };
        users.push(newUser);
        await fs.writeFile(usersFile, JSON.stringify(users, null, 2));
        return NextResponse.json({ ok: true, user: { id: newUser.id, name, email } }, { status: 201 });
    } catch (e) {
        console.error(e);
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}
