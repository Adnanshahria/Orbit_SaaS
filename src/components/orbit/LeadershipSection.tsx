import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { useLang } from '@/contexts/LanguageContext';
import { Cpu, Crown, Target } from 'lucide-react';

const memberStyles = [
  { icon: Cpu, gradient: 'linear-gradient(135deg, #6c5ce7, #3b82f6)', shadow: '0 4px 20px rgba(108, 92, 231, 0.4)' },
  { icon: Crown, gradient: 'linear-gradient(135deg, #0891b2, #6c5ce7)', shadow: '0 4px 20px rgba(8, 145, 178, 0.4)' },
  { icon: Target, gradient: 'linear-gradient(135deg, #d946a8, #6c5ce7)', shadow: '0 4px 20px rgba(217, 70, 168, 0.4)' },
];

export function LeadershipSection() {
  const { t } = useLang();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="leadership" className="py-16 sm:py-24 px-4 sm:px-6 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-secondary/20 to-transparent" />
      <div className="max-w-5xl mx-auto relative" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-10 sm:mb-16"
        >
          <h2 className="font-display text-2xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-3 sm:mb-4">{t.leadership.title}</h2>
          <p className="text-muted-foreground text-base sm:text-lg max-w-xl mx-auto">{t.leadership.subtitle}</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {t.leadership.members.map((member, i) => {
            const { icon: Icon, gradient, shadow } = memberStyles[i];
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.2 }}
                className="glass-effect rounded-2xl p-8 text-center group hover:border-neon-purple/40 gentle-animation"
              >
                <div
                  className="w-20 h-20 rounded-2xl mx-auto mb-6 flex items-center justify-center group-hover:scale-105 gentle-animation"
                  style={{ background: gradient, boxShadow: shadow }}
                >
                  <Icon className="w-9 h-9 text-white" strokeWidth={1.5} />
                </div>
                <h3 className="font-display text-xl font-semibold text-foreground mb-1">{member.name}</h3>
                <p className="text-neon-cyan text-sm font-medium">{member.role}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
