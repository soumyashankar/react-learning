/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      './index.html',
      './src/**/*.{js,ts,jsx,tsx}', // if using React/Vite
      './public/**/*.html',         // if you have static HTML files
    ],
    theme: {
      extend: {},
    },
    plugins: [],
  }