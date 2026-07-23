import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Sparkles, Radio } from 'lucide-react';

interface PreloaderProps {
  onComplete?: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isDone, setIsDone] = useState(false);
  const [statusText, setStatusText] = useState('INITIALIZING CULINARY TELEMETRY...');

  useEffect(() => {
    // Fast-track keyframe loading simulation (0% -> 100%)
    let current = 0;
    const interval = setInterval(() => {
      current += Math.floor(Math.random() * 8) + 4;
      if (current >= 30 && current < 60) {
        setStatusText('PRELOADING 3D WAGYU & CHEDDAR LAYERS...');
      } else if (current >= 60 && current < 90) {
        setStatusText('CALIBRATING GRAVITY REVERSAL FIELD...');
      } else if (current >= 90) {
        setStatusText('SYSTEM READY. DISPATCH ACTIVE.');
      }

      if (current >= 100) {
        current = 100;
        setProgress(100);
        clearInterval(interval);
        setTimeout(() => {
          setIsDone(true);
          if (onComplete) onComplete();
        }, 500);
      } else {
        setProgress(current);
      }
    }, 45);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-[#0A0000] overflow-hidden select-none"
        >
          {/* Background HUD Grid & Radial Glow */}
          <div className="absolute inset-0 bg-hud-grid opacity-30 pointer-events-none" />
          <div className="absolute w-[500px] h-[500px] rounded-full bg-[#FF1A1A]/10 blur-[130px] pointer-events-none animate-pulse" />

          <div className="relative z-10 flex flex-col items-center max-w-md px-6 text-center">
            {/* Pulsing Brand Logo Badge */}
            <motion.div
              animate={{ scale: [1, 1.08, 1], rotate: [0, 5, -5, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              className="relative flex items-center justify-center w-20 h-20 rounded-2xl bg-[#1A0000] border-2 border-[#FF1A1A] shadow-[0_0_35px_#FF1A1A] mb-8"
            >
              <span className="font-orbitron font-black text-4xl text-[#FF1A1A] text-glow-red">
                Z
              </span>
              <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-[#FFB000] rounded-full animate-ping" />
            </motion.div>

            {/* Title */}
            <h2 className="font-orbitron font-black text-2xl md:text-3xl tracking-widest text-white mb-2 uppercase">
              ZERO-G <span className="text-[#FF1A1A]">AHMAD</span>
            </h2>
            <p className="font-mono text-xs text-[#FF1A1A]/80 tracking-widest uppercase mb-8 flex items-center justify-center space-x-2">
              <Radio className="w-3.5 h-3.5 animate-pulse text-[#FF1A1A]" />
              <span>CULINARY ENGINE v2.0</span>
            </p>

            {/* Progress Bar Container */}
            <div className="w-full bg-[#1A0000] p-1.5 rounded-full border border-[#FF1A1A]/40 shadow-[0_0_20px_rgba(255,26,26,0.3)] mb-4">
              <motion.div
                className="h-3 rounded-full bg-gradient-to-r from-[#990000] via-[#FF1A1A] to-[#FFB000] shadow-[0_0_15px_#FF1A1A]"
                style={{ width: `${progress}%` }}
                transition={{ ease: 'easeOut', duration: 0.1 }}
              />
            </div>

            {/* Progress Stats */}
            <div className="w-full flex items-center justify-between font-mono text-xs text-gray-400 mb-6">
              <span className="flex items-center space-x-1">
                <Sparkles className="w-3.5 h-3.5 text-[#FFB000]" />
                <span>PRELOAD</span>
              </span>
              <span className="font-orbitron font-bold text-[#FF1A1A] text-sm">
                {progress}%
              </span>
            </div>

            {/* Status Telemetry */}
            <div className="px-4 py-2 rounded-md bg-[#120202] border border-[#FF1A1A]/30 font-mono text-[11px] text-[#FF1A1A] tracking-wider uppercase animate-pulse">
              {statusText}
            </div>
          </div>

          {/* Footer Metadata */}
          <div className="absolute bottom-6 font-mono text-[10px] text-gray-600 tracking-widest uppercase">
            0.0G GRAVITY FIELD • AHMAD CULINARY LABS
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
