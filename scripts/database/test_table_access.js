const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://fxfjrdprevabjrikuoia.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ4ZmpyZHByZXZhYmpyaWt1b2lhIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NzIwNzAyMCwiZXhwIjoyMDcyNzgzMDIwfQ.TMO5s_I6hieV6kVDPOdkG4UY3ebaXcM1KKVqDZ7YZ58';

// Create a new client instance
const supabase = createClient(supabaseUrl, supabaseKey);

async function testTableAccess() {
  try {
    console.log('🔍 Testing table access...');
    
    // Test different table names
    const tableNames = [
      'document_templates',
      'whatsapp_templates', // This was suggested in the hint
      'templates',
      'offer_templates'
    ];
    
    for (const tableName of tableNames) {
      try {
        console.log(`\n📋 Testing table: ${tableName}`);
        
        const { data, error } = await supabase
          .from(tableName)
          .select('*')
          .limit(1);
        
        if (error) {
          console.log(`❌ ${tableName}: ${error.message}`);
        } else {
          console.log(`✅ ${tableName}: Accessible (${data?.length || 0} rows)`);
        }
      } catch (err) {
        console.log(`❌ ${tableName}: ${err.message}`);
      }
    }
    
    // Also try to list all tables using a different approach
    console.log('\n🔍 Trying to list all tables...');
    try {
      const { data, error } = await supabase
        .from('pg_tables')
        .select('tablename')
        .eq('schemaname', 'public');
      
      if (error) {
        console.log('❌ Cannot list tables:', error.message);
      } else {
        console.log('📋 Available tables:', data?.map(t => t.tablename) || []);
      }
    } catch (err) {
      console.log('❌ Error listing tables:', err.message);
    }
    
  } catch (err) {
    console.error('❌ Unexpected error:', err);
  }
}

testTableAccess();
