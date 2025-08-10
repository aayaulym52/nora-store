/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        vogue: ["Vogue Highline Sans", "sans-serif"],
        quincy: ["Quincy CF", "sans-serif"],
      },
    },
  },
  plugins: [],
};
