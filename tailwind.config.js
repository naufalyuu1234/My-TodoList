module.exports = {
  theme: {
    extend: {
      keyframes: {
        fadeSlide: {
          "0%": { opacity: 0, transform: "translateX(-10px)" },
          "100%": { opacity: 1, transform: "translateX(0)" },
        },
      },
      animation: {
        fadeSlide: "fadeSlide 0.5s ease-in-out",
      },
    },
  },
};
