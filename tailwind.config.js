/** @type {import('tailwindcss').Config} */

export const content = ["./src/**/*.{js,jsx,ts,tsx}"];
export const theme = {
  extend: {
    animation: {
      fade: "fadeIn 0.6s ease-in-out"
    },
    keyframes: {
      fadeIn: {
        "0%": { opacity: "0", transform: "translateY(8px)" },
        "100%": { opacity: "1", transform: "translateY(0)" }
      }
    },
    fontFamily: {
      body: ['Poppins', 'sans-serif'],
      sanskrit: ['"Tiro Devanagari Sanskrit"', 'serif']
    }
  }
};
export const plugins = [];
