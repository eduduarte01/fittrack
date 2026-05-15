
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    setupFiles: ['./test/setup.js'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
      include: ['src/**/*.js'],
      exclude: ['node_modules/', 'test/']
    }
  }
});

import { defineConfig } from 'vitest/config'

export default defineConfig({
    test: {
        include: ['tests/**/*.test.js'],
        environment: 'node',
        globals: true,
        coverage : {
            provider: 'v8',
            reporter: ['text', 'html'],
            include: ['tests/**', 'models/**', 'controllers/**', 'middlewares/**', 'routes/**'],
        },
        testTimeout: 10000
    }
})

