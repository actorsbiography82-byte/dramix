import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          red: "#e50914",
          redHover: "#ff1e27",
          gold: "#fbbf24",
          dark: "#0b0e14",
          surface: "#111622",
          card: "#161d2d",
          border: "rgba(255, 255, 255, 0.08)",
          borderHover: "rgba(229, 9, 20, 0.5)",
        },
      },
      backgroundImage: {
        "hero-gradient":
          "radial-gradient(ellipse at 50% 0%, rgba(229, 9, 20, 0.22) 0%, rgba(11, 14, 20, 0.95) 70%, #0b0e14 100%)",
        "card-gradient":
          "linear-gradient(180deg, rgba(22, 29, 45, 0.6) 0%, rgba(17, 22, 34, 0.95) 100%)",
        "glow-conic":
          "conic-gradient(from 180deg at 50% 50%, #e50914 0deg, #3b82f6 180deg, #e50914 360deg)",
      },
      boxShadow: {
        "glow-red": "0 0 25px -5px rgba(229, 9, 20, 0.45)",
        "glow-subtle": "0 10px 30px -10px rgba(0, 0, 0, 0.8)",
      },
    },
  },
  plugins: [],
};

export default config;
