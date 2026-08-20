import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          900: "#102A1A",
          800: "#14532D",
          700: "#0B5D2A",
          600: "#0F6B33",
        },
        leaf: {
          500: "#2E7D32",
          400: "#3FA34D",
          300: "#6BBF59",
        },
        cream: {
          100: "#FFF8E8",
          200: "#FAF3DD",
          300: "#F7EED3",
        },
        gold: {
          500: "#F5B82E",
          400: "#F2C94C",
          600: "#DFA622",
        },
        sago: {
          700: "#8B5E34",
          600: "#A66A2C",
          500: "#C28A45",
        },
        warm: {
          50: "#FFFDF7",
          100: "#FBFAF3",
        },
      },
      boxShadow: {
        soft: "0 18px 60px rgba(16, 42, 26, 0.12)",
        card: "0 14px 35px rgba(139, 94, 52, 0.12)",
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "Arial", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
