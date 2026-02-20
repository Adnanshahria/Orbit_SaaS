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
    title: 'Why Choose ORBIT SaaS?',
    subtitle: 'Visionary leaders partner with experts to craft bespoke software solutions.',
    items: [
        { title: 'Strategic Development Partners', desc: 'We align technology decisions with your business goals, delivering custom web solutions with maximum ROI.' },
        { title: 'Expert Tech Advisors', desc: 'Professional guidance on software architecture, scalability, cloud infrastructure, and emerging web technologies.' },
        { title: 'Long-term Support & Maintenance', desc: 'Ongoing development support, security updates, performance optimization, and feature enhancements to keep your product competitive.' },
        { title: 'AI & Automation Driven', desc: 'Leverage cutting-edge AI chatbots and automation pipelines to streamline workflows and reduce operational costs.' }
    ]
};

const whyUsBn = {
    title: 'কেন ORBIT SaaS বেছে নিবেন?',
    subtitle: 'বিচক্ষণ নেতারা কাস্টম সফটওয়্যার সলিউশন তৈরিতে বিশেষজ্ঞদের সাথে অংশীদারিত্ব করেন।',
    items: [
        { title: 'স্ট্র্যাটেজিক ডেভেলপমেন্ট পার্টনার', desc: 'আমরা আপনার ব্যবসার লক্ষ্যের সাথে প্রযুক্তির সমন্বয় ঘটাই এবং সর্বোচ্চ রিটার্ন অন ইনভেস্টমেন্ট (ROI) নিশ্চিত করে কাস্টম ওয়েব সলিউশন প্রদান করি।' },
        { title: 'বিশেষজ্ঞ টেক অ্যাডভাইজার', desc: 'সফটওয়্যার আর্কিটেকচার, স্কেলেবিলিটি, ক্লাউড ইনফ্রাস্ট্রাকচার, এবং আধুনিক ওয়েব প্রযুক্তির উপর পেশাদার নির্দেশনা প্রদান করি।' },
        { title: 'দীর্ঘমেয়াদী সাপোর্ট এবং মেইনটিনেন্স', desc: 'আপনার প্রোডাক্টকে প্রতিযোগিতায় টিকিয়ে রাখতে চলমান ডেভেলপমেন্ট সাপোর্ট, নিরাপত্তা আপডেট, পারফরম্যান্স অপ্টিমাইজেশন এবং ফিচার এনহ্যান্সমেন্ট সরবরাহ করি।' },
        { title: 'এআই ও অটোমেশন চালিত', desc: 'অত্যাধুনিক এআই চ্যাটবট এবং অটোমেশন পাইপলাইন ব্যবহার করে কাজের প্রবাহ আরও সহজ এবং পরিচালন ব্যয় হ্রাস করি।' }
    ]
};

async function run() {
    try {
        console.log("Starting DB update for whyUs section...");

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

        console.log("Successfully updated whyUs in the database.");
        process.exit(0);
    } catch (err) {
        console.error("Database update failed:", err);
        process.exit(1);
    }
}

run();
