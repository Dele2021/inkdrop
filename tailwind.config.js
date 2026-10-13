/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'ink-bg': 'var(--ink-bg)',
        'ink-surface': 'var(--ink-surface)',
        'ink-card': 'var(--ink-card)',
        'ink-card-hover': 'var(--ink-card-hover)',
        'ink-purple': 'var(--ink-purple)',
        'ink-light': 'var(--ink-light)',
        'ink-soft': 'var(--ink-soft)',
        'ink-success': 'var(--ink-success)',
        'ink-warning': 'var(--ink-warning)',
        'ink-error': 'var(--ink-error)',
      },
      fontFamily: {
        display: ['Satoshi', 'system-ui', '-apple-system', 'sans-serif'],
        body: ['Satoshi', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['SF Mono', 'Fira Code', 'Cascadia Code', 'ui-monospace', 'monospace'],
      },
      borderRadius: {
        'ink': '12px',
        'ink-lg': '16px',
        'ink-xl': '24px',
      },
      boxShadow: {
        'ink-glow': '0 0 24px rgba(113, 50, 245, 0.25)',
        'ink-glow-lg': '0 0 48px rgba(113, 50, 245, 0.15), 0 0 96px rgba(113, 50, 245, 0.08)',
      },
    },
  },
  plugins: [],
}
