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
        primary: '#3b82f6',
        'primary-hover': '#2563eb',
        secondary: '#64748b',
        accent: '#60a5fa',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}