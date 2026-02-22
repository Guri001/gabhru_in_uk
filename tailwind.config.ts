import type { Config } from "tailwindcss";

const config: Config = {
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
        primary: "#0B1C2D",
        accent: "#C9A84C", // Gold accent for premium media feel
        "accent-dark": "#B5132A" // Deep red alternative
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        poppins: ["var(--font-poppins)", "sans-serif"],
        serif: ["var(--font-playfair)", "serif"],
      },
      typography: (theme: any) => ({
        DEFAULT: {
          css: {
            color: theme("colors.gray.800"),
            a: {
              color: theme("colors.accent-dark"),
              "&:hover": {
                color: theme("colors.accent"),
              },
            },
            h1: { fontFamily: theme("fontFamily.serif")[0] },
            h2: { fontFamily: theme("fontFamily.serif")[0] },
            h3: { fontFamily: theme("fontFamily.serif")[0] },
            h4: { fontFamily: theme("fontFamily.serif")[0] },
            blockquote: {
              borderLeftColor: theme("colors.accent"),
              fontStyle: "italic",
              color: theme("colors.gray.600"),
            },
          },
        },
      }),
    },
  },
  plugins: [
    require("@tailwindcss/typography")
  ],
};
export default config;
