module.exports = {
  darkMode: false,
  plugins: [require('@tailwindcss/typography')],
  purge: {
    content: process.env.VUE_APP_BUNDLE_TYPE === 'base' ? ['./src/**/*.{vue,ts}'] : ['./src/components/*.{vue,ts}'],
    safelist:
      process.env.VUE_APP_BUNDLE_TYPE === 'base'
        ? {
            greedy: [
              /^(sm:|md:|lg:|xl:)?(?:bg-|text-)/,
              /^(sm:|md:|lg:|xl:)?(?:border-|rounded-|shadow-)/,
              /^(sm:|md:|lg:|xl:)?(?:container)$/,
              /^(sm:|md:|lg:|xl:)?(?:grid-|col-|row-|table-)/,
              /^(sm:|md:|lg:|xl:)?(?:m|p)[blrtxy]?-/,
              /^(sm:|md:|lg:|xl:)?(?:not-sr-only|sr-only)$/,
              /^(sm:|md:|lg:|xl:)?(?:prose|prose-)/,
              /^(sm:|md:|lg:|xl:)?(?:visible|invisible|hidden)$/,
              /^(sm:|md:|lg:|xl:)?z-$/
            ]
          }
        : {}
  },
  theme: {
    extend: {}
  },
  variants: {
    extend: {}
  }
}
