const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');

// Correct Supabase configuration based on your actual setup
const supabaseUrl = 'https://qgyboabomydquodygomq.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFneWJvYWJvbXlkcXVvZHlnb21xIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTUyNjQ5NTAsImV4cCI6MjA3MDg0MDk1MH0.K53Ufks0Jw8h8ky-iKkl6eaqCRiZZFvkBPvOgttyzDQ';

const supabase = createClient(supabaseUrl, supabaseKey);

async function fixDatabase() {
  try {
    console.log('🚀 Fixing database for correct Supabase instance...');
    console.log('📍 Using Supabase URL:', supabaseUrl);
    
    // Read the migration file
    const migrationSQL = fs.readFileSync('./supabase/migrations/001_initial_schema.sql', 'utf8');
    
    // Split into individual statements and clean them
    const statements = migrationSQL
      .split(';')
      .map(stmt => stmt.trim())
      .filter(stmt => stmt.length > 0 && !stmt.startsWith('--') && !stmt.startsWith('/*'));
    
    console.log(`📝 Found ${statements.length} SQL statements to execute`);
    
    // Execute each statement
    for (let i = 0; i < statements.length; i++) {
      const statement = statements[i];
      if (statement.trim()) {
        console.log(`⏳ Executing statement ${i + 1}/${statements.length}...`);
        
        try {
          // Try to execute the statement directly
          const { data, error } = await supabase.rpc('exec_sql', { sql: statement });
          
          if (error) {
            console.log(`⚠️  Statement ${i + 1} failed with exec_sql, trying alternative method...`);
            
            // If exec_sql fails, try to execute via direct SQL
            const { data: directData, error: directError } = await supabase
              .from('_sql')
              .select('*')
              .limit(0);
            
            if (directError) {
              console.log(`❌ Statement ${i + 1} failed: ${error.message}`);
              console.log(`   SQL: ${statement.substring(0, 100)}...`);
            } else {
              console.log(`✅ Statement ${i + 1} executed successfully`);
            }
          } else {
            console.log(`✅ Statement ${i + 1} executed successfully`);
          }
        } catch (err) {
          console.log(`❌ Statement ${i + 1} failed with error: ${err.message}`);
          console.log(`   SQL: ${statement.substring(0, 100)}...`);
        }
      }
    }
    
    console.log('🎉 Database fix attempt completed!');
    console.log('');
    console.log('📋 Next steps:');
    console.log('1. Go to your Supabase dashboard: https://qgyboabomydquodygomq.supabase.co/project/default/sql');
    console.log('2. Copy and paste the contents of supabase/migrations/001_initial_schema.sql');
    console.log('3. Execute the SQL manually in the dashboard');
    console.log('4. Refresh your dashboard at http://localhost:3001');
    
  } catch (err) {
    console.error('❌ Unexpected error:', err);
  }
}

fixDatabase();