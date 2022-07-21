module.exports = {
  darkMode: 'class',
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // Adds a new breakpoint in addition to the default breakpoints
      colors: {
        lighter: '',
        light: '',
        medium: '',
        dark: '',
        darker: ''
      }
    },
  },
  plugins: [],
}
