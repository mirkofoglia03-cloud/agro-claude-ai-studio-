/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'agro-green': '#2D5016',
        'agro-green-light': '#4A7C23',
        'agro-green-dark': '#1A3009',
        'agro-lime': '#84CC16',
        'agro-cream': '#F7F7F2',
      },
    },
  },
  plugins: [],
}
