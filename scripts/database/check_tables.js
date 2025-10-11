const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://fxfjrdprevabjrikuoia.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ4ZmpyZHByZXZhYmpyaWt1b2lhIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NzIwNzAyMCwiZXhwIjoyMDcyNzgzMDIwfQ.TMO5s_I6hieV6kVDPOdkG4UY3ebaXcM1KKVqDZ7YZ58';

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkTables() {
  try {
    console.log('🔍 Checking existing tables...');
    
    // Try to query each table to see if it exists
    const tables = [
      'offers',
      'invoices', 
      'offer_items',
      'invoice_items',
      'document_templates',
      'email_templates',
      'email_configs',
      'whatsapp_configs'
    ];
    
    for (const table of tables) {
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

checkTables();
