const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
 
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'green': '#1ddf51',
        'background': '#282828'
      },

      fontFamily: {
        inter: ['var(--font-inter)'],
      },

      screens: {
        "lsm": "450px",
        ...defaultTheme.screens,
      },

    },
  },
  plugins: [],
}

