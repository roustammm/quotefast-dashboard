#!/usr/bin/env node

/**
 * Test Supabase Client
 * This script tests if the Supabase client is working properly
 */

require('dotenv').config({ path: '.env.local' });

async function testSupabaseClient() {
  console.log('🧪 Testing Supabase Client...\n');

  try {
    // Import the supabase client
    const { supabase } = require('./lib/supabase');
    
    console.log('✅ Supabase client imported successfully');

    // Test basic connection
    console.log('\n1. Testing basic connection...');
    const { data, error } = await supabase.auth.getSession();
    
    if (error) {
      console.log('⚠️  Auth session error (expected if not logged in):', error.message);
    } else {
      console.log('✅ Auth session check successful');
    }

    // Test database connection
    console.log('\n2. Testing database connection...');
    const { data: profiles, error: profilesError } = await supabase
      .from('profiles')
      .select('id, email, full_name')
      .limit(1);

    if (profilesError) {
      console.log('❌ Database connection error:', profilesError.message);
      console.log('💡 This might be because:');
      console.log('   - Database tables don\'t exist yet');
      console.log('   - RLS policies are blocking access');
      console.log('   - Run: npm run fix:database');
    } else {
      console.log('✅ Database connection successful');
      console.log(`   Found ${profiles.length} profiles`);
    }

    // Test auth service
    console.log('\n3. Testing auth service...');
    const { authService } = require('./lib/auth-service');
    
    const result = await authService.getCurrentUser();
    
    if (result.error && result.error.includes('Geen gebruiker gevonden')) {
      console.log('✅ Auth service handles missing user correctly');
    } else if (result.user) {
      console.log('✅ Auth service found user:', result.user.email);
    } else {
      console.log('⚠️  Auth service result:', result);
    }

    console.log('\n🎉 Supabase client test completed!');
    
    if (profilesError) {
      console.log('\n🔧 Next steps:');
      console.log('1. Run: npm run fix:database');
      console.log('2. Make sure your Supabase project has the correct tables');
      console.log('3. Check your browser console for any remaining errors');
    } else {
      console.log('\n🚀 Everything looks good! Your Supabase client is working properly.');
    }

  } catch (error) {
    console.error('❌ Error testing Supabase client:', error.message);
    console.log('\n🔧 This usually means:');
    console.log('1. Environment variables are not set correctly');
    console.log('2. Run: npm run check:env');
    console.log('3. Run: npm run setup:env');
  }
}

testSupabaseClient();
