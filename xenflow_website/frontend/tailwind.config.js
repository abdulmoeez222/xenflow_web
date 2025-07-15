/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1A1A1A',
        secondary: '#0F0F0F',
        accent: '#B1001E',
        accent2: '#D7263D',
        purple: '#7B2CBF',
        dark: '#0F0F0F',
        light: '#FFFFFF',
      },
    },
  },
  plugins: [],
}

