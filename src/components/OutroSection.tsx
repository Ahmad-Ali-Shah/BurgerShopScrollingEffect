import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Rocket, ShieldAlert, Sparkles, Send } from 'lucide-react';
import confetti from 'canvas-confetti';

interface OutroSectionProps {
  onInitiateOrder: () => void;
}

export const OutroSection: React.FC<OutroSectionProps> = ({ onInitiateOrder }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const particleCanvasRef = useRef<HTMLCanvasElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Background fade to pure black
  const bgOpacity = useTransform(scrollYProgress, [0, 0.6], [0, 1]);

  // Particle explosion speed transform
  const particleSpeed = useTransform(scrollYProgress, [0, 1], [1, 8]);

  // Content fade in and scale up
  const contentOpacity = useTransform(scrollYProgress, [0.3, 0.7], [0, 1]);
  const contentScale = useTransform(scrollYProgress, [0.3, 0.7], [0.85, 1]);

  // Particle Canvas Burst Logic
  useEffect(() => {
    const canvas = particleCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let alive = true;

    const count = 120;
    const particles = Array.from({ length: count }, () => {
      const angle = Math.random() * Math.PI * 2;
      const radius = Math.random() * 200 + 50;
      return {
        x: Math.cos(angle) * radius,
        y: Math.sin(angle) * radius,
        z: Math.random() * 1000 + 1,
        size: Math.random() * 3 + 1,
        color: Math.random() > 0.3 ? '#FF1A1A' : '#FFB000',
      };
    });

    const render = () => {
      if (!alive) return;
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;

      if (width > 0 && height > 0) {
        canvas.width = width;
        canvas.height = height;

        const centerX = width / 2;
        const centerY = height / 2;
        const speed = particleSpeed.get() * 3;

        ctx.fillStyle = '#000000';
        ctx.fillRect(0, 0, width, height);

        particles.forEach((p) => {
          p.z -= speed;
          if (p.z <= 0) {
            p.z = 1000;
            const angle = Math.random() * Math.PI * 2;
            const radius = Math.random() * 300 + 50;
            p.x = Math.cos(angle) * radius;
            p.y = Math.sin(angle) * radius;
          }

          const k = 400 / p.z;
          const px = p.x * k + centerX;
          const py = p.y * k + centerY;
          const pSize = Math.max(0.5, p.size * k);

          if (px >= 0 && px <= width && py >= 0 && py <= height) {
            ctx.beginPath();
            ctx.arc(px, py, pSize, 0, Math.PI * 2);
            ctx.fillStyle = p.color;
            ctx.shadowBlur = pSize * 4;
            ctx.shadowColor = p.color;
            ctx.globalAlpha = Math.min(1, (1000 - p.z) / 500);
            ctx.fill();
          }
        });
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      alive = false;
      cancelAnimationFrame(animId);
    };
  }, [particleSpeed]);

  const handleLaunchClick = () => {
    // Fire festive space burst confetti
    confetti({
      particleCount: 150,
      spread: 80,
      origin: { y: 0.7 },
      colors: ['#FF1A1A', '#FFB000', '#FFFFFF'],
    });
    onInitiateOrder();
  };

  return (
    <section ref={containerRef} className="relative h-[200vh] bg-[#000000]">
      {/* Sticky Viewport */}
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        
        {/* Background Fade to Pure Black */}
        <motion.div
          style={{ opacity: bgOpacity }}
          className="absolute inset-0 bg-[#000000] z-0"
        />

        {/* Floating Particles Flying Towards Screen */}
        <canvas
          ref={particleCanvasRef}
          className="absolute inset-0 w-full h-full z-10 pointer-events-none"
        />

        {/* Central Content Box */}
        <motion.div
          style={{ opacity: contentOpacity, scale: contentScale }}
          className="relative z-20 max-w-3xl w-full px-6 text-center space-y-8"
        >
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-[#1A0000] border border-[#FF1A1A]/60 text-[#FF1A1A] font-mono text-xs tracking-widest uppercase">
            <Rocket className="w-4 h-4 text-[#FFB000] animate-bounce" />
            <span>FINAL COUNTDOWN // LAUNCH PAD 01</span>
          </div>

          {/* Title */}
          <h2 className="font-orbitron font-black text-4xl sm:text-6xl md:text-7xl text-white tracking-tight uppercase text-glow-red">
            READY FOR LAUNCH?
          </h2>

          <p className="font-space text-lg sm:text-xl text-gray-300 max-w-xl mx-auto leading-relaxed">
            Your Zero-G Cheeseburger is assembled, calibrated, and floating on standby. Initiate sequence for immediate delivery.
          </p>

          {/* PULSING RED BUTTON: "INITIATE ORDER SEQUENCE" */}
          <div className="pt-4 flex flex-col items-center justify-center space-y-4">
            <button
              onClick={handleLaunchClick}
              className="relative group overflow-hidden px-8 sm:px-12 py-5 rounded-xl font-orbitron font-black text-lg sm:text-xl text-black bg-[#FF1A1A] hover:bg-white shadow-[0_0_50px_#FF1A1A] hover:shadow-[0_0_80px_#FFFFFF] transition-all duration-300 transform hover:scale-105 active:scale-95 animate-pulse-glow"
            >
              <div className="relative z-10 flex items-center space-x-3">
                <Send className="w-6 h-6 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                <span>INITIATE ORDER SEQUENCE</span>
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            </button>

            <span className="font-mono text-xs text-gray-500 tracking-widest uppercase">
              ESTIMATED ORBITAL DELIVERY: 12 MINUTES
            </span>
          </div>

          {/* Footer Metadata */}
          <div className="pt-12 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-gray-500 gap-4">
            <div>© 2026 AHMAD CULINARY LABS. ALL RIGHTS RESERVED.</div>
            <div className="flex items-center space-x-4">
              <span className="hover:text-[#FF1A1A] cursor-pointer">PRIVACY</span>
              <span>•</span>
              <span className="hover:text-[#FF1A1A] cursor-pointer">TELEMETRY</span>
              <span>•</span>
              <span className="hover:text-[#FF1A1A] cursor-pointer">ZERO-G PROTOCOL</span>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};
