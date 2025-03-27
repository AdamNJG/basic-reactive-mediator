import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    coverage: {

      exclude: ['index.ts','.eslintrc.cjs', 'vitest.config.ts', 'tests/**'],
    },
  },
});