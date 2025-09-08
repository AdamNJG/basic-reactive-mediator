import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    coverage: {
      exclude: ['index.ts','eslint.config.ts', 'vitest.config.ts', 'tests/**', 'docgen.config.ts']
    }
  }
});