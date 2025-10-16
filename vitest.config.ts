/**
 * Vitest Configuration for QuoteFast Dashboard
 *
 * Modern testing configuration following Spec-Kit standards:
 * - Fast test execution with V8 engine
 * - Comprehensive coverage reporting
 * - Component testing with React Testing Library
 * - TypeScript support with proper path mapping
 * - Performance optimizations
 *
 * @spec-kit
 * - Test execution time < 5 minutes for full suite
 * - Coverage thresholds enforced
 * - Type-safe testing environment
 * - Accessibility testing integration
 */
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    // Test environment
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],

    // Performance optimizations
    pool: 'threads',
    poolOptions: {
      threads: {
        singleThread: true,
      },
    },

    // Test file patterns
    include: [
      '**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}',
    ],
    exclude: [
      '**/node_modules/**',
      '**/dist/**',
      '**/cypress/**',
      '**/.{idea,git,cache,output,temp}/**',
      '**/{karma,rollup,webpack,vite,vitest,jest,ava,babel,nyc,cypress,tsup,build}.config.*',
    ],

    // Coverage configuration
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html', 'lcov'],
      reportsDirectory: './coverage',
      include: [
        'app/**/*.{js,jsx,ts,tsx}',
        'components/**/*.{js,jsx,ts,tsx}',
        'lib/**/*.{js,jsx,ts,tsx}',
        'hooks/**/*.{js,jsx,ts,tsx}',
      ],
      exclude: [
        '**/node_modules/**',
        '**/dist/**',
        '**/*.d.ts',
        '**/test/**',
        '**/tests/**',
        'app/**/test*/**',
        'app/**/__tests__/**',
      ],
      thresholds: {
        global: {
          branches: 85,
          functions: 85,
          lines: 85,
          statements: 85,
        },
        // Higher thresholds for critical components
        'app/dashboard/**/*': {
          branches: 90,
          functions: 90,
          lines: 90,
          statements: 90,
        },
      },
      // Performance optimizations
      all: false,
      src: ['.'],
    },

    // Global test configuration
    globals: true,
    restoreMocks: true,

    // Test timeout and retry configuration
    testTimeout: 10000,
    hookTimeout: 10000,
    retry: 2,

    // Reporter configuration
    reporter: ['verbose', 'json', 'html'],
    outputFile: {
      json: './test-results.json',
      html: './test-results.html',
    },

    // Path mapping for imports
    alias: {
      '@': path.resolve(__dirname, './'),
      '~': path.resolve(__dirname, './'),
    },
  },

  // Build optimizations for testing
  esbuild: {
    target: 'es2020',
  },

  // Dependency optimizations
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      '@testing-library/react',
      '@testing-library/jest-dom',
      'vitest',
    ],
    exclude: ['@vite/client', '@vite/env'],
  },

  // Environment variables for testing
  define: {
    __DEV__: true,
    __TEST__: true,
  },
});
