/** @type {import('tailwindcss').Config} */

export const content = ["./src/**/*.{js,jsx,ts,tsx}"];

export const theme = {
  extend: {
    animation: {
      fade: "fadeIn 0.6s ease-in-out",
      "slow-bounce": "floatY 3s ease-in-out infinite", // 👈 new animation
    },
    keyframes: {
      fadeIn: {
        "0%": { opacity: "0", transform: "translateY(8px)" },
        "100%": { opacity: "1", transform: "translateY(0)" }
      },
      floatY: {
        "0%, 100%": { transform: "translateY(0px)" },
        "50%": { transform: "translateY(-10px)" }
      }
    },
    fontFamily: {
      sans: ['Inter', 'sans-serif'],
      heading: ['Playfair Display', 'serif'],
      body: ['Hind', 'sans-serif'],
      sanskrit: ['Tiro Devanagari Sanskrit', 'serif']
    },
  }
};

export const plugins = [];
