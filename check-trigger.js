#!/usr/bin/env node

/**
 * Check Database Trigger
 */

const { createClient } = require('@supabase/supabase-js');

// Supabase configuration
const supabaseUrl = 'https://qgyboabomydquodygomq.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFneWJvYWJvbXlkcXVvZHlnb21xIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NTI2NDk1MCwiZXhwIjoyMDcwODQwOTUwfQ.sSUH2MIL7vVukSwuV4CVxlcGU_u4V8nNpkR3WvSokw4';

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkTrigger() {
  console.log('🔍 Checking database trigger...');
  
  try {
    // Check if trigger exists
    const { data: triggers, error: triggerError } = await supabase
      .rpc('get_triggers');
    
    if (triggerError) {
      console.log('❌ Could not check triggers:', triggerError.message);
      
      // Try to create the trigger manually
      console.log('🔧 Creating trigger manually...');
      
      const createTriggerSQL = `
        -- Create function to handle new user registration
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

        -- Create trigger for new user registration
        DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
        CREATE TRIGGER on_auth_user_created
            AFTER INSERT ON auth.users
            FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
      `;
      
      console.log('📝 Trigger SQL prepared');
      console.log('⚠️  Please run this SQL in your Supabase dashboard:');
      console.log('---');
      console.log(createTriggerSQL);
      console.log('---');
      
    } else {
      console.log('✅ Triggers found:', triggers);
    }
    
    // Check existing users without profiles
    console.log('🔍 Checking for users without profiles...');
    
    const { data: users, error: usersError } = await supabase.auth.admin.listUsers();
    
    if (usersError) {
      console.log('❌ Could not list users:', usersError.message);
      return;
    }
    
    console.log(`👥 Found ${users.users.length} auth users`);
    
    for (const user of users.users) {
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('id')
        .eq('id', user.id)
        .single();
      
      if (profileError && profileError.code === 'PGRST116') {
        console.log(`❌ User ${user.email} (${user.id}) has no profile`);
        
        // Create profile manually
        const { data: newProfile, error: createError } = await supabase
          .from('profiles')
          .insert({
            id: user.id,
            email: user.email,
            full_name: user.user_metadata?.full_name || user.user_metadata?.name || '',
            company_name: user.user_metadata?.company_name || '',
            avatar_url: user.user_metadata?.avatar_url || '',
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          })
          .select()
          .single();
        
        if (createError) {
          console.log(`❌ Failed to create profile for ${user.email}:`, createError.message);
        } else {
          console.log(`✅ Created profile for ${user.email}`);
        }
      } else if (profileError) {
        console.log(`❌ Error checking profile for ${user.email}:`, profileError.message);
      } else {
        console.log(`✅ User ${user.email} has profile`);
      }
    }
    
  } catch (error) {
    console.error('❌ Check failed:', error);
  }
}

checkTrigger();
