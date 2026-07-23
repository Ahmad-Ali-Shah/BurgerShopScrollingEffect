import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ZeroGBurgerScrubber } from './ZeroGBurgerScrubber';
import { ChevronDown, Sparkles, Orbit } from 'lucide-react';

interface HeroSectionProps {
  onExploreClick: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onExploreClick }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  // Section 1 Transforms:
  // Giant text "AHMAD" fades out and scales up as user scrolls
  const ahmadTitleOpacity = useTransform(scrollYProgress, [0, 0.4, 0.7], [1, 0.4, 0]);
  const ahmadTitleScale = useTransform(scrollYProgress, [0, 0.7], [1, 1.35]);

  // Cheeseburger floats up from bottom into center
  const burgerY = useTransform(scrollYProgress, [0, 0.7], [180, 0]);
  const burgerOpacity = useTransform(scrollYProgress, [0, 0.2, 0.7], [0.3, 0.8, 1]);
  const burgerProgress = useTransform(scrollYProgress, [0, 0.8], [0, 0.25]);

  // Text overlay transforms
  const titleOpacity = useTransform(scrollYProgress, [0.1, 0.5], [0.4, 1]);
  const titleY = useTransform(scrollYProgress, [0.1, 0.5], [30, 0]);
  const subtitleOpacity = useTransform(scrollYProgress, [0.2, 0.6], [0, 1]);

  return (
    <div ref={containerRef} className="relative h-[250vh] bg-[#0A0000] text-white">
      {/* Sticky Container pinning for 100vh */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center scanline-bg bg-hud-grid">
        {/* Background Ambient Glows */}
        <div className="absolute inset-0 bg-radial-gradient opacity-90" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#FF1A1A]/10 blur-[120px] pointer-events-none" />

        {/* GIANT GLOWING RED TEXT "AHMAD" */}
        <motion.div
          style={{ opacity: ahmadTitleOpacity, scale: ahmadTitleScale }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0"
        >
          <h1 className="font-orbitron font-black text-[14vw] sm:text-[16vw] tracking-tighter text-[#FF1A1A]/30 leading-none text-glow-red text-center uppercase whitespace-nowrap">
            AHMAD
          </h1>
        </motion.div>

        {/* GLOWING CHEESEBURGER FLOATING UP FROM BOTTOM INTO CENTER */}
        <motion.div
          style={{ y: burgerY, opacity: burgerOpacity }}
          className="relative z-10 w-full max-w-2xl px-4 flex flex-col items-center justify-center"
        >
          <div className="relative w-full aspect-square max-w-[500px] flex items-center justify-center">
            {/* Zero-G Ring Orbital HUD */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
              className="absolute w-[115%] h-[115%] rounded-full border border-dashed border-[#FF1A1A]/30 pointer-events-none"
            >
              <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-[#FF1A1A] rounded-full shadow-[0_0_15px_#FF1A1A]" />
            </motion.div>

            {/* Interactive Scrubber Frame */}
            <div className="w-full h-full">
              <ZeroGBurgerScrubber
                progress={burgerProgress}
                className="w-full h-full"
                showParticles={true}
              />
            </div>
          </div>

          {/* TEXT OVERLAY */}
          <motion.div
            style={{ opacity: titleOpacity, y: titleY }}
            className="text-center mt-4 sm:mt-8 space-y-3 z-20 pointer-events-auto"
          >
            {/* Tagline Badge */}
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#1A0000] border border-[#FF1A1A]/50 text-[#FF1A1A] text-xs font-mono tracking-widest uppercase">
              <Sparkles className="w-3.5 h-3.5 text-[#FFB000]" />
              <span>ORBITAL CULINARY ENGINE</span>
            </div>

            {/* Main Title */}
            <h2 className="font-orbitron font-black text-3xl sm:text-5xl md:text-6xl tracking-tight text-white uppercase text-glow-red">
              THE ZERO-G CHEESEBURGER
            </h2>

            {/* Subtitle */}
            <motion.p
              style={{ opacity: subtitleOpacity }}
              className="font-space text-lg sm:text-xl text-[#FFB000] tracking-wide font-medium"
            >
              Defy gravity. Indulge in flavor.
            </motion.p>
          </motion.div>
        </motion.div>

        {/* Scroll Down Indicator */}
        <motion.div
          style={{ opacity: ahmadTitleOpacity }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center space-y-2 text-[#FF1A1A] font-mono text-xs z-20 cursor-pointer"
          onClick={onExploreClick}
        >
          <span className="tracking-widest uppercase animate-pulse">SCROLL TO ASSEMBLE</span>
          <ChevronDown className="w-5 h-5 animate-bounce" />
        </motion.div>
      </div>
    </div>
  );
};
