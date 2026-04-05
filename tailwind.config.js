/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './lib/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          navy: '#0B2545',
          red: '#E63946',
          'dark-navy': '#07182e',
          'mid-navy': '#0a1e38',
        }
      },
      fontFamily: {
        sans: ['system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
