/** @type {import('tailwindcss').Config} */
module.exports = {

  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/layouts/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  daisyui: {
    themes: [
      "light",
			'dark',
			"dracula"
    ],
  },
  theme: {
    container: {
			center: true
    },
  },
  plugins: [require("daisyui")],
}
