const { createClient } = require('@supabase/supabase-js');

// Je Supabase configuratie
const supabaseUrl = 'https://qgyboabomydquodygomq.supabase.co';
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFneWJvYWJvbXlkcXVvZHlnb21xIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NTI2NDk1MCwiZXhwIjoyMDcwODQwOTUwfQ.sSUH2MIL7vVukSwuV4CVxlcGU_u4V8nNpkR3WvSokw4';

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function createTablesOneByOne() {
  console.log('🚀 Attempting to create tables programmatically...');
  
  // Probeer een eenvoudige RPC call
  try {
    console.log('🔍 Testing RPC functionality...');
    
    // Probeer een eenvoudige SQL statement via RPC
    const { data, error } = await supabase.rpc('exec_sql', { 
      sql: 'SELECT version();' 
    });
    
    if (error) {
      console.log('❌ RPC exec_sql not available:', error.message);
      console.log('');
      console.log('📋 MANUAL SETUP STILL REQUIRED:');
      console.log('1. Go to your Supabase dashboard');
      console.log('2. Find "SQL Editor" in the left menu');
      console.log('3. Copy contents of simple_sql_setup.sql');
      console.log('4. Paste and execute');
      console.log('');
      console.log('🔗 Direct links to try:');
      console.log('   - https://supabase.com/dashboard/project/qgyboabomydquodygomq/sql');
      console.log('   - https://app.supabase.com/project/qgyboabomydquodygomq/sql');
      console.log('   - https://qgyboabomydquodygomq.supabase.co/project/default/sql');
      return;
    }
    
    console.log('✅ RPC is working!');
    console.log('🔧 Attempting to create tables...');
    
    // Als RPC werkt, proberen we de tabellen aan te maken
    const createProfilesSQL = `
      CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
      CREATE TABLE IF NOT EXISTS public.profiles (
        id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
        email TEXT UNIQUE NOT NULL,
        full_name TEXT,
        created_at TIMESTAMPTZ DEFAULT NOW(),
        updated_at TIMESTAMPTZ DEFAULT NOW()
      );
    `;
    
    const { error: createError } = await supabase.rpc('exec_sql', { 
      sql: createProfilesSQL 
    });
    
    if (createError) {
      console.log('❌ Failed to create tables:', createError.message);
    } else {
      console.log('✅ Basic tables created successfully!');
    }
    
  } catch (err) {
    console.error('❌ Unexpected error:', err);
    console.log('');
    console.log('📋 FALLBACK: Manual setup required');
    console.log('Use the SQL Editor in your Supabase dashboard');
  }
}

createTablesOneByOne();