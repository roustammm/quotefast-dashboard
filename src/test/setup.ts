/**
 * Test Setup Configuration
 *
 * Global test setup following Spec-Kit testing standards:
 * - Consistent mocking strategies
 * - Global test utilities
 * - Accessibility testing setup
 * - Performance monitoring for tests
 *
 * @spec-kit
 * - Tests are independent and isolated
 * - Consistent mocking patterns
 * - Performance monitoring integration
 * - Accessibility testing enabled
 */
import '@testing-library/jest-dom';
import { vi, afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';

// Global test cleanup
afterEach(() => {
  cleanup();
  vi.clearAllMocks();
});

// Mock environment variables for testing
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // deprecated
    removeListener: vi.fn(), // deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// Mock ResizeObserver for components that use it
global.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

// Mock IntersectionObserver for lazy loading components
global.IntersectionObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

// Mock scrollTo for smooth scrolling components
Object.defineProperty(window, 'scrollTo', {
  writable: true,
  value: vi.fn(),
});

// Mock localStorage for components that use it
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};
Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

// Mock sessionStorage
const sessionStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};
Object.defineProperty(window, 'sessionStorage', {
  value: sessionStorageMock,
});

// Global test utilities
(globalThis as any).testUtils = {
  // Helper to create mock user for testing
  createMockUser: (overrides = {}) => ({
    id: '123',
    email: 'test@example.com',
    full_name: 'Test User',
    created_at: '2023-01-01T00:00:00.000Z',
    ...overrides,
  }),

  // Helper to create mock toast for testing
  createMockToast: () => ({
    error: vi.fn(),
    success: vi.fn(),
    info: vi.fn(),
    loading: vi.fn(() => 'toast-id'),
    dismiss: vi.fn(),
  }),

  // Helper to wait for async operations
  waitFor: (ms: number) => new Promise(resolve => setTimeout(resolve, ms)),

  // Helper to create form data for testing
  createFormData: (overrides = {}) => ({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '+1234567890',
    ...overrides,
  }),
};

// Performance monitoring for tests
const originalConsoleError = console.error;
console.error = (...args) => {
  if (
    typeof args[0] === 'string' &&
    args[0].includes('Warning: ReactDOM.render is deprecated')
  ) {
    return;
  }
  originalConsoleError(...args);
};

// Accessibility testing helpers
(global as any).a11y = {
  // Helper to check for common accessibility issues
  checkAccessibility: (container: HTMLElement) => {
    const issues: string[] = [];

    // Check for missing alt text on images
    const images = container.querySelectorAll('img');
    images.forEach((img, index) => {
      if (!img.alt) {
        issues.push(`Image ${index + 1} missing alt text`);
      }
    });

    // Check for missing labels on form inputs
    const inputs = container.querySelectorAll('input, select, textarea');
    inputs.forEach((input, index) => {
      const label = container.querySelector(`label[for="${input.id}"]`);
      const ariaLabel = input.getAttribute('aria-label');
      const ariaLabelledBy = input.getAttribute('aria-labelledby');

      if (!label && !ariaLabel && !ariaLabelledBy) {
        issues.push(`Form control ${index + 1} missing accessible label`);
      }
    });

    return issues;
  },
};
