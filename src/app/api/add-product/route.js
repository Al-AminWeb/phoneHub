import { promises as fs } from 'fs';
import path from 'path';

export async function POST(request) {
    try {
        const data = await request.json();
        const filePath = path.join(process.cwd(), 'data', 'products.json');
        const file = await fs.readFile(filePath, 'utf-8');
        const products = JSON.parse(file);

        // Basic validation: check for duplicate name
        if (products.some(p => p.name.toLowerCase() === data.name.toLowerCase())) {
            return new Response(JSON.stringify({ error: 'Product name already exists.' }), { status: 400 });
        }

        // Assign a new ID
        const newId = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;
        const newProduct = { ...data, id: newId };
        products.push(newProduct);
        await fs.writeFile(filePath, JSON.stringify(products, null, 4));
        return new Response(JSON.stringify({ success: true, product: newProduct }), { status: 200 });
    } catch (err) {
        return new Response(JSON.stringify({ error: err.message }), { status: 500 });
    }
}

