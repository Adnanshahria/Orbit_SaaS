import { LanguageProvider } from './contexts/LanguageContext';
import { Navbar } from './components/orbit/Navbar';
import { HeroSection } from './components/orbit/HeroSection';
import { ServicesSection } from './components/orbit/ServicesSection';
import { TechStackSection } from './components/orbit/TechStackSection';
import { WhyUsSection } from './components/orbit/WhyUsSection';
import { ProjectsSection } from './components/orbit/ProjectsSection';
import { LeadershipSection } from './components/orbit/LeadershipSection';
import { ContactSection } from './components/orbit/ContactSection';
import { OrbitFooter } from './components/orbit/OrbitFooter';
import { Chatbot } from './components/orbit/Chatbot';

import { StructuredData } from './components/seo/StructuredData';

export default function App() {
  return (
    <LanguageProvider>
      <StructuredData />
      <div className="min-h-screen bg-background text-foreground">
        <Navbar />
        <main>
          <HeroSection />
          <ServicesSection />
          <TechStackSection />
          <WhyUsSection />
          <ProjectsSection />
          <LeadershipSection />
          <ContactSection />
        </main>
        <OrbitFooter />
        <Chatbot />
      </div>
    </LanguageProvider>
  );
}
