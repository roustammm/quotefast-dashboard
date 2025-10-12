#!/bin/bash

# Safe Environment Setup Script
echo "🔒 Setting up environment files safely..."

# Create .env.example (safe to commit)
cat > .env.example << 'EOF'
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://qgyboabomydquodygomq.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key_here

# Stripe Configuration (Test Mode)
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key_here
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key_here
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here

# OpenAI Configuration
OPENAI_API_KEY=sk-proj_your_openai_api_key_here

# Application Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
NODE_ENV=development

# Email Configuration (Resend)
RESEND_API_KEY=re_your_resend_api_key_here

# Optional: Error Tracking
# SENTRY_DSN=your_sentry_dsn_here
# SENTRY_AUTH_TOKEN=your_sentry_auth_token_here

# Inngest Configuration
INNGEST_EVENT_KEY=your_inngest_event_key_here
INNGEST_SIGNING_KEY=your_inngest_signing_key_here

# Vercel Configuration
VERCEL_BEARER_TOKEN=your_vercel_bearer_token_here

# Supabase CLI Configuration (for local development)
SUPABASE_ACCESS_TOKEN=your_supabase_access_token_here
SUPABASE_DB_PASSWORD=your_database_password_here
EOF

echo "✅ .env.example created (safe to commit to Git)"

# Check if .env.local exists
if [ -f ".env.local" ]; then
    echo "✅ .env.local already exists"
else
    echo "📝 Creating .env.local from template..."
    cp .env.example .env.local
    echo "✅ .env.local created (DO NOT commit to Git)"
fi

echo ""
echo "🔐 Security Reminders:"
echo "- .env.local contains your actual API keys"
echo "- .env.example is safe to commit (contains placeholders)"
echo "- Never commit .env.local to version control"
echo "- Share .env.example with team members"
echo ""
echo "📝 Next steps:"
echo "1. Update .env.local with your actual API keys"
echo "2. Commit .env.example to Git for team sharing"
echo "3. Keep .env.local in .gitignore for security"
