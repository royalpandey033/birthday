/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        noir: '#070305',
        wine: {
          950: '#0c0408',
          900: '#15060f',
          850: '#1d0915',
          800: '#280c1d',
          700: '#3e132c',
          600: '#591a3f',
          500: '#7e2358',
        },
        champagne: {
          100: '#fef7ea',
          200: '#faedd2',
          300: '#f5ddb2',
          400: '#eec789',
          500: '#dfa45f',
          600: '#be7e38',
        },
        roseGold: '#e9a89b',
        blush: '#f3c4c9',
        crimsonGlow: '#d83a56',
        velvet: '#1b0813',
      },
      fontFamily: {
        serif: ['"Playfair Display"', '"Cormorant Garamond"', 'Georgia', 'serif'],
        cormorant: ['"Cormorant Garamond"', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
        handwriting: ['"Caveat"', 'cursive'],
        script: ['"Great Vibes"', 'cursive'],
      },
      animation: {
        'float-slow': 'float 8s ease-in-out infinite',
        'float-gentle': 'floatGentle 6s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 4s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-12px) rotate(1deg)' },
        },
        floatGentle: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.05)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      boxShadow: {
        'glow-sm': '0 0 20px rgba(216, 58, 86, 0.25)',
        'glow-md': '0 0 35px rgba(216, 58, 86, 0.35)',
        'glow-gold': '0 0 30px rgba(223, 164, 95, 0.3)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.45)',
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}
