const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://fxfjrdprevabjrikuoia.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ4ZmpyZHByZXZhYmpyaWt1b2lhIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NzIwNzAyMCwiZXhwIjoyMDcyNzgzMDIwfQ.TMO5s_I6hieV6kVDPOdkG4UY3ebaXcM1KKVqDZ7YZ58';

const supabase = createClient(supabaseUrl, supabaseKey);

async function findTableStructure() {
  try {
    console.log('🔍 Finding table structure...');
    
    // Try different column combinations
    const columnTests = [
      ['id'],
      ['name'],
      ['template_name'],
      ['template_data'],
      ['html'],
      ['content'],
      ['created_at'],
      ['updated_at']
    ];
    
    for (const columns of columnTests) {
      try {
        console.log(`\n📋 Testing columns: ${columns.join(', ')}`);
        
        const { data, error } = await supabase
          .from('whatsapp_templates')
          .select(columns.join(', '))
          .limit(1);
        
        if (error) {
          console.log(`❌ ${columns.join(', ')}: ${error.message}`);
        } else {
          console.log(`✅ ${columns.join(', ')}: Accessible`);
        }
      } catch (err) {
        console.log(`❌ ${columns.join(', ')}: ${err.message}`);
      }
    }
    
    // Try to insert with minimal data
    console.log('\n🧪 Testing minimal insert...');
    const minimalData = {
      name: 'Test Template'
    };
    
    const { data: insertData, error: insertError } = await supabase
      .from('whatsapp_templates')
      .insert(minimalData)
      .select();
    
    if (insertError) {
      console.log('❌ Minimal insert error:', insertError.message);
    } else {
      console.log('✅ Minimal insert successful:', insertData);
      
      // Clean up
      if (insertData && insertData[0]) {
        await supabase
          .from('whatsapp_templates')
          .delete()
          .eq('id', insertData[0].id);
        console.log('🧹 Test record cleaned up');
      }
    }
    
  } catch (err) {
    console.error('❌ Unexpected error:', err);
  }
}

findTableStructure();
