#!/usr/bin/env node

/**
 * Fix User Profile Trigger Script
 * This script fixes the handle_new_user trigger to properly handle user metadata
 */

const { createClient } = require('@supabase/supabase-js');

// Supabase configuration
const supabaseUrl = 'https://qgyboabomydquodygomq.supabase.co';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFneWJvYWJvbXlkcXVvZHlnb21xIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NTI2NDk1MCwiZXhwIjoyMDcwODQwOTUwfQ.sSUH2MIL7vVukSwuV4CVxlcGU_u4V8nNpkR3WvSokw4';

const supabase = createClient(supabaseUrl, supabaseKey);

async function fixUserProfileTrigger() {
  console.log('🔧 Fixing user profile trigger...');
  
  try {
    // Drop existing trigger and function
    console.log('📄 Dropping existing trigger and function...');
    const { error: dropError } = await supabase.rpc('exec_sql', {
      sql: `
        DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
        DROP FUNCTION IF EXISTS public.handle_new_user();
      `
    });
    
    if (dropError) {
      console.error('❌ Failed to drop existing trigger:', dropError);
    } else {
      console.log('✅ Existing trigger and function dropped');
    }
    
    // Create updated function
    console.log('📄 Creating updated handle_new_user function...');
    const { error: createError } = await supabase.rpc('exec_sql', {
      sql: `
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
      `
    });
    
    if (createError) {
      console.error('❌ Failed to create function:', createError);
      return;
    }
    
    console.log('✅ handle_new_user function created');
    
    // Recreate trigger
    console.log('📄 Recreating trigger...');
    const { error: triggerError } = await supabase.rpc('exec_sql', {
      sql: `
        CREATE TRIGGER on_auth_user_created
            AFTER INSERT ON auth.users
            FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
      `
    });
    
    if (triggerError) {
      console.error('❌ Failed to create trigger:', triggerError);
      return;
    }
    
    console.log('✅ Trigger created successfully');
    console.log('🎉 User profile trigger fix completed!');
    
  } catch (error) {
    console.error('❌ Trigger fix failed:', error);
  }
}

// Run the fix
fixUserProfileTrigger();