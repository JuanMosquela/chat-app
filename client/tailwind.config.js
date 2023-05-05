/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    colors: {
      red: "#ff0033",
      light_heading: "#F0F2F5",
      dark_heading: "#222E35",
      gray: "#F0F2F5",
      dark: "#111B21",
      background_dark: "#111B21",
      background_light: "#DFDFDD",
      white: "#FFF",
      blue: "#98CAFB",
      soft_dark: "#222E35",
      soft_white: "#F0F2F5",
      light_color_msg_me: "#D9FDD3",
      light_color_msg_all: "#FFF",
      dark_color_msg_me: "#005C4B",
      dark_color_msg_all: "#222E35",
    },
    extend: {
      container: {
        center: true,
        padding: "1rem",
      },
    },
  },
  plugins: [],
};
