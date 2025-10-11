const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://fxfjrdprevabjrikuoia.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ4ZmpyZHByZXZhYmpyaWt1b2lhIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NzIwNzAyMCwiZXhwIjoyMDcyNzgzMDIwfQ.TMO5s_I6hieV6kVDPOdkG4UY3ebaXcM1KKVqDZ7YZ58';

const supabase = createClient(supabaseUrl, supabaseKey);

async function testExecSql() {
  try {
    console.log('🔍 Testing exec_sql function...');
    
    // Try to execute a simple SQL statement
    const { data, error } = await supabase.rpc('exec_sql', { 
      sql: 'SELECT 1 as test' 
    });
    
    if (error) {
      console.log('❌ exec_sql function does not exist:', error.message);
      return false;
    } else {
      console.log('✅ exec_sql function exists:', data);
      return true;
    }
    
  } catch (err) {
    console.log('❌ exec_sql function error:', err.message);
    return false;
  }
}

testExecSql();
