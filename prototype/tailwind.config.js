/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Brand Colors
        'jm-primary': '#4D0052',
        'jm-purple-deep': '#4D0052',
        'jm-purple-dark': '#3A003D',
        'jm-purple-lighter': '#7D3365',
        'jm-coral': '#F16A6F',
        'jm-coral-dark': '#C74F67',
        'jm-coral-light': '#F99095',
        'jm-accent-magenta': '#C4446D',
        'jm-accent-warm-purple': '#8B6B9D',

        // Background Colors (Purple-tinted)
        'jm-bg-nav-primary': 'hsla(320, 18%, 96%, 1)',
        'jm-bg-nav-secondary': 'hsla(320, 15%, 97%, 1)',
        'jm-bg-page': 'hsla(320, 12%, 98%, 1)',
        'jm-bg-container': 'hsla(320, 20%, 98%, 1)',
        'jm-bg-inset': 'rgba(77, 0, 82, 0.05)',
        'jm-bg-inset-strong': 'rgba(125, 51, 101, 0.10)',

        // Text Colors (Purple-tinted - Design System Compliant)
        'jm-text-primary': 'hsla(320, 50%, 15%, 1)',
        'jm-text-secondary': 'hsla(320, 30%, 35%, 1)',
        'jm-text-tertiary': 'hsla(320, 20%, 55%, 1)',
        'jm-text-quaternary': 'hsla(320, 15%, 70%, 1)',

        // Purple-tinted Grayscale (replacing generic grays)
        // These maintain visual hierarchy while staying on-brand
        'jm-gray-50': 'hsla(320, 12%, 98%, 1)',   // Page background
        'jm-gray-100': 'hsla(320, 15%, 95%, 1)',  // Subtle backgrounds
        'jm-gray-200': 'hsla(320, 18%, 90%, 1)',  // Borders, dividers
        'jm-gray-300': 'hsla(320, 15%, 82%, 1)',  // Disabled states
        'jm-gray-400': 'hsla(320, 12%, 65%, 1)',  // Placeholder text
        'jm-gray-500': 'hsla(320, 15%, 55%, 1)',  // Tertiary text
        'jm-gray-600': 'hsla(320, 20%, 45%, 1)',  // Secondary icons
        'jm-gray-700': 'hsla(320, 30%, 35%, 1)',  // Secondary text (same as jm-text-secondary)
        'jm-gray-800': 'hsla(320, 40%, 25%, 1)',  // Strong text
        'jm-gray-900': 'hsla(320, 50%, 15%, 1)',  // Primary text (same as jm-text-primary)

        // Functional Colors
        'jm-success': '#8B7AA8',
        'jm-success-light': '#E8E4F0',
        'jm-warning': '#E8A87C',
        'jm-warning-light': '#FFF4E6',
        'jm-error': '#F16A6F',
        'jm-error-light': '#FFE8E9',
        'jm-info': '#5B4A8E',
        'jm-info-light': '#E5E0F5',

        // Border Colors (Purple-tinted)
        'jm-border': 'hsla(320, 25%, 85%, 1)',
        'jm-border-strong': 'hsla(320, 35%, 75%, 1)',
        'jm-default': 'hsla(320, 25%, 85%, 1)',
        'jm-stronger': 'hsla(320, 35%, 75%, 1)',
      },
      backgroundImage: {
        'gradient-jm': 'linear-gradient(135deg, #4D0052 0%, #F16A6F 100%)',
        'gradient-jm-hover': 'linear-gradient(135deg, #7D3365 0%, #F99095 100%)',
      },
      fontFamily: {
        'serif': ['Georgia', 'Times New Roman', 'serif'],
        'sans': ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'jm-subtle': '0 2px 8px rgba(77, 0, 82, 0.08)',
        'jm-moderate': '0 4px 16px rgba(77, 0, 82, 0.12)',
        'jm-pronounced': '0 8px 24px rgba(77, 0, 82, 0.16)',
        'jm-premium': '0 4px 20px rgba(77, 0, 82, 0.20)',
      },
      transitionDuration: {
        'base': '200ms',
        'slow': '300ms',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'slide-in': {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.6s ease-out',
        'float': 'float 3s ease-in-out infinite',
        'slide-in': 'slide-in 0.3s ease-out',
      },
    },
  },
  plugins: [],
}
