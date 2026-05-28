/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        theme: {
          DEFAULT: '#00BFFF',
          light: 'rgba(0, 191, 255, 0.08)',
          glow: 'rgba(0, 191, 255, 0.15)',
        },
      },
    },
  },
  plugins: [],
}
