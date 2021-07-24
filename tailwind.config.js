module.exports = {
  purge: { content: ['./public/**/*.html', './src/**/*.vue'] },
  darkMode: 'class',
  theme: {
    extend: {
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme('colors.gray.700'),
            maxWidth: null,
            pre: false,
            code: false,
            'pre code': false,
            'code::before': false,
            'code::after': false,
            h1: {
              fontWeight: 'bold',
              marginBottom: 0
            },
            h2: {
              marginTop: 0,
              marginBottom: '0.5em'
            },
            hr: {
              marginTop: '1em',
              marginBottom: '1em',
            },
            li: {
              marginTop: 0,
              marginBottom: 0
            }
          }
        }
      })
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
