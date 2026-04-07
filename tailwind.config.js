/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        display: ['"Syne"', 'sans-serif'],
        body: ['"DM Sans"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      colors: {
        brand: {
          50:  '#eef2ff',
          100: '#e0e7ff',
          200: '#c7d2fe',
          300: '#a5b4fc',
          400: '#818cf8',
          500: '#6366f1',
          600: '#4f46e5',
          700: '#4338ca',
          800: '#3730a3',
          900: '#312e81',
        },
        surface: {
          DEFAULT: '#0f0f17',
          50:  '#1a1a2e',
          100: '#16213e',
          200: '#1e2040',
          300: '#252850',
        },
        accent: {
          cyan:   '#22d3ee',
          violet: '#a78bfa',
          rose:   '#fb7185',
          amber:  '#fbbf24',
          emerald:'#34d399',
        },
      },
      backgroundImage: {
        'mesh-gradient': 'radial-gradient(at 40% 20%, #4f46e580 0px, transparent 50%), radial-gradient(at 80% 0%, #22d3ee40 0px, transparent 50%), radial-gradient(at 0% 50%, #a78bfa30 0px, transparent 50%)',
        'card-shine': 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, transparent 100%)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4,0,0.6,1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'slide-up': 'slideUp 0.4s ease-out',
        'fade-in': 'fadeIn 0.3s ease-out',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px #6366f180' },
          '100%': { boxShadow: '0 0 20px #6366f1, 0 0 40px #6366f140' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      boxShadow: {
        'glow-brand': '0 0 20px rgba(99,102,241,0.4)',
        'glow-cyan':  '0 0 20px rgba(34,211,238,0.3)',
        'card': '0 4px 24px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05)',
      },
    },
  },
  plugins: [],
}
