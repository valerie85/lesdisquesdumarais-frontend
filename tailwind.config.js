/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{html,js}',
    './components/**/*.{html,js}',
  ],
  theme: {
    extend: {
      colors: {
        primary: 'var(--color-primary)',
        secondary: 'var(--color-secondary)',
        tertiary: 'var(--color-tertiary)',
        light: 'var(--color-light)',
        dark: 'var(--color-dark)',
      },
      fontFamily: {
        main: ['var(--font-main)', 'sans-serif'],
        title: ['var(--font-title)', 'sans-serif'],
      },
    },
    container: {
      padding: '2rem',
    },
  },
  plugins: [],
};
