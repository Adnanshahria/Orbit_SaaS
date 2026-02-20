import { createClient } from '@libsql/client';
import dotenv from 'dotenv';

dotenv.config();

const url = process.env.TURSO_DATABASE_URL;
const authToken = process.env.TURSO_AUTH_TOKEN;

const db = createClient({
    url: url || '',
    authToken: authToken || '',
});

const whyUsEn = {
    title: 'Why Choose ORBIT?',
    subtitle: 'We don\'t just build products — we become your AI-powered technology partner, from idea to launch and beyond.',
    items: [
        { title: 'AI-First Development', desc: 'Every solution we build is designed with AI at its core — from intelligent chatbots and agentic automation to AI-enhanced user experiences that give your business a real competitive edge.', bg: '#eef2ff', color: '#4f46e5' },
        { title: 'Full-Spectrum Tech Expertise', desc: 'Web, mobile, PWA, eCommerce, SaaS — we cover the full stack. Whether it\'s an Android app, a multi-panel dashboard, or an enterprise platform, one team handles everything end to end.', bg: '#f0fdf4', color: '#16a34a' },
        { title: 'Fast Delivery, Zero Compromise', desc: 'We move fast without cutting corners. Agile sprints, transparent communication, and a customer-first mindset mean you get your product on time — with extra features, not missing ones.', bg: '#fffbeb', color: '#d97706' },
        { title: 'Long-term Support & Growth', desc: 'Our relationship doesn\'t end at launch. We provide ongoing maintenance, security updates, performance optimization, and continuous AI improvements — so your product keeps evolving with your business.', bg: '#fff0f6', color: '#db2777' }
    ]
};

const whyUsBn = {
    title: 'কেন ORBIT বেছে নিবেন?',
    subtitle: 'আমরা শুধু প্রোডাক্ট তৈরি করি না — শুরু থেকে শেষ পর্যন্ত আমরা আপনার এআই-চালিত প্রযুক্তি অংশীদার।',
    items: [
        { title: 'এআই-ফার্স্ট ডেভেলপমেন্ট', desc: 'আমাদের প্রতিটি সলিউশন এআই-এর ওপর ভিত্তি করে তৈরি — ইন্টেলিজেন্ট চ্যাটবট এবং এজেন্টিক অটোমেশন থেকে শুরু করে এআই-চালিত ইউজার এক্সপেরিয়েন্স, যা আপনার ব্যবসাকে প্রতিযোগিতায় এগিয়ে রাখে।', bg: '#eef2ff', color: '#4f46e5' },
        { title: 'ফুল-স্পেকট্রাম টেক দক্ষতা', desc: 'ওয়েব, মোবাইল, PWA, ই-কমার্স, সাআস — আমরা সব ক্ষেত্রেই দক্ষ। অ্যান্ড্রয়েড অ্যাপ, মাল্টি-প্যানেল ড্যাশবোর্ড, বা এন্টারপ্রাইজ প্ল্যাটফর্ম যাই হোক না কেন, আমাদের একটি টিম সবকিছু সম্পন্ন করে।', bg: '#f0fdf4', color: '#16a34a' },
        { title: 'দ্রুত ডেলিভারি, জিরো কম্প্রোমাইজ', desc: 'আমরা গুণের সাথে আপস না করেই দ্রুত কাজ করি। অ্যাজাইল স্প্রিন্ট, স্বচ্ছ যোগাযোগ এবং কাস্টমার-ফার্স্ট মানসিকতার ফলে আপনি আপনার প্রোডাক্ট সময়মতো পান — তাও কোনো ফিচার বাদ না দিয়ে।', bg: '#fffbeb', color: '#d97706' },
        { title: 'দীর্ঘমেয়াদী সাপোর্ট এবং গ্রোথ', desc: 'লঞ্চের পরেই আমাদের সম্পর্ক শেষ হয়ে যায় মহাশয়। আপনার প্রোডাক্ট যেন ব্যবসার সাথে তাল মিলিয়ে বাড়তে পারে, তার জন্য আমরা চলমান মেইনটিনেন্স, নিরাপত্তা আপডেট এবং এআই ইমপ্রুভমেন্ট দিয়ে থাকি।', bg: '#fff0f6', color: '#db2777' }
    ]
};

async function run() {
    try {
        console.log("Starting DB update for whyUs section with dynamically colored tiles...");

        // English
        let res = await db.execute({
            sql: `UPDATE site_content SET data = ? WHERE section = 'whyUs' AND lang = 'en'`,
            args: [JSON.stringify(whyUsEn)]
        });
        if (res.rowsAffected === 0) {
            await db.execute({
                sql: `INSERT INTO site_content (section, lang, data) VALUES ('whyUs', 'en', ?)`,
                args: [JSON.stringify(whyUsEn)]
            });
            console.log(`Inserted whyUs for en`);
        } else {
            console.log(`Updated whyUs for en`);
        }

        // Bangla
        res = await db.execute({
            sql: `UPDATE site_content SET data = ? WHERE section = 'whyUs' AND lang = 'bn'`,
            args: [JSON.stringify(whyUsBn)]
        });
        if (res.rowsAffected === 0) {
            await db.execute({
                sql: `INSERT INTO site_content (section, lang, data) VALUES ('whyUs', 'bn', ?)`,
                args: [JSON.stringify(whyUsBn)]
            });
            console.log(`Inserted whyUs for bn`);
        } else {
            console.log(`Updated whyUs for bn`);
        }

        console.log("Successfully overridden whyUs details globally within the database.");
        process.exit(0);
    } catch (err) {
        console.error("Database update failed:", err);
        process.exit(1);
    }
}

run();
