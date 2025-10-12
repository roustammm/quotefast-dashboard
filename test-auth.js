#!/usr/bin/env node

/**
 * Test Authentication Flow
 */

const { createClient } = require('@supabase/supabase-js');

// Supabase configuration
const supabaseUrl = 'https://qgyboabomydquodygomq.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFneWJvYWJvbXlkcXVvZHlnb21xIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTUyNjQ5NTAsImV4cCI6MjA3MDg0MDk1MH0.Ej8Ej8Ej8Ej8Ej8Ej8Ej8Ej8Ej8Ej8Ej8Ej8Ej8Ej8';
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFneWJvYWJvbXlkcXVvZHlnb21xIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NTI2NDk1MCwiZXhwIjoyMDcwODQwOTUwfQ.sSUH2MIL7vVukSwuV4CVxlcGU_u4V8nNpkR3WvSokw4';

const supabase = createClient(supabaseUrl, supabaseAnonKey);
const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

async function testAuth() {
  console.log('🧪 Testing authentication flow...');
  
  try {
    // Test 1: Try to sign up a new user
    const testEmail = `test-${Date.now()}@example.com`;
    const testPassword = 'testpassword123';
    
    console.log(`📧 Testing signup with email: ${testEmail}`);
    
    const { data: signupData, error: signupError } = await supabase.auth.signUp({
      email: testEmail,
      password: testPassword,
      options: {
        data: {
          full_name: 'Test User',
          company_name: 'Test Company'
        }
      }
    });
    
    if (signupError) {
      console.log('❌ Signup failed:', signupError.message);
      return;
    }
    
    console.log('✅ Signup successful');
    console.log('👤 User ID:', signupData.user?.id);
    
    // Wait a bit for the trigger to fire
    console.log('⏳ Waiting for trigger to create profile...');
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Test 2: Check if profile was created
    if (signupData.user?.id) {
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', signupData.user.id)
        .single();
      
      if (profileError) {
        console.log('❌ Profile not found:', profileError.message);
        
        // Try to create profile manually
        console.log('🔧 Creating profile manually...');
        const { data: newProfile, error: createError } = await supabase
          .from('profiles')
          .insert({
            id: signupData.user.id,
            email: testEmail,
            full_name: 'Test User',
            company_name: 'Test Company',
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          })
          .select()
          .single();
        
        if (createError) {
          console.log('❌ Manual profile creation failed:', createError.message);
        } else {
          console.log('✅ Manual profile creation successful');
        }
      } else {
        console.log('✅ Profile found:', profile);
      }
    }
    
    // Test 3: Try to sign in
    console.log('🔐 Testing signin...');
    const { data: signinData, error: signinError } = await supabase.auth.signInWithPassword({
      email: testEmail,
      password: testPassword
    });
    
    if (signinError) {
      console.log('❌ Signin failed:', signinError.message);
    } else {
      console.log('✅ Signin successful');
      console.log('👤 Signed in user:', signinData.user?.email);
    }
    
    // Clean up - delete the test user
    console.log('🧹 Cleaning up test user...');
    if (signupData.user?.id) {
      const { error: deleteError } = await supabaseAdmin.auth.admin.deleteUser(signupData.user.id);
      if (deleteError) {
        console.log('❌ Failed to delete test user:', deleteError.message);
      } else {
        console.log('✅ Test user deleted');
      }
    }
    
  } catch (error) {
    console.error('❌ Test failed:', error);
  }
}

testAuth();
