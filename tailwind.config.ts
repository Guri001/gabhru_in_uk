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
        cream: "var(--cream)",
        espresso: "var(--espresso)",
        saffron: "var(--saffron)",
        walnut: "var(--walnut)",
        black: "var(--black)",
        white: "var(--white)",
        background: "var(--cream)",
        foreground: "var(--walnut)",
      },
      fontFamily: {
        sans: ["var(--font-instrument)", "sans-serif"],
        heading: ["var(--font-urbanist)", "sans-serif"],
        serif: ["var(--font-playfair)", "serif"],
      },
      fontSize: {
        h1: ["clamp(48px, 8vw, 120px)", { lineHeight: "1", letterSpacing: "-0.02em" }],
        h2: ["clamp(36px, 5vw, 64px)", { lineHeight: "1.1", letterSpacing: "-0.01em" }],
        h3: ["32px", { lineHeight: "1.2" }],
        body: ["18px", { lineHeight: "1.6" }],
        caption: ["14px", { lineHeight: "1.5", letterSpacing: "0.02em" }],
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translate3d(0, 0, 0)" },
          "100%": { transform: "translate3d(-50%, 0, 0)" },
        }
      },
      animation: {
        marquee: "marquee 30s linear infinite",
      },
      typography: (theme: any) => ({
        DEFAULT: {
          css: {
            color: theme("colors.walnut"),
            a: {
              color: theme("colors.saffron"),
              "&:hover": {
                color: theme("colors.espresso"),
              },
            },
            h1: { fontFamily: theme("fontFamily.heading")[0], color: theme("colors.espresso"), fontWeight: "600" },
            h2: { fontFamily: theme("fontFamily.heading")[0], color: theme("colors.espresso"), fontWeight: "600" },
            h3: { fontFamily: theme("fontFamily.heading")[0], color: theme("colors.espresso"), fontWeight: "600" },
            h4: { fontFamily: theme("fontFamily.heading")[0], color: theme("colors.espresso"), fontWeight: "600" },
            blockquote: {
              borderLeftColor: theme("colors.saffron"),
              fontStyle: "italic",
              fontFamily: theme("fontFamily.serif")[0],
              color: theme("colors.espresso"),
            },
            strong: { color: theme("colors.espresso"), fontWeight: "600" },
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
