/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './contexts/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: 'var(--background)', /* #f9fafb / #0F172A */
        foreground: 'var(--foreground)',
        card: {
          DEFAULT: 'var(--card)', /* #ffffff / rgba(30, 41, 59, 0.8) */
          foreground: 'var(--card-foreground)',
        },
        popover: {
          DEFAULT: 'var(--popover)',
          foreground: 'var(--popover-foreground)',
        },
        primary: {
          DEFAULT: 'var(--primary)',
          foreground: 'var(--primary-foreground)',
        },
        secondary: {
          DEFAULT: 'var(--secondary)',
          foreground: 'var(--secondary-foreground)',
        },
        muted: {
          DEFAULT: 'var(--muted)', /* #9ca3af / #94A3B8 */
          foreground: 'var(--muted-foreground)',
        },
        accent: {
          DEFAULT: 'var(--accent)',
          foreground: 'var(--accent-foreground)',
        },
        destructive: {
          DEFAULT: 'var(--destructive)',
          foreground: 'var(--destructive-foreground)',
        },
        border: 'var(--border)',  /* #e5e7eb / #1f2937 */
        input: 'var(--input)',
        ring: 'var(--ring)',
        // Makerkit kleuren
        'dark-bg': 'rgb(3, 7, 18)',
        'brand-primary': 'oklch(0.637 0.237 25.331)',
        'brand-secondary': 'oklch(0.723 0.219 149.579)',
        'brand-accent': 'oklch(0.685 0.169 237.323)',
        'brand-text': 'rgb(249, 250, 251)',
        'brand-muted': 'rgb(156, 163, 175)',
        'brand-card': 'rgb(24, 32, 42)',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'makerkit-gradient': 'linear-gradient(135deg, rgb(14, 115, 204) 1.93%, rgb(98, 75, 187) 14.86%, oklch(0.637 0.237 25.331) 48.09%, oklch(0.705 0.213 47.604) 77.82%, oklch(0.905 0.182 98.111) 97.3%)',
      },
    },
  },
  plugins: [],
}
