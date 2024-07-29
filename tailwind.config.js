/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "anti-flash-white": "#F2F4F3",
        "lighter-purple": "#A856F8",
        "sambucus": "#111828",
      }
    },
  },
  plugins: [],
}

