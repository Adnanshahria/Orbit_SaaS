import { useLang } from '@/contexts/LanguageContext';
import orbitLogo from '@/assets/orbit-logo.png';

export function OrbitFooter() {
  const { t } = useLang();

  return (
    <footer className="border-t border-border py-5 sm:py-6 px-4 sm:px-6 pb-24 sm:pb-6">
      <div className="max-w-6xl mx-auto flex flex-col items-center gap-2 text-center">
        <div className="flex items-center gap-3">
          <img
            src={orbitLogo}
            alt="ORBIT SaaS"
            className="w-8 h-8 rounded-full object-cover"
          />
          <span className="font-display font-bold text-foreground">ORBIT SaaS</span>
        </div>
        <p className="text-muted-foreground text-sm">{t.footer.tagline}</p>
        <p className="text-muted-foreground text-xs">{t.footer.rights}</p>
      </div>
    </footer>
  );
}
