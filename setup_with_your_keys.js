const { createClient } = require('@supabase/supabase-js');

// Je Supabase configuratie
const supabaseUrl = 'https://qgyboabomydquodygomq.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFneWJvYWJvbXlkcXVvZHlnb21xIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTUyNjQ5NTAsImV4cCI6MjA3MDg0MDk1MH0.K53Ufks0Jw8h8ky-iKkl6eaqCRiZZFvkBPvOgttyzDQ';
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFneWJvYWJvbXlkcXVvZHlnb21xIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NTI2NDk1MCwiZXhwIjoyMDcwODQwOTUwfQ.sSUH2MIL7vVukSwuV4CVxlcGU_u4V8nNpkR3WvSokw4';

// Gebruik service role key voor admin operaties
const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function setupDatabase() {
  try {
    console.log('🚀 Setting up database with service role key...');
    console.log('📍 URL:', supabaseUrl);
    
    // Test connection
    console.log('🔍 Testing connection...');
    
    // Probeer eerst een eenvoudige query
    const { data, error } = await supabase
      .from('profiles')
      .select('count')
      .limit(1);
    
    if (error && error.code === 'PGRST205') {
      console.log('❌ Tables don\'t exist yet. This is expected.');
      console.log('');
      console.log('📋 MANUAL SETUP REQUIRED:');
      console.log('1. Go to: https://qgyboabomydquodygomq.supabase.co/project/default/sql');
      console.log('2. Copy contents of simple_sql_setup.sql');
      console.log('3. Paste and execute in SQL editor');
      console.log('4. Run this test again');
      return;
    }
    
    if (error) {
      console.log('❌ Error:', error.message);
      console.log('📋 Try manual setup in Supabase dashboard');
      return;
    }
    
    console.log('✅ Database connection successful!');
    console.log('✅ Tables exist and are accessible');
    
    // Test alle belangrijke tabellen
    const tables = ['profiles', 'customers', 'invoices', 'offers', 'projects', 'activities', 'settings'];
    console.log('🔍 Testing all tables...');
    
    for (const table of tables) {
      try {
        const { error: tableError } = await supabase
          .from(table)
          .select('count')
          .limit(1);
        
        if (tableError) {
          console.log(`❌ Table '${table}': ${tableError.message}`);
        } else {
          console.log(`✅ Table '${table}': OK`);
        }
      } catch (err) {
        console.log(`❌ Table '${table}': ${err.message}`);
      }
    }
    
  } catch (err) {
    console.error('❌ Unexpected error:', err);
    console.log('📋 Try manual setup in Supabase dashboard');
  }
}

setupDatabase();