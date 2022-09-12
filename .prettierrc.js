module.exports = {
  ...require('@astrosat/prettier-config'),
  // singleQuote: true,
  // trailingComma: 'all',
  // arrowParens: 'avoid',
  // printWidth: 80,
  plugins: [require('prettier-plugin-tailwindcss')],
};
