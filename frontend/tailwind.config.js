/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'purple': {
          900: '#581c87',
        },
        'indigo': {
          800: '#3730a3',
          900: '#312e81',
        }
      }
    },
  },
  plugins: [],
}