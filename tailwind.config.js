/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        KafuTechnoStd: ["var(--font-KafuTechnoStd)"],
        roboto: ["var(--font-roboto)"],
        CraftGothicDemiBold: ["var(--font-CraftGothicDemiBold)"],
      },
      colors: {
        "md-lime": "#bfff00",
      },
      boxShadow: {
        "md-box": "inset 0px 0px 5px 1px #bfff00",
      },
      animation: {
        "border-pulse": "border-pulse 2s infinite",
      },
      keyframes: {
        "border-pulse": {
          from: {
            borderColor: "#bfff00",
            boxShadow: "inset 0px 0px 3px 1px #bfff00",
          },
          "10%": {
            borderColor: "#bfff00",
            boxShadow: "inset 0px 0px 3px 1px #bfff00",
          },
          "45%": {
            borderColor: "rgb(191,255,0,0.5)",
            boxShadow: "inset 0px 0px 3px 1px rgb(191,255,0,0.5)",
          },
          to: {
            borderColor: "#bfff00",
            boxShadow: "inset 0px 0px 5px 1px #bfff00",
          },
        },
      },
      gridTemplateRows: {
        // Simple 8 row grid
        7: "repeat(7, minmax(0, 1fr))",
        8: "repeat(8, minmax(0, 1fr))",
      },
    },
  },
  plugins: [],
};
