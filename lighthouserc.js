module.exports = {
  ci: {
    collect: {
      // Collect from multiple URLs
      url: [
        'http://localhost:3000',
        'http://localhost:3000/dashboard',
        'http://localhost:3000/login',
        'http://localhost:3000/register',
        'http://localhost:3000/pricing'
      ],
      // Number of runs per URL
      numberOfRuns: 3,
      // Start the server before collecting
      startServerCommand: 'npm start',
      // Wait for the server to start
      startServerReadyPattern: 'ready on',
      // Wait for the server to be ready
      startServerReadyTimeout: 30000,
      // Settings for the collection
      settings: {
        // Use mobile emulation
        emulatedFormFactor: 'mobile',
        // Throttling settings
        throttling: {
          rttMs: 40,
          throughputKbps: 10240,
          cpuSlowdownMultiplier: 1,
          requestLatencyMs: 0,
          downloadThroughputKbps: 0,
          uploadThroughputKbps: 0
        },
        // Screen emulation
        screenEmulation: {
          mobile: true,
          width: 375,
          height: 667,
          deviceScaleFactor: 2,
          disabled: false
        },
        // Skip certain audits
        skipAudits: [
          'uses-http2',
          'uses-long-cache-ttl',
          'uses-optimized-images'
        ]
      }
    },
    assert: {
      // Performance assertions
      assertions: {
        'categories:performance': ['error', { minScore: 0.8 }],
        'categories:accessibility': ['error', { minScore: 0.9 }],
        'categories:best-practices': ['error', { minScore: 0.8 }],
        'categories:seo': ['error', { minScore: 0.8 }],
        // Specific performance metrics
        'first-contentful-paint': ['error', { maxNumericValue: 2000 }],
        'largest-contentful-paint': ['error', { maxNumericValue: 2500 }],
        'cumulative-layout-shift': ['error', { maxNumericValue: 0.1 }],
        'total-blocking-time': ['error', { maxNumericValue: 300 }],
        'speed-index': ['error', { maxNumericValue: 3000 }],
        // Accessibility assertions
        'color-contrast': 'error',
        'image-alt': 'error',
        'label': 'error',
        'link-name': 'error',
        'button-name': 'error',
        // Best practices assertions
        'is-on-https': 'error',
        'uses-https': 'error',
        'no-vulnerable-libraries': 'error',
        'no-document-write': 'error',
        // SEO assertions
        'document-title': 'error',
        'meta-description': 'error',
        'html-has-lang': 'error',
        'canonical': 'error'
      }
    },
    upload: {
      // Upload to Lighthouse CI server
      target: 'temporary-public-storage',
      // Upload to GitHub as check
      reportFilenamePattern: '%%PATHNAME%%-%%DATETIME%%-report.%%EXTENSION%%'
    },
    server: {
      // Lighthouse CI server configuration
      port: 9001,
      storage: {
        storageMethod: 'sql',
        sqlDialect: 'sqlite',
        sqlDatabasePath: './lighthouse-ci.db'
      }
    }
  }
};
