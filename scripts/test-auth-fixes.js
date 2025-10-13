#!/usr/bin/env node

/**
 * Test Authentication Fixes
 * This script tests the authentication fixes
 */

const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing Supabase configuration. Check your .env.local file.');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function testAuthFixes() {
  console.log('🧪 Testing authentication fixes...
');
  
  try {
    // Test 1: Check if we can access the profiles table
    console.log('📋 Testing profiles table access...');
    const { data: profiles, error: profilesError } = await supabase
      .from('profiles')
      .select('count')
      .limit(1);
    
    if (profilesError) {
      console.log('❌ Profiles table access failed:', profilesError.message);
    } else {
      console.log('✅ Profiles table accessible');
    }
    
    // Test 2: Check if the create_user_profile function exists
    console.log('
📋 Testing create_user_profile function...');
    const { data: funcTest, error: funcError } = await supabase
      .rpc('create_user_profile', {
        user_id: '00000000-0000-0000-0000-000000000000',
        user_email: 'test@example.com',
        user_name: 'Test User'
      });
    
    if (funcError) {
      console.log('❌ Function test failed:', funcError.message);
    } else {
      console.log('✅ create_user_profile function works');
    }
    
    // Test 3: Check for users without profiles
    console.log('
📋 Checking for users without profiles...');
    const { data: usersWithoutProfiles, error: usersError } = await supabase
      .from('auth.users')
      .select('id, email, created_at')
      .not('id', 'in', '(SELECT id FROM public.profiles)')
      .limit(5);
    
    if (usersError) {
      console.log('❌ Error checking users without profiles:', usersError.message);
    } else if (!usersWithoutProfiles || usersWithoutProfiles.length === 0) {
      console.log('✅ All users have profiles');
    } else {
      console.log(`⚠️  Found ${usersWithoutProfiles.length} users without profiles:`);
      usersWithoutProfiles.forEach(user => {
        console.log(`  - ${user.email} (${user.id})`);
      });
      
      // Offer to create profiles for these users
      console.log('
🔧 Creating profiles for users without profiles...');
      for (const user of usersWithoutProfiles) {
        const { data: createResult, error: createError } = await supabase
          .rpc('create_user_profile', {
            user_id: user.id,
            user_email: user.email,
            user_name: user.email?.split('@')[0] || 'User'
          });
        
        if (createError) {
          console.log(`❌ Failed to create profile for ${user.email}:`, createError.message);
        } else {
          console.log(`✅ Profile created for ${user.email}`);
        }
      }
    }
    
  } catch (error) {
    console.error('❌ Unexpected error:', error);
  }
}

testAuthFixes();
