#!/usr/bin/env node

/**
 * Environment Check Script
 * This script checks if environment variables are properly loaded
 */

require('dotenv').config({ path: '.env.local' });

console.log('🔍 Checking Environment Variables...\n');

// Check if .env.local exists
const fs = require('fs');
const path = require('path');

const envPath = path.join(process.cwd(), '.env.local');
const envExists = fs.existsSync(envPath);

console.log(`📁 .env.local exists: ${envExists ? '✅ Yes' : '❌ No'}`);

if (envExists) {
  console.log(`📄 .env.local location: ${envPath}`);
  
  // Read and display the content (without sensitive values)
  try {
    const envContent = fs.readFileSync(envPath, 'utf8');
    const lines = envContent.split('\n');
    
    console.log('\n📋 Environment variables found:');
    lines.forEach(line => {
      if (line.trim() && !line.startsWith('#')) {
        const [key] = line.split('=');
        if (key) {
          console.log(`  - ${key}`);
        }
      }
    });
  } catch (error) {
    console.log('❌ Error reading .env.local:', error.message);
  }
}

// Check environment variables
console.log('\n🔧 Environment Variables Status:');

const requiredVars = [
  'NEXT_PUBLIC_SUPABASE_URL',
  'NEXT_PUBLIC_SUPABASE_ANON_KEY',
  'SUPABASE_SERVICE_ROLE_KEY'
];

const optionalVars = [
  'NEXT_PUBLIC_APP_URL',
  'STRIPE_SECRET_KEY',
  'NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY',
  'OPENAI_API_KEY',
  'RESEND_API_KEY'
];

console.log('\n📋 Required Variables:');
requiredVars.forEach(varName => {
  const value = process.env[varName];
  if (value) {
    console.log(`  ✅ ${varName}: ${value.substring(0, 20)}...`);
  } else {
    console.log(`  ❌ ${varName}: Missing`);
  }
});

console.log('\n📋 Optional Variables:');
optionalVars.forEach(varName => {
  const value = process.env[varName];
  if (value) {
    console.log(`  ✅ ${varName}: ${value.substring(0, 20)}...`);
  } else {
    console.log(`  ⚠️  ${varName}: Not set`);
  }
});

// Check if we're in the right directory
console.log('\n📂 Current Directory:');
console.log(`  ${process.cwd()}`);

// Check if package.json exists
const packageJsonPath = path.join(process.cwd(), 'package.json');
const packageJsonExists = fs.existsSync(packageJsonPath);
console.log(`\n📦 package.json exists: ${packageJsonExists ? '✅ Yes' : '❌ No'}`);

// Summary
console.log('\n🎯 Summary:');
const missingRequired = requiredVars.filter(varName => !process.env[varName]);

if (missingRequired.length === 0) {
  console.log('✅ All required environment variables are set!');
  console.log('🚀 You can now run: npm run dev');
} else {
  console.log(`❌ Missing ${missingRequired.length} required environment variables:`);
  missingRequired.forEach(varName => {
    console.log(`  - ${varName}`);
  });
  console.log('\n🔧 To fix this, run: npm run setup:env');
}

console.log('\n📚 Next steps:');
if (!envExists) {
  console.log('1. Run: npm run setup:env');
}
if (missingRequired.length > 0) {
  console.log('2. Set up your Supabase project');
  console.log('3. Run: npm run fix:database');
}
console.log('4. Run: npm run dev');
