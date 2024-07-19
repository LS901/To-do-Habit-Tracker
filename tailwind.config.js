/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        lightOne: '#003135',
        lightTwo: '#024950',
        lightThree: '#964743',
        lightFour: '#0FA4AF',
        lightFive: '#AFDDE5'
      }
    },
  },
  plugins: [],
}