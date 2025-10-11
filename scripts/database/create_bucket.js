const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://fxfjrdprevabjrikuoia.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ4ZmpyZHByZXZhYmpyaWt1b2lhIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NzIwNzAyMCwiZXhwIjoyMDcyNzgzMDIwfQ.TMO5s_I6hieV6kVDPOdkG4UY3ebaXcM1KKVqDZ7YZ58';

const supabase = createClient(supabaseUrl, supabaseKey);

async function createStorageBucket() {
  try {
    console.log('Creating storage bucket...');
    
    // Create the bucket
    const { data, error } = await supabase.storage.createBucket('project-photos', {
      public: true,
      fileSizeLimit: 52428800, // 50MB
      allowedMimeTypes: ['image/jpeg', 'image/png', 'image/gif', 'image/webp']
    });

    if (error) {
      if (error.message.includes('already exists')) {
        console.log('✅ Bucket "project-photos" already exists');
      } else {
        console.error('❌ Error creating bucket:', error);
      }
    } else {
      console.log('✅ Bucket "project-photos" created successfully');
    }

    // List buckets to verify
    const { data: buckets, error: listError } = await supabase.storage.listBuckets();
    if (listError) {
      console.error('❌ Error listing buckets:', listError);
    } else {
      console.log('📦 Available buckets:', buckets.map(b => b.name));
    }

  } catch (err) {
    console.error('❌ Unexpected error:', err);
  }
}

createStorageBucket();
