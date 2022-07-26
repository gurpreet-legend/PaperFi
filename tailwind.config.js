module.exports = {
  darkMode: 'class',
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    scrollbar: theme => ({
      DEFAULT: {
        size: theme('spacing.3'),
        track: {
          background: "transparent",
          borderRadius: "0.75em",
        },
        thumb: {
          background: `linear-gradient(to bottom, ${theme('colors.blue.700')}, ${theme('colors.purple.600')})`,
          borderRadius: "0.75em",
        },
        thumbHover: {
          background: theme('colors.gray.500'),
        },
      },
    }),
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
  plugins: [
    require('@gradin/tailwindcss-scrollbar'),
  ],
}
