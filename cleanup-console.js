#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Files to clean up console statements
const filesToClean = [
  'lib/auth-service.ts',
  'lib/api-service.ts',
  'lib/analytics.ts',
  'lib/settings-service.ts'
];

// Console patterns to replace
const consoleReplacements = [
  {
    pattern: /console\.error\('([^']+)',\s*([^)]+)\);/g,
    replacement: "logger.error('$1', 'service', $2);"
  },
  {
    pattern: /console\.log\('([^']+)',\s*([^)]+)\);/g,
    replacement: "logger.info('$1', 'service', $2);"
  },
  {
    pattern: /console\.warn\('([^']+)',\s*([^)]+)\);/g,
    replacement: "logger.warn('$1', 'service', $2);"
  },
  {
    pattern: /console\.debug\('([^']+)',\s*([^)]+)\);/g,
    replacement: "logger.debug('$1', 'service', $2);"
  }
];

function cleanFile(filePath) {
  const fullPath = path.join(__dirname, filePath);
  
  if (!fs.existsSync(fullPath)) {
    console.log(`File not found: ${filePath}`);
    return;
  }

  let content = fs.readFileSync(fullPath, 'utf8');
  let modified = false;

  // Apply replacements
  consoleReplacements.forEach(({ pattern, replacement }) => {
    const newContent = content.replace(pattern, replacement);
    if (newContent !== content) {
      content = newContent;
      modified = true;
    }
  });

  // Remove standalone console statements
  const standalonePatterns = [
    /console\.log\([^)]+\);\s*\n/g,
    /console\.error\([^)]+\);\s*\n/g,
    /console\.warn\([^)]+\);\s*\n/g,
    /console\.debug\([^)]+\);\s*\n/g
  ];

  standalonePatterns.forEach(pattern => {
    const newContent = content.replace(pattern, '');
    if (newContent !== content) {
      content = newContent;
      modified = true;
    }
  });

  if (modified) {
    fs.writeFileSync(fullPath, content);
    console.log(`Cleaned: ${filePath}`);
  } else {
    console.log(`No changes needed: ${filePath}`);
  }
}

// Clean all files
filesToClean.forEach(cleanFile);

console.log('Console cleanup completed!');
