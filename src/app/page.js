'use client';
import { useState } from 'react';
import { GlobalGlowBackground } from '../components/GlowBackground';
import { LandingNavbar } from '../components/LandingNavbar';
import { HeroSection } from '../components/HeroSection';
import { HowItWorksSection } from '../components/HowItWorksSection';
import { FeaturesSection } from '../components/FeaturesSection';
import { CalculatorSection } from '../components/CalculatorSection';
import { SecuritySection } from '../components/SecuritySection';
import { FinalCtaSection } from '../components/FinalCtaSection';
import { LandingFooter } from '../components/LandingFooter';
import { CreateLinkModal } from '../components/CreateLinkModal';
import { PayDemoModal } from '../components/PayDemoModal';

export default function HomePage() {
  const [createOpen, setCreateOpen] = useState(false);
  const [demoOpen, setDemoOpen] = useState(false);
  const [demoLink, setDemoLink] = useState(null);

  const openDemo = (link) => {
    setDemoLink(link || null);
    setDemoOpen(true);
  };

  return (
    <div className="relative min-h-screen bg-black text-[#F3F4F6] overflow-x-hidden selection:bg-[#7132F5]/40 selection:text-[#E9D5FF]">
      <GlobalGlowBackground />
      <LandingNavbar onOpenCreateModal={() => setCreateOpen(true)} onOpenDemoModal={() => openDemo(null)} />
      <main>
        <HeroSection onOpenCreateModal={() => setCreateOpen(true)} onOpenDemoModal={() => openDemo(null)} />
        <HowItWorksSection onOpenCreateModal={() => setCreateOpen(true)} />
        <FeaturesSection onOpenCreateModal={() => setCreateOpen(true)} onOpenDemoModal={() => openDemo(null)} />
        <CalculatorSection onOpenCreateModal={() => setCreateOpen(true)} />
        <SecuritySection />
        <FinalCtaSection onOpenCreateModal={() => setCreateOpen(true)} onOpenDemoModal={() => openDemo(null)} />
      </main>
      <LandingFooter onOpenCreateModal={() => setCreateOpen(true)} onOpenDemoModal={() => openDemo(null)} />
      <CreateLinkModal
        isOpen={createOpen}
        onClose={() => setCreateOpen(false)}
        onTestLink={(link) => { setCreateOpen(false); openDemo(link); }}
      />
      <PayDemoModal
        isOpen={demoOpen}
        onClose={() => { setDemoOpen(false); setDemoLink(null); }}
        initialLink={demoLink}
      />
    </div>
  );
}
