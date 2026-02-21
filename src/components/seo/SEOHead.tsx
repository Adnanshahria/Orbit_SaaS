import { Helmet } from 'react-helmet-async';
import { useContent } from '@/contexts/ContentContext';
import { useLang } from '@/contexts/LanguageContext';

export function SEOHead() {
    const { content } = useContent();
    const { lang } = useLang();

    // Get SEO data from content context or fallback to defaults
    const seoData = content[lang] as Record<string, any> || {};

    // Keyword-optimized defaults
    const defaultTitle = "Web Development, AI Chatbot, Mobile App & Automation Agency | ORBIT SaaS";
    const defaultDesc = "ORBIT SaaS — full-service software & AI agency. We build websites, AI chatbots, agentic AI automation, mobile apps (Flutter/React Native), eCommerce platforms, PWAs & enterprise solutions. Get a free consultation today.";
    const defaultKeywords = "web development company, full stack web development, custom website development, AI chatbot development, custom AI chatbot, chatbot integration, LLM chatbot, conversational AI, AI automation, agentic AI, AI agent development, intelligent automation, workflow automation, mobile app development, Flutter app development, React Native app development, Android app, iOS app, eCommerce website development, enterprise web application, PWA development, progressive web app, SaaS development, React development, Node.js development, full-stack development, software development agency, ORBIT SaaS, web development Bangladesh, build mobile app, AI solutions company";

    // Data from DB (saved via AdminSEO)
    const title = (content[lang]?.['seo_title'] as string) || defaultTitle;
    const description = (content[lang]?.['seo_description'] as string) || defaultDesc;
    const keywords = (content[lang]?.['seo_keywords'] as string) || defaultKeywords;

    const currentUrl = typeof window !== 'undefined' ? window.location.href : 'https://orbitsaas.cloud';
    const canonicalUrl = typeof window !== 'undefined' ? window.location.origin + window.location.pathname : 'https://orbitsaas.cloud';
    const image = 'https://orbitsaas.cloud/og-banner.png';

    return (
        <Helmet>
            {/* Basic */}
            <title>{title}</title>
            <meta name="description" content={description} />
            <meta name="keywords" content={keywords} />

            {/* Open Graph */}
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:url" content={currentUrl} />
            <meta property="og:image" content={image} />
            <meta property="og:image:alt" content="ORBIT SaaS — Full-Service Software & AI Agency" />
            <meta property="og:type" content="website" />
            <meta property="og:site_name" content="ORBIT SaaS – Full-Service Software & AI Agency" />
            <meta property="og:locale" content={lang === 'bn' ? 'bn_BD' : 'en_US'} />

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={image} />
            <meta name="twitter:image:alt" content="ORBIT SaaS — Full-Service Software & AI Agency" />

            {/* Canonical */}
            <link rel="canonical" href={canonicalUrl} />

            {/* Language alternates */}
            <link rel="alternate" hrefLang="en" href="https://orbitsaas.com/" />
            <link rel="alternate" hrefLang="bn" href="https://orbitsaas.com/?lang=bn" />
            <link rel="alternate" hrefLang="x-default" href="https://orbitsaas.com/" />

            {/* Additional SEO meta */}
            <meta name="language" content={lang === 'bn' ? 'Bengali' : 'English'} />
        </Helmet>
    );
}
