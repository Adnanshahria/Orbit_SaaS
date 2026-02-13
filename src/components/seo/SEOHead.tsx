import { Helmet } from 'react-helmet-async';
import { useContent } from '@/contexts/ContentContext';
import { useLang } from '@/contexts/LanguageContext';

export function SEOHead() {
    const { content } = useContent();
    const { lang } = useLang();

    // Get SEO data from content context or fallback to defaults
    // The content object structure is content[lang][section]
    const seoData = content[lang] as Record<string, any> || {};

    // Defaults fallback
    const defaultTitle = "ORBIT SaaS | Web Development Company";
    const defaultDesc = "ORBIT SaaS is a full-stack web development agency specializing in custom SaaS products, eCommerce platforms, and enterprise applications.";
    const defaultKeywords = "web development, SaaS, React, Node.js, eCommerce, enterprise software, software agency, Bangladesh";

    // Data from DB (saved via AdminSEO)
    // Saved as individual sections: 'seo_title', 'seo_description', 'seo_keywords'

    const title = (content[lang]?.['seo_title'] as string) || defaultTitle;
    const description = (content[lang]?.['seo_description'] as string) || defaultDesc;
    const keywords = (content[lang]?.['seo_keywords'] as string) || defaultKeywords;

    const currentUrl = typeof window !== 'undefined' ? window.location.href : 'https://orbitsaas.com';
    const image = 'https://orbitsaas.com/favicon.png';

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
            <meta property="og:type" content="website" />
            <meta property="og:locale" content={lang === 'bn' ? 'bn_BD' : 'en_US'} />

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={image} />

            {/* Canonical */}
            <link rel="canonical" href={currentUrl} />
        </Helmet>
    );
}
