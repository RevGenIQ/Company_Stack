import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        /* ── shadcn/ui semantic tokens ── */
        border:      "oklch(var(--border) / <alpha-value>)",
        input:       "oklch(var(--input) / <alpha-value>)",
        ring:        "oklch(var(--ring) / <alpha-value>)",
        background:  "oklch(var(--background) / <alpha-value>)",
        foreground:  "oklch(var(--foreground) / <alpha-value>)",
        primary: {
          DEFAULT:    "oklch(var(--primary) / <alpha-value>)",
          foreground: "oklch(var(--primary-foreground) / <alpha-value>)",
        },
        secondary: {
          DEFAULT:    "oklch(var(--secondary) / <alpha-value>)",
          foreground: "oklch(var(--secondary-foreground) / <alpha-value>)",
        },
        destructive: {
          DEFAULT:    "oklch(var(--destructive) / <alpha-value>)",
          foreground: "oklch(var(--destructive-foreground) / <alpha-value>)",
        },
        muted: {
          DEFAULT:    "oklch(var(--muted) / <alpha-value>)",
          foreground: "oklch(var(--muted-foreground) / <alpha-value>)",
        },
        accent: {
          DEFAULT:    "oklch(var(--accent) / <alpha-value>)",
          foreground: "oklch(var(--accent-foreground) / <alpha-value>)",
        },
        popover: {
          DEFAULT:    "oklch(var(--popover) / <alpha-value>)",
          foreground: "oklch(var(--popover-foreground) / <alpha-value>)",
        },
        card: {
          DEFAULT:    "oklch(var(--card) / <alpha-value>)",
          foreground: "oklch(var(--card-foreground) / <alpha-value>)",
        },

        /* ── RevGen IQ Brand Palette (OKLCH) ── */
        navy: {
          deep:   "oklch(0.11 0.028 252)",  /* darkest bg */
          DEFAULT:"oklch(0.14 0.028 252)",  /* page bg    */
          card:   "oklch(0.16 0.028 252)",  /* card bg    */
          hover:  "oklch(0.20 0.028 252)",  /* hover bg   */
          border: "oklch(0.22 0.025 252)",  /* dividers   */
          muted:  "oklch(0.28 0.022 252)",  /* subtle bg  */
        },
        ivory: {
          DEFAULT:"oklch(0.96 0.008 90)",   /* primary text     */
          muted:  "oklch(0.80 0.012 90)",   /* secondary text   */
          dark:   "oklch(0.65 0.018 252)",  /* placeholder text */
        },
        gold: {
          light:  "oklch(0.88 0.12 80)",    /* light highlight  */
          DEFAULT:"oklch(0.75 0.15 75)",    /* brand accent     */
          dark:   "oklch(0.62 0.14 70)",    /* dark gold        */
          glow:   "oklch(0.75 0.15 75 / 0.20)",
        },
      },
      borderRadius: {
        lg:  "var(--radius)",
        md:  "calc(var(--radius) - 2px)",
        sm:  "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans:  ["var(--font-inter)", "system-ui", "sans-serif"],
        display:["var(--font-outfit)", "var(--font-inter)", "sans-serif"],
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to:   { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to:   { height: "0" },
        },
        goldPulse: {
          "0%, 100%": { opacity: "0.35", transform: "scale(1)"    },
          "50%":       { opacity: "0.75", transform: "scale(1.04)" },
        },
        shimmer: {
          "0%":   { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition:  "200% 0" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)"  },
          "50%":       { transform: "translateY(-8px)" },
        },
        fadeUp: {
          "0%":   { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)"    },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up":   "accordion-up 0.2s ease-out",
        "gold-pulse":     "goldPulse 4s ease-in-out infinite",
        shimmer:          "shimmer 2.5s linear infinite",
        float:            "float 6s ease-in-out infinite",
        "fade-up":        "fadeUp 0.5s ease-out both",
      },
    },
  },
  plugins: [],
};

export default config;
