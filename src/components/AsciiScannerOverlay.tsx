import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AsciiImage from './AsciiImage';
import { X, Terminal, Eye, Sliders, RefreshCw, Sparkles } from 'lucide-react';

interface AsciiScannerOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

const SAMPLE_BURGER_IMAGES = [
  { label: 'Assembled Core', src: '/images/ezgif-frame-120.jpg' },
  { label: 'Vacuum Buns', src: '/images/ezgif-frame-020.jpg' },
  { label: 'A5 Wagyu Patty', src: '/images/ezgif-frame-080.jpg' },
  { label: 'Melted Cheddar', src: '/images/ezgif-frame-150.jpg' },
];

export const AsciiScannerOverlay: React.FC<AsciiScannerOverlayProps> = ({
  isOpen,
  onClose,
}) => {
  const [selectedImg, setSelectedImg] = useState(SAMPLE_BURGER_IMAGES[0].src);
  const [columns, setColumns] = useState(160);
  const [colorMode, setColorMode] = useState<'mono' | 'image'>('mono');
  const [inkColor, setInkColor] = useState('#FF1A1A');
  const [contrast, setContrast] = useState(110);
  const [revealSize, setRevealSize] = useState(90);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-black/90 backdrop-blur-xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative w-full max-w-6xl h-[85vh] bg-[#0D0202] border border-[#FF1A1A]/70 rounded-2xl flex flex-col overflow-hidden shadow-[0_0_60px_rgba(255,26,26,0.4)]"
        >
          {/* Header Bar */}
          <div className="px-6 py-4 bg-[#1A0000] border-b border-[#FF1A1A]/30 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Terminal className="w-5 h-5 text-[#FF1A1A] animate-pulse" />
              <div>
                <h3 className="font-orbitron font-extrabold text-lg text-white">
                  ASCII REVEAL SCANNER // ORIGINKIT ENGINE
                </h3>
                <p className="font-mono text-xs text-gray-400">
                  Interactive real-time ASCII pixel density decoder. Move cursor to reveal photorealistic underlying layer.
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-lg bg-[#0A0000] border border-[#FF1A1A]/40 text-gray-300 hover:text-white hover:border-[#FF1A1A] transition-all"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Main Content Area */}
          <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 overflow-hidden">
            
            {/* Left Controls Panel - 4 Cols */}
            <div className="lg:col-span-4 p-6 bg-[#120202] border-r border-[#FF1A1A]/20 space-y-6 overflow-y-auto font-mono text-xs text-gray-300">
              
              {/* Layer Selector */}
              <div className="space-y-2">
                <label className="text-[#FF1A1A] font-bold block uppercase flex items-center space-x-2">
                  <Eye className="w-4 h-4" />
                  <span>SELECT TARGET LAYER</span>
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {SAMPLE_BURGER_IMAGES.map((img) => (
                    <button
                      key={img.label}
                      onClick={() => setSelectedImg(img.src)}
                      className={`p-2.5 rounded border text-left transition-all ${
                        selectedImg === img.src
                          ? 'bg-[#FF1A1A] text-black font-bold border-[#FF1A1A]'
                          : 'bg-[#1A0000] text-gray-300 border-[#FF1A1A]/30 hover:border-[#FF1A1A]'
                      }`}
                    >
                      {img.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* ASCII Columns (Resolution) */}
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-[#FF1A1A] font-bold">GRID COLUMNS ({columns})</span>
                  <span>{columns > 150 ? 'ULTRA DENSE' : 'RETRO'}</span>
                </div>
                <input
                  type="range"
                  min="60"
                  max="240"
                  step="10"
                  value={columns}
                  onChange={(e) => setColumns(Number(e.target.value))}
                  className="w-full accent-[#FF1A1A] cursor-pointer"
                />
              </div>

              {/* Color Mode */}
              <div className="space-y-2">
                <span className="text-[#FF1A1A] font-bold block uppercase">COLOR MODE</span>
                <div className="grid grid-cols-2 gap-2">
                  {(['mono', 'image'] as const).map((mode) => (
                    <button
                      key={mode}
                      onClick={() => setColorMode(mode)}
                      className={`py-2 rounded border text-center uppercase transition-all ${
                        colorMode === mode
                          ? 'bg-[#FF1A1A] text-black font-bold border-[#FF1A1A]'
                          : 'bg-[#1A0000] text-gray-300 border-[#FF1A1A]/30 hover:border-[#FF1A1A]'
                      }`}
                    >
                      {mode}
                    </button>
                  ))}
                </div>
              </div>

              {/* Ink Color Selector (When Mono) */}
              {colorMode === 'mono' && (
                <div className="space-y-2">
                  <span className="text-[#FF1A1A] font-bold block uppercase">INK COLOR</span>
                  <div className="flex items-center space-x-2">
                    {[
                      { name: 'Ahmad Crimson', hex: '#FF1A1A' },
                      { name: 'Gold Melt', hex: '#FFB000' },
                      { name: 'Pure White', hex: '#FFFFFF' },
                      { name: 'Cyber Neon', hex: '#00FFCC' },
                    ].map((col) => (
                      <button
                        key={col.hex}
                        onClick={() => setInkColor(col.hex)}
                        className={`w-8 h-8 rounded-full border-2 transition-transform ${
                          inkColor === col.hex ? 'scale-125 border-white shadow-[0_0_10px_white]' : 'border-transparent'
                        }`}
                        style={{ backgroundColor: col.hex }}
                        title={col.name}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Reveal Lens Radius */}
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-[#FF1A1A] font-bold">REVEAL LENS SIZE ({revealSize}px)</span>
                </div>
                <input
                  type="range"
                  min="40"
                  max="160"
                  step="5"
                  value={revealSize}
                  onChange={(e) => setRevealSize(Number(e.target.value))}
                  className="w-full accent-[#FF1A1A] cursor-pointer"
                />
              </div>

              {/* Instructions */}
              <div className="p-3 rounded bg-[#1A0000] border border-[#FF1A1A]/30 space-y-1 text-[11px] text-gray-400">
                <div className="flex items-center space-x-1.5 text-[#FFB000]">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span className="font-bold">PRO-TIP</span>
                </div>
                <p>Hover over the canvas on the right to dynamically slice through the ASCII grid matrix with fluid torch light physics!</p>
              </div>

            </div>

            {/* Right Display Canvas - 8 Cols */}
            <div className="lg:col-span-8 relative bg-black flex items-center justify-center p-4">
              <div className="relative w-full h-full rounded-xl overflow-hidden border border-[#FF1A1A]/30 flex items-center justify-center">
                <AsciiImage
                  image={selectedImg}
                  columns={columns}
                  colorMode={colorMode}
                  inkColor={inkColor}
                  contrast={contrast}
                  reveal={true}
                  revealOptions={{ size: revealSize, softness: 20 }}
                  className="w-full h-full"
                />

                <div className="absolute top-4 left-4 pointer-events-none px-3 py-1.5 rounded bg-black/80 border border-[#FF1A1A]/40 font-mono text-[10px] text-[#FF1A1A]">
                  STATUS: LIVE REVEAL ACTIVE
                </div>
              </div>
            </div>

          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
