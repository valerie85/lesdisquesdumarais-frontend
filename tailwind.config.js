/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{html,js}',
    './components/**/*.{html,js}',
  ],
  theme: {
    colors: {
      primary: 'var(--color-primary)',
      secondary: 'var(--color-secondary)',
      tertiary: 'var(--color-tertiary)',
      light: 'var(--color-light)',
      dark: 'var(--color-dark)',
    },
    container: {
      padding: '2rem',
    },
  },
  plugins: [],
}