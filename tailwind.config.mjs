/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      fontFamily: {
        'pixel': ['"Press Start 2P"', 'cursive'],
      },
      backgroundImage: {
        'gradient-purple-blue': 'linear-gradient(to right, #8a2be2, #4169e1)',
        'gradient-orange-red': 'linear-gradient(to right, #ff8c00, #ff4500)',
      }
    },
  },
  plugins: [],
}
