/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: '#07090E',
          soft: '#0C101A',
          raised: '#111726',
          line: 'rgba(148, 163, 184, 0.14)',
        },
        slate: {
          muted: '#94A3B8',
          deep: '#0F172A',
        },
        accent: {
          DEFAULT: '#4F46E5',
          hover: '#6366F1',
          soft: 'rgba(79, 70, 229, 0.12)',
        },
        signal: {
          DEFAULT: '#10B981',
          soft: 'rgba(16, 185, 129, 0.12)',
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['Sora', 'Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(18px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'pulse-dot': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.35' },
        },
        'flow-line': {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.7s cubic-bezier(0.22, 1, 0.36, 1) both',
        'pulse-dot': 'pulse-dot 1.8s ease-in-out infinite',
        'flow-line': 'flow-line 3.2s linear infinite',
      },
    },
  },
  plugins: [],
};
