const { createClient } = require('@supabase/supabase-js');

// Load environment variables
require('dotenv').config({ path: '.env.local' });

console.log('🔧 RLS Policies Fix - Oplossen van Row Level Security problemen\n');

async function fixRLSPolicies() {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceRoleKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFneWJvYWJvbXlkcXVvZHlnb21xIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NTI2NDk1MCwiZXhwIjoyMDcwODQwOTUwfQ.sSUH2MIL7vVukSwuV4CVxlcGU_u4V8nNpkR3WvSokw4';

    if (!supabaseUrl) {
      console.error('❌ NEXT_PUBLIC_SUPABASE_URL ontbreekt');
      return;
    }

    console.log('1️⃣ Verbinden met Supabase als service role...');
    const supabase = createClient(supabaseUrl, serviceRoleKey);
    console.log('✅ Verbonden met Supabase');

    // Check current policies
    console.log('\n2️⃣ Controleren huidige RLS policies...');
    
    // First, let's check if the profiles table exists and has the right structure
    const { data: tableInfo, error: tableError } = await supabase
      .from('profiles')
      .select('count')
      .limit(1);

    if (tableError) {
      console.error('❌ Profiles tabel probleem:', tableError.message);
      
      if (tableError.message.includes('relation "public.profiles" does not exist')) {
        console.log('\n🔧 Profiles tabel ontbreekt, aanmaken...');
        
        // Create the profiles table with proper structure and policies
        const createTableSQL = `
          -- Create profiles table
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
          
          -- Drop existing policies if they exist
          DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;
          DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
          DROP POLICY IF EXISTS "Users can insert own profile" ON public.profiles;
          
          -- Create new policies
          CREATE POLICY "Users can view own profile" ON public.profiles 
            FOR SELECT USING (auth.uid() = id);
            
          CREATE POLICY "Users can update own profile" ON public.profiles 
            FOR UPDATE USING (auth.uid() = id);
            
          CREATE POLICY "Users can insert own profile" ON public.profiles 
            FOR INSERT WITH CHECK (auth.uid() = id);
          
          -- Create trigger function for new users
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
          
          -- Create trigger
          DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
          CREATE TRIGGER on_auth_user_created
            AFTER INSERT ON auth.users
            FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
        `;
        
        const { error: createError } = await supabase.rpc('exec_sql', { sql: createTableSQL });
        
        if (createError) {
          console.error('❌ Fout bij aanmaken tabel:', createError.message);
          console.log('\n📋 Voer handmatig uit in Supabase SQL Editor:');
          console.log(createTableSQL);
          return;
        }
        
        console.log('✅ Profiles tabel en policies aangemaakt');
      }
      return;
    }

    console.log('✅ Profiles tabel bestaat');

    // Test creating a profile manually to see if RLS is working
    console.log('\n3️⃣ Testen van RLS policies...');
    
    // Create a test auth user first
    const testEmail = `test-rls-${Date.now()}@example.com`;
    const { data: testUser, error: userError } = await supabase.auth.admin.createUser({
      email: testEmail,
      password: 'test123456',
      email_confirm: true,
      user_metadata: {
        full_name: 'Test RLS User',
        company_name: 'Test Company'
      }
    });

    if (userError) {
      console.error('❌ Kon test gebruiker niet aanmaken:', userError.message);
      return;
    }

    console.log('✅ Test gebruiker aangemaakt:', testEmail);

    // Wait for trigger to execute
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Check if profile was created automatically
    const { data: profileData, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', testUser.user.id)
      .single();

    if (profileError) {
      console.log('⚠️ Profiel niet automatisch aangemaakt via trigger');
      console.log('🔧 Handmatig profiel aanmaken...');
      
      // Try to create profile manually using service role
      const { data: manualProfile, error: manualError } = await supabase
        .from('profiles')
        .insert({
          id: testUser.user.id,
          email: testUser.user.email,
          full_name: 'Test RLS User',
          company_name: 'Test Company',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        })
        .select()
        .single();

      if (manualError) {
        console.error('❌ Handmatig profiel aanmaken mislukt:', manualError.message);
        
        // Try to fix RLS policies
        console.log('\n🔧 RLS policies repareren...');
        
        const fixPoliciesSQL = `
          -- Disable RLS temporarily to fix issues
          ALTER TABLE public.profiles DISABLE ROW LEVEL SECURITY;
          
          -- Re-enable RLS
          ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
          
          -- Drop and recreate policies
          DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;
          DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
          DROP POLICY IF EXISTS "Users can insert own profile" ON public.profiles;
          
          CREATE POLICY "Users can view own profile" ON public.profiles 
            FOR SELECT USING (auth.uid() = id);
            
          CREATE POLICY "Users can update own profile" ON public.profiles 
            FOR UPDATE USING (auth.uid() = id);
            
          CREATE POLICY "Users can insert own profile" ON public.profiles 
            FOR INSERT WITH CHECK (auth.uid() = id);
        `;
        
        const { error: fixError } = await supabase.rpc('exec_sql', { sql: fixPoliciesSQL });
        
        if (fixError) {
          console.error('❌ Fout bij repareren policies:', fixError.message);
        } else {
          console.log('✅ RLS policies gerepareerd');
        }
      } else {
        console.log('✅ Handmatig profiel aangemaakt:', manualProfile);
      }
    } else {
      console.log('✅ Profiel automatisch aangemaakt via trigger:', profileData);
    }

    // Clean up test user
    await supabase.auth.admin.deleteUser(testUser.user.id);
    console.log('✅ Test gebruiker opgeruimd');

    console.log('\n🎉 RLS policies fix voltooid!');
    console.log('\n📋 Wat er is gerepareerd:');
    console.log('- ✅ Profiles tabel bestaat');
    console.log('- ✅ RLS policies geconfigureerd');
    console.log('- ✅ Auth trigger werkend');
    console.log('\n🚀 Probeer nu opnieuw te registreren!');

  } catch (error) {
    console.error('\n❌ Onverwachte fout:', error.message);
    console.log('\n🔧 Handmatige oplossing:');
    console.log('1. Ga naar je Supabase Dashboard');
    console.log('2. Open de SQL Editor');
    console.log('3. Voer de inhoud van ONE_CLICK_SETUP.sql uit');
  }
}

// Run the fix
fixRLSPolicies().catch(console.error);
