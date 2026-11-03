/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#fff8eb',
          100: '#ffeed6',
          200: '#fed8aa',
          300: '#fdbd74',
          400: '#fb923c',
          500: '#f97316',
          DEFAULT: '#ff9900',
          hover: '#f08804',
          dark: '#d97706',
        },
        navy: {
          50: '#f0f4f9',
          100: '#dce5f0',
          200: '#bccfe4',
          300: '#91b2d4',
          400: '#6090c0',
          500: '#3e74ab',
          600: '#2d5b8f',
          700: '#234773',
          800: '#1b375b',
          900: '#0b192c',
          950: '#070f1d',
          DEFAULT: '#0b192c',
        },
        surface: {
          50: '#fafbfd',
          100: '#f4f6fa',
          200: '#e9edf5',
          300: '#d8e0ed',
          400: '#94a3b8',
          500: '#64748b',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        'subtle': '0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)',
        'card': '0 4px 20px -2px rgba(11, 25, 44, 0.08)',
        'card-hover': '0 12px 30px -4px rgba(11, 25, 44, 0.15)',
        'glow-orange': '0 0 20px rgba(255, 153, 0, 0.35)',
      },
      keyframes: {
        shimmer: {
          '100%': { transform: 'translateX(100%)' }
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.85' },
        }
      },
      animation: {
        'shimmer': 'shimmer 2s infinite',
        'pulse-subtle': 'pulseSubtle 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
}

