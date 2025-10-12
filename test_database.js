const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://qgyboabomydquodygomq.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFneWJvYWJvbXlkcXVvZHlnb21xIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTUyNjQ5NTAsImV4cCI6MjA3MDg0MDk1MH0.K53Ufks0Jw8h8ky-iKkl6eaqCRiZZFvkBPvOgttyzDQ';

const supabase = createClient(supabaseUrl, supabaseKey);

async function testDatabase() {
  console.log('🔍 Testing database connection and tables...');
  
  const tables = ['profiles', 'customers', 'invoices', 'offers', 'projects', 'activities', 'settings'];
  
  for (const table of tables) {
    try {
      const { data, error } = await supabase
        .from(table)
        .select('count')
        .limit(1);
      
      if (error) {
        console.log(`❌ Table '${table}': ${error.message}`);
      } else {
        console.log(`✅ Table '${table}': OK`);
      }
    } catch (err) {
      console.log(`❌ Table '${table}': ${err.message}`);
    }
  }
  
  console.log('\n📋 Next steps:');
  console.log('1. If tables are missing, run the SQL migration in Supabase dashboard');
  console.log('2. Go to: https://qgyboabomydquodygomq.supabase.co/project/default/sql');
  console.log('3. Copy contents of supabase/migrations/001_initial_schema.sql');
  console.log('4. Paste and execute in SQL editor');
  console.log('5. Run this test again: node test_database.js');
}

testDatabase();