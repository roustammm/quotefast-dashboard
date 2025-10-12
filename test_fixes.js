#!/usr/bin/env node

/**
 * Test Script for Database Fixes
 * This script tests the fixes applied to the application
 */

const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

async function testFixes() {
  console.log('🧪 Testing Database Fixes...\n');

  // Check environment variables
  console.log('1. Checking environment variables...');
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    console.log('❌ Missing Supabase environment variables');
    console.log('Run: npm run setup:env');
    return;
  }

  console.log('✅ Environment variables found');

  // Test Supabase connection
  console.log('\n2. Testing Supabase connection...');
  const supabase = createClient(supabaseUrl, supabaseAnonKey);

  try {
    const { data, error } = await supabase.auth.getSession();
    if (error) {
      console.log('⚠️  Auth session error (expected if not logged in):', error.message);
    } else {
      console.log('✅ Supabase connection successful');
    }
  } catch (error) {
    console.log('❌ Supabase connection failed:', error.message);
    return;
  }

  // Test database tables
  console.log('\n3. Testing database tables...');
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('id, email, full_name')
      .limit(1);

    if (error) {
      console.log('❌ Database table error:', error.message);
      console.log('Run: npm run fix:database');
    } else {
      console.log('✅ Database tables accessible');
    }
  } catch (error) {
    console.log('❌ Database test failed:', error.message);
  }

  // Test auth service
  console.log('\n4. Testing auth service...');
  try {
    // Import the auth service
    const { authService } = require('./lib/auth-service');
    
    // Test getCurrentUser (should handle missing profiles gracefully)
    const result = await authService.getCurrentUser();
    
    if (result.error && result.error.includes('Geen gebruiker gevonden')) {
      console.log('✅ Auth service handles missing user correctly');
    } else if (result.user) {
      console.log('✅ Auth service found user:', result.user.email);
    } else {
      console.log('⚠️  Auth service result:', result);
    }
  } catch (error) {
    console.log('❌ Auth service test failed:', error.message);
  }

  console.log('\n🎉 Fix tests completed!');
  console.log('\nIf you see any ❌ errors above, run the appropriate fix commands:');
  console.log('- npm run setup:env (for environment variables)');
  console.log('- npm run fix:database (for database issues)');
  console.log('- npm run dev (to start the development server)');
}

testFixes();
