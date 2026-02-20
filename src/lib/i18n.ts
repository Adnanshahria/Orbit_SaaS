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
      title: 'Our Core Services',
      subtitle: 'What We Build',
      items: [
        { title: 'Full Stack Web Design & Development', desc: 'End-to-end websites and web apps — from pixel-perfect UI/UX design to robust backend systems. We build dynamic, animated, multilayered, and multi-panel experiences that are fast, responsive, and built to scale.', color: '#d63384', bg: '#fff0f6', border: '#f9c8d9' },
        { title: 'Custom AI Chatbot Integration & Support', desc: 'Custom-trained Conversational AI that understands your business — automating customer support, qualifying leads, and delivering 24/7 assistance with a human-like touch powered by the latest LLM technology.', color: '#ffb300', bg: '#fffbec', border: '#f5e4a0' },
        { title: 'AI Automation & Agentic AI', desc: 'Intelligent automation pipelines that work autonomously on your behalf — streamlining workflows, eliminating repetitive tasks, and enabling real-time decision-making with multi-step agentic AI agents.', color: '#3b82f6', bg: '#eef4ff', border: '#c3d8fa' },
        { title: 'Mobile App Development', desc: 'Native and cross-platform apps for Android, iOS, and beyond — built with Flutter, React Native or Java. We deliver smooth, performant mobile experiences from MVP to enterprise-grade production apps.', color: '#8b5cf6', bg: '#f3f0ff', border: '#d0c7f9' },
        { title: 'eCommerce & Enterprise Solutions', desc: 'Scalable online stores and enterprise web applications with payment gateways, real-time analytics, inventory systems, and secure high-performance infrastructure — built for growth from day one.', color: '#10b981', bg: '#edfaf4', border: '#b8ead4' },
        { title: 'PWA & Advanced Web Apps', desc: 'Progressive Web Apps that work offline, install like native apps, and load instantly. We also build SaaS platforms, educational tools, and complex multi-panel dashboards using modern React and Next.js.', color: '#f97316', bg: '#fff5ee', border: '#f9d4b6' }
      ] as any[],
    },
    links: {
      title: 'Important Links',
      items: [] as { title: string; link: string }[],
    },
    techStack: {
      title: 'Our Expertise',
      subtitle: 'Technologies We Power Your Vision With',
      categories: [
        {
          name: 'Frontend Development',
          color: '#3b82f6',
          items: ['React 18', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Redux ToolKit', 'Zustand', 'Ant Design', 'Shadcn UI', 'GraphQL', 'Socket.io']
        },
        {
          name: 'Backend & Database',
          color: '#10b981',
          items: ['Node.js', 'Express.js', 'PostgreSQL', 'Prisma ORM', 'Redis', 'MongoDB', 'Supabase', 'Firebase', 'MySQL', 'Mongoose']
        },
        {
          name: 'Cloud & DevOps',
          color: '#f97316',
          items: ['Vercel', 'AWS', 'Docker', 'GitHub Actions', 'Cloudinary', 'ImgBB', 'Kubernetes', 'Nginx', 'CI/CD Pipelines', 'DigitalOcean', 'Cloudflare']
        },
        {
          name: 'AI/ML Stack',
          color: '#d63384',
          items: ['OpenAI API', 'LangChain', 'Pinecone (Vector DB)', 'PyTorch', 'TensorFlow', 'Hugging Face']
        },
        {
          name: 'Mobile App Development',
          color: '#8b5cf6',
          items: ['Flutter', 'React Native', 'Java', 'Kotlin', 'Swift', 'Android', 'iOS']
        }
      ] as any[],
    },
    whyUs: {
      title: 'Why Choose ORBIT SaaS?',
      subtitle: 'Visionary leaders partner with experts to craft bespoke software solutions.',
      items: [
        { title: 'Strategic Development Partners', desc: 'We align technology decisions with your business goals, delivering custom web solutions with maximum ROI.' },
        { title: 'Expert Tech Advisors', desc: 'Professional guidance on software architecture, scalability, cloud infrastructure, and emerging web technologies.' },
        { title: 'Long-term Support & Maintenance', desc: 'Ongoing development support, security updates, performance optimization, and feature enhancements to keep your product competitive.' },
        { title: 'AI & Automation Driven', desc: 'Leverage cutting-edge AI chatbots and automation pipelines to streamline workflows and reduce operational costs.' }
      ] as any[],
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
      title: '',
      placeholder: '',
      greeting: '',
      systemPrompt: '',
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
      title: 'আমাদের মূল সেবাসমূহ',
      subtitle: 'আমরা যা তৈরি করি',
      items: [
        { title: 'ফুল স্ট্যাক ওয়েব ডিজাইন ও ডেভেলপমেন্ট', desc: 'এন্ড-টু-এন্ড ওয়েবসাইট এবং ওয়েব অ্যাপস — পিক্সেল-পারফেক্ট UI/UX ডিজাইন থেকে শক্তিশালী ব্যাকএন্ড সিস্টেম। আমরা ডাইনামিক, অ্যানিমেটেড এবং রেস্পন্সিভ অভিজ্ঞতা তৈরি করি।', color: '#d63384', bg: '#fff0f6', border: '#f9c8d9' },
        { title: 'কাস্টম এআই চ্যাটবট ইন্টিগ্রেশন', desc: 'কাস্টম-ট্রেইনড এআই যা আপনার ব্যবসা বোঝে — কাস্টমার সাপোর্ট অটোমেশন এবং ২৪/৭ সাহায্য প্রদান করে লেটেস্ট LLM টেকনোলজির মাধ্যমে।', color: '#ffb300', bg: '#fffbec', border: '#f5e4a0' },
        { title: 'এআই অটোমেশন এবং এজেন্টিক এআই', desc: 'ইন্টেলিজেন্ট অটোমেশন পাইপলাইন যা আপনার হয়ে কাজ করে — ওয়ার্কফ্লো সহজ করে, পুনরাবৃত্তিমূলক কাজ দূর করে এবং রিয়েল-টাইম সিদ্ধান্ত নেয়।', color: '#3b82f6', bg: '#eef4ff', border: '#c3d8fa' },
        { title: 'মোবাইল অ্যাপ ডেভেলপমেন্ট', desc: 'অ্যান্ড্রয়েড এবং আইওএস-এর জন্য নেটিভ ও ক্রস-প্ল্যাটফর্ম অ্যাপস — ফ্লাটার, রিঅ্যাক্ট নেটিভ বা জাভা দিয়ে তৈরি। স্মুথ এবং পারফর্ম্যান্ট মোবাইল অভিজ্ঞতা।', color: '#8b5cf6', bg: '#f3f0ff', border: '#d0c7f9' },
        { title: 'ই-কমার্স ও এন্টারপ্রাইজ সলিউশন', desc: 'স্কেলেবল অনলাইন স্টোর এবং এন্টারপ্রাইজ ওয়েব অ্যাপ্লিকেশন — পেমেন্ট গেটওয়ে, রিয়েল-টাইম অ্যানালিটিক্স এবং সুরক্ষিত হাই-পারফরম্যান্স ইনফ্রাস্ট্রাকচার।', color: '#10b981', bg: '#edfaf4', border: '#b8ead4' },
        { title: 'PWA এবং উন্নত ওয়েব অ্যাপস', desc: 'প্রগ্রেসিভ ওয়েব অ্যাপস যা অফলাইনে কাজ করে, ইনস্টল করা যায় এবং দ্রুত লোড হয়। আমরা আধুনিক রিঅ্যাক্ট এবং নেক্সটজেএস-এর সাহায্যে তৈরি করি সাআস প্ল্যাটফর্ম।', color: '#f97316', bg: '#fff5ee', border: '#f9d4b6' }
      ] as any[],
    },
    links: {
      title: 'গুরুত্বপূর্ণ লিংক',
      items: [] as { title: string; link: string }[],
    },
    techStack: {
      title: 'আমাদের দক্ষতা',
      subtitle: 'যে প্রযুক্তিগুলো দিয়ে আমরা আপনার ভিশন বাস্তবায়ন করি',
      categories: [
        {
          name: 'ফ্রন্টএন্ড ডেভেলপমেন্ট',
          color: '#3b82f6',
          items: ['React 18', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Redux ToolKit', 'Zustand', 'Ant Design', 'Shadcn UI', 'GraphQL', 'Socket.io']
        },
        {
          name: 'ব্যাকএন্ড ও ডাটাবেস',
          color: '#10b981',
          items: ['Node.js', 'Express.js', 'PostgreSQL', 'Prisma ORM', 'Redis', 'MongoDB', 'Supabase', 'Firebase', 'MySQL', 'Mongoose']
        },
        {
          name: 'ক্লাউড ও ডেভঅপস',
          color: '#f97316',
          items: ['Vercel', 'AWS', 'Docker', 'GitHub Actions', 'Cloudinary', 'ImgBB', 'Kubernetes', 'Nginx', 'CI/CD Pipelines', 'DigitalOcean', 'Cloudflare']
        },
        {
          name: 'এআই এবং এমএল স্ট্যাক',
          color: '#d63384',
          items: ['OpenAI API', 'LangChain', 'Pinecone (Vector DB)', 'PyTorch', 'TensorFlow', 'Hugging Face']
        },
        {
          name: 'মোবাইল অ্যাপ ডেভেলপমেন্ট',
          color: '#8b5cf6',
          items: ['Flutter', 'React Native', 'Java', 'Kotlin', 'Swift', 'Android', 'iOS']
        }
      ] as any[],
    },
    whyUs: {
      title: 'কেন ORBIT SaaS বেছে নিবেন?',
      subtitle: 'বিচক্ষণ নেতারা কাস্টম সফটওয়্যার সলিউশন তৈরিতে বিশেষজ্ঞদের সাথে অংশীদারিত্ব করেন।',
      items: [
        { title: 'স্ট্র্যাটেজিক ডেভেলপমেন্ট পার্টনার', desc: 'আমরা আপনার ব্যবসার লক্ষ্যের সাথে প্রযুক্তির সমন্বয় ঘটাই এবং সর্বোচ্চ রিটার্ন অন ইনভেস্টমেন্ট (ROI) নিশ্চিত করে কাস্টম ওয়েব সলিউশন প্রদান করি।' },
        { title: 'বিশেষজ্ঞ টেক অ্যাডভাইজার', desc: 'সফটওয়্যার আর্কিটেকচার, স্কেলেবিলিটি, ক্লাউড ইনফ্রাস্ট্রাকচার, এবং আধুনিক ওয়েব প্রযুক্তির উপর পেশাদার নির্দেশনা প্রদান করি।' },
        { title: 'দীর্ঘমেয়াদী সাপোর্ট এবং মেইনটিনেন্স', desc: 'আপনার প্রোডাক্টকে প্রতিযোগিতায় টিকিয়ে রাখতে চলমান ডেভেলপমেন্ট সাপোর্ট, নিরাপত্তা আপডেট, পারফরম্যান্স অপ্টিমাইজেশন এবং ফিচার এনহ্যান্সমেন্ট সরবরাহ করি।' },
        { title: 'এআই ও অটোমেশন চালিত', desc: 'অত্যাধুনিক এআই চ্যাটবট এবং অটোমেশন পাইপলাইন ব্যবহার করে কাজের প্রবাহ আরও সহজ এবং পরিচালন ব্যয় হ্রাস করি।' }
      ] as any[],
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
      title: '',
      placeholder: '',
      greeting: '',
      systemPrompt: '',
      qaPairs: [] as { question: string; answer: string }[],
    },
  },
} as const;

export type Translations = typeof translations['en'] | typeof translations['bn'];
