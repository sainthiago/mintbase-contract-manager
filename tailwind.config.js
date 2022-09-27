/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "light-cream": "#F0EBE3",
        cream: "#E4DCCF",
        "light-green": "#7D9D9C",
        "teal-green": "#576F72",
        "light-white": "#F7F7F7",
        "light-gray": "#EEEEEE",
        "dark-gray": "#929AAB",
        "light-black": "#393E46",
      },
    },
  },
  plugins: [],
};
