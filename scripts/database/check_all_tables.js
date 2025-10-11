const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://fxfjrdprevabjrikuoia.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ4ZmpyZHByZXZhYmpyaWt1b2lhIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NzIwNzAyMCwiZXhwIjoyMDcyNzgzMDIwfQ.TMO5s_I6hieV6kVDPOdkG4UY3ebaXcM1KKVqDZ7YZ58';

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkAllTables() {
  try {
    console.log('🔍 Checking all available tables...');
    
    // Try to query information_schema to get all tables
    const { data: tables, error } = await supabase
      .from('information_schema.tables')
      .select('table_name, table_schema')
      .eq('table_schema', 'public')
      .order('table_name');
    
    if (error) {
      console.error('❌ Error checking tables:', error);
      return;
    }
    
    console.log('📋 Available tables in public schema:');
    tables.forEach(table => {
      console.log(`  - ${table.table_name}`);
    });
    
    // Also check for specific tables we need
    const requiredTables = [
      'offers',
      'invoices', 
      'offer_items',
      'invoice_items',
      'document_templates',
      'email_templates',
      'email_configs',
      'whatsapp_configs'
    ];
    
    console.log('\n🔍 Checking required tables:');
    for (const table of requiredTables) {
      try {
        const { data, error } = await supabase
          .from(table)
          .select('*')
          .limit(1);
        
        if (error) {
          if (error.message.includes('relation') && error.message.includes('does not exist')) {
            console.log(`❌ Table '${table}' does not exist`);
          } else {
            console.log(`✅ Table '${table}' exists (${error.message})`);
          }
        } else {
          console.log(`✅ Table '${table}' exists and is accessible`);
        }
      } catch (err) {
        console.log(`❌ Table '${table}' error:`, err.message);
      }
    }
    
  } catch (err) {
    console.error('❌ Unexpected error:', err);
  }
}

checkAllTables();
