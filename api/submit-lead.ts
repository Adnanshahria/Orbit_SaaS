import type { VercelRequest, VercelResponse } from '@vercel/node';
import db from './lib/db.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
    // CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    if (req.method === 'OPTIONS') return res.status(200).end();

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { email, source, name } = req.body;

    if (!email || typeof email !== 'string' || !email.includes('@')) {
        return res.status(400).json({ error: 'Valid email is required' });
    }

    try {
        // Ensure the table exists (prevents 500 errors if seed script wasn't run)
        await db.execute(`
            CREATE TABLE IF NOT EXISTS leads (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                email TEXT NOT NULL,
                source TEXT,
                name TEXT,
                created_at TEXT DEFAULT (datetime('now'))
            )
        `);

        // Basic deduplication check
        const existing = await db.execute({
            sql: 'SELECT id FROM leads WHERE email = ?',
            args: [email]
        });

        if (existing.rows.length > 0) {
            // Opt to silently succeed to protect against email enumeration or just return a message
            return res.status(200).json({ success: true, message: 'Lead already captured previously' });
        }

        await db.execute({
            sql: `INSERT INTO leads (email, source, name, created_at) VALUES (?, ?, ?, datetime('now'))`,
            args: [email, source || 'website', name || null]
        });

        return res.status(200).json({ success: true, message: 'Lead captured successfully' });
    } catch (error) {
        console.error('Submit lead error:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}
