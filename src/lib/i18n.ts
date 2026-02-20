export type Lang = 'en' | 'bn';

export const translations = {
  en: {
    nav: {
      services: 'Services',
      techStack: 'Tech Stack',
      whyUs: 'Why Us',
      leadership: 'Leadership',
      contact: 'Contact',
      projects: 'Projects',
      bookCall: 'Book an Appointment',
    },
    hero: {
      title: '',
      tagline: '',
      subtitle: '',
      cta: '',
      learnMore: '',
    },
    services: {
      title: '',
      subtitle: '',
      items: [] as { title: string; desc: string }[],
    },
    techStack: {
      title: '',
      subtitle: '',
      categories: [] as { name: string; color: string; items: string[] }[],
    },
    whyUs: {
      title: '',
      subtitle: '',
      items: [] as { title: string; desc: string }[],
    },
    projects: {
      title: '',
      subtitle: '',
      items: [] as { title: string; desc: string; tags: string[]; link: string; image: string }[],
    },
    leadership: {
      title: '',
      subtitle: '',
      members: [] as any[],
    },
    contact: {
      title: '',
      subtitle: '',
      cta: '',
      whatsapp: '',
    },
    footer: {
      rights: '',
      tagline: '',
      socials: [
        { platform: 'facebook', url: '', enabled: false },
        { platform: 'instagram', url: '', enabled: false },
        { platform: 'linkedin', url: '', enabled: false },
        { platform: 'telegram', url: '', enabled: false },
        { platform: 'twitter', url: '', enabled: false },
        { platform: 'youtube', url: '', enabled: false },
        { platform: 'github', url: '', enabled: false },
        { platform: 'whatsapp', url: '', enabled: false },
      ],
    },
    chatbot: {
      title: 'ORBIT AI Assistant',
      placeholder: 'Ask me anything about our services...',
      greeting: 'Hi! 👋 I\'m the ORBIT SaaS assistant. How can I help you today?',
      systemPrompt: `You are Orbit AI, the snappy and compact assistant for ORBIT SaaS.
      - STYLE: Extremely concise. One or two short sentences per point. 
      - FORMAT: Use bullet points. Use bold for key terms ONLY. No fluff. 
      - GOAL: Quick answers on services/projects/booking.
      - BORDERLINE: Directly answer users. No repetitive greetings.`,
      qaPairs: [] as { question: string; answer: string }[],
    },
  },
  bn: {
    nav: {
      services: 'সেবাসমূহ',
      techStack: 'টেক স্ট্যাক',
      whyUs: 'কেন আমরা',
      leadership: 'নেতৃত্ব',
      contact: 'যোগাযোগ',
      projects: 'প্রকল্পসমূহ',
      bookCall: 'অ্যাপয়েন্টমেন্ট বুক করুন',
    },
    hero: {
      title: '',
      tagline: '',
      subtitle: '',
      cta: '',
      learnMore: '',
    },
    services: {
      title: '',
      subtitle: '',
      items: [] as { title: string; desc: string }[],
    },
    techStack: {
      title: '',
      subtitle: '',
      categories: [] as { name: string; color: string; items: string[] }[],
    },
    whyUs: {
      title: '',
      subtitle: '',
      items: [] as { title: string; desc: string }[],
    },
    projects: {
      title: '',
      subtitle: '',
      items: [] as { title: string; desc: string; tags: string[]; link: string; image: string }[],
    },
    leadership: {
      title: '',
      subtitle: '',
      members: [] as any[],
    },
    contact: {
      title: '',
      subtitle: '',
      cta: '',
      whatsapp: '',
    },
    footer: {
      rights: '',
      tagline: '',
      socials: [
        { platform: 'facebook', url: '', enabled: false },
        { platform: 'instagram', url: '', enabled: false },
        { platform: 'linkedin', url: '', enabled: false },
        { platform: 'telegram', url: '', enabled: false },
        { platform: 'twitter', url: '', enabled: false },
        { platform: 'youtube', url: '', enabled: false },
        { platform: 'github', url: '', enabled: false },
        { platform: 'whatsapp', url: '', enabled: false },
      ],
    },
    chatbot: {
      title: 'ORBIT AI সহকারী',
      placeholder: 'আমাদের সেবা সম্পর্কে যেকোনো কিছু জিজ্ঞাসা করুন...',
      greeting: 'হ্যালো! 👋 আমি ORBIT SaaS সহকারী। আজ আপনাকে কীভাবে সাহায্য করতে পারি?',
      systemPrompt: `আপনি ORBIT SaaS-এর জন্য একজন চটপটে এবং সংক্ষিপ্ত উত্তর প্রদানকারী AI সহকারী।
      - শৈলী: অত্যন্ত সংক্ষিপ্ত। প্রতি পয়েন্টে এক বা দুটি ছোট বাক্য।
      - ফরম্যাট: বুলেট পয়েন্ট ব্যবহার করুন। শুধুমাত্র গুরুত্বপূর্ণ শব্দের জন্য বোল্ড ব্যবহার করুন। 
      - লক্ষ্য: সেবা/প্রকল্প/বুকিং সম্পর্কে দ্রুত উত্তর দেওয়া।
      - সীমা: সরাসরি উত্তর দিন। বারবার শুভেচ্ছা জানাবেন না।`,
      qaPairs: [] as { question: string; answer: string }[],
    },
  },
} as const;

export type Translations = typeof translations['en'] | typeof translations['bn'];
