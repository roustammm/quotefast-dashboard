const fs = require('fs');
const path = require('path');

console.log('🔧 Environment Setup - Configureer je Supabase credentials\n');

// Check if .env.local exists
const envPath = path.join(__dirname, '.env.local');
const envExists = fs.existsSync(envPath);

if (envExists) {
  console.log('✅ .env.local bestand gevonden');
  
  // Read and check current values
  const envContent = fs.readFileSync(envPath, 'utf8');
  const hasSupabaseUrl = envContent.includes('NEXT_PUBLIC_SUPABASE_URL=') && !envContent.includes('your_supabase_project_url');
  const hasAnonKey = envContent.includes('NEXT_PUBLIC_SUPABASE_ANON_KEY=') && !envContent.includes('your_supabase_anon_key');
  
  if (hasSupabaseUrl && hasAnonKey) {
    console.log('✅ Supabase credentials zijn al geconfigureerd');
    
    // Test the connection
    console.log('\n🧪 Testing Supabase connection...');
    testSupabaseConnection();
  } else {
    console.log('⚠️ Supabase credentials zijn nog niet volledig geconfigureerd');
    showSetupInstructions();
  }
} else {
  console.log('❌ .env.local bestand niet gevonden');
  console.log('📝 Maak een .env.local bestand aan...');
  
  createEnvFile();
  showSetupInstructions();
}

function createEnvFile() {
  const envTemplate = `# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://qgyboabomydquodygomq.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFneWJvYWJvbXlkcXVvZHlnb21xIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQxNzk4MjIsImV4cCI6MjA0OTc1NTgyMn0.9y6KhqCF_TnLEGqoWYVF-5_PGFKhPEzCXtjFRqQbFqc
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here

# Application Configuration  
NEXT_PUBLIC_APP_URL=http://localhost:3002
NODE_ENV=development

# Stripe Configuration (optional)
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret

# OpenAI Configuration (optional)
OPENAI_API_KEY=sk-your_openai_api_key

# Email Configuration (optional)
RESEND_API_KEY=re_your_resend_api_key
`;

  try {
    fs.writeFileSync(envPath, envTemplate);
    console.log('✅ .env.local bestand aangemaakt');
  } catch (error) {
    console.error('❌ Kon .env.local bestand niet aanmaken:', error.message);
    console.log('\n📋 Maak handmatig een .env.local bestand aan met deze inhoud:');
    console.log('\n' + envTemplate);
  }
}

function showSetupInstructions() {
  console.log('\n📋 SETUP INSTRUCTIES:');
  console.log('===================');
  console.log('');
  console.log('Ik zie dat je al een Supabase URL hebt van de console logs:');
  console.log('🔗 URL: https://qgyboabomydquodygomq.supabase.co');
  console.log('');
  console.log('Om je app te laten werken, heb je je Supabase credentials nodig:');
  console.log('');
  console.log('1️⃣ Ga naar: https://supabase.com/dashboard');
  console.log('2️⃣ Selecteer je project: qgyboabomydquodygomq');
  console.log('3️⃣ Ga naar Settings → API');
  console.log('4️⃣ Kopieer de "anon public" key');
  console.log('5️⃣ Update NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local');
  console.log('');
  console.log('💡 De URL is al correct ingevuld gebaseerd op je console logs!');
  console.log('');
  console.log('📁 Bestand locatie: .env.local');
  console.log('');
  console.log('⚠️ BELANGRIJK: Start je development server opnieuw na wijzigingen:');
  console.log('   npm run dev');
  console.log('');
}

async function testSupabaseConnection() {
  try {
    // Import and test
    require('dotenv').config({ path: '.env.local' });
    
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    
    if (!url || !key) {
      console.log('❌ Environment variabelen niet geladen');
      return;
    }
    
    const { createClient } = require('@supabase/supabase-js');
    const supabase = createClient(url, key);
    
    // Test connection
    const { data, error } = await supabase.from('profiles').select('count').limit(1);
    
    if (error) {
      console.log('❌ Supabase connectie fout:', error.message);
      if (error.message.includes('relation "public.profiles" does not exist')) {
        console.log('');
        console.log('🔧 Database tabellen ontbreken. Run:');
        console.log('   node quick_database_fix.js');
      }
    } else {
      console.log('✅ Supabase connectie werkt!');
      console.log('');
      console.log('🎉 Je bent klaar om te starten!');
      console.log('   npm run dev');
    }
  } catch (error) {
    console.log('❌ Test fout:', error.message);
  }
}

// Export for use in other scripts
module.exports = {
  createEnvFile,
  showSetupInstructions,
  testSupabaseConnection
};
