#!/usr/bin/env node

/**
 * Supabase Setup Script
 * This script helps configure Supabase with beautiful email templates and proper settings
 */

const fs = require('fs');
const path = require('path');

console.log('🚀 QuoteFast Dashboard - Supabase Setup');
console.log('=====================================\n');

// Check if .env.local exists
const envPath = path.join(process.cwd(), '.env.local');
if (!fs.existsSync(envPath)) {
  console.log('❌ .env.local file not found!');
  console.log('📝 Please create a .env.local file with your Supabase credentials:');
  console.log(`
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
NEXT_PUBLIC_APP_URL=http://localhost:3000
  `);
  process.exit(1);
}

console.log('✅ Environment file found');

// Read environment variables
require('dotenv').config({ path: envPath });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey || !serviceRoleKey) {
  console.log('❌ Missing Supabase credentials in .env.local');
  console.log('📝 Please add the following to your .env.local file:');
  console.log(`
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
  `);
  process.exit(1);
}

console.log('✅ Supabase credentials found');

// Create Supabase configuration instructions
const configInstructions = `
🔧 Supabase Configuration Instructions
=====================================

1. 📧 Email Templates Configuration:
   - Go to your Supabase Dashboard
   - Navigate to Authentication > Email Templates
   - Replace the default templates with our beautiful HTML templates:

   📝 Confirm signup template:
   - Subject: "Welkom bij QuoteFast Dashboard! Bevestig je account"
   - Use the HTML template from lib/email-templates.ts (welcome function)

   📝 Reset password template:
   - Subject: "Wachtwoord Reset - QuoteFast Dashboard"
   - Use the HTML template from lib/email-templates.ts (passwordReset function)

   📝 Magic link template:
   - Subject: "Inloggen zonder Wachtwoord - QuoteFast Dashboard"
   - Use the HTML template from lib/email-templates.ts (magicLink function)

2. 🔐 Authentication Settings:
   - Enable email confirmations
   - Set redirect URLs:
     * Site URL: ${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}
     * Redirect URLs: ${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/auth/callback
   - Enable magic link authentication
   - Set password reset redirect URL: ${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/auth/reset-password

3. 🗄️ Database Setup:
   - Run the migration: supabase/migrations/001_initial_schema.sql
   - This will create all necessary tables and security policies

4. 🛡️ Security Policies:
   - Row Level Security (RLS) is enabled on all tables
   - Users can only access their own data
   - Proper foreign key relationships are established

5. 📁 Storage Setup:
   - A 'uploads' bucket is created for file uploads
   - Users can only access their own files

6. 🔄 Real-time Features:
   - Real-time subscriptions are configured
   - Activity feed updates in real-time

📋 Next Steps:
1. Run the database migration
2. Configure email templates in Supabase Dashboard
3. Test the authentication flow
4. Set up your email provider (Resend recommended)

🎉 Your Supabase setup is ready for QuoteFast Dashboard!
`;

console.log(configInstructions);

// Create a setup checklist
const checklist = `
✅ Supabase Setup Checklist
==========================

□ 1. Database migration applied (001_initial_schema.sql)
□ 2. Email templates configured in Supabase Dashboard
□ 3. Authentication settings configured
□ 4. Redirect URLs set correctly
□ 5. Email provider configured (Resend recommended)
□ 6. Storage bucket created
□ 7. Security policies active
□ 8. Test authentication flow
□ 9. Test email sending
□ 10. Test password reset flow

🔗 Useful Links:
- Supabase Dashboard: ${supabaseUrl.replace('/rest/v1', '')}
- Documentation: https://supabase.com/docs
- Email Templates: lib/email-templates.ts
- Auth Service: lib/auth-service-enhanced.ts
`;

console.log(checklist);

// Create a test script
const testScript = `
🧪 Testing Your Setup
====================

1. Test User Registration:
   - Go to /register
   - Create a new account
   - Check email for confirmation

2. Test Login:
   - Go to /login
   - Try password login
   - Try magic link login

3. Test Password Reset:
   - Go to /login
   - Click "Wachtwoord vergeten?"
   - Check email for reset link

4. Test Email Templates:
   - All emails should have beautiful HTML design
   - Check spam folder if emails don't arrive
   - Verify email links work correctly

5. Test Database:
   - Check if user profile is created
   - Verify RLS policies work
   - Test CRUD operations

🐛 Troubleshooting:
- Check browser console for errors
- Check Supabase logs in dashboard
- Verify environment variables
- Test with different browsers
`;

console.log(testScript);

// Create environment validation
console.log('\n🔍 Environment Validation:');
console.log(`✅ Supabase URL: ${supabaseUrl ? 'Set' : 'Missing'}`);
console.log(`✅ Supabase Anon Key: ${supabaseKey ? 'Set' : 'Missing'}`);
console.log(`✅ Service Role Key: ${serviceRoleKey ? 'Set' : 'Missing'}`);
console.log(`✅ App URL: ${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}`);

console.log('\n🎉 Setup complete! Follow the instructions above to configure Supabase.');
console.log('📚 For more help, check the documentation in the docs/ folder.');
