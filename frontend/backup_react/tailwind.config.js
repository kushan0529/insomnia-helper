/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'fc-black':  '#0a0a0a',
        'fc-gold':   '#c9a84c',
        'fc-red':    '#8b0000',
        'fc-white':  '#d4d4d4',
        'fc-purple': '#3b0a45',
        'fc-grey':   '#2a2a2a',
      },
      fontFamily: {
        heading: ["'Bebas Neue'", 'sans-serif'],
        body:    ["'Special Elite'", 'serif'],
      },
      animation: {
        'flicker': 'flicker 0.15s infinite',
        'grain': 'grain 0.5s steps(1) infinite',
      },
      keyframes: {
        flicker: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.85' },
        },
        grain: {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '10%': { transform: 'translate(-2%, -3%)' },
          '20%': { transform: 'translate(3%, 2%)' },
          '30%': { transform: 'translate(-1%, 4%)' },
          '40%': { transform: 'translate(4%, -1%)' },
          '50%': { transform: 'translate(-3%, 3%)' },
          '60%': { transform: 'translate(2%, -4%)' },
          '70%': { transform: 'translate(-4%, 1%)' },
          '80%': { transform: 'translate(1%, -2%)' },
          '90%': { transform: 'translate(-2%, 4%)' },
        }
      }
    },
  },
  plugins: [],
}
