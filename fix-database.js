#!/usr/bin/env node

/**
 * Quick Database Fix Script
 */

const { createClient } = require('@supabase/supabase-js');

// Supabase configuration
const supabaseUrl = 'https://qgyboabomydquodygomq.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFneWJvYWJvbXlkcXVvZHlnb21xIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NTI2NDk1MCwiZXhwIjoyMDcwODQwOTUwfQ.sSUH2MIL7vVukSwuV4CVxlcGU_u4V8nNpkR3WvSokw4';

const supabase = createClient(supabaseUrl, supabaseKey);

async function fixDatabase() {
  console.log('🔧 Fixing database setup...');
  
  try {
    // Test connection
    console.log('📡 Testing Supabase connection...');
    const { data, error } = await supabase.from('profiles').select('count').limit(1);
    
    if (error) {
      console.log('❌ Connection failed:', error.message);
      return;
    }
    
    console.log('✅ Supabase connection successful');
    
    // Check if profiles table exists and has data
    const { data: profiles, error: profilesError } = await supabase
      .from('profiles')
      .select('*')
      .limit(5);
    
    if (profilesError) {
      console.log('❌ profiles table error:', profilesError.message);
    } else {
      console.log('✅ profiles table accessible');
      console.log('📊 Found', profiles.length, 'user profiles');
    }
    
    // Check auth.users
    const { data: users, error: usersError } = await supabase.auth.admin.listUsers();
    
    if (usersError) {
      console.log('❌ auth.users error:', usersError.message);
    } else {
      console.log('✅ auth.users accessible');
      console.log('👥 Found', users.users.length, 'auth users');
    }
    
  } catch (error) {
    console.error('❌ Database fix failed:', error);
  }
}

fixDatabase();
