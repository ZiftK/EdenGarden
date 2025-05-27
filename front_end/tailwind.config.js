/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: 'class',
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/features/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/shared/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		extend: {
			fontSize: {
				xxs: '0.625rem',
			},
			colors: {
				background: 'var(--background)',
				'background-transparent': 'var(--background-transparent)',

				text: 'var(--text-color)',
				'text-hover': 'var(--text-color-hover)',
				'text-label': 'var(--text-label)',

				primary: {
					lighter: 'var(--primary-color-lighter)',
					100: 'var(--primary-color-100)',
					200: 'var(--primary-color-200)',
					light: 'var(--primary-color-light)',
					400: 'var(--primary-color-400)',
					DEFAULT: 'var(--primary-color)',
					dark: 'var(--primary-color-dark)',
					700: 'var(--primary-color-700)',
					darker: 'var(--primary-color-darker)',
					900: 'var(--primary-color-900)',
				},

				secondary: {
					lighter: 'var(--secondary-color-lighter)',
					100: 'var(--secondary-color-100)',
					200: 'var(--secondary-color-200)',
					light: 'var(--secondary-color-light)',
					400: 'var(--secondary-color-400)',
					DEFAULT: 'var(--secondary-color)',
					600: 'var(--secondary-color-600)',
					dark: 'var(--secondary-color-dark)',
					800: 'var(--secondary-color-800)',
					darker: 'var(--secondary-color-darker)',

					a100: 'var(--secondary-color-a100)',
					a200: 'var(--secondary-color-a200)',
					a300: 'var(--secondary-color-a300)',
				},

				error: {
					lighter: 'var(--error-color-lighter)',
					light: 'var(--error-color-light)',
					DEFAULT: 'var(--error-color)',
					dark: 'var(--error-color-dark)',
					darker: 'var(--error-color-darker)',
				},

				warning: {
					lighter: 'var(--color-warning-lighter)',
					light: 'var(--color-warning-light)',
					DEFAULT: 'var(--color-warning)',
					dark: 'var(--color-warning-dark)',
					darker: 'var(--color-warning-darker)',
				},

				success: {
					lighter: 'var(--success-color-lighter)',
					light: 'var(--success-color-light)',
					DEFAULT: 'var(--success-color)',
					dark: 'var(--success-color-dark)',
					darker: 'var(--success-color-darker)',
				},

				contained: {
					DEFAULT: 'var(--contained-color)',
					dark: 'var(--contained-color-dark)',
				},

				outlined: {
					DEFAULT: 'var(--outlined-color)',
					hover: 'var(--outlined-color-hover)',
				},

				divider: 'var(--color-divider)',

				wave: {
					start: 'var(--wave-start)',
					middle: 'var(--wave-middle)',
					end: 'var(--wave-end)',
				},

				green: {
					lighter: 'var(--green-lighter)',
					light: 'var(--green-light)',
					'light-dark': 'var(--green-light-dark)',
					DEFAULT: 'var(--green)',
					200: 'var(--green-200)',
					'dark-transparent-100': 'var(--green-dark-transparent-100)',
					'dark-transparent-400': 'var(--green-dark-transparent-400)',
					'dark-transparent-500': 'var(--green-dark-transparent-500)',
					'dark-500': 'var(--green-dark-500)',
					dark: 'var(--green-dark)',
					bg: 'var(--green-bg)',
					'bg-dark': 'var(--green-bg-1)',
					'bg-transparent': 'var(--green-bg-0)',
				},

				orange: {
					title: 'var(--orange-title)',
				},

				font: {
					father: 'var(--father-font)',
					children: 'var(--children-font)',
				},

				white: {
					persistence: 'var(--white-peristance-color)',
				},

				nofocus: 'var(--color-no-focus)',

				'green-dark': {
					50: '#f0fdf4',
					100: '#dcfce7',
					200: '#bbf7d0',
					300: '#86efac',
					400: '#4ade80',
					500: '#22c55e',
					600: '#16a34a',
					700: '#15803d',
					800: '#166534',
					900: '#14532d',
					950: '#052e16',
				},
			},
			backgroundImage: {
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
				'gradient-conic':
					'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
			},
		},
	},
	plugins: [],
}
