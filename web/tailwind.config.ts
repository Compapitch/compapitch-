import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#F4F5F6",
        surface: "#FFFFFF",
        ink: {
          DEFAULT: "#101010",
          secondary: "#515151",
          muted: "#8B8F95",
        },
        border: "#E8EAEC",
        accent: {
          DEFAULT: "#6B7A90",
          hover: "#55657C",
          light: "#DCE3EC",
        },
      },
      fontFamily: {
        sans: ["var(--font-plus-jakarta)", "sans-serif"],
      },
      borderRadius: {
        card: "32px",
        input: "18px",
        image: "24px",
        pill: "999px",
      },
      keyframes: {
        "fade-in": { from: { opacity: "0" }, to: { opacity: "1" } },
        "slide-up": {
          from: { opacity: "0", transform: "translateY(8px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-in": "fade-in 250ms ease-out",
        "slide-up": "slide-up 250ms ease-out",
      },
    },
  },
  plugins: [],
};
export default config;
