import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      keyframes: {
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
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        "primary": "#245c4e",
        "primary-shade": "#205145",
        "primary-tint": "#3a6c60",
        "tertiary": "#f49a29",
        "tertiary-shade": "#d78824",
        "tertiary-tint": "#f5a43e",
        "danger": "#e43c2f",
        "danger-shade": "#c93529",
        "danger-tint": "#e75044",
        "secondary": "#769d91",
        "secondary-shade": "#688a80",
        "secondary-tint": "#84a79c",
        "warning": "#ffc409",
        "warning-shade": "#e0ac08",
        "warning-tint": "#ffca22",
        "success": "#2dd36f",
        "success-shade": "#28ba62",
        "success-tint": "#42d77d",
        "light": "#e0e9e6",
        "light-shade": "#c5cdca",
        "light-contrast": "#676767",
        "medium": "#9d9d9d",
        "medium-shade": "#808289",
        "salt": "#e27e01",
        "envira": "#1d821b", 
      }
    },
  },
  plugins: [],
}
export default config
