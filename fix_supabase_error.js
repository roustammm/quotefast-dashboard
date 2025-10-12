#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🔧 Supabase Error Fix - "supabaseKey is required" oplossen\n');

const envPath = path.join(process.cwd(), '.env.local');

// Check if .env.local exists
if (fs.existsSync(envPath)) {
  console.log('✅ .env.local bestand gevonden');
  
  const content = fs.readFileSync(envPath, 'utf8');
  
  // Check if Supabase vars are configured
  const hasUrl = content.includes('NEXT_PUBLIC_SUPABASE_URL=') && !content.includes('your_supabase_project_url');
  const hasAnonKey = content.includes('NEXT_PUBLIC_SUPABASE_ANON_KEY=') && !content.includes('your_supabase_anon_key');
  
  if (hasUrl && hasAnonKey) {
    console.log('✅ Supabase credentials lijken correct geconfigureerd');
    console.log('\n🔄 Als je nog steeds errors krijgt:');
    console.log('1. Stop je development server (Ctrl+C)');
    console.log('2. Start opnieuw: npm run dev');
    console.log('3. Clear je browser cache');
  } else {
    console.log('⚠️ Supabase credentials zijn niet volledig geconfigureerd');
    showFixInstructions();
  }
} else {
  console.log('❌ .env.local bestand niet gevonden');
  console.log('📝 Maak .env.local bestand aan...\n');
  
  createEnvFile();
}

function createEnvFile() {
  // Based on the console logs, we know the Supabase URL
  const envContent = `# Supabase Configuration - REQUIRED
NEXT_PUBLIC_SUPABASE_URL=https://qgyboabomydquodygomq.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here

# Application Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3002
NODE_ENV=development

# Optional - Stripe (voor payments)
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret

# Optional - OpenAI (voor AI features)
OPENAI_API_KEY=sk-your_openai_api_key

# Optional - Resend (voor emails)
RESEND_API_KEY=re_your_resend_api_key
`;

  try {
    fs.writeFileSync(envPath, envContent);
    console.log('✅ .env.local bestand aangemaakt!');
    showFixInstructions();
  } catch (error) {
    console.error('❌ Kon .env.local niet aanmaken:', error.message);
    console.log('\n📋 Maak handmatig een .env.local bestand aan met:');
    console.log(envContent);
  }
}

function showFixInstructions() {
  console.log('\n🎯 VOLGENDE STAPPEN:');
  console.log('==================');
  console.log('');
  console.log('1️⃣ Ga naar je Supabase Dashboard:');
  console.log('   https://supabase.com/dashboard');
  console.log('');
  console.log('2️⃣ Selecteer je project: qgyboabomydquodygomq');
  console.log('');
  console.log('3️⃣ Ga naar Settings → API');
  console.log('');
  console.log('4️⃣ Kopieer deze keys naar .env.local:');
  console.log('   • Project URL → NEXT_PUBLIC_SUPABASE_URL');
  console.log('   • anon public key → NEXT_PUBLIC_SUPABASE_ANON_KEY');
  console.log('   • service_role key → SUPABASE_SERVICE_ROLE_KEY');
  console.log('');
  console.log('5️⃣ Herstart je development server:');
  console.log('   Ctrl+C om te stoppen');
  console.log('   npm run dev om te starten');
  console.log('');
  console.log('💡 TIP: De Project URL is al correct ingevuld!');
  console.log('    Je hoeft alleen de keys te vervangen.');
  console.log('');
  console.log('🔍 Test daarna met: node test_registration.js');
}

// Check if we're running this script directly
if (require.main === module) {
  console.log('\n⚡ Quick Fix voor "supabaseKey is required" error');
  console.log('📁 Bestand: .env.local');
  console.log('🎯 Doel: Supabase credentials configureren\n');
}
