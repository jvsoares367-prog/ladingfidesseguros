/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./*.html",
    "./blog/**/*.html",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "#0000B0",
        "primary-hover": "#00008B",
        whatsapp: "#25D366",
        charcoal: "#1A1A1A",
        "light-grey": "#F9F9F9",
        "glass-border": "rgba(0, 0, 176, 0.1)",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        logo: ["Montserrat", "sans-serif"],
      },
      borderRadius: {
        "2xl": "1rem",
        "3xl": "1.5rem",
      },
      animation: {
        "infinite-scroll": "infinite-scroll 40s linear infinite",
        "pulse-blue": "pulse-blue 2s infinite",
        ripple: "ripple 2s infinite",
        "ripple-green": "ripple-green 2s infinite",
        "pulse-green": "pulse-green 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "carousel-swipe": "carousel-swipe 25s linear infinite",
        "scroll-indicator-v3":
          "scroll-indicator-v3 1.2s cubic-bezier(0.4, 0, 0.2, 1) infinite",
      },
      keyframes: {
        "infinite-scroll": {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
        "carousel-swipe": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-100%)" },
        },
        "pulse-blue": {
          "0%": { boxShadow: "0 0 0 0 rgba(0, 0, 176, 0.4)" },
          "70%": { boxShadow: "0 0 0 10px rgba(0, 0, 176, 0)" },
          "100%": { boxShadow: "0 0 0 0 rgba(0, 0, 176, 0)" },
        },
        ripple: {
          "0%": { transform: "scale(0.8)", opacity: "1" },
          "100%": { transform: "scale(1.8)", opacity: "0" },
        },
        "ripple-green": {
          "0%": { transform: "scale(0.8)", opacity: "1" },
          "100%": { transform: "scale(1.8)", opacity: "0" },
        },
        "pulse-green": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: ".5" },
        },
        "scroll-indicator-v3": {
          "0%": {
            transform: "translateY(0) scale(1)",
            opacity: "0.4",
            filter: "drop-shadow(0 0 0px rgba(0, 0, 176, 0)) blur(0px)",
          },
          "50%": {
            transform: "translateY(18px) scale(1.1)",
            opacity: "1",
            filter: "drop-shadow(0 0 8px rgba(0, 0, 176, 0.6)) blur(0px)",
          },
          "100%": {
            transform: "translateY(36px) scale(1)",
            opacity: "0.4",
            filter: "drop-shadow(0 0 0px rgba(0, 0, 176, 0)) blur(0px)",
          },
        },
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/container-queries"),
  ],
};
