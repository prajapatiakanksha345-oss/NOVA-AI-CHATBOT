/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        dark: {
          bg: '#0F1115',
          panel: '#1A1D24',
          border: '#2A2D35',
          text: '#E5E7EB',
          textMuted: '#9CA3AF',
        }
      }
    },
  },
  plugins: [],
}
