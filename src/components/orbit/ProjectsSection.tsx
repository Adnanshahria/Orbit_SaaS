import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { useLang } from '@/contexts/LanguageContext';
import { Link } from 'react-router-dom';

const cardVariants = {
  hidden: (i: number) => ({
    opacity: 0,
    y: 60,
    rotateX: 8,
    scale: 0.92,
  }),
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    rotateX: 0,
    scale: 1,
    transition: {
      type: 'spring' as const,
      stiffness: 65,
      damping: 16,
      delay: i * 0.12,
    },
  }),
};

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ').trim();
}

function truncate(text: string, maxLen: number): string {
  if (text.length <= maxLen) return text;
  return text.slice(0, maxLen).trimEnd() + '…';
}

export function ProjectsSection() {
  const { t } = useLang();
  const ref = useRef(null);
  const inView = useInView(ref, { once: false, margin: '-80px' });

  const items = (t as any).projects?.items ?? [];

  return (
    <section id="projects" className="py-20 sm:py-28 px-4 sm:px-6 relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(108,92,231,0.08),transparent_60%)]" />
      <div className="max-w-6xl mx-auto relative" ref={ref}>
        <motion.div
          initial={{ opacity: 0, scale: 0.9, filter: 'blur(6px)' }}
          animate={inView ? { opacity: 1, scale: 1, filter: 'blur(0px)' } : {}}
          transition={{ type: 'spring', stiffness: 80, damping: 20 }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="font-display text-2xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-3 sm:mb-4">
            {(t as any).projects?.title ?? 'Our Projects'}
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto">
            {(t as any).projects?.subtitle ?? 'Real solutions we\'ve built for real businesses.'}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8" style={{ perspective: '1200px' }}>
          {items.map((item: any, i: number) => {
            const plainDesc = stripHtml(item.desc || '');
            const shortDesc = truncate(plainDesc, 120);

            return (
              <motion.div
                key={i}
                custom={i}
                variants={cardVariants}
                initial="hidden"
                animate={inView ? 'visible' : 'hidden'}
                whileHover={{
                  y: -8,
                  scale: 1.02,
                  boxShadow: '0 25px 50px rgba(108, 92, 231, 0.15)',
                  transition: { type: 'spring', stiffness: 300, damping: 20 },
                }}
                className="group relative rounded-2xl overflow-hidden border border-border bg-card/60 backdrop-blur-sm"
              >
                {/* Image */}
                {item.image && (
                  <Link to={`/project/${i}`} className="block">
                    <div className="aspect-video overflow-hidden">
                      <motion.img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover"
                        whileHover={{ scale: 1.06, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } }}
                      />
                    </div>
                  </Link>
                )}

                {/* Content */}
                <div className="p-5 sm:p-6">
                  <Link to={`/project/${i}`} className="block group/title">
                    <h3 className="font-display font-bold text-foreground text-lg sm:text-xl mb-2 group-hover/title:text-primary transition-colors">
                      {item.title}
                    </h3>
                  </Link>

                  <p className="text-muted-foreground text-sm sm:text-base leading-relaxed mb-4">
                    {shortDesc}
                  </p>

                  {/* Tags */}
                  {item.tags && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {item.tags.map((tag: string, j: number) => (
                        <span key={j} className="text-xs px-2.5 py-1 rounded-full bg-primary/10 text-primary font-medium">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* See More */}
                  <Link
                    to={`/project/${i}`}
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:text-primary/80 transition-colors group/link"
                  >
                    See More
                    <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
