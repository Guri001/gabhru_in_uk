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
        primary: "#121212",
        accent: "#0066FF",
      },
      keyframes: {
        scaleIn: {
          '0%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(1.08)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-100%)' },
        }
      },
      animation: {
        scaleIn: 'scaleIn 8s ease-out forwards',
        marquee: 'marquee 25s linear infinite',
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        serif: ["var(--font-playfair)", "serif"],
      },
      typography: (theme: any) => ({
        DEFAULT: {
          css: {
            color: theme("colors.gray.200"),
            a: {
              color: theme("colors.accent"),
              "&:hover": {
                color: theme("colors.blue.400"),
              },
            },
            h1: { fontFamily: theme("fontFamily.serif")[0], color: theme("colors.white") },
            h2: { fontFamily: theme("fontFamily.serif")[0], color: theme("colors.white") },
            h3: { fontFamily: theme("fontFamily.serif")[0], color: theme("colors.white") },
            h4: { fontFamily: theme("fontFamily.serif")[0], color: theme("colors.white") },
            blockquote: {
              borderLeftColor: theme("colors.accent"),
              fontStyle: "italic",
              color: theme("colors.gray.400"),
            },
            strong: { color: theme("colors.white") },
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
