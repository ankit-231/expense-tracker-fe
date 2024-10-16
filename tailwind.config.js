/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    "./presets/**/*.{js,vue,ts}",
  ],
  darkMode: "class", // or 'media' or 'class'

  theme: {
    extend: {},
  },
  plugins: [require("tailwindcss-primeui")],
};
