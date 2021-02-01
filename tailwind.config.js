module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'esebus-dark': '#005A80',
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: []
};
