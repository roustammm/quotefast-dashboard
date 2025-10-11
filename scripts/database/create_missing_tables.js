const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://fxfjrdprevabjrikuoia.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ4ZmpyZHByZXZhYmpyaWt1b2lhIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NzIwNzAyMCwiZXhwIjoyMDcyNzgzMDIwfQ.TMO5s_I6hieV6kVDPOdkG4UY3ebaXcM1KKVqDZ7YZ58';

const supabase = createClient(supabaseUrl, supabaseKey);

async function createMissingTables() {
  try {
    console.log('🔍 Checking which tables exist...');
    
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
    
    const existingTables = [];
    const missingTables = [];
    
    for (const table of tables) {
      try {
        const { data, error } = await supabase
          .from(table)
          .select('*')
          .limit(1);
        
        if (error) {
          if (error.message.includes('relation') && error.message.includes('does not exist')) {
            missingTables.push(table);
            console.log(`❌ Table '${table}' does not exist`);
          } else {
            existingTables.push(table);
            console.log(`✅ Table '${table}' exists`);
          }
        } else {
          existingTables.push(table);
          console.log(`✅ Table '${table}' exists`);
        }
      } catch (err) {
        missingTables.push(table);
        console.log(`❌ Table '${table}' error:`, err.message);
      }
    }
    
    console.log(`\n📊 Summary:`);
    console.log(`✅ Existing tables: ${existingTables.length}`);
    console.log(`❌ Missing tables: ${missingTables.length}`);
    
    if (missingTables.length > 0) {
      console.log(`\n🔧 Missing tables: ${missingTables.join(', ')}`);
      console.log('⚠️  These tables need to be created manually in the Supabase dashboard');
      console.log('📋 You can copy the SQL from the migration file and run it in the SQL editor');
    } else {
      console.log('\n🎉 All required tables exist!');
    }
    
    return { existingTables, missingTables };
    
  } catch (err) {
    console.error('❌ Unexpected error:', err);
    return { existingTables: [], missingTables: [] };
  }
}

createMissingTables();
