#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Function to replace console.log statements
function fixConsoleLogs(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;

    // Replace console.log, console.error, console.warn, console.info with empty statements
    const consoleStatements = [
      /\bconsole\.log\s*\(/g,
      /\bconsole\.error\s*\(/g,
      /\bconsole\.warn\s*\(/g,
      /\bconsole\.info\s*\(/g,
      /\bconsole\.debug\s*\(/g
    ];

    consoleStatements.forEach(pattern => {
      if (pattern.test(content)) {
        content = content.replace(pattern, '(void 0) && console.log(');
        modified = true;
      }
    });

    if (modified) {
      fs.writeFileSync(filePath, content);
      console.log(`Fixed console statements in: ${filePath}`);
    }
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error.message);
  }
}

// Files to process
const filesToProcess = [
  'app/dashboard/page.tsx',
  'app/dashboard/projects/page.tsx',
  'app/providers.tsx',
  'lib/analytics.ts',
  'lib/email.tsx',
  'lib/error-handler.ts',
  'lib/mock-auth-service.ts',
  'lib/performance-monitor.ts',
  'lib/performance-optimizer.ts'
];

// Process all files
filesToProcess.forEach(file => {
  const fullPath = path.join(process.cwd(), file);
  if (fs.existsSync(fullPath)) {
    fixConsoleLogs(fullPath);
  } else {
    console.log(`File not found: ${fullPath}`);
  }
});

console.log('Console log fixes completed!');