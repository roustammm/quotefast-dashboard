const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');

const supabaseUrl = 'https://fxfjrdprevabjrikuoia.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ4ZmpyZHByZXZhYmpyaWt1b2lhIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NzIwNzAyMCwiZXhwIjoyMDcyNzgzMDIwfQ.TMO5s_I6hieV6kVDPOdkG4UY3ebaXcM1KKVqDZ7YZ58';

const supabase = createClient(supabaseUrl, supabaseKey);

async function setupDatabase() {
  try {
    console.log('🚀 Setting up database...');
    
    // Read the migration file
    const migrationSQL = fs.readFileSync('./supabase/migrations/001_initial_schema.sql', 'utf8');
    
    // Split the SQL into individual statements
    const statements = migrationSQL
      .split(';')
      .map(stmt => stmt.trim())
      .filter(stmt => stmt.length > 0 && !stmt.startsWith('--'));
    
    console.log(`📝 Found ${statements.length} SQL statements to execute`);
    
    // Execute each statement
    for (let i = 0; i < statements.length; i++) {
      const statement = statements[i];
      if (statement.trim()) {
        try {
          console.log(`⏳ Executing statement ${i + 1}/${statements.length}...`);
          const { error } = await supabase.rpc('exec_sql', { sql: statement });
          
          if (error) {
            // Some errors are expected (like "already exists")
            if (error.message.includes('already exists') || 
                error.message.includes('duplicate key') ||
                error.message.includes('relation already exists')) {
              console.log(`⚠️  Statement ${i + 1} skipped (already exists)`);
            } else {
              console.error(`❌ Error in statement ${i + 1}:`, error.message);
            }
          } else {
            console.log(`✅ Statement ${i + 1} executed successfully`);
          }
        } catch (err) {
          console.error(`❌ Exception in statement ${i + 1}:`, err.message);
        }
      }
    }
    
    console.log('🎉 Database setup completed!');
    
    // Verify tables exist
    console.log('🔍 Verifying tables...');
    const { data: tables, error: tableError } = await supabase
      .from('information_schema.tables')
      .select('table_name')
      .eq('table_schema', 'public');
    
    if (tableError) {
      console.error('❌ Error checking tables:', tableError);
    } else {
      console.log('📋 Available tables:', tables.map(t => t.table_name));
    }
    
  } catch (err) {
    console.error('❌ Unexpected error:', err);
  }
}

setupDatabase();
