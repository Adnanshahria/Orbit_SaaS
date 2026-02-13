export function StructuredData() {
    const organizationSchema = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "ORBIT SaaS",
        "alternateName": "Orbit SaaS Agency",
        "url": "https://orbitsaas.com",
        "logo": "https://orbitsaas.com/favicon.png",
        "description": "Full-stack web development agency specializing in custom SaaS products, eCommerce platforms, and enterprise web applications.",
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
        "address": {
            "@type": "PostalAddress",
            "addressCountry": "BD"
        },
        "contactPoint": {
            "@type": "ContactPoint",
            "contactType": "sales",
            "url": "https://wa.me/8801853452264",
            "availableLanguage": ["English", "Bengali"]
        },
        "sameAs": []
    };

    const websiteSchema = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "ORBIT SaaS",
        "url": "https://orbitsaas.com",
        "description": "ORBIT SaaS – Full-Stack Web Development Agency. Custom SaaS, eCommerce, and enterprise web applications.",
        "inLanguage": ["en", "bn"]
    };

    const serviceSchema = {
        "@context": "https://schema.org",
        "@type": "ProfessionalService",
        "name": "ORBIT SaaS – Web Development Services",
        "url": "https://orbitsaas.com",
        "image": "https://orbitsaas.com/favicon.png",
        "description": "Professional full-stack web development services including custom SaaS products, eCommerce platforms, educational platforms, portfolio websites, and enterprise web applications.",
        "priceRange": "$$",
        "address": {
            "@type": "PostalAddress",
            "addressCountry": "BD"
        },
        "telephone": "+8801853452264",
        "areaServed": {
            "@type": "GeoCircle",
            "geoMidpoint": {
                "@type": "GeoCoordinates",
                "latitude": 23.8103,
                "longitude": 90.4125
            },
            "geoRadius": "50000"
        },
        "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Web Development Services",
            "itemListElement": [
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Custom eCommerce Development",
                        "description": "Scalable online stores with payment gateways, inventory management, and analytics dashboards built with React and Node.js."
                    }
                },
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "SaaS Product Development",
                        "description": "Full-stack SaaS product development with modern technologies including React, TypeScript, Node.js, and cloud infrastructure."
                    }
                },
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Enterprise Web Application Development",
                        "description": "Robust, secure, and high-performance enterprise applications for complex business workflows."
                    }
                },
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Educational Platform Development",
                        "description": "LMS, course platforms, and interactive study tools built for engagement and scale."
                    }
                },
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Portfolio & Blog Website Development",
                        "description": "SEO-optimized personal brands with CMS integrations and custom responsive designs."
                    }
                }
            ]
        },
        "knowsAbout": [
            "Web Development",
            "React",
            "Node.js",
            "TypeScript",
            "Next.js",
            "Full-Stack Development",
            "eCommerce Development",
            "SaaS Development",
            "Enterprise Software",
            "Cloud Infrastructure",
            "PostgreSQL",
            "MongoDB",
            "Tailwind CSS",
            "REST API",
            "GraphQL"
        ]
    };

    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://orbitsaas.com/" },
            { "@type": "ListItem", "position": 2, "name": "Services", "item": "https://orbitsaas.com/#services" },
            { "@type": "ListItem", "position": 3, "name": "Tech Stack", "item": "https://orbitsaas.com/#tech-stack" },
            { "@type": "ListItem", "position": 4, "name": "Projects", "item": "https://orbitsaas.com/#projects" },
            { "@type": "ListItem", "position": 5, "name": "Leadership", "item": "https://orbitsaas.com/#leadership" },
            { "@type": "ListItem", "position": 6, "name": "Contact", "item": "https://orbitsaas.com/#contact" }
        ]
    };

    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            {
                "@type": "Question",
                "name": "What web development services does ORBIT SaaS offer?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "ORBIT SaaS offers full-stack web development services including custom SaaS products, eCommerce platforms, educational platforms (LMS), personal portfolios, and enterprise web applications. We use modern technologies like React, Node.js, TypeScript, and cloud infrastructure."
                }
            },
            {
                "@type": "Question",
                "name": "What technologies does ORBIT SaaS use?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "We use cutting-edge technologies including React, Next.js, TypeScript, Node.js, Express, PostgreSQL, MongoDB, Tailwind CSS, Docker, AWS, and more. Our tech stack is optimized for performance, scalability, and maintainability."
                }
            },
            {
                "@type": "Question",
                "name": "How can I hire ORBIT SaaS for my project?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "You can book an appointment through our WhatsApp at +8801853452264 or visit our website to get a free consultation. We work with businesses of all sizes to deliver custom web development solutions."
                }
            }
        ]
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
        </>
    );
}
