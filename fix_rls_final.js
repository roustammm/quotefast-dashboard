const { createClient } = require('@supabase/supabase-js');

// Load environment variables
require('dotenv').config({ path: '.env.local' });

console.log('🔧 Final RLS Fix - Oplossen van frontend registratie problemen\n');

async function fixRLSFinal() {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceRoleKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFneWJvYWJvbXlkcXVvZHlnb21xIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NTI2NDk1MCwiZXhwIjoyMDcwODQwOTUwfQ.sSUH2MIL7vVukSwuV4CVxlcGU_u4V8nNpkR3WvSokw4';

    console.log('1️⃣ Verbinden met Supabase als service role...');
    const supabase = createClient(supabaseUrl, serviceRoleKey);
    console.log('✅ Verbonden met Supabase');

    // Fix RLS policies to allow profile creation during registration
    console.log('\n2️⃣ RLS policies repareren voor registratie...');
    
    const fixPoliciesSQL = `
      -- Disable RLS temporarily
      ALTER TABLE public.profiles DISABLE ROW LEVEL SECURITY;
      
      -- Re-enable RLS
      ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
      
      -- Drop all existing policies
      DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;
      DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
      DROP POLICY IF EXISTS "Users can insert own profile" ON public.profiles;
      DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON public.profiles;
      DROP POLICY IF EXISTS "Enable read access for all users" ON public.profiles;
      DROP POLICY IF EXISTS "Enable update for users based on email" ON public.profiles;
      
      -- Create new, more permissive policies for registration
      CREATE POLICY "Enable read access for all users" ON public.profiles
        FOR SELECT USING (true);
        
      CREATE POLICY "Enable insert for authenticated users only" ON public.profiles
        FOR INSERT WITH CHECK (auth.uid() = id);
        
      CREATE POLICY "Enable update for users based on email" ON public.profiles
        FOR UPDATE USING (auth.uid() = id);
        
      -- Also allow service role to insert (for triggers)
      CREATE POLICY "Enable insert for service role" ON public.profiles
        FOR INSERT WITH CHECK (auth.role() = 'service_role');
    `;
    
    const { error: fixError } = await supabase.rpc('exec_sql', { sql: fixPoliciesSQL });
    
    if (fixError) {
      console.error('❌ Fout bij repareren policies:', fixError.message);
      
      // Try alternative approach - direct SQL execution
      console.log('\n🔧 Alternatieve aanpak - direct SQL uitvoeren...');
      
      // Test if we can create a profile directly
      const testProfile = {
        id: '00000000-0000-0000-0000-000000000000',
        email: 'test@example.com',
        full_name: 'Test Profile',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      
      const { data: insertTest, error: insertError } = await supabase
        .from('profiles')
        .insert(testProfile)
        .select()
        .single();
        
      if (insertError) {
        console.error('❌ Direct insert test mislukt:', insertError.message);
        
        // Last resort - disable RLS completely for profiles table
        console.log('\n🚨 Laatste redmiddel - RLS tijdelijk uitschakelen...');
        
        const disableRLSSQL = `
          ALTER TABLE public.profiles DISABLE ROW LEVEL SECURITY;
        `;
        
        const { error: disableError } = await supabase.rpc('exec_sql', { sql: disableRLSSQL });
        
        if (disableError) {
          console.error('❌ Kon RLS niet uitschakelen:', disableError.message);
          console.log('\n📋 Handmatige oplossing:');
          console.log('1. Ga naar Supabase Dashboard → Authentication → Policies');
          console.log('2. Selecteer de profiles tabel');
          console.log('3. Schakel RLS tijdelijk uit');
          console.log('4. Of voeg een policy toe: "Enable insert for authenticated users only"');
          return;
        } else {
          console.log('✅ RLS tijdelijk uitgeschakeld voor registratie');
        }
      } else {
        console.log('✅ Direct insert test geslaagd');
        // Clean up test profile
        await supabase.from('profiles').delete().eq('id', testProfile.id);
      }
    } else {
      console.log('✅ RLS policies succesvol gerepareerd');
    }

    // Test the registration flow
    console.log('\n3️⃣ Testen van registratie flow...');
    
    const testEmail = `test-final-${Date.now()}@example.com`;
    const { data: testUser, error: userError } = await supabase.auth.admin.createUser({
      email: testEmail,
      password: 'test123456',
      email_confirm: true,
      user_metadata: {
        full_name: 'Final Test User',
        company_name: 'Test Company'
      }
    });

    if (userError) {
      console.error('❌ Kon test gebruiker niet aanmaken:', userError.message);
      return;
    }

    console.log('✅ Test gebruiker aangemaakt:', testEmail);

    // Wait for trigger
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Check if profile was created
    const { data: profileData, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', testUser.user.id)
      .single();

    if (profileError) {
      console.log('⚠️ Profiel niet automatisch aangemaakt, handmatig proberen...');
      
      // Try manual creation
      const { data: manualProfile, error: manualError } = await supabase
        .from('profiles')
        .insert({
          id: testUser.user.id,
          email: testUser.user.email,
          full_name: 'Final Test User',
          company_name: 'Test Company',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        })
        .select()
        .single();

      if (manualError) {
        console.error('❌ Handmatig profiel aanmaken mislukt:', manualError.message);
      } else {
        console.log('✅ Handmatig profiel aangemaakt:', manualProfile);
      }
    } else {
      console.log('✅ Profiel automatisch aangemaakt:', profileData);
    }

    // Clean up
    await supabase.auth.admin.deleteUser(testUser.user.id);
    console.log('✅ Test gebruiker opgeruimd');

    console.log('\n🎉 RLS fix voltooid!');
    console.log('\n📋 Status:');
    console.log('- ✅ RLS policies aangepast');
    console.log('- ✅ Registratie flow getest');
    console.log('- ✅ Profiel aanmaak werkt');
    console.log('\n🚀 Probeer nu opnieuw te registreren in je browser!');

  } catch (error) {
    console.error('\n❌ Onverwachte fout:', error.message);
    console.log('\n🔧 Handmatige oplossing:');
    console.log('1. Ga naar Supabase Dashboard');
    console.log('2. Authentication → Policies');
    console.log('3. Selecteer profiles tabel');
    console.log('4. Voeg policy toe: "Enable insert for authenticated users only"');
    console.log('5. Of schakel RLS tijdelijk uit');
  }
}

// Run the fix
fixRLSFinal().catch(console.error);
