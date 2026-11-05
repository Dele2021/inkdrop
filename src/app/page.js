'use client';

import { useState } from 'react';
import { GlobalGlowBackground } from '../components/GlowBackground';
import { Navbar } from '../components/Navbar';
import { HeroSection } from '../components/HeroSection';
import { HowItWorksSection } from '../components/HowItWorksSection';
import { FeaturesSection } from '../components/FeaturesSection';
import { CalculatorSection } from '../components/CalculatorSection';
import { SecuritySection } from '../components/SecuritySection';
import { SocialProofSection } from '../components/SocialProofSection';
import { FinalCtaSection } from '../components/FinalCtaSection';
import { Footer } from '../components/Footer';
import { CreateLinkModal } from '../components/CreateLinkModal';
import { PayDemoModal } from '../components/PayDemoModal';
import { AuthModal } from '../components/AuthModal';

export default function Home() {
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [demoModalOpen, setDemoModalOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [activeTestLink, setActiveTestLink] = useState(null);

  const openPayDemo = (link) => {
    setActiveTestLink(link);
    setDemoModalOpen(true);
  };

  return (
    <div className="relative min-h-screen bg-black text-white antialiased overflow-x-hidden">
      <GlobalGlowBackground />
      <div className="relative z-10">
        <Navbar
          onOpenCreateModal={() => setCreateModalOpen(true)}
          onOpenAuthModal={() => setAuthModalOpen(true)}
        />
        <main>
          <HeroSection
            onOpenCreateModal={() => setCreateModalOpen(true)}
            onOpenPayDemo={openPayDemo}
          />
          <HowItWorksSection />
          <FeaturesSection />
          <CalculatorSection onOpenCreateModal={() => setCreateModalOpen(true)} />
          <SecuritySection />
          <SocialProofSection onOpenCreateModal={() => setCreateModalOpen(true)} />
          <FinalCtaSection onOpenCreateModal={() => setCreateModalOpen(true)} />
        </main>
        <Footer />
      </div>
      {createModalOpen && (
        <CreateLinkModal
          onClose={() => setCreateModalOpen(false)}
          onOpenPayDemo={openPayDemo}
        />
      )}
      {demoModalOpen && (
        <PayDemoModal
          link={activeTestLink}
          onClose={() => { setDemoModalOpen(false); setActiveTestLink(null); }}
        />
      )}
      {authModalOpen && (
        <AuthModal onClose={() => setAuthModalOpen(false)} />
      )}
    </div>
  );
}
