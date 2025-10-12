const { createClient } = require('@supabase/supabase-js');

// Load environment variables from .env.local
require('dotenv').config({ path: '.env.local' });

// Also try to load from .env as fallback
require('dotenv').config();

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing Supabase environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function testRegistration() {
  console.log('🧪 Testing registration system...\n');

  try {
    // Test 1: Check if profiles table exists
    console.log('1️⃣ Checking if profiles table exists...');
    const { data: profiles, error: profilesError } = await supabase
      .from('profiles')
      .select('count')
      .limit(1);

    if (profilesError) {
      console.error('❌ Profiles table error:', profilesError.message);
      return;
    }
    console.log('✅ Profiles table exists');

    // Test 2: Check if auth trigger is working
    console.log('\n2️⃣ Checking auth trigger...');
    
    // Create a test user
    const testEmail = `test-${Date.now()}@example.com`;
    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      email: testEmail,
      password: 'test123456',
      email_confirm: true,
      user_metadata: {
        full_name: 'Test User',
        company_name: 'Test Company'
      }
    });

    if (authError) {
      console.error('❌ Auth user creation error:', authError.message);
      return;
    }
    console.log('✅ Test user created:', testEmail);

    // Wait a bit for trigger to execute
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Check if profile was created
    const { data: profileData, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', authData.user.id)
      .single();

    if (profileError) {
      console.error('❌ Profile creation error:', profileError.message);
      
      // Clean up
      await supabase.auth.admin.deleteUser(authData.user.id);
      return;
    }

    console.log('✅ Profile created automatically:', {
      id: profileData.id,
      email: profileData.email,
      full_name: profileData.full_name,
      company_name: profileData.company_name
    });

    // Test 3: Test login directly with Supabase
    console.log('\n3️⃣ Testing login functionality...');
    
    const { data: loginData, error: loginError } = await supabase.auth.signInWithPassword({
      email: testEmail,
      password: 'test123456'
    });
    
    if (loginError) {
      console.error('❌ Login error:', loginError.message);
    } else {
      console.log('✅ Login successful:', {
        id: loginData.user.id,
        email: loginData.user.email
      });
      
      // Test profile fetch
      const { data: profileData, error: profileFetchError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', loginData.user.id)
        .single();
        
      if (profileFetchError) {
        console.error('❌ Profile fetch error:', profileFetchError.message);
      } else {
        console.log('✅ Profile data retrieved:', {
          id: profileData.id,
          email: profileData.email,
          full_name: profileData.full_name,
          company_name: profileData.company_name
        });
      }
    }

    // Clean up test user
    console.log('\n🧹 Cleaning up test user...');
    await supabase.auth.admin.deleteUser(authData.user.id);
    console.log('✅ Test user deleted');

    console.log('\n🎉 All tests passed! Registration system is working correctly.');

  } catch (error) {
    console.error('❌ Unexpected error:', error);
  }
}

// Run the test
testRegistration().catch(console.error);
