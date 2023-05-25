module.exports = {
  root: true,
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
  rules: {
    semi: ['error', 'always'],
    quotes: ['error', 'single', { 'avoidEscape': true, 'allowTemplateLiterals': true }],
    'indent' : ['error', 2],
    'comma-dangle': ['error', 'never'],
    'no-multiple-empty-lines': ['error', { 'max': 1 }],
    'function-paren-newline': ['error', 'never'],
    allowAllPropertiesOnSameLine: 0,
    'space-before-function-paren': ['error', 'always'],
    'object-curly-spacing': ['error', 'always'],
    'keyword-spacing': 'error',
    'space-before-blocks': 'error'
  },
  ignorePatterns: ['**/*.d.ts', '**/*.js'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 13,
    sourceType: 'module'
  },
  env: {
    'node': true
  }
};