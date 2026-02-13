import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { useLang } from '@/contexts/LanguageContext';
import { Navbar } from '@/components/orbit/Navbar';
import { OrbitFooter } from '@/components/orbit/OrbitFooter';

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

    return (
        <div className="min-h-screen bg-background text-foreground">
            <Navbar />
            <main className="pt-20">
                {/* Hero Image */}
                {project.image && (
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="w-full max-w-5xl mx-auto px-4 sm:px-6 pt-8"
                    >
                        <div className="rounded-2xl overflow-hidden border border-border shadow-2xl shadow-primary/5">
                            <img
                                src={project.image}
                                alt={project.title}
                                className="w-full h-auto max-h-[500px] object-cover"
                            />
                        </div>
                    </motion.div>
                )}

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
