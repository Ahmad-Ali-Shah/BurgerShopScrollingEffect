/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bgDeep: '#0A0000',
        bgCrimson: '#1A0000',
        ahmadRed: '#FF1A1A',
        ahmadDark: '#990000',
        meltedGold: '#FFB000',
        goldGlow: '#FFD700',
        neonRed: '#FF0033',
        cyberGray: '#121216',
        panelBg: 'rgba(20, 5, 5, 0.75)',
      },
      fontFamily: {
        orbitron: ['Orbitron', 'sans-serif'],
        space: ['Space Grotesk', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        neonRed: '0 0 20px rgba(255, 26, 26, 0.6), 0 0 40px rgba(255, 26, 26, 0.3)',
        neonRedIntense: '0 0 30px #FF1A1A, 0 0 60px #FF1A1A, 0 0 90px rgba(255, 26, 26, 0.5)',
        goldGlow: '0 0 20px rgba(255, 176, 0, 0.6), 0 0 40px rgba(255, 176, 0, 0.3)',
      },
      animation: {
        'pulse-glow': 'pulseGlow 2s infinite ease-in-out',
        'float-slow': 'floatSlow 6s infinite ease-in-out',
        'scanline': 'scanline 8s linear infinite',
      },
      keyframes: {
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(255, 26, 26, 0.6), 0 0 40px rgba(255, 26, 26, 0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(255, 26, 26, 0.9), 0 0 80px rgba(255, 26, 26, 0.6)' },
        },
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-15px) rotate(2deg)' },
        },
        scanline: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(1000%)' }
        }
      }
    },
  },
  plugins: [],
}
