// website-shared v1.1

import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#35a7ff", //554640
        secondary: "#f18f01",
        background: {
          light: "#FFFFFF",
          dark: "#2d3142",
        },
        x: "#35a7ff",
        o: "#f18f01",
        win: "#00A878",
        grid: "#000000",
      },
    },
  },
  plugins: [],
} satisfies Config;
