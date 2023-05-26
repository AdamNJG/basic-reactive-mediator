/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/configuration
 */

export default {
  clearMocks: true,
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: [
    '**/tests/*.[jt]s?(x)',
    '**/?(*.)+(spec|test).[tj]s?(x)'
  ],
  transform:{ '^.+\\.ts?$': 'ts-jest' }, 
  transformIgnorePatterns: [
    '\\\\node_modules\\\\',
    '\\.pnp\\.[^\\\\]+$'
  ],
  collectCoverage: true,
  coverageReporters: ['json', ['json',{ file: 'coverage-summary.json' }]],
  coveragePathIgnorePatterns: [
    '<rootDir>/tests/testClasses'
  ]
};
