/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    colors: {
      red: "#ff0033",
      gray: "#F5F5F5",
      letter: "#9C9782",
      blue: "#98CAFB",
      dark: "#111B21",
      soft_dark: "#222E35",
      white: "#FFF",
      empty_bg: "#222E35",
    },
    extend: {
      container: {
        center: true,
        padding: "2rem",
      },
    },
  },
  plugins: [],
};
