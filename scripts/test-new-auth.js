#!/usr/bin/env node

/**
 * 🔧 Test Script voor Nieuwe Supabase Authenticatie
 * 
 * Dit script test de nieuwe authenticatie implementatie
 * Voer uit met: node scripts/test-new-auth.js
 */

const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

// Controleer environment variabelen
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

console.log('🔍 Testing New Supabase Authentication...\n');

if (!supabaseUrl || !supabaseKey) {
    console.error('❌ Missing environment variables:');
    console.error('   NEXT_PUBLIC_SUPABASE_URL:', supabaseUrl ? '✅' : '❌');
    console.error('   NEXT_PUBLIC_SUPABASE_ANON_KEY:', supabaseKey ? '✅' : '❌');
    console.error('\n💡 Update your .env.local file with new API keys from Supabase dashboard');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function testConnection() {
    console.log('1️⃣ Testing Supabase connection...');
    
    try {
        const { data, error } = await supabase.from('profiles').select('count').limit(1);
        
        if (error) {
            console.error('❌ Connection failed:', error.message);
            
            if (error.message.includes('Legacy API keys')) {
                console.error('\n🔑 LEGACY API KEYS DETECTED!');
                console.error('   Your API keys are outdated. Please:');
                console.error('   1. Go to https://supabase.com/dashboard');
                console.error('   2. Select your project');
                console.error('   3. Go to Settings → API');
                console.error('   4. Copy the new Project URL and anon public key');
                console.error('   5. Update your .env.local file');
            }
            
            return false;
        }
        
        console.log('✅ Connection successful!');
        return true;
    } catch (err) {
        console.error('❌ Connection error:', err.message);
        return false;
    }
}

async function testAuth() {
    console.log('\n2️⃣ Testing authentication methods...');
    
    const testEmail = `test-${Date.now()}@example.com`;
    const testPassword = 'TestPassword123!';
    const testName = 'Test User';
    
    try {
        // Test registratie
        console.log('   📝 Testing registration...');
        const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
            email: testEmail,
            password: testPassword,
            options: {
                data: {
                    full_name: testName
                }
            }
        });
        
        if (signUpError) {
            console.error('   ❌ Registration failed:', signUpError.message);
            return false;
        }
        
        console.log('   ✅ Registration successful!');
        
        // Test login
        console.log('   🔐 Testing login...');
        const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
            email: testEmail,
            password: testPassword
        });
        
        if (signInError) {
            console.error('   ❌ Login failed:', signInError.message);
            return false;
        }
        
        console.log('   ✅ Login successful!');
        
        // Test logout
        console.log('   🚪 Testing logout...');
        const { error: signOutError } = await supabase.auth.signOut();
        
        if (signOutError) {
            console.error('   ❌ Logout failed:', signOutError.message);
            return false;
        }
        
        console.log('   ✅ Logout successful!');
        
        return true;
        
    } catch (err) {
        console.error('   ❌ Auth test error:', err.message);
        return false;
    }
}

async function testDatabase() {
    console.log('\n3️⃣ Testing database access...');
    
    try {
        const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .limit(5);
        
        if (error) {
            console.error('   ❌ Database access failed:', error.message);
            return false;
        }
        
        console.log(`   ✅ Database access successful! Found ${data.length} profiles`);
        return true;
        
    } catch (err) {
        console.error('   ❌ Database test error:', err.message);
        return false;
    }
}

async function main() {
    console.log('🚀 Starting authentication tests...\n');
    
    const connectionOk = await testConnection();
    if (!connectionOk) {
        console.log('\n❌ Tests failed due to connection issues');
        process.exit(1);
    }
    
    const authOk = await testAuth();
    const dbOk = await testDatabase();
    
    console.log('\n📊 Test Results:');
    console.log('   Connection:', connectionOk ? '✅' : '❌');
    console.log('   Authentication:', authOk ? '✅' : '❌');
    console.log('   Database:', dbOk ? '✅' : '❌');
    
    if (connectionOk && authOk && dbOk) {
        console.log('\n🎉 All tests passed! Your authentication is working correctly.');
    } else {
        console.log('\n⚠️  Some tests failed. Check the errors above.');
    }
}

main().catch(console.error);