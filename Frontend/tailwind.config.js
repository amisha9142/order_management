/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        roboto: ['Roboto', 'sans-serif'], // Add Roboto font
      },
      colors: {
        customGreen: '#537b2f',
        lightGreen: '#7a9e59', 
        customBrown: '#a86e58',
        customWhite: '#ffffff',
      },
    },
  },
  plugins: [],
}

