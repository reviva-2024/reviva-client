// tailwind.config.js

module.exports = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './app/**/*.{js,jsx}',
    './src/**/*.{js,jsx}',
  ],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    colors: {
      primary: '#8569CD', // primary color
      secondary: '#FAD585', // secondary color
      'primary-light': '#C7AAEA', // Primary Light
      accent: '#7B95B0', // accent
      white: '#FAFAFA',
      'neutral-50': '#F5F5F5',
      'neutral-100': '#E5E5E5',
      'neutral-200': '#D4D4D4',
      'neutral-300': '#A3A3A3',
      'neutral-400': '#737373',
      'neutral-500': '#525252',
      'neutral-600': '#404040',
      'neutral-700': '#262626',
      'neutral-800': '#171717',
      'neutral-900': '#0A0A0A',
      'neutral-950': '#000000', // Changed to black for visibility
      'green-200': 'rgb(187 247 208)',
      'green-500': 'rgb(34 197 94)',
      'green-700': 'rgb(21 128 61)',
      'red-200': 'rgb(254 202 202)',
      'red-500': 'rgb(239 68 68)',
      'red-700': 'rgb(185 28 28)',
      'yellow-700': 'rgb(161 98 7)',
      'yellow-200': 'rgb(254 240 138)',
      'yellow-500': 'rgb(234 179 8)',
      foreground: '#F4F6F9',
      background: '#E5E5E5',
    },
    extend: {
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
