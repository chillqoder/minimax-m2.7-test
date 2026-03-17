/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: '#0D0D0D',
        acid: '#E8F227',
        paper: '#F5F0E8',
        ash: '#A8A49C',
        vermillion: '#D4341A',
      },
      fontFamily: {
        display: ['Playfair Display', 'serif'],
        mono: ['DM Mono', 'monospace'],
        accent: ['Fraunces', 'serif'],
      },
      fontSize: {
        'system': ['10px', '11px'],
      },
      letterSpacing: {
        'system': '0.4em',
      },
      borderWidth: {
        'hairline': '1px',
      },
      maxWidth: {
        'grid': '1400px',
      },
    },
  },
  plugins: [],
}
