export const tailwindConfig = {
  darkMode: 'class', 
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontSize: {
        xxs: 'var(--font-xxs)',
        xs: 'var(--font-xs)',
        sm: 'var(--font-sm)',
        md: 'var(--font-md)',
        lg: 'var(--font-lg)',
        xl: 'var(--font-xl)',
        xxl: 'var(--font-xxl)',
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
      },
    },
  },
  plugins: [],
};
