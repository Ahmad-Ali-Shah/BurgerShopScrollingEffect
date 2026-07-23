import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import AsciiImage from './AsciiImage';
import { Sparkles, Zap, Flame, Compass } from 'lucide-react';

export const IngredientsSection: React.FC = () => {
  const targetRef = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start start', 'end end'],
  });

  // Map vertical scroll to horizontal pan (0% to -66.6%)
  const x = useTransform(scrollYProgress, [0, 1], ['0%', '-66.66%']);
  
  // Parallax floating positions for background elements
  const particleY1 = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const particleY2 = useTransform(scrollYProgress, [0, 1], [0, 150]);

  const ingredients = [
    {
      id: 'buns',
      tag: 'BASE COMPONENT #01',
      title: 'Sesame Seed Buns: Baked in a vacuum.',
      words: ['Sesame', 'Seed', 'Buns:', 'Baked', 'in', 'a', 'vacuum.'],
      subtitle: 'Zero-pressure proofing preserves 99.8% air pocket porosity for ultimate fluffiness.',
      image: '/images/ezgif-frame-020.jpg',
      statLabel: 'Bake Pressure',
      statValue: '0.001 Torr',
      accentColor: '#FFB000',
      icon: Compass,
    },
    {
      id: 'patty',
      tag: 'CORE COMPONENT #02',
      title: 'Zero-G Beef Patty: 100% Wagyu, aged to perfection.',
      words: ['Zero-G', 'Beef', 'Patty:', '100%', 'Wagyu,', 'aged', 'to', 'perfection.'],
      subtitle: 'Seared in zero gravity using infrared magnetic induction to retain 100% natural juices.',
      image: '/images/ezgif-frame-080.jpg',
      statLabel: 'Marbling Index',
      statValue: 'A5 BMS 12',
      accentColor: '#FF1A1A',
      icon: Flame,
    },
    {
      id: 'cheese',
      tag: 'MELT MODULE #03',
      title: 'Ahmad Cheddar: Melted at light speed.',
      words: ['Ahmad', 'Cheddar:', 'Melted', 'at', 'light', 'speed.'],
      subtitle: 'Plasma-heated high-altitude cheddar forming zero-friction liquid gold cascades.',
      image: '/images/ezgif-frame-140.jpg',
      statLabel: 'Melt Speed',
      statValue: '299,792 km/s',
      accentColor: '#FFD700',
      icon: Zap,
    },
  ];

  return (
    <section ref={targetRef} className="relative h-[300vh] bg-[#0A0000]">
      {/* Sticky viewport for horizontal pan */}
      <div className="sticky top-0 flex h-screen items-center overflow-hidden scanline-bg">
        {/* Background Glowing Trails */}
        <motion.div
          style={{ y: particleY1 }}
          className="absolute top-1/4 left-10 w-96 h-96 rounded-full bg-[#FF1A1A]/10 blur-3xl pointer-events-none"
        />
        <motion.div
          style={{ y: particleY2 }}
          className="absolute bottom-1/4 right-10 w-96 h-96 rounded-full bg-[#FFB000]/10 blur-3xl pointer-events-none"
        />

        {/* Section Header Pin */}
        <div className="absolute top-8 left-8 md:left-16 z-30 flex items-center space-x-3 pointer-events-none">
          <div className="w-2.5 h-2.5 rounded-full bg-[#FF1A1A] animate-ping" />
          <span className="font-mono text-xs text-[#FF1A1A] tracking-widest uppercase">
            SECTION 02 // INGREDIENT DECONSTRUCTION
          </span>
        </div>

        {/* Horizontal Container */}
        <motion.div style={{ x }} className="flex w-[300vw] h-full">
          {ingredients.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                className="w-[100vw] h-full flex items-center justify-center px-6 md:px-20 relative"
              >
                <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                  
                  {/* Left Column: Word-by-Word Text Reveal */}
                  <div className="space-y-6 z-20">
                    <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-[#1A0000] border border-[#FF1A1A]/40 text-xs font-mono text-[#FF1A1A]">
                      <Icon className="w-3.5 h-3.5" style={{ color: item.accentColor }} />
                      <span>{item.tag}</span>
                    </div>

                    {/* Word-by-Word Title Display */}
                    <div className="font-orbitron font-extrabold text-3xl sm:text-4xl md:text-5xl text-white leading-tight tracking-tight">
                      {item.words.map((word, wIdx) => (
                        <motion.span
                          key={wIdx}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{
                            duration: 0.5,
                            delay: wIdx * 0.08,
                            ease: 'easeOut',
                          }}
                          viewport={{ once: false, amount: 0.5 }}
                          className="inline-block mr-3"
                          style={{
                            color: word.includes(':') || word.includes('Ahmad') || word.includes('Zero-G') || word.includes('Sesame')
                              ? item.accentColor
                              : '#FFFFFF',
                          }}
                        >
                          {word}
                        </motion.span>
                      ))}
                    </div>

                    {/* Subtitle */}
                    <p className="font-space text-base md:text-lg text-gray-300 max-w-xl leading-relaxed">
                      {item.subtitle}
                    </p>

                    {/* Spec Telemetry Card */}
                    <div className="pt-4 flex items-center space-x-6 border-t border-[#FF1A1A]/20">
                      <div>
                        <span className="font-mono text-xs text-gray-500 uppercase block">
                          {item.statLabel}
                        </span>
                        <span
                          className="font-orbitron text-xl md:text-2xl font-bold"
                          style={{ color: item.accentColor }}
                        >
                          {item.statValue}
                        </span>
                      </div>
                      <div className="h-8 w-px bg-[#FF1A1A]/20" />
                      <div>
                        <span className="font-mono text-xs text-gray-500 uppercase block">
                          Gravity Trajectory
                        </span>
                        <span className="font-mono text-sm text-gray-300">
                          Floating [Slow-Mo]
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Floating Zero-G Ingredient ASCII / Photo Visual */}
                  <div className="relative flex items-center justify-center z-10">
                    <motion.div
                      animate={{
                        y: [-12, 12, -12],
                        rotate: [-1.5, 1.5, -1.5],
                      }}
                      transition={{
                        duration: 6,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      }}
                      className="relative w-full max-w-[440px] aspect-square rounded-2xl p-1 bg-gradient-to-b from-[#FF1A1A]/40 to-transparent border border-[#FF1A1A]/30 shadow-[0_0_40px_rgba(255,26,26,0.2)] overflow-hidden group"
                    >
                      {/* ASCII Reveal Component */}
                      <AsciiImage
                        image={item.image}
                        inkColor={item.accentColor}
                        contrast={115}
                        columns={180}
                        reveal={true}
                        revealOptions={{ size: 90, softness: 20 }}
                        className="w-full h-full rounded-xl"
                      />

                      {/* Golden Particle Trails */}
                      <div className="absolute inset-0 pointer-events-none">
                        <div className="absolute top-1/4 right-6 w-2 h-2 rounded-full bg-[#FFB000] shadow-[0_0_10px_#FFB000] animate-float-particle" />
                        <div className="absolute bottom-1/3 left-8 w-3 h-3 rounded-full bg-[#FF1A1A] shadow-[0_0_12px_#FF1A1A] animate-float-particle" style={{ animationDelay: '1.5s' }} />
                      </div>

                      {/* Interactive Cursor Hint */}
                      <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded bg-black/80 border border-[#FF1A1A]/40 text-[10px] font-mono text-[#FFB000] opacity-80 group-hover:opacity-100 transition-opacity">
                        MOVE CURSOR TO REVEAL PHOTO
                      </div>
                    </motion.div>
                  </div>

                </div>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};
