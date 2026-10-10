/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        burger: {
          light: '#FBBF24',
          DEFAULT: '#EFA02A',
          dark: '#D97706',
        },
        roll: {
          light: '#A3E635',
          DEFAULT: '#98D826',
          dark: '#65A30D',
        },
        pizza: {
          light: '#FB923C',
          DEFAULT: '#F28C38',
          dark: '#EA580C',
        },
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
        display: ['Montserrat', 'Anton', 'Impact', 'sans-serif'],
        stencil: ['Archivo Black', 'Montserrat', 'sans-serif'],
      },
      animation: {
        'float-slow': 'float 6s ease-in-out infinite',
        'float-reverse': 'floatRev 7s ease-in-out infinite',
        'spin-slow': 'spin 20s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-14px) rotate(3deg)' },
        },
        floatRev: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(12px) rotate(-4deg)' },
        },
      },
    },
  },
  plugins: [],
};
