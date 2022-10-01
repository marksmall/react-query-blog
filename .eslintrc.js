// eslint-disable-next-line no-undef
// module.exports = {
//   ...require('@astrosat/eslint-config-astrosat'),
//   settings: {
//     'import/resolver': {
//       alias: {
//         map: [['~', 'src']],
//       },
//     },
//   },
// };
const eslintRules = {
  ...require('@astrosat/eslint-config-astrosat'),
  settings: {
    'import/resolver': {
      alias: {
        map: [['~', 'src']],
      },
    },
  },
};
console.log('ESLINT RULES: ', eslintRules);

module.exports = {
  ...eslintRules,
};

// module.exports = {
//   env: {
//     browser: true,
//     es2021: true,
//   },
//   extends: [
//     'eslint:recommended',
//     'plugin:react/recommended',
//     'plugin:@typescript-eslint/recommended',
//     'plugin:prettier/recommended',
//     'plugin:storybook/recommended',
//     'plugin:cypress/recommended',
//     'plugin:jest-dom/recommended',
//     'plugin:testing-library/react',
//     'plugin:tailwindcss/recommended',
//     'plugin:import/recommended',
//     'plugin:import/typescript',
//   ],
//   parser: '@typescript-eslint/parser',
//   parserOptions: {
//     ecmaFeatures: {
//       jsx: true,
//     },
//     ecmaVersion: 'latest',
//     sourceType: 'module',
//   },
//   plugins: [
//     'react',
//     '@typescript-eslint',
//     'react-hooks',
//     'prettier',
//     'import',
//     'cypress',
//     'jest-dom',
//     'testing-library',
//     'tailwindcss',
//   ],
//   rules: {
//     'react-hooks/rules-of-hooks': 'error',
//     'react-hooks/exhaustive-deps': 'warn',
//     'react/react-in-jsx-scope': 'off',
//     'import/no-unresolved': 'error',
//     'no-duplicate-imports': 'error',
//     'no-multiple-empty-lines': [
//       'error',
//       {
//         max: 1,
//         maxEOF: 0,
//         maxBOF: 0,
//       },
//     ],
//     'import/first': 'error',
//     'import/newline-after-import': 'error',
//     'import/no-duplicates': 'error',
//     'import/no-unassigned-import': [
//       'error',
//       {
//         allow: ['**/*.css', '**/i18n/i18n'],
//       },
//     ],
//     'import/order': [
//       'error',
//       {
//         groups: [
//           'builtin',
//           'external',
//           'internal',
//           ['parent', 'sibling'],
//           'index',
//         ],
//         pathGroups: [
//           {
//             pattern: 'react',
//             group: 'external',
//             position: 'before',
//           },
//           {
//             pattern: '~/**',
//             group: 'internal',
//             position: 'before',
//           },
//         ],
//         pathGroupsExcludedImportTypes: ['builtin'],
//         alphabetize: {
//           order: 'asc',
//           caseInsensitive: true,
//         },
//         'newlines-between': 'always',
//       },
//     ],
//     'sort-imports': [
//       'error',
//       {
//         allowSeparatedGroups: true,
//         ignoreDeclarationSort: true,
//       },
//     ],
//     'react/jsx-sort-props': [
//       'warn',
//       {
//         callbacksLast: true,
//         shorthandFirst: true,
//         noSortAlphabetically: false,
//         reservedFirst: true,
//       },
//     ],
//   },
//   settings: {
//     react: {
//       version: 'detect',
//     },
//     'import/resolver': {
//       node: {
//         extensions: ['.ts', '.tsx'],
//       },
//       alias: {
//         map: [['~', 'src']],
//       },
//       typescript: {},
//     },
//   },
// };
