import type { VercelRequest, VercelResponse } from '@vercel/node';
import db from './lib/db.js';

const SITE_BASE_URL = 'https://orbitsaas.cloud';

/**
 * Build a structured knowledge base string from raw DB content.
 * This is the single source of truth for the chatbot's knowledge.
 */
function buildKnowledgeBase(content: Record<string, any>, lang: string): string {
    let kb = '';

    const hero = content.hero;
    if (hero) {
        kb += `IDENTITY: ${hero.title}. "${hero.tagline}". ${hero.subtitle}\n`;
    }

    const projects = content.projects?.items || [];
    if (projects.length > 0) {
        kb += "PROJECTS:\n";
        projects.forEach((p: any, index: number) => {
            const projectId = p.id || index;
            const tags = (p.tags || []).join(', ');
            kb += `- ${p.title} (${tags}) → ${SITE_BASE_URL}/project/${projectId}\n`;
        });
    }

    const services = content.services?.items || [];
    if (services.length > 0) {
        kb += "SERVICES: " + services.map((s: any) => s.title).join(', ') + "\n";
    }

    const ts = content.techStack;
    if (ts) {
        const items = ts.items || [];
        if (items.length > 0) {
            kb += "TECH: " + items.map((t: any) => t.name || t).join(', ') + "\n";
        }
    }

    const whyUs = content.whyUs?.items || [];
    if (whyUs.length > 0) {
        kb += "WHY US: " + whyUs.map((w: any) => w.title).join(', ') + "\n";
    }

    const leadership = content.leadership?.members || [];
    if (leadership.length > 0) {
        kb += "TEAM: " + leadership.map((l: any) => `${l.name} (${l.role})`).join(', ') + "\n";
    }

    const footer = content.footer;
    if (footer) {
        const activeSocials = (footer.socials || []).filter((s: any) => s.enabled && s.url);
        if (activeSocials.length > 0) {
            kb += "SOCIALS: " + activeSocials.map((s: any) => `${s.platform}: ${s.url}`).join(', ') + "\n";
        }
    }

    kb += `LINKS: Home: ${SITE_BASE_URL}/ | Projects: ${SITE_BASE_URL}/projects\n`;

    const linksData = content.links?.items || [];
    if (linksData.length > 0) {
        kb += "EXTRA LINKS: " + linksData.map((l: any) => `${l.title}: ${l.link}`).join(', ') + "\n";
    }

    return kb;
}


export default async function handler(req: VercelRequest, res: VercelResponse) {
    // CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    if (req.method === 'OPTIONS') return res.status(200).end();

    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const lang = (req.query.lang as string) || 'en';

    try {
        let content: Record<string, any> = {};

        // 1. Try reading from pre-built cache first (fast: single row)
        try {
            const cacheResult = await db.execute({
                sql: 'SELECT data FROM content_cache WHERE lang = ?',
                args: [lang],
            });
            if (cacheResult.rows.length > 0) {
                content = JSON.parse(cacheResult.rows[0].data as string);
            }
        } catch {
            // content_cache table might not exist — fall through
        }

        // 2. Fallback: assemble from individual sections
        if (Object.keys(content).length === 0) {
            const result = await db.execute({
                sql: 'SELECT section, data FROM site_content WHERE lang = ?',
                args: [lang],
            });
            for (const row of result.rows) {
                content[row.section as string] = JSON.parse(row.data as string);
            }
        }

        // 3. Build knowledge base string
        const knowledgeBase = buildKnowledgeBase(content, lang);

        // 4. Extract Q&A pairs from chatbot config
        const chatbot = content.chatbot || {};
        const qaPairs = (chatbot.qaPairs || [])
            .map((qa: { question: string; answer: string }) => `Q: ${qa.question}\nA: ${qa.answer}`)
            .join('\n\n');

        // 5. Cache headers (1 min cache, allows CDN/browser caching)
        res.setHeader('Cache-Control', 'public, s-maxage=60, stale-while-revalidate=30');

        return res.status(200).json({
            success: true,
            knowledgeBase,
            qaPairs: qaPairs || null,
            systemPrompt: chatbot.systemPrompt || null,
            lang,
        });
    } catch (error) {
        console.error('Chatbot context error:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}
