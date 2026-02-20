import { motion, useInView } from 'framer-motion';
import { ShoppingCart, GraduationCap, Palette, Building2 } from 'lucide-react';
import { useRef } from 'react';
import { useLang } from '@/contexts/LanguageContext';

const icons = [ShoppingCart, GraduationCap, Palette, Building2];

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 30,
    scale: 0.95,
    filter: 'blur(10px)',
  },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    filter: 'blur(0px)',
    transition: {
      type: 'spring' as const,
      stiffness: 80,
      damping: 20,
      delay: i * 0.12,
    },
  }),
};

export function ServicesSection() {
  const { t } = useLang();
  const ref = useRef(null);
  const inView = useInView(ref, { once: false, margin: '-80px' });

  // Theme Customization from admin
  const titleColor = (t.services as any).titleColor || '#ffffff';
  const subtitleColor = (t.services as any).subtitleColor || '#94a3b8';
  const cardBg = (t.services as any).cardBg || 'rgba(15, 23, 42, 0.3)';
  const cardBorder = (t.services as any).cardBorder || 'rgba(255, 255, 255, 0.1)';
  const iconColor = (t.services as any).iconColor || '#6c5ce7';

  // Subtitle split for word-by-word animation
  const subtitle = t.services.subtitle || '';
  const words = subtitle.split(' ');

  return (
    <section id="services" className="py-20 sm:py-32 px-4 sm:px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(108,92,231,0.06),transparent_70%)]" />

      {/* Decorative blurred blobs */}
      <div className="absolute top-1/4 -left-20 w-80 h-80 bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-neon-cyan/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative" ref={ref}>
        {/* Header — scale + fade */}
        <div className="text-center mb-16 sm:mb-24">
          <motion.h2
            initial={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
            animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-3xl sm:text-5xl lg:text-6xl font-black mb-6 tracking-tight"
            style={{ color: titleColor }}
          >
            {t.services.title}
          </motion.h2>

          <motion.p
            className="text-lg sm:text-xl max-w-2xl mx-auto flex flex-wrap justify-center gap-x-[0.35em] font-medium"
            style={{ color: subtitleColor }}
          >
            {words.map((word, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 15 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.4,
                  delay: 0.3 + i * 0.04,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
              >
                {word}
              </motion.span>
            ))}
          </motion.p>
        </div>

        {/* Cards — 3 columns grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {t.services.items.map((item: any, i: number) => {
            const Icon = icons[i % icons.length];
            // Granular per-item styling or fallback to global defaults
            const itemAccent = item.color || iconColor;
            const itemBg = item.bg || cardBg;
            const itemBorder = item.border || cardBorder;

            return (
              <motion.article
                key={i}
                custom={i}
                variants={cardVariants}
                initial="hidden"
                animate={inView ? 'visible' : 'hidden'}
                whileHover="hover"
                className="relative rounded-[2.5rem] p-10 h-full group cursor-default border transition-colors duration-500 overflow-hidden"
                style={{
                  backgroundColor: itemBg,
                  borderColor: itemBorder,
                  backdropFilter: 'blur(16px)',
                  WebkitBackdropFilter: 'blur(16px)',
                }}
              >
                {/* Individual Glow Effect on Hover */}
                <motion.div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: `radial-gradient(circle at 50% 0%, ${itemAccent}15, transparent 70%)`
                  }}
                />

                {/* Animated Shimmer/Border Light */}
                <div className="absolute -inset-px rounded-[2.5rem] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none border-2 border-transparent"
                  style={{
                    background: `linear-gradient(135deg, ${itemAccent}40, transparent, ${itemAccent}20) border-box`,
                    WebkitMask: 'linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)',
                    WebkitMaskComposite: 'destination-out',
                    maskComposite: 'exclude'
                  }}
                />

                <div className="flex flex-col h-full relative z-10">
                  <motion.div
                    className="w-20 h-20 rounded-3xl flex items-center justify-center mb-8 transition-all duration-500"
                    style={{
                      backgroundColor: `${itemAccent}10`,
                      boxShadow: `inset 0 0 20px ${itemAccent}05`
                    }}
                    variants={{
                      hover: {
                        scale: 1.1,
                        rotate: [0, -5, 5, 0],
                        boxShadow: `0 15px 30px ${itemAccent}20`
                      }
                    }}
                  >
                    <Icon className="w-10 h-10" style={{ color: itemAccent }} />
                  </motion.div>

                  <h3 className="font-display text-2xl font-black text-foreground mb-4 leading-tight group-hover:translate-x-1 transition-transform duration-300">
                    {item.title}
                  </h3>

                  <p className="text-muted-foreground leading-relaxed text-base sm:text-lg opacity-80 group-hover:opacity-100 transition-all duration-300">
                    {item.desc}
                  </p>
                </div>

                {/* Corner accent */}
                <div className="absolute -bottom-4 -right-4 w-24 h-24 rounded-full blur-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-500"
                  style={{ backgroundColor: itemAccent }} />
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
