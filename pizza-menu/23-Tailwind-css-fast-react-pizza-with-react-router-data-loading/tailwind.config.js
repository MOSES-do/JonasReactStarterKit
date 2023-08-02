/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily:{
      //override default
      sans: 'Roboto Mono',
    },
    extend: {
      //add customization but keep tailwind defaults
      height:{
        screen:'100dvh',
      }
    },
  },
  plugins: [],
}

