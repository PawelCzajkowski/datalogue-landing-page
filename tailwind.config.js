/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,jsx}", "./index.html"],
  theme: {
    extend: {
      backgroundImage: {
        "main-bg": "url('/src/assets/monitor2.png')",
      }
    },
  },
  plugins: [],
}

