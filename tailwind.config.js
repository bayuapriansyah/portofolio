/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{astro,html,js,jsx,ts,tsx,vue,svelte}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Space Grotesk", "Inter", "Satoshi", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        tighter: "-0.04em",
        tight: "-0.02em",
      },
      colors: {
        slate: {
          950: "#020617",
        },
      },
      backgroundImage: {
        grain: "url('/assets/grain.png')",
      },
    },
  },
  plugins: [],
};
