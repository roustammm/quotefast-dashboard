#!/usr/bin/env node

/**
 * Interactive Environment Setup Script
 * This script helps you set up your environment variables
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function question(prompt) {
  return new Promise((resolve) => {
    rl.question(prompt, resolve);
  });
}

async function setupEnvironment() {
  console.log('🚀 Welcome to the QuoteFast Environment Setup!\n');
  console.log('This script will help you set up your environment variables.\n');

  // Check if .env.local already exists
  const envPath = path.join(process.cwd(), '.env.local');
  const envExists = fs.existsSync(envPath);

  if (envExists) {
    const overwrite = await question('⚠️  .env.local already exists. Do you want to overwrite it? (y/N): ');
    if (overwrite.toLowerCase() !== 'y' && overwrite.toLowerCase() !== 'yes') {
      console.log('❌ Setup cancelled.');
      rl.close();
      return;
    }
  }

  console.log('Please provide your Supabase credentials:');
  console.log('You can find these in your Supabase project dashboard under Settings > API\n');

  const supabaseUrl = await question('🔗 Supabase Project URL: ');
  const supabaseAnonKey = await question('🔑 Supabase Anon Key: ');
  const supabaseServiceKey = await question('🔐 Supabase Service Role Key (optional, press Enter to skip): ');

  console.log('\nStripe Configuration (optional, press Enter to skip):');
  const stripeSecretKey = await question('💳 Stripe Secret Key: ');
  const stripePublishableKey = await question('💳 Stripe Publishable Key: ');
  const stripeWebhookSecret = await question('🔗 Stripe Webhook Secret: ');

  console.log('\nOther Configuration:');
  const appUrl = await question('🌐 App URL (default: http://localhost:3000): ') || 'http://localhost:3000';
  const openaiKey = await question('🤖 OpenAI API Key (optional): ');
  const resendKey = await question('📧 Resend API Key (optional): ');

  // Create .env.local content
  const envContent = `# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=${supabaseUrl}
NEXT_PUBLIC_SUPABASE_ANON_KEY=${supabaseAnonKey}
${supabaseServiceKey ? `SUPABASE_SERVICE_ROLE_KEY=${supabaseServiceKey}` : '# SUPABASE_SERVICE_ROLE_KEY=your_service_role_key'}

# Stripe Configuration
${stripeSecretKey ? `STRIPE_SECRET_KEY=${stripeSecretKey}` : '# STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key'}
${stripePublishableKey ? `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=${stripePublishableKey}` : '# NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key'}
${stripeWebhookSecret ? `STRIPE_WEBHOOK_SECRET=${stripeWebhookSecret}` : '# STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret'}

# OpenAI Configuration
${openaiKey ? `OPENAI_API_KEY=${openaiKey}` : '# OPENAI_API_KEY=sk-your_openai_api_key'}

# Application Configuration
NEXT_PUBLIC_APP_URL=${appUrl}
NODE_ENV=development

# Email Configuration (Resend)
${resendKey ? `RESEND_API_KEY=${resendKey}` : '# RESEND_API_KEY=re_your_resend_api_key'}

# Optional: Error Tracking
# SENTRY_DSN=your_sentry_dsn
# SENTRY_AUTH_TOKEN=your_sentry_auth_token
`;

  try {
    fs.writeFileSync(envPath, envContent);
    console.log('\n✅ Environment file created successfully!');
    console.log(`📁 Location: ${envPath}`);
    
    console.log('\n🔧 Next steps:');
    console.log('1. Run: npm run fix:database');
    console.log('2. Run: npm run dev');
    console.log('3. Open your browser and test the application');
    
    console.log('\n📚 If you need help:');
    console.log('- Check the README.md file');
    console.log('- Run the database setup script in Supabase');
    console.log('- Make sure your Supabase project has the correct tables');
    
  } catch (error) {
    console.error('❌ Error creating environment file:', error.message);
  }

  rl.close();
}

// Run the setup
setupEnvironment();
