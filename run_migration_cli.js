import { execSync } from 'child_process';
import fs from 'fs';
import { createClient } from '@supabase/supabase-js';

// Je Supabase configuratie
const projectRef = 'qgyboabomydquodygomq';
const apiKey = 'sbp_5c5db657a8fcba6a90f101a3ea50a59298f0e9d5'; // Je nieuwe API key

console.log('🚀 Running database migration via CLI...');

try {
  // Lees de migratie file
  const migrationSQL = fs.readFileSync('./supabase/migrations/001_initial_schema.sql', 'utf8');
  
  // Schrijf de SQL naar een tijdelijk bestand
  fs.writeFileSync('./temp_migration.sql', migrationSQL);
  
  console.log('📝 Migration file prepared');
  
  // Probeer de migratie uit te voeren via verschillende methoden
  
  // Methode 1: Via supabase db push
  try {
    console.log('🔧 Attempting method 1: db push...');
    const output1 = execSync('supabase db push --project-ref qgyboabomydquodygomq', { 
      encoding: 'utf8',
      cwd: '/Users/innovars_lab/Downloads/dashboard-starter'
    });
    console.log('✅ Method 1 successful:', output1);
  } catch (err1) {
    console.log('⚠️  Method 1 failed:', err1.message);
    
    // Methode 2: Via supabase migration up
    try {
      console.log('🔧 Attempting method 2: migration up...');
      const output2 = execSync('supabase migration up --project-ref qgyboabomydquodygomq', { 
        encoding: 'utf8',
        cwd: '/Users/innovars_lab/Downloads/dashboard-starter'
      });
      console.log('✅ Method 2 successful:', output2);
    } catch (err2) {
      console.log('⚠️  Method 2 failed:', err2.message);
      
      // Methode 3: Via psql direct
      try {
        console.log('🔧 Attempting method 3: direct SQL execution...');
        const psqlCommand = `psql "postgresql://postgres:[YOUR_PASSWORD]@db.qgyboabomydquodygomq.supabase.co:5432/postgres" -f temp_migration.sql`;
        console.log('💡 You can run this manually:', psqlCommand);
        console.log('   (Replace [YOUR_PASSWORD] with your database password)');
      } catch (err3) {
        console.log('⚠️  Method 3 setup failed:', err3.message);
      }
    }
  }
  
  // Test of het gewerkt heeft
  console.log('🔍 Testing database connection...');
  const supabase = createClient(
    'https://qgyboabomydquodygomq.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFneWJvYWJvbXlkcXVvZHlnb21xIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTUyNjQ5NTAsImV4cCI6MjA3MDg0MDk1MH0.K53Ufks0Jw8h8ky-iKkl6eaqCRiZZFvkBPvOgttyzDQ'
  );
  
  const { data, error } = await supabase
    .from('profiles')
    .select('count')
    .limit(1);
  
  if (error) {
    console.log('❌ Database test failed:', error.message);
    console.log('📋 Manual setup still required');
  } else {
    console.log('🎉 SUCCESS! Database is working!');
  }
  
  // Cleanup
  if (fs.existsSync('./temp_migration.sql')) {
    fs.unlinkSync('./temp_migration.sql');
  }
  
} catch (err) {
  console.error('❌ Unexpected error:', err);
  console.log('📋 Fallback to manual setup required');
}

console.log('🏁 Migration attempt completed');