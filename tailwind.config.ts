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
        background: "var(--background)",
        foreground: "var(--foreground)",
        'link': '#0000EE',
        'lightest-blue': '#3b82f6',
        'light-blue':'#1a3e74',
        'moderate-blue': '#12284a',
        'dark-blue':'#0d203b',
        'darkest-blue':'#0a182b',
        'darkest-blue-2x': '#07111f',
        'darkest-blue-3x': '#050b14',
      },
    },
  },
  plugins: [],
} satisfies Config;
