import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ExternalLink, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { useLang } from '@/contexts/LanguageContext';
import { Navbar } from '@/components/orbit/Navbar';
import { OrbitFooter } from '@/components/orbit/OrbitFooter';
import { useState } from 'react';

function ImageGallery({ images, title }: { images: string[]; title: string }) {
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

    if (!images || images.length === 0) return null;

    const openLightbox = (idx: number) => setSelectedIndex(idx);
    const closeLightbox = () => setSelectedIndex(null);
    const goNext = () => setSelectedIndex((prev) => (prev !== null ? (prev + 1) % images.length : 0));
    const goPrev = () => setSelectedIndex((prev) => (prev !== null ? (prev - 1 + images.length) % images.length : 0));

    return (
        <>
            {/* Hero / First Image */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="w-full max-w-5xl mx-auto px-4 sm:px-6 pt-8"
            >
                <div
                    className="rounded-2xl overflow-hidden border border-border shadow-2xl shadow-primary/5 cursor-pointer group"
                    onClick={() => openLightbox(0)}
                >
                    <img
                        src={images[0]}
                        alt={title}
                        className="w-full h-auto max-h-[560px] object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                    />
                </div>
            </motion.div>

            {/* Thumbnail Grid (if more than 1 image) */}
            {images.length > 1 && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.15 }}
                    className="w-full max-w-5xl mx-auto px-4 sm:px-6 pt-4"
                >
                    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2 sm:gap-3">
                        {images.map((img, i) => (
                            <motion.div
                                key={i}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.97 }}
                                className={`rounded-xl overflow-hidden border-2 cursor-pointer transition-all duration-200 ${i === 0 ? 'border-primary ring-2 ring-primary/20' : 'border-border hover:border-primary/40'
                                    }`}
                                onClick={() => openLightbox(i)}
                            >
                                <img
                                    src={img}
                                    alt={`${title} - image ${i + 1}`}
                                    className="w-full h-20 sm:h-24 object-cover"
                                />
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            )}

            {/* Lightbox */}
            <AnimatePresence>
                {selectedIndex !== null && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex items-center justify-center"
                        onClick={closeLightbox}
                    >
                        {/* Close button */}
                        <button
                            onClick={closeLightbox}
                            className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                        >
                            <X className="w-6 h-6" />
                        </button>

                        {/* Navigation: Previous */}
                        {images.length > 1 && (
                            <button
                                onClick={(e) => { e.stopPropagation(); goPrev(); }}
                                className="absolute left-4 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                            >
                                <ChevronLeft className="w-7 h-7" />
                            </button>
                        )}

                        {/* Main image */}
                        <motion.img
                            key={selectedIndex}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.3 }}
                            src={images[selectedIndex]}
                            alt={`${title} - full view`}
                            className="max-w-[90vw] max-h-[85vh] object-contain rounded-lg shadow-2xl"
                            onClick={(e) => e.stopPropagation()}
                        />

                        {/* Navigation: Next */}
                        {images.length > 1 && (
                            <button
                                onClick={(e) => { e.stopPropagation(); goNext(); }}
                                className="absolute right-4 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                            >
                                <ChevronRight className="w-7 h-7" />
                            </button>
                        )}

                        {/* Image counter */}
                        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/70 text-sm font-medium bg-black/40 px-4 py-1.5 rounded-full">
                            {selectedIndex + 1} / {images.length}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}

export default function ProjectDetail() {
    const { id } = useParams<{ id: string }>();
    const { t } = useLang();
    const items = (t as any).projects?.items ?? [];
    const idx = parseInt(id || '0', 10);
    const project = items[idx];

    if (!project) {
        return (
            <div className="min-h-screen bg-background text-foreground">
                <Navbar />
                <div className="flex flex-col items-center justify-center py-40 px-4">
                    <h1 className="text-3xl font-bold mb-4">Project Not Found</h1>
                    <Link to="/#projects" className="text-primary hover:underline flex items-center gap-2">
                        <ArrowLeft className="w-4 h-4" /> Back to Projects
                    </Link>
                </div>
                <OrbitFooter />
            </div>
        );
    }

    // Build images array: prefer `images`, fallback to single `image`
    const allImages: string[] =
        project.images && project.images.length > 0
            ? project.images
            : project.image
                ? [project.image]
                : [];

    return (
        <div className="min-h-screen bg-background text-foreground">
            <Navbar />
            <main className="pt-20">
                {/* Image Gallery */}
                <ImageGallery images={allImages} title={project.title} />

                {/* Content */}
                <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
                    {/* Back link */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4 }}
                    >
                        <Link
                            to="/#projects"
                            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8"
                        >
                            <ArrowLeft className="w-4 h-4" /> Back to Projects
                        </Link>
                    </motion.div>

                    {/* Title */}
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6"
                    >
                        {project.title}
                    </motion.h1>

                    {/* Tags */}
                    {project.tags && (
                        <motion.div
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="flex flex-wrap gap-2 mb-8"
                        >
                            {project.tags.map((tag: string, j: number) => (
                                <span
                                    key={j}
                                    className="px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium"
                                >
                                    {tag}
                                </span>
                            ))}
                        </motion.div>
                    )}

                    {/* Description */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="prose-section"
                    >
                        <div
                            className="text-muted-foreground text-base sm:text-lg leading-relaxed space-y-4 [&_b]:font-bold [&_b]:text-foreground [&_i]:italic [&_h3]:text-xl [&_h3]:font-bold [&_h3]:text-foreground [&_h3]:mt-6 [&_h3]:mb-2 [&_hr]:my-6 [&_hr]:border-border [&_span]:inline"
                            dangerouslySetInnerHTML={{ __html: project.desc || '' }}
                        />
                    </motion.div>

                    {/* Live Link Button */}
                    {project.link && project.link !== '#' && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                            className="mt-10"
                        >
                            <a
                                href={project.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-white font-medium hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20"
                            >
                                <ExternalLink className="w-4 h-4" />
                                Visit Live Project
                            </a>
                        </motion.div>
                    )}
                </div>
            </main>
            <OrbitFooter />
        </div>
    );
}
