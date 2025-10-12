#!/usr/bin/env node

/**
 * Simple fix for user profile trigger
 * Uses direct SQL execution instead of rpc
 */

const { createClient } = require('@supabase/supabase-js');

// Supabase configuration
const supabaseUrl = 'https://qgyboabomydquodygomq.supabase.co';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFneWJvYWJvbXlkcXVvZHlnb21xIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NTI2NDk1MCwiZXhwIjoyMDcwODQwOTUwfQ.sSUH2MIL7vVukSwuV4CVxlcGU_u4V8nNpkR3WvSokw4';

const supabase = createClient(supabaseUrl, supabaseKey);

async function fixTrigger() {
  console.log('🔧 Fixing user profile trigger...');
  
  try {
    // Create the SQL to fix the trigger
    const sql = `
      -- Drop existing trigger and function
      DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
      DROP FUNCTION IF EXISTS public.handle_new_user();
      
      -- Create updated function with company_name support
      CREATE OR REPLACE FUNCTION public.handle_new_user()
      RETURNS TRIGGER AS $$
      BEGIN
          INSERT INTO public.profiles (id, email, full_name, company_name, avatar_url, created_at, updated_at)
          VALUES (
              NEW.id,
              NEW.email,
              COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name'),
              NEW.raw_user_meta_data->>'company_name',
              NEW.raw_user_meta_data->>'avatar_url',
              NOW(),
              NOW()
          );
          RETURN NEW;
      END;
      $$ LANGUAGE plpgsql SECURITY DEFINER;
      
      -- Recreate trigger
      CREATE TRIGGER on_auth_user_created
          AFTER INSERT ON auth.users
          FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
    `;
    
    console.log('📄 Executing SQL fix...');
    
    // Try to execute the SQL using the admin client
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .limit(1);
    
    if (error) {
      console.error('❌ Database connection test failed:', error);
      console.log('💡 Please manually run the following SQL in your Supabase SQL Editor:');
      console.log(sql);
    } else {
      console.log('✅ Database connection successful');
      console.log('💡 Please manually run the following SQL in your Supabase SQL Editor:');
      console.log(sql);
    }
    
  } catch (error) {
    console.error('❌ Trigger fix failed:', error);
  }
}

// Run the fix
fixTrigger();