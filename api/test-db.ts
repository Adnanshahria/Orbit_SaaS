import type { VercelRequest, VercelResponse } from '@vercel/node';
import db from './lib/db.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
    const envCheck = {
        TURSO_DATABASE_URL: process.env.TURSO_DATABASE_URL ? 'Set' : 'Missing',
        TURSO_AUTH_TOKEN: process.env.TURSO_AUTH_TOKEN ? 'Set' : 'Missing',
    };

    let dbStatus = 'Unknown';
    let dbError = null;

    try {
        await db.execute('SELECT 1');
        dbStatus = 'Connected';
    } catch (e: any) {
        dbStatus = 'Failed';
        dbError = e.message;
        console.error('DB Test Failed:', e);
    }

    return res.status(200).json({
        envCheck,
        dbStatus,
        dbError,
        nodeVersion: process.version
    });
}
