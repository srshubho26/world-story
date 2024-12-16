import daisyui from 'daisyui';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "prime": "#ce0393",
        "secondary": "#d5d5d5",
        "banner_bg": "#f1f1f1",
        "sec_title": "#1c0014",
        "post_title": "#261b23",
        "desc": "#8e8e8e"
      }
    },
  },
  plugins: [daisyui],
  darkMode: "class"
}