/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/{App,app,Error,error}.vue',
    './src/{components,layouts,pages,composables,plugins}/**/*.{js,jsx,ts,tsx,vue}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

