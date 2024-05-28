/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "bg-primary": "#1E1E1E",
        "bg-secondary": "#2C322E",
        white: "#FFFFFF",
        light: "#B8B8B8",
        "primary-100": "#78A083",
        "primary-300": "#2C322E",
      },
      backgroundImage: (theme) => ({
        "gradient-yellowred":
          "linear-gradient(90deg, #FF616A 0%, #FFC837 100%)",
        "mobile-home": "url('./assets/HomePageGraphic.png')",
      }),
      fontFamily: {
        Poppins: ["Poppins", "sans-serif"],
      },
      content: {
        headerwave: "url('./assets/topwave.png')",
      },
    },
    screens: {
      xs: "480px",
      sm: "768px",
      md: "1060px",
      lr: "1280px",
      xl: "1920px",
      xxl: "2560px",
    },
  },
  plugins: [],
};
