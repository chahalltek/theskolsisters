/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        skol: { purple: "#4F2683", gold: "#FFC62F", dark: "#1A102B" }
      }
    }
  },
  plugins: []
};
