import type { DocGenConfig } from 'doc-gen-js/config';

const config: DocGenConfig = {
  includes: ['./tests'],
  excludes: ['./tests/testClasses/**'],
  testSuffixToRemove: 'test'
};

export default config;