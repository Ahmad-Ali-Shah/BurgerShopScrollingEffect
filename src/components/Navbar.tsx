import React from 'react';
import { Shield, Sparkles, Terminal, ShoppingBag, Radio } from 'lucide-react';

interface NavbarProps {
  onOpenAsciiModal: () => void;
  onOpenOrderModal: () => void;
  asciiModeActive: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenAsciiModal,
  onOpenOrderModal,
  asciiModeActive,
}) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 md:px-8 py-4 bg-gradient-to-b from-[#0A0000]/90 to-transparent backdrop-blur-md border-b border-[#FF1A1A]/20 transition-all duration-300">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Brand Header */}
        <div className="flex items-center space-x-3 cursor-pointer group">
          <div className="relative flex items-center justify-center w-10 h-10 rounded-lg bg-[#1A0000] border border-[#FF1A1A]/40 group-hover:border-[#FF1A1A] group-hover:shadow-[0_0_15px_#FF1A1A] transition-all">
            <span className="font-orbitron font-black text-xl text-[#FF1A1A] group-hover:scale-110 transition-transform">
              Z
            </span>
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-[#FF1A1A] rounded-full animate-ping" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-orbitron font-extrabold text-lg tracking-wider text-white">
                ZERO-G
              </span>
              <span className="text-xs px-2 py-0.5 rounded bg-[#FF1A1A]/20 border border-[#FF1A1A]/40 text-[#FF1A1A] font-mono tracking-widest">
                v2.0
              </span>
            </div>
            <p className="text-[10px] font-mono tracking-widest text-[#FF1A1A]/70 uppercase">
              Ahmad Culinary Lab
            </p>
          </div>
        </div>

        {/* Live Status Telemetry */}
        <div className="hidden md:flex items-center space-x-6 px-4 py-1.5 rounded-full bg-[#120202]/80 border border-[#FF1A1A]/30">
          <div className="flex items-center space-x-2">
            <Radio className="w-4 h-4 text-[#FF1A1A] animate-pulse" />
            <span className="text-xs font-mono text-gray-300">
              FIELD: <span className="text-[#FF1A1A] font-bold">0.0G ACTIVE</span>
            </span>
          </div>
          <div className="h-3 w-px bg-[#FF1A1A]/30" />
          <div className="flex items-center space-x-2">
            <Sparkles className="w-3.5 h-3.5 text-[#FFB000]" />
            <span className="text-xs font-mono text-gray-300">
              TEMP: <span className="text-[#FFB000] font-bold">1000K MELT</span>
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-3">
          <button
            onClick={onOpenAsciiModal}
            className={`flex items-center space-x-2 px-3 py-2 rounded-md font-mono text-xs transition-all duration-300 ${
              asciiModeActive
                ? 'bg-[#FF1A1A] text-black font-bold shadow-[0_0_20px_#FF1A1A]'
                : 'bg-[#1A0000] text-[#FF1A1A] border border-[#FF1A1A]/50 hover:bg-[#FF1A1A]/20 hover:border-[#FF1A1A]'
            }`}
            title="Toggle ASCII Scan Telemetry"
          >
            <Terminal className="w-4 h-4" />
            <span className="hidden sm:inline">ASCII SCANNER</span>
          </button>

          <button
            onClick={onOpenOrderModal}
            className="relative group overflow-hidden px-5 py-2 rounded-md font-orbitron font-bold text-xs text-black bg-[#FF1A1A] hover:bg-white shadow-[0_0_20px_rgba(255,26,26,0.8)] transition-all duration-300 transform active:scale-95"
          >
            <div className="flex items-center space-x-2 relative z-10">
              <ShoppingBag className="w-4 h-4" />
              <span>LAUNCH ORDER</span>
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
          </button>
        </div>
      </div>
    </header>
  );
};
