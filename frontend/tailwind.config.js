/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors');

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    colors: {
      primary: '#2C5D63',
      secondary: '#A9C52F',
      primaryBlack: '#283739',
      primaryWhite: '#F5F5F5',
      transparent: 'transparent',
      current: 'currentColor',
      black: colors.black,
      white: colors.white,
      gray: colors.gray,
      emerald: colors.emerald,
      indigo: colors.indigo,
      amber: colors.amber,
      red: colors.red,
      blue: colors.blue,
      green: colors.green,
    },
    fontFamily: {
      latoBlack: 'Lato-Black',
      latoBlackItalic: 'Lato-BlackItalic',
      latoBold: 'Lato-Bold',
      latoBoldItalic: 'Lato-BoldItalic',
      latoItalic: 'Lato-Italic',
      latoLight: 'Lato-Light',
      latoLightItalic: 'Lato-LightItalic',
      latoRegular: 'Lato-Regular',
      latoThin: 'Lato-Thin',
      latoThinItalic: 'Lato-ThinItalic',
    },
    extend: {},
  },
  plugins: [],
};
