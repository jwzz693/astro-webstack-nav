/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	darkMode: 'class',
	theme: {
		extend: {
			colors: {
				sidebar: {
					light: '#ffffff',
					dark: '#1e293b',
				},
				bg: {
					light: '#f1f5f9',
					dark: '#0f172a',
				}
			}
		},
	},
	plugins: [],
}
