#!/usr/bin/env node

/**
 * Get Real Supabase API Keys
 */

const { createClient } = require('@supabase/supabase-js');

// We need to get the real anon key from Supabase
// Let's try to decode the JWT to see what's wrong

function decodeJWT(token) {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) {
      throw new Error('Invalid JWT format');
    }
    
    const header = JSON.parse(Buffer.from(parts[0], 'base64').toString());
    const payload = JSON.parse(Buffer.from(parts[1], 'base64').toString());
    
    return { header, payload };
  } catch (error) {
    return { error: error.message };
  }
}

async function getRealKeys() {
  console.log('🔍 Analyzing current API keys...');
  
  const currentAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFneWJvYWJvbXlkcXVvZHlnb21xIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTUyNjQ5NTAsImV4cCI6MjA3MDg0MDk1MH0.Ej8Ej8Ej8Ej8Ej8Ej8Ej8Ej8Ej8Ej8Ej8Ej8Ej8Ej8';
  const currentServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFneWJvYWJvbXlkcXVvZHlnb21xIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NTI2NDk1MCwiZXhwIjoyMDcwODQwOTUwfQ.sSUH2MIL7vVukSwuV4CVxlcGU_u4V8nNpkR3WvSokw4';
  
  console.log('📋 Current Anon Key Analysis:');
  const anonDecoded = decodeJWT(currentAnonKey);
  if (anonDecoded.error) {
    console.log('❌ Anon key decode error:', anonDecoded.error);
  } else {
    console.log('✅ Anon key payload:', anonDecoded.payload);
  }
  
  console.log('\n📋 Current Service Key Analysis:');
  const serviceDecoded = decodeJWT(currentServiceKey);
  if (serviceDecoded.error) {
    console.log('❌ Service key decode error:', serviceDecoded.error);
  } else {
    console.log('✅ Service key payload:', serviceDecoded.payload);
  }
  
  // The issue is that the anon key has a placeholder signature
  // We need to get the real anon key from Supabase dashboard
  
  console.log('\n🔧 Solution:');
  console.log('1. Go to your Supabase dashboard: https://supabase.com/dashboard');
  console.log('2. Select your project: qgyboabomydquodygomq');
  console.log('3. Go to Settings > API');
  console.log('4. Copy the "anon public" key');
  console.log('5. Replace the NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local');
  
  console.log('\n📝 The real anon key should look like:');
  console.log('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFneWJvYWJvbXlkcXVvZHlnb21xIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTUyNjQ5NTAsImV4cCI6MjA3MDg0MDk1MH0.REAL_SIGNATURE_HERE');
  
  // Let's try to test with the service key to see if that works
  console.log('\n🧪 Testing with service key...');
  const supabase = createClient('https://qgyboabomydquodygomq.supabase.co', currentServiceKey);
  
  try {
    const { data, error } = await supabase.from('profiles').select('count').limit(1);
    if (error) {
      console.log('❌ Service key test failed:', error.message);
    } else {
      console.log('✅ Service key works!');
    }
  } catch (error) {
    console.log('❌ Service key test error:', error.message);
  }
}

getRealKeys();
