/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Space Grotesk', 'sans-serif'],
      },
      borderRadius: {
        none: '0',
        sm: '0.125rem',
        DEFAULT: '4px',
        md: '0.375rem',
        lg: '0.5rem',
        full: '9999px',
        large: '12px',
      },
    },
  },
  plugins: [],
};
