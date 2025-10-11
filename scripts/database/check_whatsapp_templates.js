const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://fxfjrdprevabjrikuoia.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ4ZmpyZHByZXZhYmpyaWt1b2lhIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NzIwNzAyMCwiZXhwIjoyMDcyNzgzMDIwfQ.TMO5s_I6hieV6kVDPOdkG4UY3ebaXcM1KKVqDZ7YZ58';

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkWhatsappTemplates() {
  try {
    console.log('🔍 Checking whatsapp_templates table structure...');
    
    // Get the table structure
    const { data, error } = await supabase
      .from('whatsapp_templates')
      .select('*')
      .limit(1);
    
    if (error) {
      console.log('❌ Error accessing whatsapp_templates:', error.message);
      return;
    }
    
    console.log('✅ whatsapp_templates table is accessible');
    console.log('📋 Sample data:', data);
    
    // Try to insert a test record to see the structure
    console.log('\n🧪 Testing insert...');
    const testData = {
      name: 'Test Template',
      type: 'offerte',
      category: 'modern-clean',
      description: 'Test template',
      is_global: true,
      is_default: false,
      template_data: {
        name: 'Test Template',
        html: '<html><body>Test</body></html>'
      }
    };
    
    const { data: insertData, error: insertError } = await supabase
      .from('whatsapp_templates')
      .insert(testData)
      .select();
    
    if (insertError) {
      console.log('❌ Insert error:', insertError.message);
    } else {
      console.log('✅ Insert successful:', insertData);
      
      // Clean up the test record
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

checkWhatsappTemplates();
