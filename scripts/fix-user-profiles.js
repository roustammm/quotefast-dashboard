#!/usr/bin/env node

/**
 * Fix User Profile Creation Issues
 * This script ensures the database has all necessary tables and triggers
 */

const { createClient } = require('@supabase/supabase-js');

// Supabase configuration
const supabaseUrl = 'https://qgyboabomydquodygomq.supabase.co';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'your_service_role_key_here';

const supabase = createClient(supabaseUrl, supabaseKey);

async function fixUserProfiles() {
  console.log('🔧 Fixing user profile creation issues...');
  
  try {
    // Step 1: Check if profiles table exists and has the right structure
    console.log('📋 Checking profiles table...');
    
    const { data: tables, error: tablesError } = await supabase
      .from('information_schema.tables')
      .select('table_name')
      .eq('table_schema', 'public')
      .eq('table_name', 'profiles');
    
    if (tablesError) {
      console.error('❌ Error checking tables:', tablesError);
      return;
    }
    
    if (!tables || tables.length === 0) {
      console.log('❌ Profiles table does not exist! Creating it...');
      await createProfilesTable();
    } else {
      console.log('✅ Profiles table exists');
    }
    
    // Step 2: Check if the trigger exists
    console.log('📋 Checking user creation trigger...');
    
    const { data: triggers, error: triggersError } = await supabase
      .from('information_schema.triggers')
      .select('trigger_name')
      .eq('trigger_schema', 'public')
      .eq('trigger_name', 'on_auth_user_created');
    
    if (triggersError) {
      console.error('❌ Error checking triggers:', triggersError);
      return;
    }
    
    if (!triggers || triggers.length === 0) {
      console.log('❌ User creation trigger does not exist! Creating it...');
      await createUserTrigger();
    } else {
      console.log('✅ User creation trigger exists');
    }
    
    // Step 3: Check for existing users without profiles
    console.log('📋 Checking for users without profiles...');
    
    const { data: usersWithoutProfiles, error: usersError } = await supabase
      .from('auth.users')
      .select('id, email, raw_user_meta_data')
      .not('id', 'in', `(SELECT id FROM public.profiles)`);
    
    if (usersError) {
      console.error('❌ Error checking users:', usersError);
      return;
    }
    
    if (usersWithoutProfiles && usersWithoutProfiles.length > 0) {
      console.log(`🔧 Found ${usersWithoutProfiles.length} users without profiles. Creating them...`);
      
      for (const user of usersWithoutProfiles) {
        await createUserProfile(user);
      }
    } else {
      console.log('✅ All users have profiles');
    }
    
    console.log('🎉 User profile issues fixed successfully!');
    
  } catch (error) {
    console.error('❌ Error fixing user profiles:', error);
  }
}

async function createProfilesTable() {
  const createTableSQL = `
    CREATE TABLE IF NOT EXISTS public.profiles (
        id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
        email TEXT UNIQUE NOT NULL,
        full_name TEXT,
        avatar_url TEXT,
        company_name TEXT,
        phone TEXT,
        website TEXT,
        address TEXT,
        city TEXT,
        postal_code TEXT,
        country TEXT DEFAULT 'NL',
        timezone TEXT DEFAULT 'Europe/Amsterdam',
        language TEXT DEFAULT 'nl',
        currency TEXT DEFAULT 'EUR',
        subscription_tier TEXT DEFAULT 'free',
        subscription_status TEXT DEFAULT 'active',
        trial_ends_at TIMESTAMPTZ,
        created_at TIMESTAMPTZ DEFAULT NOW(),
        updated_at TIMESTAMPTZ DEFAULT NOW(),
        last_login_at TIMESTAMPTZ,
        email_confirmed_at TIMESTAMPTZ,
        onboarding_completed BOOLEAN DEFAULT FALSE,
        preferences JSONB DEFAULT '{}',
        metadata JSONB DEFAULT '{}'
    );
    
    -- Enable RLS
    ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
    
    -- Create RLS policies
    DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;
    CREATE POLICY "Users can view own profile" ON public.profiles
        FOR SELECT USING (auth.uid() = id);
    
    DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
    CREATE POLICY "Users can update own profile" ON public.profiles
        FOR UPDATE USING (auth.uid() = id);
    
    DROP POLICY IF EXISTS "Users can insert own profile" ON public.profiles;
    CREATE POLICY "Users can insert own profile" ON public.profiles
        FOR INSERT WITH CHECK (auth.uid() = id);
  `;
  
  const { error } = await supabase.rpc('exec_sql', { sql: createTableSQL });
  if (error) {
    console.error('❌ Error creating profiles table:', error);
  } else {
    console.log('✅ Profiles table created successfully');
  }
}

async function createUserTrigger() {
  const createTriggerSQL = `
    -- Create function to handle new user registration
    CREATE OR REPLACE FUNCTION public.handle_new_user()
    RETURNS TRIGGER AS $$
    BEGIN
        INSERT INTO public.profiles (id, email, full_name, avatar_url, created_at, updated_at)
        VALUES (
            NEW.id,
            NEW.email,
            COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name'),
            NEW.raw_user_meta_data->>'avatar_url',
            NOW(),
            NOW()
        );
        RETURN NEW;
    END;
    $$ LANGUAGE plpgsql SECURITY DEFINER;
    
    -- Create trigger for new user registration
    DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
    CREATE TRIGGER on_auth_user_created
        AFTER INSERT ON auth.users
        FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
  `;
  
  const { error } = await supabase.rpc('exec_sql', { sql: createTriggerSQL });
  if (error) {
    console.error('❌ Error creating user trigger:', error);
  } else {
    console.log('✅ User creation trigger created successfully');
  }
}

async function createUserProfile(user) {
  const { error } = await supabase
    .from('profiles')
    .insert({
      id: user.id,
      email: user.email,
      full_name: user.raw_user_meta_data?.full_name || user.raw_user_meta_data?.name || 'User',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    });
  
  if (error) {
    console.error(`❌ Error creating profile for user ${user.email}:`, error);
  } else {
    console.log(`✅ Profile created for user ${user.email}`);
  }
}

// Run the fix
fixUserProfiles();
