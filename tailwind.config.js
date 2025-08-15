/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
      colors: {
        primary: '#f97316',
        'primary-hover': '#ea580c',
        secondary: '#64748b',
        accent: '#fb923c',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}