import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/app/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      // ─── Brand Colors ─────────────────────────────────────────────────────
      colors: {
        noir:  { DEFAULT: "#0A0A0A", 50: "#1C1C1C", 100: "#141414" },
        smoke: { DEFAULT: "#1C1C1C", 50: "#2A2A2A" },
        gold:  { DEFAULT: "#C9A96E", dim: "#8A6F3E", light: "#E2C99A", dark: "#7A5F30" },
        ivory: { DEFAULT: "#F8F6F2", 50: "#FDFCFA", 100: "#F0EDE8" },
        white: "#FFFFFF",
      },

      // ─── Fonts ────────────────────────────────────────────────────────────
      fontFamily: {
        display: ["Cormorant Garamond", "Georgia", "serif"],
        body:    ["DM Sans", "system-ui", "sans-serif"],
      },

      // ─── Type Scale ───────────────────────────────────────────────────────
      fontSize: {
        "display-hero": ["clamp(3.5rem,9vw,8rem)",   { lineHeight: "0.90", letterSpacing: "-0.04em" }],
        "display-xl":   ["clamp(2.5rem,6vw,5.5rem)", { lineHeight: "0.93", letterSpacing: "-0.03em" }],
        "display-lg":   ["clamp(2rem,4vw,3.5rem)",   { lineHeight: "1.00", letterSpacing: "-0.025em"}],
        "display-md":   ["clamp(1.5rem,3vw,2.5rem)", { lineHeight: "1.05", letterSpacing: "-0.02em" }],
        "display-sm":   ["clamp(1.25rem,2vw,1.75rem)",{ lineHeight: "1.10", letterSpacing: "-0.015em"}],
        "label-lg":     ["0.75rem",  { lineHeight: "1", letterSpacing: "0.18em" }],
        "label-md":     ["0.6875rem",{ lineHeight: "1", letterSpacing: "0.20em" }],
        "label-sm":     ["0.625rem", { lineHeight: "1", letterSpacing: "0.22em" }],
        "body-lg":      ["1.0625rem",{ lineHeight: "1.75", letterSpacing: "0.01em" }],
        "body-md":      ["0.9375rem",{ lineHeight: "1.70", letterSpacing: "0.01em" }],
        "body-sm":      ["0.8125rem",{ lineHeight: "1.65", letterSpacing: "0.015em"}],
      },

      // ─── Spacing ──────────────────────────────────────────────────────────
      spacing: {
        "18": "4.5rem",
        "22": "5.5rem",
        "26": "6.5rem",
        "30": "7.5rem",
        "34": "8.5rem",
        "38": "9.5rem",
      },

      // ─── Shadows ──────────────────────────────────────────────────────────
      boxShadow: {
        "noir-sm":   "0 2px 8px  rgba(10,10,10,0.35)",
        "noir-md":   "0 4px 24px rgba(10,10,10,0.45)",
        "noir-lg":   "0 8px 48px rgba(10,10,10,0.55)",
        "gold-sm":   "0 0 16px rgba(201,169,110,0.20)",
        "gold-md":   "0 0 32px rgba(201,169,110,0.30)",
        "gold-lg":   "0 0 64px rgba(201,169,110,0.40)",
        "card-rest": "0 1px 3px  rgba(10,10,10,0.06), 0 0 0 0.5px rgba(10,10,10,0.05)",
        "card-hover":"0 8px 32px rgba(10,10,10,0.10), 0 0 0 0.5px rgba(10,10,10,0.05)",
      },

      // ─── Animations ───────────────────────────────────────────────────────
      keyframes: {
        "fade-up": {
          "0%":   { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%":   { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "scale-in": {
          "0%":   { opacity: "0", transform: "scale(0.96)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        "shimmer": {
          "0%":   { backgroundPosition: "-200% center" },
          "100%": { backgroundPosition:  "200% center" },
        },
        "gold-pulse": {
          "0%,100%": { opacity: "0.3" },
          "50%":     { opacity: "0.7" },
        },
        "float": {
          "0%,100%": { transform: "translateY(0px)" },
          "50%":     { transform: "translateY(-10px)" },
        },
        "ticker": {
          "0%":   { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        "fade-up":       "fade-up  0.7s cubic-bezier(0.16,1,0.3,1) both",
        "fade-up-1":     "fade-up  0.7s 0.10s cubic-bezier(0.16,1,0.3,1) both",
        "fade-up-2":     "fade-up  0.7s 0.20s cubic-bezier(0.16,1,0.3,1) both",
        "fade-up-3":     "fade-up  0.7s 0.32s cubic-bezier(0.16,1,0.3,1) both",
        "fade-up-4":     "fade-up  0.7s 0.44s cubic-bezier(0.16,1,0.3,1) both",
        "fade-in":       "fade-in  0.5s ease both",
        "scale-in":      "scale-in 0.5s cubic-bezier(0.16,1,0.3,1) both",
        "shimmer":       "shimmer  2.5s linear infinite",
        "gold-pulse":    "gold-pulse 4s ease-in-out infinite",
        "float":         "float    5s ease-in-out infinite",
        "ticker":        "ticker   28s linear infinite",
      },

      // ─── Transitions ──────────────────────────────────────────────────────
      transitionTimingFunction: {
        "luxury":  "cubic-bezier(0.25,0.46,0.45,0.94)",
        "reveal":  "cubic-bezier(0.16,1,0.3,1)",
        "spring":  "cubic-bezier(0.34,1.56,0.64,1)",
      },
      transitionDuration: {
        "400": "400ms",
        "600": "600ms",
        "800": "800ms",
      },

      // ─── Border Radius ────────────────────────────────────────────────────
      borderRadius: {
        "xs": "2px",
        "sm": "4px",
        "md": "6px",
        "lg": "10px",
        "xl": "16px",
      },

      // ─── Max Width ────────────────────────────────────────────────────────
      maxWidth: {
        "site": "1320px",
        "prose-narrow": "52ch",
      },

      // ─── Screens ─────────────────────────────────────────────────────────
      screens: {
        "xs": "375px",
        "sm": "640px",
        "md": "768px",
        "lg": "1024px",
        "xl": "1280px",
        "2xl": "1440px",
      },
    },
  },
  plugins: [],
};

export default config;
