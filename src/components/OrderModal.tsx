import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag, Rocket, CheckCircle, Sparkles, Sliders } from 'lucide-react';
import confetti from 'canvas-confetti';

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const OrderModal: React.FC<OrderModalProps> = ({ isOpen, onClose }) => {
  const [patties, setPatties] = useState(1);
  const [cheeseLevel, setCheeseLevel] = useState('Double Melt');
  const [sauceLevel, setSauceLevel] = useState('Quantum Hot');
  const [isOrdered, setIsOrdered] = useState(false);

  const handleConfirmOrder = () => {
    setIsOrdered(true);
    confetti({
      particleCount: 200,
      spread: 100,
      origin: { y: 0.6 },
      colors: ['#FF1A1A', '#FFB000', '#FFFFFF'],
    });
  };

  const handleReset = () => {
    setIsOrdered(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-lg">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative w-full max-w-xl bg-[#120202] border border-[#FF1A1A]/60 rounded-2xl p-6 md:p-8 shadow-[0_0_50px_rgba(255,26,26,0.4)] text-white space-y-6 overflow-hidden"
        >
          {/* Background Ambient Glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#FF1A1A]/10 rounded-full blur-3xl pointer-events-none" />

          {/* Header */}
          <div className="flex items-center justify-between border-b border-[#FF1A1A]/20 pb-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-lg bg-[#1A0000] border border-[#FF1A1A]/50 text-[#FF1A1A]">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-orbitron font-extrabold text-xl text-white">
                  ORBITAL LAUNCH DISPATCH
                </h3>
                <p className="font-mono text-xs text-[#FF1A1A]">
                  ZERO-G CHEESEBURGER SEQUENCE #ZG-8821
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-lg bg-[#1A0000] border border-[#FF1A1A]/30 text-gray-400 hover:text-white hover:border-[#FF1A1A] transition-all"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {!isOrdered ? (
            <div className="space-y-6">
              {/* Customizer Options */}
              <div className="space-y-4 font-mono text-xs">
                
                {/* Patties */}
                <div className="space-y-2">
                  <label className="text-gray-300 flex justify-between">
                    <span>100% WAGYU PATTY COUNT</span>
                    <span className="text-[#FF1A1A] font-bold">{patties}x PATTY</span>
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[1, 2, 3].map((num) => (
                      <button
                        key={num}
                        onClick={() => setPatties(num)}
                        className={`py-2 rounded border transition-all ${
                          patties === num
                            ? 'bg-[#FF1A1A] text-black font-bold border-[#FF1A1A]'
                            : 'bg-[#1A0000] text-gray-300 border-[#FF1A1A]/30 hover:border-[#FF1A1A]'
                        }`}
                      >
                        {num}x Wagyu ({num * 180}g)
                      </button>
                    ))}
                  </div>
                </div>

                {/* Cheese Layer */}
                <div className="space-y-2">
                  <label className="text-gray-300 flex justify-between">
                    <span>AHMAD CHEDDAR MELT</span>
                    <span className="text-[#FFB000] font-bold">{cheeseLevel}</span>
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {['Single Melt', 'Double Melt', 'Triple Plasma'].map((lvl) => (
                      <button
                        key={lvl}
                        onClick={() => setCheeseLevel(lvl)}
                        className={`py-2 rounded border transition-all ${
                          cheeseLevel === lvl
                            ? 'bg-[#FFB000] text-black font-bold border-[#FFB000]'
                            : 'bg-[#1A0000] text-gray-300 border-[#FF1A1A]/30 hover:border-[#FFB000]'
                        }`}
                      >
                        {lvl}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Sauce */}
                <div className="space-y-2">
                  <label className="text-gray-300 flex justify-between">
                    <span>VACUUM SAUCE INFUSION</span>
                    <span className="text-[#FF1A1A] font-bold">{sauceLevel}</span>
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {['Mild Zero-G', 'Quantum Hot', 'Supernova 🔥'].map((sauce) => (
                      <button
                        key={sauce}
                        onClick={() => setSauceLevel(sauce)}
                        className={`py-2 rounded border transition-all ${
                          sauceLevel === sauce
                            ? 'bg-[#FF1A1A] text-black font-bold border-[#FF1A1A]'
                            : 'bg-[#1A0000] text-gray-300 border-[#FF1A1A]/30 hover:border-[#FF1A1A]'
                        }`}
                      >
                        {sauce}
                      </button>
                    ))}
                  </div>
                </div>

              </div>

              {/* Order Summary */}
              <div className="p-4 rounded-xl bg-[#1A0000] border border-[#FF1A1A]/30 flex items-center justify-between font-mono text-sm">
                <div>
                  <span className="text-gray-400 block text-xs">TOTAL COST</span>
                  <span className="font-orbitron font-extrabold text-2xl text-[#FF1A1A]">
                    ${(24.99 + (patties - 1) * 6.5).toFixed(2)} USD
                  </span>
                </div>
                <div className="text-right text-xs text-gray-400">
                  <span>SHIPPING: <span className="text-[#FFB000]">ORBITAL EXPRESS</span></span>
                  <p>ETA: ~12 MIN</p>
                </div>
              </div>

              {/* Confirm Button */}
              <button
                onClick={handleConfirmOrder}
                className="w-full py-4 rounded-xl font-orbitron font-black text-black bg-[#FF1A1A] hover:bg-white shadow-[0_0_30px_#FF1A1A] transition-all duration-300 flex items-center justify-center space-x-2 text-base"
              >
                <Rocket className="w-5 h-5" />
                <span>CONFIRM LAUNCH DISPATCH</span>
              </button>
            </div>
          ) : (
            <div className="text-center py-8 space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#FF1A1A]/20 border-2 border-[#FF1A1A] text-[#FF1A1A] flex items-center justify-center mx-auto shadow-[0_0_30px_#FF1A1A]">
                <CheckCircle className="w-10 h-10 animate-bounce" />
              </div>
              <h4 className="font-orbitron font-extrabold text-2xl text-white">
                LAUNCH CONFIRMED!
              </h4>
              <p className="font-mono text-sm text-[#FFB000] max-w-sm mx-auto">
                Your Zero-G Cheeseburger has entered re-entry trajectory. Drone unit deployed to coordinates.
              </p>
              <div className="pt-4">
                <button
                  onClick={handleReset}
                  className="px-6 py-2.5 rounded-lg bg-[#1A0000] border border-[#FF1A1A]/60 text-[#FF1A1A] font-mono text-xs hover:bg-[#FF1A1A] hover:text-black transition-all"
                >
                  CLOSE TELEMETRY
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
