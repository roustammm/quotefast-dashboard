#!/bin/bash

# Complete Supabase Setup Script
# This script helps you set up Supabase with new API keys

echo "🚀 Starting Complete Supabase Setup..."

# Check if .env.local exists
if [ ! -f ".env.local" ]; then
    echo "📝 Creating .env.local file..."
    cat > .env.local << 'EOF'
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://qgyboabomydquodygomq.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=REPLACE_WITH_NEW_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY=REPLACE_WITH_NEW_SERVICE_ROLE_KEY

# Application Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
NODE_ENV=development

# Optional: Stripe Configuration
# STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
# NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key
# STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret

# Optional: OpenAI Configuration
# OPENAI_API_KEY=sk-your_openai_api_key

# Optional: Email Configuration
# RESEND_API_KEY=re_your_resend_api_key

# Optional: Inngest Configuration
# INNGEST_EVENT_KEY=your_inngest_event_key
# INNGEST_SIGNING_KEY=your_inngest_signing_key

# Optional: Vercel Configuration
# VERCEL_BEARER_TOKEN=your_vercel_bearer_token
EOF
    echo "✅ .env.local file created!"
else
    echo "📁 .env.local file already exists"
fi

echo ""
echo "🔑 NEXT STEPS:"
echo "1. Go to: https://supabase.com/dashboard/project/qgyboabomydquodygomq/settings/api"
echo "2. Copy the NEW 'anon public' key"
echo "3. Copy the NEW 'service_role' key"
echo "4. Replace 'REPLACE_WITH_NEW_ANON_KEY' in .env.local with the anon key"
echo "5. Replace 'REPLACE_WITH_NEW_SERVICE_ROLE_KEY' in .env.local with the service role key"
echo ""
echo "📋 Current .env.local content:"
echo "----------------------------------------"
cat .env.local
echo "----------------------------------------"
echo ""
echo "🔄 After updating the keys, restart the development server:"
echo "   npm run dev"
echo ""
echo "✅ Setup complete! Follow the steps above to get new API keys."
