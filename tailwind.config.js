/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',           // Include your main HTML file
    './index.tsx',            // Include your main TSX file
    './Background/**/*.{ts,tsx}', // Include all TS/TSX files in Background
    './EventCard/**/*.{ts,tsx}',  // Include all TS/TSX files in EventCard
    './Icons/**/*.{ts,tsx}',   // Include all TS/TSX files in Icons
    './data/**/*.{ts,tsx}',    // Include all TS/TSX files in data
    './hooks/**/*.{ts,tsx}',   // Include all TS/TSX files in hooks
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}