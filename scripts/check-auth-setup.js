#!/usr/bin/env node

/**
 * Check Authentication Setup
 * This script analyzes the current authentication setup and identifies issues
 */

const { createClient } = require('@supabase/supabase-js');

// Read environment variables
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing Supabase configuration. Check your .env.local file.');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function checkAuthSetup() {
  console.log('🔍 Checking authentication setup...\n');
  
  try {
    // 1. Check if profiles table exists and its structure
    console.log('📋 Checking profiles table structure...');
    const { data: profilesTable, error: profilesError } = await supabase
      .from('information_schema.columns')
      .select('column_name, data_type, is_nullable')
      .eq('table_schema', 'public')
      .eq('table_name', 'profiles')
      .order('ordinal_position');
    
    if (profilesError) {
      console.log('❌ Error checking profiles table:', profilesError.message);
    } else if (!profilesTable || profilesTable.length === 0) {
      console.log('❌ Profiles table does not exist!');
    } else {
      console.log('✅ Profiles table exists with columns:');
      profilesTable.forEach(col => {
        console.log(`  - ${col.column_name}: ${col.data_type} (${col.is_nullable === 'YES' ? 'nullable' : 'required'})`);
      });
    }
    
    // 2. Check if the trigger function exists
    console.log('\n📋 Checking trigger function...');
    const { data: triggerFunc, error: triggerFuncError } = await supabase
      .from('information_schema.routines')
      .select('routine_name, routine_definition')
      .eq('routine_schema', 'public')
      .eq('routine_name', 'handle_new_user')
      .single();
    
    if (triggerFuncError) {
      console.log('❌ Error checking trigger function:', triggerFuncError.message);
    } else {
      console.log('✅ Trigger function exists:', triggerFunc.routine_name);
    }
    
    // 3. Check if the trigger exists
    console.log('\n📋 Checking trigger...');
    const { data: trigger, error: triggerError } = await supabase
      .from('information_schema.triggers')
      .select('trigger_name, event_manipulation, action_timing')
      .eq('trigger_schema', 'public')
      .eq('trigger_name', 'on_auth_user_created')
      .single();
    
    if (triggerError) {
      console.log('❌ Error checking trigger:', triggerError.message);
    } else {
      console.log('✅ Trigger exists:', trigger.trigger_name);
      console.log(`  - Event: ${trigger.event_manipulation}`);
      console.log(`  - Timing: ${trigger.action_timing}`);
    }
    
    // 4. Check RLS policies for profiles table
    console.log('\n📋 Checking RLS policies for profiles table...');
    const { data: policies, error: policiesError } = await supabase
      .from('pg_policies')
      .select('policyname, permissive, roles, cmd, qual')
      .eq('schemaname', 'public')
      .eq('tablename', 'profiles');
    
    if (policiesError) {
      console.log('❌ Error checking RLS policies:', policiesError.message);
    } else if (!policies || policies.length === 0) {
      console.log('❌ No RLS policies found for profiles table!');
    } else {
      console.log('✅ RLS policies found:');
      policies.forEach(policy => {
        console.log(`  - ${policy.policyname}: ${policy.cmd} (${policy.permissive ? 'permissive' : 'restrictive'})`);
      });
    }
    
    // 5. Check if RLS is enabled on profiles table
    console.log('\n📋 Checking if RLS is enabled on profiles table...');
    const { data: rlsStatus, error: rlsError } = await supabase
      .from('pg_class')
      .select('relrowsecurity')
      .eq('relname', 'profiles')
      .single();
    
    if (rlsError) {
      console.log('❌ Error checking RLS status:', rlsError.message);
    } else {
      console.log(`✅ RLS is ${rlsStatus.relrowsecurity ? 'enabled' : 'disabled'} on profiles table`);
    }
    
    // 6. Check for existing users without profiles
    console.log('\n📋 Checking for users without profiles...');
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
    }
    
  } catch (error) {
    console.error('❌ Unexpected error:', error);
  }
}

checkAuthSetup();