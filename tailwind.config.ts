import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "1.5rem",
        lg: "2rem",
      },
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1280px",
      },
    },
    extend: {
      fontFamily: {
        sans: ["var(--font-tajawal)", "system-ui", "sans-serif"],
        display: ["var(--font-plex-arabic)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
          50: "#f0fdf4",
          100: "#dcfce7",
          200: "#bbf7d0",
          300: "#86efac",
          400: "#4ade80",
          500: "#22c55e",
          600: "#16a34a",
          700: "#15803d",
          800: "#166534",
          900: "#14532d",
          950: "#052e16",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        gold: {
          50: "#fefce8",
          100: "#fef9c3",
          200: "#fef08a",
          300: "#fde047",
          400: "#e8c547",
          500: "#c9a227",
          600: "#a8861f",
          700: "#876b18",
          800: "#665110",
          900: "#453608",
        },
        emerald: {
          50: "#ecfdf5",
          100: "#d1fae5",
          200: "#a7f3d0",
          300: "#6ee7b7",
          400: "#34d399",
          500: "#10b981",
          600: "#059669",
          700: "#047857",
          800: "#065f46",
          900: "#064e3b",
          950: "#022c22",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
      },
      borderRadius: {
        "2xl": "1rem",
        "3xl": "1.5rem",
      },
      backgroundImage: {
        "grid-pattern":
          "repeating-linear-gradient(60deg, transparent, transparent 48px, rgba(255,255,255,0.025) 48px, rgba(255,255,255,0.025) 50px), repeating-linear-gradient(-60deg, transparent, transparent 48px, rgba(255,255,255,0.025) 48px, rgba(255,255,255,0.025) 50px)",
        "grid-light":
          "repeating-linear-gradient(60deg, transparent, transparent 48px, rgba(4,120,87,0.04) 48px, rgba(4,120,87,0.04) 50px), repeating-linear-gradient(-60deg, transparent, transparent 48px, rgba(4,120,87,0.04) 48px, rgba(4,120,87,0.04) 50px)",
        "gold-line":
          "linear-gradient(90deg, transparent 0%, hsl(var(--primary)) 15%, theme('colors.gold.500') 40%, theme('colors.gold.400') 50%, theme('colors.gold.500') 60%, hsl(var(--primary)) 85%, transparent 100%)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "pulse-dot": {
          "0%, 100%": { transform: "scale(1)", opacity: "1" },
          "50%": { transform: "scale(1.4)", opacity: "0.6" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-6px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% center" },
          "100%": { backgroundPosition: "200% center" },
        },
        "spin-slow": {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.7s ease both",
        "fade-in": "fade-in 0.6s ease both",
        "pulse-dot": "pulse-dot 2s ease-in-out infinite",
        float: "float 3s ease-in-out infinite",
        shimmer: "shimmer 2.5s linear infinite",
        "spin-slow": "spin-slow 8s linear infinite",
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      boxShadow: {
        "soft-sm": "0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.03)",
        "soft-md": "0 4px 16px rgba(0,0,0,0.06), 0 2px 6px rgba(0,0,0,0.03)",
        "soft-lg": "0 12px 40px rgba(0,0,0,0.08), 0 4px 12px rgba(0,0,0,0.04)",
        "emerald-glow":
          "0 4px 16px rgba(4,120,87,0.25), 0 2px 6px rgba(4,120,87,0.15)",
        "gold-glow":
          "0 4px 16px rgba(201,162,39,0.3), 0 2px 6px rgba(201,162,39,0.18)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
