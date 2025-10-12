# 🚀 QuoteFast Dashboard - Environment Setup Guide

## 📋 Overzicht

Deze gids helpt je bij het opzetten van alle benodigde environment variabelen en CLI tools voor de QuoteFast Dashboard.

## 🔑 JWT Token Analyse

Je hebt een Supabase Service Role JWT token gedeeld:
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFneWJvYWJvbXlkcXVvZHlnb21xIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NTI2NDk1MCwiZXhwIjoyMDcwODQwOTUwfQ.sSUH2MIL7vVukSwuV4CVxlcGU_u4V8nNpkR3WvSokw4
```

**Decoded informatie:**
- **Project ID:** `qgyboabomydquodygomq`
- **Role:** `service_role`
- **Issuer:** `supabase`
- **Expires:** 2070-08-04 (zeer lang geldig)

## 🚀 Snelle Setup

### 1. Environment Variables Setup

Run het setup script:
```bash
./setup-env.sh
```

Dit maakt een `.env.local` bestand aan met alle benodigde variabelen.

### 2. Supabase CLI Setup

Run het CLI setup script:
```bash
./setup-supabase-cli.sh
```

## 📝 Environment Variables Uitleg

### ✅ Al Geconfigureerd (Supabase)
```bash
NEXT_PUBLIC_SUPABASE_URL=https://qgyboabomydquodygomq.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFneWJvYWJvbXlkcXVvZHlnb21xIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTUyNjQ5NTAsImV4cCI6MjA3MDg0MDk1MH0.Ej8Ej8Ej8Ej8Ej8Ej8Ej8Ej8Ej8Ej8Ej8Ej8Ej8Ej8
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFneWJvYWJvbXlkcXVvZHlnb21xIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NTI2NDk1MCwiZXhwIjoyMDcwODQwOTUwfQ.sSUH2MIL7vVukSwuV4CVxlcGU_u4V8nNpkR3WvSokw4
```

### 🔧 Te Configureren (Optioneel)

#### Stripe (voor betalingen)
```bash
STRIPE_SECRET_KEY=sk_test_...          # Van Stripe Dashboard
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...  # Van Stripe Dashboard
STRIPE_WEBHOOK_SECRET=whsec_...        # Van Stripe Webhooks
```

**Hoe te verkrijgen:**
1. Ga naar [Stripe Dashboard](https://dashboard.stripe.com)
2. Ga naar Developers > API Keys
3. Kopieer de test keys

#### OpenAI (voor AI features)
```bash
OPENAI_API_KEY=sk-proj_...             # Van OpenAI Platform
```

**Hoe te verkrijgen:**
1. Ga naar [OpenAI Platform](https://platform.openai.com)
2. Ga naar API Keys
3. Maak een nieuwe API key aan

#### Resend (voor emails)
```bash
RESEND_API_KEY=re_...                  # Van Resend Dashboard
```

**Hoe te verkrijgen:**
1. Ga naar [Resend Dashboard](https://resend.com)
2. Ga naar API Keys
3. Maak een nieuwe API key aan

#### Inngest (voor background jobs)
```bash
INNGEST_EVENT_KEY=...                  # Van Inngest Dashboard
INNGEST_SIGNING_KEY=...                # Van Inngest Dashboard
```

**Hoe te verkrijgen:**
1. Ga naar [Inngest Dashboard](https://app.inngest.com)
2. Ga naar Settings > Keys
3. Kopieer de keys

#### Vercel (voor deployment)
```bash
VERCEL_BEARER_TOKEN=...                # Van Vercel Dashboard
```

**Hoe te verkrijgen:**
1. Ga naar [Vercel Dashboard](https://vercel.com)
2. Ga naar Settings > Tokens
3. Maak een nieuwe token aan

## 🛠️ Supabase CLI Commands

### Basis Commands
```bash
# Login to Supabase
supabase login

# List je projecten
supabase projects list

# Link naar je project
supabase link --project-ref qgyboabomydquodygomq

# Pull database schema
supabase db pull

# Generate TypeScript types
supabase gen types typescript --local > types/supabase.ts

# Start local development
supabase start

# Stop local development
supabase stop
```

### Database Management
```bash
# Reset database
supabase db reset

# Run migrations
supabase db push

# Create new migration
supabase migration new migration_name

# View database
supabase db diff
```

### Type Generation
```bash
# Generate types for local development
supabase gen types typescript --local > types/supabase.ts

# Generate types for production
supabase gen types typescript --project-id qgyboabomydquodygomq > types/supabase.ts
```

## 🚀 Development Workflow

### 1. Start Development
```bash
# Install dependencies
npm install

# Start Supabase local development
supabase start

# Start Next.js development server
npm run dev
```

### 2. Database Changes
```bash
# Make changes in Supabase Studio (http://localhost:54323)
# Or create migration files

# Push changes to remote
supabase db push

# Generate new types
supabase gen types typescript --local > types/supabase.ts
```

### 3. Testing
```bash
# Run tests
npm test

# Run tests with coverage
npm run test:coverage

# Run specific test
npm test -- __tests__/lib/auth-service.test.ts
```

## 🔐 Security Best Practices

### Environment Variables
- ✅ Gebruik `.env.local` voor lokale development
- ✅ Voeg `.env.local` toe aan `.gitignore`
- ✅ Gebruik verschillende keys voor development/production
- ✅ Rotate keys regelmatig

### Supabase Security
- ✅ Gebruik Row Level Security (RLS) policies
- ✅ Gebruik service role key alleen server-side
- ✅ Gebruik anon key voor client-side
- ✅ Configureer proper CORS settings

## 🐛 Troubleshooting

### Veelvoorkomende Problemen

#### Supabase Connection Issues
```bash
# Check connection
supabase projects list

# Re-link project
supabase link --project-ref qgyboabomydquodygomq
```

#### Environment Variables Not Loading
```bash
# Check if .env.local exists
ls -la .env.local

# Check if variables are loaded
node -e "console.log(process.env.NEXT_PUBLIC_SUPABASE_URL)"
```

#### Database Connection Issues
```bash
# Check Supabase status
supabase status

# Restart Supabase
supabase stop && supabase start
```

### Debug Tips
1. **Check browser console** voor client-side errors
2. **Check terminal** voor server-side errors
3. **Check Supabase logs** in dashboard
4. **Verify environment variables** zijn geladen

## 📚 Aanvullende Resources

### Documentatie
- [Supabase CLI Docs](https://supabase.com/docs/guides/cli)
- [Next.js Environment Variables](https://nextjs.org/docs/basic-features/environment-variables)
- [Stripe API Docs](https://stripe.com/docs/api)
- [OpenAI API Docs](https://platform.openai.com/docs)

### Project Files
- `supabase/config.toml` - Supabase configuratie
- `supabase/migrations/` - Database migraties
- `types/supabase.ts` - TypeScript types
- `.env.local` - Environment variabelen

## 🎯 Volgende Stappen

Na het voltooien van deze setup:

1. **Test de applicatie:**
   ```bash
   npm run dev
   ```

2. **Configureer email templates** in Supabase Dashboard

3. **Setup database policies** voor security

4. **Test alle functionaliteit** (auth, database, etc.)

5. **Configureer productie environment**

---

**🎉 Je environment is nu klaar voor development!**
