/** @type {import('tailwindcss').Config} */

/**
 * SIVRCE — Locked Brand Palette
 * Every value resolves to a CSS variable defined in src/index.css.
 * NEVER add a color that is not in BRAND.md / src/lib/brand.ts.
 * Usage: bg-sv-blue · text-sv-ink/60 · from-sv-orange to-sv-orange-deep
 */
const sv = (name) => `rgb(var(${name}) / <alpha-value>)`

module.exports = {
  darkMode: ["class"],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        sv: {
          blue: sv('--sv-blue-rgb'),
          'blue-light': sv('--sv-blue-light-rgb'),
          'blue-deep': sv('--sv-blue-deep-rgb'),
          violet: sv('--sv-violet-rgb'),
          orange: sv('--sv-orange-rgb'),
          'orange-light': sv('--sv-orange-light-rgb'),
          'orange-deep': sv('--sv-orange-deep-rgb'),
          navy: sv('--sv-navy-rgb'),
          'navy-soft': sv('--sv-navy-soft-rgb'),
          ink: sv('--sv-ink-rgb'),
          cloud: sv('--sv-cloud-rgb'),
          success: sv('--sv-success-rgb'),
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive) / <alpha-value>)",
          foreground: "hsl(var(--destructive-foreground) / <alpha-value>)",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      borderRadius: {
        xl: "calc(var(--radius) + 4px)",
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        xs: "calc(var(--radius) - 6px)",
        /* ——— Sivrce shape tokens (BRAND.md §5) ——— */
        card: "26px",
        tile: "22px",
        module: "16px",
        control: "12px",
      },
      fontFamily: {
        sans: ['"Manrope"', '"Noto Sans Georgian"', "ui-sans-serif", "system-ui", "sans-serif"],
      },
      boxShadow: {
        xs: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
        /* ——— Sivrce elevation tokens (navy-tinted, never black) ——— */
        card: "0 2px 8px -2px rgba(10,16,48,.08), 0 12px 32px -12px rgba(10,16,48,.12)",
        "card-hover": "0 6px 16px -4px rgba(10,16,48,.12), 0 24px 56px -16px rgba(10,16,48,.28)",
        soft: "0 20px 60px -20px rgba(10,16,48,.25)",
        "glow-orange": "0 12px 32px -8px rgba(255,106,45,.8)",
        "glow-orange-lg": "0 20px 56px -12px rgba(255,106,45,.95)",
        "glow-blue": "0 16px 48px -12px rgba(46,107,255,.7)",
        "panel-dark": "0 30px 80px -20px rgba(1,4,20,.65)",
        "showcase-blue": "0 40px 120px -30px rgba(46,107,255,.45)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "caret-blink": {
          "0%,70%,100%": { opacity: "1" },
          "20%,50%": { opacity: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "caret-blink": "caret-blink 1.25s ease-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}