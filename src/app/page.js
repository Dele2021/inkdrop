'use client';
import { useState } from 'react';
import { GlobalGlowBackground } from '../components/GlowBackground';
import { Navbar } from '../components/Navbar';
import { HeroSection } from '../components/HeroSection';
import { NetworkSection } from '../components/NetworkSection';
import { HowItWorksSection } from '../components/HowItWorksSection';
import { PricingSection } from '../components/PricingSection';
import { SecuritySection } from '../components/SecuritySection';
import { GlobalMapSection } from '../components/GlobalMapSection';
import { FaqSection } from '../components/FaqSection';
import { Footer } from '../components/Footer';
import { CreateLinkModal } from '../components/CreateLinkModal';
import { PayDemoModal } from '../components/PayDemoModal';
import { AuthModal } from '../components/AuthModal';

export default function Home() {
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [demoModalOpen, setDemoModalOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [activeTestLink, setActiveTestLink] = useState(null);
  const openPayDemo = (link) => { setActiveTestLink(link); setDemoModalOpen(true); };
  return (
    <div className="relative min-h-screen bg-black text-white antialiased overflow-x-hidden">
      <GlobalGlowBackground />
      <div className="relative z-10">
        <Navbar onOpenCreateModal={() => setCreateModalOpen(true)} onOpenAuthModal={() => setAuthModalOpen(true)} />
        <main>
          <HeroSection onOpenCreateModal={() => setCreateModalOpen(true)} onOpenDemoModal={() => setDemoModalOpen(true)} />
          <NetworkSection />
          <HowItWorksSection onOpenCreateModal={() => setCreateModalOpen(true)} />
          <PricingSection onOpenCreateModal={() => setCreateModalOpen(true)} />
          <SecuritySection />
          <GlobalMapSection />
          <FaqSection onOpenCreateModal={() => setCreateModalOpen(true)} />
        </main>
        <Footer onOpenCreateModal={() => setCreateModalOpen(true)} onOpenDemoModal={() => setDemoModalOpen(true)} onOpenAuthModal={() => setAuthModalOpen(true)} />
      </div>
      {createModalOpen && <CreateLinkModal isOpen={createModalOpen} onClose={() => setCreateModalOpen(false)} onTestLink={openPayDemo} />}
      {demoModalOpen && <PayDemoModal link={activeTestLink} onClose={() => { setDemoModalOpen(false); setActiveTestLink(null); }} />}
      {authModalOpen && <AuthModal onClose={() => setAuthModalOpen(false)} />}
    </div>
  );
}
