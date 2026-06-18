/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        pnp: {
          navy: '#0D1B4C',
          'navy-light': '#162257',
          'navy-dark': '#080F2E',
          blue: '#1A3A8F',
          gold: '#D4A843',
          'gold-light': '#E8C76A',
          'gold-dark': '#B8912E',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
