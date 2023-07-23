export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      mobile: "768px",
      tablet: "930px",
      laptop: "1200px",
    },
    extend: {
      animation: {
        "spin-fast": "spin 0.8s linear infinite",
      },
    },
  },

  plugins: [],
};
