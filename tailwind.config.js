/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        discord: {
          background: '#23272A', // Dark background
          card: '#2C2F33',      // Slightly lighter dark
          extraCard: '#374151',
          text: '#DCDDDE',      // Light gray text
          muted: '#72767D',     // Muted gray text
          accent: '#5865F2',    // Discord blue
          error: '#EF4444',
        },
      },
    },
  },
  plugins: [],
}