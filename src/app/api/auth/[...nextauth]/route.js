import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcryptjs";
import fs from "fs/promises";
import path from "path";

const usersFile = path.join(process.cwd(), "data", "users.json");

async function getUsers() {
    const json = await fs.readFile(usersFile, "utf-8").catch(() => "[]");
    return JSON.parse(json);
}
async function findUser(email) {
    const users = await getUsers();
    return users.find((u) => u.email === email);
}

export const authOptions = {
    session: { strategy: "jwt" },
    providers: [
        // (Optional) enable later when you add credentials to .env
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID ?? "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
            allowDangerousEmailAccountLinking: true,
        }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) return null;
                const user = await findUser(credentials.email);
                if (!user) return null;
                const ok = await bcrypt.compare(credentials.password, user.password);
                if (!ok) return null;
                return { id: String(user.id), name: user.name, email: user.email };
            },
        }),
    ],
    pages: { signIn: "/login" },
    callbacks: {
        async jwt({ token, user }) {
            if (user) token.id = user.id;
            return token;
        },
        async session({ session, token }) {
            if (token?.id) session.user.id = token.id;
            return session;
        },
    },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
