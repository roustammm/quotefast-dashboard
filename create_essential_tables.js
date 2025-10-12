const { createClient } = require('@supabase/supabase-js');

// Correct Supabase configuration
const supabaseUrl = 'https://qgyboabomydquodygomq.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFneWJvYWJvbXlkcXVvZHlnb21xIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTUyNjQ5NTAsImV4cCI6MjA3MDg0MDk1MH0.K53Ufks0Jw8h8ky-iKkl6eaqCRiZZFvkBPvOgttyzDQ';

const supabase = createClient(supabaseUrl, supabaseKey);

async function createEssentialTables() {
  try {
    console.log('🚀 Creating essential database tables...');
    console.log('📍 Using Supabase URL:', supabaseUrl);
    
    // Test connection first
    console.log('🔍 Testing connection...');
    const { data: testData, error: testError } = await supabase
      .from('profiles')
      .select('count')
      .limit(1);
    
    if (testError && testError.code === 'PGRST205') {
      console.log('❌ Tables do not exist. Manual setup required.');
      console.log('');
      console.log('📋 MANUAL SETUP REQUIRED:');
      console.log('1. Go to: https://qgyboabomydquodygomq.supabase.co/project/default/sql');
      console.log('2. Copy the contents of supabase/migrations/001_initial_schema.sql');
      console.log('3. Paste and execute in the SQL editor');
      console.log('4. Refresh your dashboard');
      console.log('');
      console.log('🔧 Alternative: Use Supabase CLI if you have it installed:');
      console.log('   supabase db reset');
      return;
    }
    
    if (testError) {
      console.log('❌ Connection error:', testError.message);
      return;
    }
    
    console.log('✅ Connection successful! Tables already exist.');
    
  } catch (err) {
    console.error('❌ Unexpected error:', err);
  }
}

createEssentialTables();