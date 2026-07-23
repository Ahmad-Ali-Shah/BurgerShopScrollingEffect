import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ZeroGBurgerScrubber } from './ZeroGBurgerScrubber';
import { Cpu, Zap, Droplets, Magnet, Radio, Layers } from 'lucide-react';

export const TechSpecsSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Left pinned burger frame position & slight float
  const burgerProgress = useTransform(scrollYProgress, [0, 1], [0.7, 0.95]);

  // Right column spec cards staggered slide up
  const spec1Y = useTransform(scrollYProgress, [0.05, 0.35], [120, 0]);
  const spec1Opacity = useTransform(scrollYProgress, [0.05, 0.35], [0, 1]);

  const spec2Y = useTransform(scrollYProgress, [0.3, 0.6], [120, 0]);
  const spec2Opacity = useTransform(scrollYProgress, [0.3, 0.6], [0, 1]);

  const spec3Y = useTransform(scrollYProgress, [0.55, 0.85], [120, 0]);
  const spec3Opacity = useTransform(scrollYProgress, [0.55, 0.85], [0, 1]);

  return (
    <section ref={containerRef} className="relative h-[250vh] bg-[#0A0000] text-white">
      {/* Sticky 100vh Layout */}
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden scanline-bg px-6 md:px-16">
        
        {/* Background Grid */}
        <div className="absolute inset-0 bg-hud-grid opacity-60" />
        <div className="absolute top-1/3 right-1/4 w-[450px] h-[450px] rounded-full bg-[#FF1A1A]/10 blur-[130px] pointer-events-none" />

        <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-12 gap-10 items-center z-20">
          
          {/* LEFT SIDE (Pinned Burger Visual) - 5 columns */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center">
            <div className="relative w-full max-w-[420px] aspect-square flex items-center justify-center">
              
              {/* Outer Neon Grid Ring */}
              <div className="absolute inset-0 rounded-full border border-[#FF1A1A]/30 box-glow-red animate-pulse pointer-events-none" />

              <ZeroGBurgerScrubber
                progress={burgerProgress}
                scaleMultiplier={1.05}
                className="w-full h-full"
                showParticles={true}
              />

              {/* HUD Target Crosshair overlay */}
              <div className="absolute top-4 left-4 font-mono text-[10px] text-[#FF1A1A]">
                TARGET: ZERO-G CORE
              </div>
              <div className="absolute bottom-4 right-4 font-mono text-[10px] text-[#FFB000]">
                STATUS: SYNCED
              </div>
            </div>
          </div>

          {/* RIGHT SIDE (Tech Specs Slide Up with Red Neon Glow) - 7 columns */}
          <div className="lg:col-span-7 space-y-8 pl-0 lg:pl-6">
            
            {/* Header */}
            <div className="space-y-2">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded bg-[#1A0000] border border-[#FF1A1A]/50 text-[#FF1A1A] font-mono text-xs">
                <Cpu className="w-4 h-4" />
                <span>SPECIFICATION TELEMETRY</span>
              </div>
              <h2 className="font-orbitron font-black text-4xl md:text-6xl text-white tracking-tight uppercase text-glow-red">
                ENGINEERING DATA
              </h2>
              <p className="font-mono text-sm text-gray-400">
                Quantum culinary metrics calibrated under simulated microgravity conditions.
              </p>
            </div>

            {/* SPECS LIST */}
            <div className="space-y-5">
              
              {/* Spec 1: Flavor Output: 10,000 Lumens */}
              <motion.div
                style={{ y: spec1Y, opacity: spec1Opacity }}
                className="p-6 rounded-xl bg-[#120202]/90 border border-[#FF1A1A]/50 hover:border-[#FF1A1A] shadow-[0_0_20px_rgba(255,26,26,0.3)] transition-all space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-2.5 rounded-lg bg-[#1A0000] border border-[#FF1A1A]/40 text-[#FF1A1A]">
                      <Zap className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="font-mono text-xs text-gray-400 block uppercase">
                        PHOTONIC TASTE EMISSION
                      </span>
                      <h4 className="font-orbitron font-bold text-xl md:text-2xl text-white">
                        Flavor Output: <span className="text-[#FF1A1A] text-glow-red">10,000 Lumens</span>
                      </h4>
                    </div>
                  </div>
                  <span className="font-mono text-xs px-2.5 py-1 rounded bg-[#FF1A1A]/20 text-[#FF1A1A] border border-[#FF1A1A]/40">
                    SPEC #01
                  </span>
                </div>

                {/* Progress Visual */}
                <div className="space-y-1">
                  <div className="flex justify-between font-mono text-[10px] text-gray-400">
                    <span>LUMINANCE INTENSITY</span>
                    <span>100% MAXIMUM</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-[#1A0000] border border-[#FF1A1A]/30 overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-[#FF1A1A] to-[#FF0033] shadow-[0_0_10px_#FF1A1A] w-full" />
                  </div>
                </div>
              </motion.div>

              {/* Spec 2: Juice Retention: 99.9% */}
              <motion.div
                style={{ y: spec2Y, opacity: spec2Opacity }}
                className="p-6 rounded-xl bg-[#120202]/90 border border-[#FF1A1A]/50 hover:border-[#FF1A1A] shadow-[0_0_20px_rgba(255,26,26,0.3)] transition-all space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-2.5 rounded-lg bg-[#1A0000] border border-[#FFB000]/40 text-[#FFB000]">
                      <Droplets className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="font-mono text-xs text-gray-400 block uppercase">
                        MOISTURE HYDROLOCK MATRIX
                      </span>
                      <h4 className="font-orbitron font-bold text-xl md:text-2xl text-white">
                        Juice Retention: <span className="text-[#FFB000] text-glow-gold">99.9%</span>
                      </h4>
                    </div>
                  </div>
                  <span className="font-mono text-xs px-2.5 py-1 rounded bg-[#FFB000]/20 text-[#FFB000] border border-[#FFB000]/40">
                    SPEC #02
                  </span>
                </div>

                {/* Progress Visual */}
                <div className="space-y-1">
                  <div className="flex justify-between font-mono text-[10px] text-gray-400">
                    <span>CAPILLARY LOCK RATIO</span>
                    <span>99.9% OPTIMAL</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-[#1A0000] border border-[#FFB000]/30 overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-[#FFB000] to-[#FFD700] shadow-[0_0_10px_#FFB000] w-[99.9%]" />
                  </div>
                </div>
              </motion.div>

              {/* Spec 3: Gravity Reversal Field: Active */}
              <motion.div
                style={{ y: spec3Y, opacity: spec3Opacity }}
                className="p-6 rounded-xl bg-[#120202]/90 border border-[#FF1A1A]/50 hover:border-[#FF1A1A] shadow-[0_0_20px_rgba(255,26,26,0.3)] transition-all space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-2.5 rounded-lg bg-[#1A0000] border border-[#FF1A1A]/40 text-[#FF1A1A]">
                      <Magnet className="w-5 h-5 animate-pulse" />
                    </div>
                    <div>
                      <span className="font-mono text-xs text-gray-400 block uppercase">
                        AHMAD PROPULSION
                      </span>
                      <h4 className="font-orbitron font-bold text-xl md:text-2xl text-white">
                        Gravity Reversal Field: <span className="text-[#FF1A1A] text-glow-red">Active</span>
                      </h4>
                    </div>
                  </div>
                  <span className="font-mono text-xs px-2.5 py-1 rounded bg-[#FF1A1A]/20 text-[#FF1A1A] border border-[#FF1A1A]/40 flex items-center space-x-1">
                    <Radio className="w-3 h-3 animate-ping" />
                    <span>ONLINE</span>
                  </span>
                </div>

                {/* Status Indicator */}
                <div className="flex items-center space-x-2 font-mono text-xs text-[#FF1A1A]">
                  <span className="w-2 h-2 rounded-full bg-[#FF1A1A] animate-ping" />
                  <span>AHMAD COILS OPERATING AT 100% EFFICIENCY</span>
                </div>
              </motion.div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
