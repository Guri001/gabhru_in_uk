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
        background: {
          DEFAULT: "#0A0A0A",
          secondary: "#111318",
          card: "#16191F",
        },
        foreground: {
          DEFAULT: "#F5F5F0",
        },
        accent: {
          DEFAULT: "#C9A84C",
          hover: "#E8C56A",
          divider: "rgba(201, 168, 76, 0.2)",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        serif: ["var(--font-playfair)", "serif"],
      },
      fontSize: {
        h1: ["clamp(42px, 6vw, 96px)", { lineHeight: "1.1", letterSpacing: "-0.02em" }],
        h2: ["clamp(32px, 4vw, 48px)", { lineHeight: "1.2", letterSpacing: "-0.01em" }],
        h3: ["28px", { lineHeight: "1.3" }],
        body: ["17px", { lineHeight: "1.75" }],
        caption: ["13px", { lineHeight: "1.5", letterSpacing: "0.08em" }],
      },
      keyframes: {
        grain: {
          "0%, 100%": { transform: "translate(0, 0)" },
          "10%": { transform: "translate(-5%, -10%)" },
          "20%": { transform: "translate(-15%, 5%)" },
          "30%": { transform: "translate(7%, -25%)" },
          "40%": { transform: "translate(-5%, 25%)" },
          "50%": { transform: "translate(-15%, 10%)" },
          "60%": { transform: "translate(15%, 0%)" },
          "70%": { transform: "translate(0%, 15%)" },
          "80%": { transform: "translate(3%, 35%)" },
          "90%": { transform: "translate(-10%, 10%)" },
        },
        marquee: {
          "0%": { transform: "translate3d(0, 0, 0)" },
          "100%": { transform: "translate3d(-50%, 0, 0)" },
        }
      },
      animation: {
        grain: "grain 8s steps(10) infinite",
        marquee: "marquee 30s linear infinite",
      },
      typography: (theme: any) => ({
        DEFAULT: {
          css: {
            color: theme("colors.foreground.DEFAULT"),
            a: {
              color: theme("colors.accent.DEFAULT"),
              "&:hover": {
                color: theme("colors.accent.hover"),
              },
            },
            h1: { fontFamily: theme("fontFamily.serif")[0], color: theme("colors.foreground.DEFAULT"), fontWeight: "400" },
            h2: { fontFamily: theme("fontFamily.serif")[0], color: theme("colors.foreground.DEFAULT"), fontWeight: "400" },
            h3: { fontFamily: theme("fontFamily.serif")[0], color: theme("colors.foreground.DEFAULT"), fontWeight: "400" },
            h4: { fontFamily: theme("fontFamily.serif")[0], color: theme("colors.foreground.DEFAULT"), fontWeight: "400" },
            blockquote: {
              borderLeftColor: theme("colors.accent.DEFAULT"),
              fontStyle: "italic",
              fontFamily: theme("fontFamily.serif")[0],
              color: theme("colors.foreground.DEFAULT"),
            },
            strong: { color: theme("colors.foreground.DEFAULT"), fontWeight: "600" },
          },
        },
      }),
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
  ],
};
export default config;
