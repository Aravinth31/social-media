/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./src/**/*.{js,jsx,ts,tsx}"
    ],
    theme: {
      extend: {
        fontFamily:{
          'dela': ['"Dela Gothic One"', 'cursive']
        }
      },
    },
    plugins: [
      require('tailwindcss-scrollbar'),
  
    ],
  }
  
  