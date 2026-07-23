import React, { useEffect, useState } from 'react';
import Lenis from 'lenis';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { IngredientsSection } from './components/IngredientsSection';
import { AssemblySection } from './components/AssemblySection';
import { TechSpecsSection } from './components/TechSpecsSection';
import { OutroSection } from './components/OutroSection';
import { OrderModal } from './components/OrderModal';
import { AsciiScannerOverlay } from './components/AsciiScannerOverlay';

export function App() {
  const [isAsciiModalOpen, setIsAsciiModalOpen] = useState(false);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);

  // Initialize Lenis Smooth Scrolling
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 2.0,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    const rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  const handleExploreScroll = () => {
    window.scrollTo({
      top: window.innerHeight * 1.2,
      behavior: 'smooth',
    });
  };

  return (
    <div className="relative min-h-screen bg-[#0A0000] text-white selection:bg-[#FF1A1A] selection:text-black">
      {/* Navigation Header */}
      <Navbar
        onOpenAsciiModal={() => setIsAsciiModalOpen(true)}
        onOpenOrderModal={() => setIsOrderModalOpen(true)}
        asciiModeActive={isAsciiModalOpen}
      />

      {/* Section 1: The Hero (Pinned Sticky Scroll) */}
      <HeroSection onExploreClick={handleExploreScroll} />

      {/* Section 2: The Ingredients (Horizontal Scroll / Parallax) */}
      <IngredientsSection />

      {/* Section 3: The Assembly (Scale & Rotate on Scroll) */}
      <AssemblySection />

      {/* Section 4: The Tech Specs (Sticky Scroll with Reveal) */}
      <TechSpecsSection />

      {/* Section 5: The Outro / CTA (Fade to Black) */}
      <OutroSection onInitiateOrder={() => setIsOrderModalOpen(true)} />

      {/* Interactive Modals */}
      <OrderModal
        isOpen={isOrderModalOpen}
        onClose={() => setIsOrderModalOpen(false)}
      />

      <AsciiScannerOverlay
        isOpen={isAsciiModalOpen}
        onClose={() => setIsAsciiModalOpen(false)}
      />
    </div>
  );
}

export default App;
