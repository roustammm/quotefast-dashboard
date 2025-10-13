#!/usr/bin/env node

/**
 * Fix Authentication Issues
 * This script creates SQL fixes for the authentication problems
 */

const fs = require('fs');
const path = require('path');

function createAuthFixes() {
  console.log('🔧 Creating authentication fixes...\n');
  
  // Create SQL fixes for the authentication issues
  const fixes = [
    {
      name: 'Fix missing INSERT policy for profiles table',
      sql: `
-- Fix missing INSERT policy for profiles table
DROP POLICY IF EXISTS "Users can insert own profile" ON public.profiles;
CREATE POLICY "Users can insert own profile" ON public.profiles
    FOR INSERT WITH CHECK (auth.uid() = id);

-- Also allow the service role to insert profiles (for triggers)
DROP POLICY IF EXISTS "Service role can insert profiles" ON public.profiles;
CREATE POLICY "Service role can insert profiles" ON public.profiles
    FOR INSERT WITH CHECK (
      auth.role() = 'service_role' OR 
      auth.uid() = id
    );
      `
    },
    {
      name: 'Fix trigger function to handle edge cases',
      sql: `
-- Fix trigger function to handle edge cases better
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    -- Check if profile already exists to avoid duplicates
    IF EXISTS (SELECT 1 FROM public.profiles WHERE id = NEW.id) THEN
        RETURN NEW;
    END IF;
    
    -- Insert profile with better error handling
    INSERT INTO public.profiles (
        id, 
        email, 
        full_name, 
        company_name, 
        avatar_url, 
        created_at, 
        updated_at,
        email_confirmed_at
    ) VALUES (
        NEW.id,
        NEW.email,
        COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name', 'User'),
        NEW.raw_user_meta_data->>'company_name',
        NEW.raw_user_meta_data->>'avatar_url',
        NOW(),
        NOW(),
        CASE 
            WHEN NEW.email_confirmed_at IS NOT NULL THEN NEW.email_confirmed_at
            ELSE NULL
        END
    );
    
    RETURN NEW;
EXCEPTION
    WHEN unique_violation THEN
        -- Profile already exists, that's okay
        RETURN NEW;
    WHEN OTHERS THEN
        -- Log the error but don't fail the user creation
        RAISE WARNING 'Failed to create profile for user %: %', NEW.id, SQLERRM;
        RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
      `
    },
    {
      name: 'Ensure trigger is properly set up',
      sql: `
-- Ensure trigger is properly set up
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
      `
    },
    {
      name: 'Add function to manually create profile for existing users',
      sql: `
-- Add function to manually create profile for existing users
CREATE OR REPLACE FUNCTION public.create_user_profile(
    user_id UUID,
    user_email TEXT,
    user_name TEXT DEFAULT NULL,
    user_company TEXT DEFAULT NULL
)
RETURNS BOOLEAN AS $$
BEGIN
    -- Check if profile already exists
    IF EXISTS (SELECT 1 FROM public.profiles WHERE id = user_id) THEN
        RETURN TRUE; -- Already exists
    END IF;
    
    -- Insert profile
    INSERT INTO public.profiles (
        id, 
        email, 
        full_name, 
        company_name, 
        created_at, 
        updated_at
    ) VALUES (
        user_id,
        user_email,
        COALESCE(user_name, 'User'),
        user_company,
        NOW(),
        NOW()
    );
    
    RETURN TRUE;
EXCEPTION
    WHEN OTHERS THEN
        RAISE WARNING 'Failed to create profile for user %: %', user_id, SQLERRM;
        RETURN FALSE;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
      `
    }
  ];
  
  // Generate the complete SQL file
  let sqlContent = '-- Authentication Fixes for QuoteFast Dashboard\n';
  sqlContent += '-- Generated on: ' + new Date().toISOString() + '\n\n';
  
  fixes.forEach((fix, index) => {
    sqlContent += `-- Fix ${index + 1}: ${fix.name}\n`;
    sqlContent += fix.sql.trim() + '\n\n';
  });
  
  // Write the SQL file
  const sqlFilePath = path.join(__dirname, 'fix-auth-issues.sql');
  fs.writeFileSync(sqlFilePath, sqlContent);
  
  console.log('✅ SQL fixes created:', sqlFilePath);
  console.log('\n📋 Fixes included:');
  fixes.forEach((fix, index) => {
    console.log(`${index + 1}. ${fix.name}`);
  });
  
  console.log('\n📝 To apply these fixes:');
  console.log('1. Go to your Supabase dashboard: https://supabase.com/dashboard');
  console.log('2. Select your project: qgyboabomydquodygomq');
  console.log('3. Go to the SQL Editor');
  console.log('4. Copy and paste the contents of fix-auth-issues.sql');
  console.log('5. Run the SQL to apply all fixes');
  
  return sqlFilePath;
}

function createNodeScript() {
  console.log('\n🔧 Creating Node.js script to test fixes...\n');
  
  const testScript = `#!/usr/bin/env node

/**
 * Test Authentication Fixes
 * This script tests the authentication fixes
 */

const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing Supabase configuration. Check your .env.local file.');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function testAuthFixes() {
  console.log('🧪 Testing authentication fixes...\n');
  
  try {
    // Test 1: Check if we can access the profiles table
    console.log('📋 Testing profiles table access...');
    const { data: profiles, error: profilesError } = await supabase
      .from('profiles')
      .select('count')
      .limit(1);
    
    if (profilesError) {
      console.log('❌ Profiles table access failed:', profilesError.message);
    } else {
      console.log('✅ Profiles table accessible');
    }
    
    // Test 2: Check if the create_user_profile function exists
    console.log('\n📋 Testing create_user_profile function...');
    const { data: funcTest, error: funcError } = await supabase
      .rpc('create_user_profile', {
        user_id: '00000000-0000-0000-0000-000000000000',
        user_email: 'test@example.com',
        user_name: 'Test User'
      });
    
    if (funcError) {
      console.log('❌ Function test failed:', funcError.message);
    } else {
      console.log('✅ create_user_profile function works');
    }
    
    // Test 3: Check for users without profiles
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
      console.log(\`⚠️  Found \${usersWithoutProfiles.length} users without profiles:\`);
      usersWithoutProfiles.forEach(user => {
        console.log(\`  - \${user.email} (\${user.id})\`);
      });
      
      // Offer to create profiles for these users
      console.log('\n🔧 Creating profiles for users without profiles...');
      for (const user of usersWithoutProfiles) {
        const { data: createResult, error: createError } = await supabase
          .rpc('create_user_profile', {
            user_id: user.id,
            user_email: user.email,
            user_name: user.email?.split('@')[0] || 'User'
          });
        
        if (createError) {
          console.log(\`❌ Failed to create profile for \${user.email}:\`, createError.message);
        } else {
          console.log(\`✅ Profile created for \${user.email}\`);
        }
      }
    }
    
  } catch (error) {
    console.error('❌ Unexpected error:', error);
  }
}

testAuthFixes();
`;
  
  const scriptPath = path.join(__dirname, 'test-auth-fixes.js');
  fs.writeFileSync(scriptPath, testScript);
  
  console.log('✅ Test script created:', scriptPath);
  return scriptPath;
}

// Run the functions
const sqlFile = createAuthFixes();
const scriptFile = createNodeScript();

console.log('\n🎉 Authentication fixes created successfully!');
console.log('\n📝 Next steps:');
console.log('1. Apply the SQL fixes in Supabase dashboard');
console.log('2. Run the test script: node scripts/test-auth-fixes.js');
console.log('3. Test the registration flow in your application');