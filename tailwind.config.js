import fluid, {extract, fontSize, screens} from 'fluid-tailwind'

/** @type {import('tailwindcss').Config} */
module.exports = {

	content: {
		files: [
			'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
			'./src/layouts/**/*.{js,ts,jsx,tsx,mdx}',
			'./src/app/**/*.{js,ts,jsx,tsx,mdx}',
		],
		extract
	},
  daisyui: {
    themes: [
			// 'dark',
			// "dracula",
      "light",
    ],
  },
  theme: {
		screens, fontSize,
    container: {
			center: true
    },
  },
	plugins: [require("daisyui"), fluid],
}
