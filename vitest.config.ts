// vitest.config.ts
import { defineConfig } from 'vitest/config';
import { WxtVitest } from 'wxt/testing';

export default defineConfig({
  plugins: [WxtVitest()],
  test: {
    // e2e tests must be done with playwright
    exclude: ['__tests__/fixtures.ts', '__tests__/e2e/**', 'node_modules/'],
  },
});
