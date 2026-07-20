import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          ink: "#1f1728",
          plum: "#4b1d5a",
          rose: "#cc5c93",
          gold: "#d7b46a",
          mist: "#faf5fb"
        }
      },
      boxShadow: {
        glow: "0 20px 60px rgba(75, 29, 90, 0.16)",
        card: "0 8px 32px rgba(34, 24, 45, 0.07)",
      },
      animation: {
        "fade-in": "fadeIn 0.4s ease",
        "slide-up": "slideUp 0.3s ease",
      },
      keyframes: {
        fadeIn: { "0%": { opacity: "0" }, "100%": { opacity: "1" } },
        slideUp: { "0%": { opacity: "0", transform: "translateY(8px)" }, "100%": { opacity: "1", transform: "translateY(0)" } },
      },
    }
  },
  plugins: []
};

export default config;
