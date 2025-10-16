#!/usr/bin/env node

/**
 * Fix Test Files Script
 * 
 * This script automatically fixes common test issues:
 * - Adds missing React imports
 * - Converts Jest syntax to Vitest
 * - Fixes import paths
 */

const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Find all test files
const testFiles = glob.sync('**/*.test.{ts,tsx}', { cwd: process.cwd() });

console.log(`Found ${testFiles.length} test files to fix...`);

testFiles.forEach(filePath => {
  try {
    const fullPath = path.join(process.cwd(), filePath);
    let content = fs.readFileSync(fullPath, 'utf8');
    let modified = false;

    // Add React import if missing and file uses JSX
    if (content.includes('<') && content.includes('>') && !content.includes("import React")) {
      const lines = content.split('\n');
      const importIndex = lines.findIndex(line => line.startsWith('import'));
      
      if (importIndex >= 0) {
        lines.splice(importIndex, 0, "import React from 'react'");
        content = lines.join('\n');
        modified = true;
      }
    }

    // Convert Jest syntax to Vitest
    if (content.includes('jest.')) {
      content = content.replace(/jest\./g, 'vi.');
      modified = true;
    }

    // Fix jest.mock to vi.mock
    if (content.includes('jest.mock')) {
      content = content.replace(/jest\.mock/g, 'vi.mock');
      modified = true;
    }

    // Fix jest.fn to vi.fn
    if (content.includes('jest.fn')) {
      content = content.replace(/jest\.fn/g, 'vi.fn');
      modified = true;
    }

    // Fix jest.spyOn to vi.spyOn
    if (content.includes('jest.spyOn')) {
      content = content.replace(/jest\.spyOn/g, 'vi.spyOn');
      modified = true;
    }

    // Fix jest.clearAllMocks to vi.clearAllMocks
    if (content.includes('jest.clearAllMocks')) {
      content = content.replace(/jest\.clearAllMocks/g, 'vi.clearAllMocks');
      modified = true;
    }

    // Fix jest.resetAllMocks to vi.resetAllMocks
    if (content.includes('jest.resetAllMocks')) {
      content = content.replace(/jest\.resetAllMocks/g, 'vi.resetAllMocks');
      modified = true;
    }

    if (modified) {
      fs.writeFileSync(fullPath, content);
      console.log(`✅ Fixed: ${filePath}`);
    } else {
      console.log(`⏭️  No changes needed: ${filePath}`);
    }

  } catch (error) {
    console.error(`❌ Error fixing ${filePath}:`, error.message);
  }
});

console.log('\n🎉 Test files fixed! Run `npm test` to verify.');
