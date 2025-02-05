/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Ensure this path is correct for your project
  ],
  theme: {
    extend: {
      screens: {},
      colors: {
        primary: "#3490dc",
        "primary-dark": "#2779bd",
      },
    },
  },
  plugins: [],
};
