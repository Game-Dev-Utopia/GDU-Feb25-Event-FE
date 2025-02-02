/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme'); // Import default theme

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Adjust paths based on your project structure
  ],
  theme: {
    extend: {
      colors: {
        // Primary Colors
        deepCrimson: "#7B2D26", // Represents bravery, battles, and magic (red)
        darkSapphire: "#1C3B57", // Evokes mystery and dungeons (blue)
        goldenrod: "#D35400", // Symbolizes treasure, artifacts, and royal heritage (yellow)

        // Secondary Colors
        forestGreen: "#2E4F3A", // Reflects nature and druids
        charcoalGray: "#383838", // For stone and dungeon textures
        mysticPurple: "#6C3B90", // For arcane magic and spell effects

        // Accent Colors
        burntOrange: "#D35400", // For fire spells or dramatic highlights
        iceBlue: "#76C7E4", // For frosty or celestial themes
        silver: "#B0C4DE", // For metallic elements like swords or armor
      },
      fontFamily: {
        cinzel: ['Cinzel', ...defaultTheme.fontFamily.serif], // Cinzel font with default serif fallback
        playfair: ['"Playfair Display"', ...defaultTheme.fontFamily.serif], // Playfair Display with default serif fallback
        powerOfDragon: ['PowerOfDragon', ...defaultTheme.fontFamily.sans], // ✅ Added PowerOfDragon font
      },
      keyframes: {
        'slide-left': {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-100%)' },
        },
        float: {
          "0%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
          "100%": { transform: "translateY(0)" },
        },
      },
      animation: {
        'slide-left': 'slide-left 8s linear infinite',
        'float': "float 3s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
