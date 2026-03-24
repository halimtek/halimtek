/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./styles/**/*.css", // Add this to ensure it watches your CSS
  ],
  theme: {
    extend: {
      colors: {
        navy: "#0a192f",
      },
    },
  },
  plugins: [],
}