import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';
import { ZeroGBurgerScrubber } from './ZeroGBurgerScrubber';
import { ShieldCheck, Activity, Cpu } from 'lucide-react';

export const AssemblySection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Burger Frame scrubber: from 0.2 to 0.75 scrub frames
  const burgerProgress = useTransform(scrollYProgress, [0, 0.7], [0.1, 0.85]);

  // 360 Degree rotation as user scrolls
  const burgerRotation = useTransform(scrollYProgress, [0, 1], [0, 360]);

  // Burger scale & snap effect
  const burgerScale = useTransform(scrollYProgress, [0, 0.45, 0.6, 1], [0.8, 1.15, 1.0, 1.05]);

  // Red Shockwave burst triggered near snap assembly point (~0.55 progress)
  const shockwaveScale = useTransform(scrollYProgress, [0.45, 0.65], [0.1, 2.5]);
  const shockwaveOpacity = useTransform(scrollYProgress, [0.45, 0.58, 0.68], [0, 1, 0]);

  // Typewriter Text Triggers
  const headerText = "ASSEMBLY COMPLETE.";
  const bodyText = "Calibrated for maximum taste. Structural integrity: 100%.";

  const [headerTyped, setHeaderTyped] = useState('');
  const [bodyTyped, setBodyTyped] = useState('');

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    // Typewriter ratio between 0.5 and 0.95 progress
    if (latest >= 0.45) {
      const textRatio = Math.min(1, Math.max(0, (latest - 0.45) / 0.45));
      const headerLength = Math.floor(textRatio * headerText.length);
      const bodyLength = Math.floor(textRatio * bodyText.length);
      
      setHeaderTyped(headerText.slice(0, headerLength));
      setBodyTyped(bodyText.slice(0, bodyLength));
    } else {
      setHeaderTyped('');
      setBodyTyped('');
    }
  });

  return (
    <section ref={containerRef} className="relative h-[250vh] bg-[#0A0000] text-white">
      {/* Sticky 100vh Viewport */}
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden scanline-bg bg-hud-grid">
        
        {/* Background Ambient Glows */}
        <div className="absolute inset-0 bg-radial-gradient" />
        <div className="absolute w-[500px] h-[500px] rounded-full bg-[#FF1A1A]/20 blur-[140px] pointer-events-none" />

        {/* SHOCKWAVE OF RED LIGHT BURSTING OUTWARD ON SNAP */}
        <motion.div
          style={{ scale: shockwaveScale, opacity: shockwaveOpacity }}
          className="absolute w-[400px] h-[400px] rounded-full border-4 border-[#FF1A1A] shadow-[0_0_80px_#FF1A1A] pointer-events-none z-10"
        />

        {/* Floating Telemetry Indicators */}
        <div className="absolute top-12 right-8 md:right-16 z-30 font-mono text-xs text-right space-y-1 hidden sm:block">
          <div className="flex items-center justify-end space-x-2 text-[#FF1A1A]">
            <Activity className="w-4 h-4 animate-pulse" />
            <span className="font-bold">ASSEMBLY VECTOR: SNAP</span>
          </div>
          <p className="text-gray-500">MAGNETIC LOCK: 100%</p>
        </div>

        {/* Center Burger Snap & Rotate Display */}
        <motion.div
          style={{ scale: burgerScale }}
          className="relative z-20 w-full max-w-xl aspect-square flex items-center justify-center"
        >
          {/* Outer Rotating HUD Ring */}
          <motion.div
            style={{ rotate: burgerRotation }}
            className="absolute w-[108%] h-[108%] rounded-full border border-dashed border-[#FF1A1A]/40 pointer-events-none"
          />

          <ZeroGBurgerScrubber
            progress={burgerProgress}
            rotation={burgerRotation}
            scaleMultiplier={1.1}
            className="w-full h-full"
            showParticles={true}
          />
        </motion.div>

        {/* TEXT OVERLAY (Types out on scroll) */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 max-w-2xl w-full px-6 text-center z-30 space-y-3">
          
          {/* Header */}
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded bg-[#1A0000] border border-[#FF1A1A]/60 text-[#FF1A1A] font-mono text-xs">
            <ShieldCheck className="w-4 h-4" />
            <span>STATUS LOG</span>
          </div>

          <h3 className="font-orbitron font-black text-3xl sm:text-5xl text-white uppercase tracking-tight text-glow-red min-h-[3rem] flex items-center justify-center">
            {headerTyped}
            <span className="inline-block w-3 h-8 bg-[#FF1A1A] ml-1 animate-pulse" />
          </h3>

          {/* Body */}
          <p className="font-mono text-base sm:text-lg text-[#FFB000] font-medium min-h-[2rem]">
            {bodyTyped}
          </p>

          {/* Assembly Data Bar */}
          <div className="pt-2 flex justify-center items-center space-x-8 text-xs font-mono text-gray-400">
            <span>BURGER ID: #ZG-9000</span>
            <span>STRUCTURAL INTEGRITY: <span className="text-[#FF1A1A] font-bold">100%</span></span>
          </div>
        </div>

      </div>
    </section>
  );
};
