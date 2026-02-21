import { useLang } from '@/contexts/LanguageContext';

export function StructuredData() {
    const { t } = useLang();

    // Dynamic WhatsApp info from admin settings
    const whatsappRaw = (t.contact as any).whatsapp || '+8801853452264';
    const whatsappClean = whatsappRaw.replace(/[^0-9]/g, '');
    const whatsappUrl = `https://wa.me/${whatsappClean}`;

    const organizationSchema = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "ORBIT SaaS",
        "alternateName": ["Orbit SaaS Agency", "ORBIT SaaS Software Agency", "ORBIT Software & AI Agency"],
        "url": "https://orbitsaas.cloud",
        "logo": "https://orbitsaas.cloud/favicon.png",
        "image": "https://orbitsaas.cloud/og-banner.png",
        "description": "ORBIT SaaS is a full-service software & AI agency offering web development, custom AI chatbot integration, AI automation & agentic AI, mobile app development, eCommerce & enterprise solutions, and PWA & advanced web apps.",
        "slogan": "Build Smarter — Web, AI, Mobile & Automation Solutions That Scale",
        "foundingDate": "2024",
        "founders": [
            {
                "@type": "Person",
                "name": "Muhammed Nisar Uddin",
                "jobTitle": "Founder & CTO"
            },
            {
                "@type": "Person",
                "name": "Mohammed Adnan Shahria",
                "jobTitle": "Co-Founder & CEO"
            }
        ],
        "numberOfEmployees": {
            "@type": "QuantitativeValue",
            "minValue": 2,
            "maxValue": 10
        },
        "address": {
            "@type": "PostalAddress",
            "addressCountry": "BD"
        },
        "contactPoint": {
            "@type": "ContactPoint",
            "contactType": "sales",
            "url": whatsappUrl,
            "telephone": whatsappRaw,
            "availableLanguage": ["English", "Bengali"]
        },
        "knowsAbout": [
            "Full Stack Web Development",
            "Custom Website Development",
            "Web Application Development",
            "AI Chatbot Development",
            "Custom AI Chatbot Integration",
            "Conversational AI",
            "LLM Technology",
            "AI Automation",
            "Agentic AI",
            "Intelligent Automation",
            "Workflow Automation",
            "Mobile App Development",
            "Flutter App Development",
            "React Native App Development",
            "Android App Development",
            "iOS App Development",
            "eCommerce Development",
            "Enterprise Software Development",
            "Progressive Web Apps",
            "SaaS Development",
            "React Development",
            "Node.js Development",
            "Cloud Infrastructure"
        ],
        "sameAs": []
    };

    const websiteSchema = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "ORBIT SaaS – Full-Service Software & AI Agency",
        "alternateName": "ORBIT SaaS",
        "url": "https://orbitsaas.cloud",
        "description": "ORBIT SaaS is a full-service software & AI agency. We build websites, AI chatbots, agentic AI automation, mobile apps, eCommerce platforms, PWAs & enterprise solutions.",
        "inLanguage": ["en", "bn"],
        "potentialAction": {
            "@type": "SearchAction",
            "target": "https://orbitsaas.cloud/?s={search_term_string}",
            "query-input": "required name=search_term_string"
        }
    };

    const serviceSchema = {
        "@context": "https://schema.org",
        "@type": "ProfessionalService",
        "name": "ORBIT SaaS – Web Development, AI Chatbot, Mobile App & Automation Agency",
        "url": "https://orbitsaas.cloud",
        "image": "https://orbitsaas.cloud/og-banner.png",
        "description": "Full-service software & AI agency specializing in full-stack web development, custom AI chatbot integration, AI automation & agentic AI, mobile app development (Flutter, React Native), eCommerce & enterprise solutions, and PWA & advanced web apps.",
        "priceRange": "$$",
        "address": {
            "@type": "PostalAddress",
            "addressCountry": "BD"
        },
        "telephone": whatsappRaw,
        "areaServed": [
            {
                "@type": "Country",
                "name": "Bangladesh"
            },
            {
                "@type": "GeoCircle",
                "geoMidpoint": {
                    "@type": "GeoCoordinates",
                    "latitude": 23.8103,
                    "longitude": 90.4125
                },
                "geoRadius": "50000"
            }
        ],
        "serviceType": [
            "Full Stack Web Development",
            "Custom AI Chatbot Integration",
            "AI Automation & Agentic AI",
            "Mobile App Development",
            "eCommerce & Enterprise Solutions",
            "PWA & Advanced Web Apps",
            "SaaS Development",
            "Custom Software Development"
        ],
        "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Software Development, AI & Mobile App Services",
            "itemListElement": [
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Full Stack Web Design & Development",
                        "description": "End-to-end websites and web apps — from pixel-perfect UI/UX design to robust backend systems. Dynamic, animated, multilayered, and multi-panel experiences that are fast, responsive, and built to scale."
                    }
                },
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Custom AI Chatbot Integration & Support",
                        "description": "Custom-trained Conversational AI that understands your business — automating customer support, qualifying leads, and delivering 24/7 assistance with a human-like touch powered by the latest LLM technology."
                    }
                },
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "AI Automation & Agentic AI",
                        "description": "Intelligent automation pipelines that work autonomously — streamlining workflows, eliminating repetitive tasks, and enabling real-time decision-making with multi-step agentic AI agents."
                    }
                },
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Mobile App Development",
                        "description": "Native and cross-platform apps for Android, iOS, and beyond — built with Flutter, React Native, or Java. Smooth, performant mobile experiences from MVP to enterprise-grade production apps."
                    }
                },
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "eCommerce & Enterprise Solutions",
                        "description": "Scalable online stores and enterprise web applications with payment gateways, real-time analytics, inventory systems, and secure high-performance infrastructure — built for growth from day one."
                    }
                },
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "PWA & Advanced Web Apps",
                        "description": "Progressive Web Apps that work offline, install like native apps, and load instantly. SaaS platforms, educational tools, and complex multi-panel dashboards using modern React and Next.js."
                    }
                }
            ]
        },
        "knowsAbout": [
            "Full Stack Web Development",
            "Web Application Development",
            "Custom AI Chatbot",
            "Conversational AI",
            "LLM Integration",
            "AI Automation",
            "Agentic AI",
            "Workflow Automation",
            "Mobile App Development",
            "Flutter",
            "React Native",
            "Android Development",
            "iOS Development",
            "eCommerce Development",
            "Enterprise Software",
            "Progressive Web Apps",
            "SaaS Development",
            "React",
            "Node.js",
            "TypeScript",
            "Next.js",
            "OpenAI API",
            "LangChain",
            "Cloud Infrastructure",
            "SEO",
            "Web Performance"
        ]
    };

    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://orbitsaas.cloud" },
            { "@type": "ListItem", "position": 2, "name": "Services", "item": "https://orbitsaas.cloud/#services" },
            { "@type": "ListItem", "position": 3, "name": "Tech Stack", "item": "https://orbitsaas.cloud/#tech-stack" },
            { "@type": "ListItem", "position": 4, "name": "Why Us", "item": "https://orbitsaas.cloud/#why-us" },
            { "@type": "ListItem", "position": 5, "name": "Projects", "item": "https://orbitsaas.cloud/#projects" },
            { "@type": "ListItem", "position": 6, "name": "Contact Us", "item": "https://orbitsaas.cloud/#contact" }
        ]
    };

    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            {
                "@type": "Question",
                "name": "What services does ORBIT SaaS offer?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "ORBIT SaaS offers six core services: Full Stack Web Design & Development, Custom AI Chatbot Integration & Support, AI Automation & Agentic AI, Mobile App Development (Flutter, React Native, Java), eCommerce & Enterprise Solutions, and PWA & Advanced Web Apps. We use React, Node.js, TypeScript, Flutter, OpenAI API, LangChain, and modern cloud infrastructure."
                }
            },
            {
                "@type": "Question",
                "name": "Can ORBIT SaaS build an AI chatbot for my business?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes! ORBIT SaaS builds custom-trained conversational AI chatbots powered by the latest LLM technology. Our chatbots automate customer support, qualify leads, and provide 24/7 assistance with a human-like touch — fully customized for your business needs."
                }
            },
            {
                "@type": "Question",
                "name": "Does ORBIT SaaS develop mobile apps?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Absolutely. ORBIT SaaS builds native and cross-platform mobile apps for Android and iOS using Flutter, React Native, and Java. We deliver smooth, performant mobile experiences from MVP to enterprise-grade production apps."
                }
            },
            {
                "@type": "Question",
                "name": "What is AI Automation and Agentic AI?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "AI Automation and Agentic AI are intelligent automation pipelines that work autonomously on your behalf. They streamline workflows, eliminate repetitive tasks, and enable real-time decision-making with multi-step AI agents. ORBIT SaaS builds custom automation solutions tailored to your business processes."
                }
            },
            {
                "@type": "Question",
                "name": "How much does a project cost?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Project costs vary based on complexity, features, and technology. ORBIT SaaS offers competitive pricing — from affordable startup packages to enterprise-grade solutions. We price by project weight, not hourly. Contact us for a free consultation and quote."
                }
            },
            {
                "@type": "Question",
                "name": "How long does a typical project take?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "A typical project takes 1-8 weeks depending on complexity. Simple websites can be delivered in 1-2 weeks, while complex web applications, AI integrations, or mobile apps may take 2-3 months. We provide detailed timelines during our free consultation."
                }
            },
            {
                "@type": "Question",
                "name": "How can I hire ORBIT SaaS for my project?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": `You can hire ORBIT SaaS by booking a free consultation through WhatsApp at ${whatsappRaw} or visiting our website. We work with businesses of all sizes — from startups to enterprises — delivering web, AI, mobile, and automation solutions that scale with your growth.`
                }
            }
        ]
    };

    const itemListSchema = {
        "@context": "https://schema.org",
        "@type": "ItemList",
        "name": "ORBIT SaaS Core Services",
        "description": "Complete list of software development, AI, and mobile app services offered by ORBIT SaaS",
        "numberOfItems": 6,
        "itemListElement": [
            {
                "@type": "ListItem",
                "position": 1,
                "name": "Full Stack Web Design & Development",
                "url": "https://orbitsaas.cloud/#services",
                "description": "End-to-end websites and web apps with pixel-perfect UI/UX and robust backend systems"
            },
            {
                "@type": "ListItem",
                "position": 2,
                "name": "Custom AI Chatbot Integration & Support",
                "url": "https://orbitsaas.cloud/#services",
                "description": "Custom-trained conversational AI chatbots powered by LLM technology for 24/7 business support"
            },
            {
                "@type": "ListItem",
                "position": 3,
                "name": "AI Automation & Agentic AI",
                "url": "https://orbitsaas.cloud/#services",
                "description": "Intelligent automation pipelines with multi-step agentic AI agents for workflow automation"
            },
            {
                "@type": "ListItem",
                "position": 4,
                "name": "Mobile App Development",
                "url": "https://orbitsaas.cloud/#services",
                "description": "Native and cross-platform apps for Android and iOS using Flutter, React Native, and Java"
            },
            {
                "@type": "ListItem",
                "position": 5,
                "name": "eCommerce & Enterprise Solutions",
                "url": "https://orbitsaas.cloud/#services",
                "description": "Scalable online stores and enterprise web apps with payment gateways and real-time analytics"
            },
            {
                "@type": "ListItem",
                "position": 6,
                "name": "PWA & Advanced Web Apps",
                "url": "https://orbitsaas.cloud/#services",
                "description": "Progressive Web Apps, SaaS platforms, and complex multi-panel dashboards with React and Next.js"
            }
        ]
    };

    const webAppSchema = {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "ORBIT SaaS",
        "url": "https://orbitsaas.cloud",
        "applicationCategory": "BusinessApplication",
        "operatingSystem": "All",
        "browserRequirements": "Requires JavaScript. Requires HTML5.",
        "description": "ORBIT SaaS — full-service software & AI agency. Explore our web development, AI chatbot, AI automation, mobile app, eCommerce, and PWA services.",
        "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD",
            "description": "Free consultation for software development, AI, and mobile app projects"
        }
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
            />
        </>
    );
}
