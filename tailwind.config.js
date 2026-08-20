/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        aerova: {
          bg: '#080414',
          dark: '#05020A',
          card: 'rgba(21, 11, 46, 0.65)',
          border: 'rgba(168, 85, 247, 0.18)',
          accent: '#A855F7',
          violet: '#8A2BE2',
          lavender: '#E9D5FF',
          cream: '#FAF5FF',
          pink: '#FF3366',
          lime: '#CCFF00',
          cyan: '#00F0FF',
        }
      },
      fontFamily: {
        display: ['Syne', 'Outfit', 'sans-serif'],
        body: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
        mono: ['"Space Mono"', 'monospace'],
      },
      animation: {
        'float-slow': 'float 6s ease-in-out infinite',
        'float-reverse': 'floatRev 7s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
        'spin-slow': 'spin 25s linear infinite',
        'shimmer': 'shimmer 2.5s infinite linear',
        'marquee': 'marquee 25s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(-14px) rotate(-1deg)' },
          '50%': { transform: 'translateY(14px) rotate(1.5deg)' },
        },
        floatRev: {
          '0%, 100%': { transform: 'translateY(12px) rotate(1deg)' },
          '50%': { transform: 'translateY(-12px) rotate(-1.5deg)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '0.85', transform: 'scale(1.08)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'hero-glow': 'radial-gradient(circle at 50% 50%, rgba(138, 43, 226, 0.28) 0%, rgba(8, 4, 20, 0) 70%)',
      }
    },
  },
  plugins: [],
}
