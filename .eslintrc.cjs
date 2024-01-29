/* eslint-env node*/
module.exports = {
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
  parser: '@typescript-eslint/parser',
  plugins: ['@stylistic/ts'],
  root: true,
  rules: {
    semi: ['error', 'always'],
    '@stylistic/ts/quotes': ['error', 'single', { 'avoidEscape': true, 'allowTemplateLiterals': true }],
    'indent' : ['error', 2],
    'comma-dangle': ['error', 'never'],
    'no-multiple-empty-lines': ['error', { 'max': 1 }],
    'function-paren-newline': ['error', 'never'],
    allowAllPropertiesOnSameLine: 0,
    'space-before-function-paren': ['error', 'always'],
    'object-curly-spacing': ['error', 'always'],
    'keyword-spacing': 'error',
    'space-before-blocks': 'error',
    '@typescript-eslint/no-explicit-any': 0
  },
  ignorePatterns: ['**/*.d.ts', '**/*.js']
};