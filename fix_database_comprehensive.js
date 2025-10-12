#!/usr/bin/env node

/**
 * Comprehensive Database Fix Script
 * This script fixes common database issues and ensures proper setup
 */

const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

// Configuration
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing Supabase configuration!');
  console.log('Please set the following environment variables:');
  console.log('- NEXT_PUBLIC_SUPABASE_URL');
  console.log('- SUPABASE_SERVICE_ROLE_KEY');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function fixDatabase() {
  console.log('🔧 Starting comprehensive database fix...\n');

  try {
    // 1. Check if tables exist
    console.log('1. Checking database tables...');
    
    const { data: tables, error: tablesError } = await supabase
      .from('information_schema.tables')
      .select('table_name')
      .eq('table_schema', 'public')
      .in('table_name', ['profiles', 'customers', 'invoices', 'offers', 'projects', 'activities', 'settings']);

    if (tablesError) {
      console.error('❌ Error checking tables:', tablesError);
      return;
    }

    const existingTables = tables.map(t => t.table_name);
    console.log(`✅ Found tables: ${existingTables.join(', ')}`);

    // 2. Check if profiles table has data
    console.log('\n2. Checking profiles table...');
    
    const { data: profiles, error: profilesError } = await supabase
      .from('profiles')
      .select('id, email, full_name')
      .limit(5);

    if (profilesError) {
      console.error('❌ Error checking profiles:', profilesError);
    } else {
      console.log(`✅ Found ${profiles.length} profiles`);
      if (profiles.length > 0) {
        console.log('Sample profiles:', profiles.map(p => ({ id: p.id, email: p.email, name: p.full_name })));
      }
    }

    // 3. Check auth.users table
    console.log('\n3. Checking auth.users table...');
    
    const { data: authUsers, error: authUsersError } = await supabase.auth.admin.listUsers();

    if (authUsersError) {
      console.error('❌ Error checking auth users:', authUsersError);
    } else {
      console.log(`✅ Found ${authUsers.users.length} auth users`);
      if (authUsers.users.length > 0) {
        console.log('Sample auth users:', authUsers.users.slice(0, 3).map(u => ({ 
          id: u.id, 
          email: u.email, 
          created_at: u.created_at 
        })));
      }
    }

    // 4. Fix orphaned profiles (profiles without corresponding auth.users)
    console.log('\n4. Checking for orphaned profiles...');
    
    if (profiles && profiles.length > 0 && authUsers && authUsers.users.length > 0) {
      const authUserIds = new Set(authUsers.users.map(u => u.id));
      const orphanedProfiles = profiles.filter(p => !authUserIds.has(p.id));
      
      if (orphanedProfiles.length > 0) {
        console.log(`⚠️  Found ${orphanedProfiles.length} orphaned profiles`);
        console.log('Orphaned profiles:', orphanedProfiles.map(p => ({ id: p.id, email: p.email })));
        
        // Delete orphaned profiles
        const { error: deleteError } = await supabase
          .from('profiles')
          .delete()
          .in('id', orphanedProfiles.map(p => p.id));
        
        if (deleteError) {
          console.error('❌ Error deleting orphaned profiles:', deleteError);
        } else {
          console.log('✅ Deleted orphaned profiles');
        }
      } else {
        console.log('✅ No orphaned profiles found');
      }
    }

    // 5. Create missing profiles for auth users
    console.log('\n5. Creating missing profiles for auth users...');
    
    if (authUsers && authUsers.users.length > 0) {
      const profileIds = new Set(profiles ? profiles.map(p => p.id) : []);
      const missingProfiles = authUsers.users.filter(u => !profileIds.has(u.id));
      
      if (missingProfiles.length > 0) {
        console.log(`⚠️  Found ${missingProfiles.length} auth users without profiles`);
        
        for (const user of missingProfiles) {
          const { error: insertError } = await supabase
            .from('profiles')
            .insert({
              id: user.id,
              email: user.email,
              full_name: user.user_metadata?.full_name || user.user_metadata?.name || '',
              company_name: user.user_metadata?.company_name || '',
              created_at: user.created_at,
              updated_at: new Date().toISOString()
            });
          
          if (insertError) {
            console.error(`❌ Error creating profile for user ${user.id}:`, insertError);
          } else {
            console.log(`✅ Created profile for user ${user.email}`);
          }
        }
      } else {
        console.log('✅ All auth users have profiles');
      }
    }

    // 6. Check RLS policies
    console.log('\n6. Checking RLS policies...');
    
    const { data: policies, error: policiesError } = await supabase
      .from('pg_policies')
      .select('tablename, policyname')
      .eq('schemaname', 'public')
      .in('tablename', ['profiles', 'customers', 'invoices', 'offers', 'projects', 'activities', 'settings']);

    if (policiesError) {
      console.error('❌ Error checking policies:', policiesError);
    } else {
      const policyCount = policies.reduce((acc, policy) => {
        acc[policy.tablename] = (acc[policy.tablename] || 0) + 1;
        return acc;
      }, {});
      
      console.log('✅ RLS policies found:', policyCount);
    }

    // 7. Test basic operations
    console.log('\n7. Testing basic operations...');
    
    // Test profile read
    const { data: testProfile, error: testError } = await supabase
      .from('profiles')
      .select('id, email, full_name')
      .limit(1)
      .single();

    if (testError) {
      console.error('❌ Error testing profile read:', testError);
    } else {
      console.log('✅ Profile read test successful');
    }

    console.log('\n🎉 Database fix completed successfully!');
    console.log('\nNext steps:');
    console.log('1. Make sure your .env.local file has the correct Supabase credentials');
    console.log('2. Restart your development server');
    console.log('3. Try logging in again');

  } catch (error) {
    console.error('❌ Unexpected error:', error);
  }
}

// Run the fix
fixDatabase();
