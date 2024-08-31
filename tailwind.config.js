/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      borderRadius: {
        DEFAULT: "10px",
        primary: "1.5rem",
        secondary: "9999px",
      },
      padding: {
        primary: "1rem",
        secondary: "1.5rem",
      },
      colors: {
        primary: "#01BC1FD6",
        secondary: "#E4FFEA",
        neutral: "#515151",
      },screens: {
       // Extra small plus
       'xsplus': { 'max': '575px', 'min': '480px' },    // between 480px and 575px

       // Small plus
       'smplus': { 'max': '640px', 'min': '576px' },    // between 576px and 640px

       // Medium plus
       'mdplus': { 'max': '900px', 'min': '690px' },    // between 690px and 768px

       // Large plus
       'lgplus': { 'max': '1024px', 'min': '900px' },   // between 900px and 1024px

       'lgplus2': { 'max': '1100px', 'min': '1024px' },   // between 900px and 1024px

       // Larger large plus
       'lgplus3': { 'max': '1190px', 'min': '1100px' }, // between 1100px and 1190px

       // Extra large plus
       'xlgplus': { 'max': '1200px', 'min': '1100px' }, // between 1100px and 1200px

       // Extra extra large plus
       'xxlgplus': { 'max': '1400px', 'min': '1280px' }, // between 1280px and 1400px

       // Ultra large plus
       'ulgplus': { 'max': '1600px', 'min': '1440px' }, // between 1440px and 1600px

       // Super large plus
       'slgplus': { 'max': '1920px', 'min': '1680px' }, // between 1680px and 1920px

       // Extra super large plus
       'eslgplus': { 'max': '2560px', 'min': '2048px' }, // between 2048px and 2560px// Custom breakpoint for 1194px
      },
    },
  },
  plugins: [require("@tailwindcss/forms"), require("tailwind-scrollbar-hide")],
};
