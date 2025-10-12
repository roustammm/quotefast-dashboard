# 🚀 Netlify Deployment Guide - QuoteFast Dashboard

## 📋 Wat je nodig hebt voor Netlify deployment

### ✅ **Voorbereiding**
- [x] GitHub repository met je code
- [x] Netlify account (gratis)
- [x] Supabase project geconfigureerd
- [x] API keys verzameld

### ✅ **Configuratiebestanden**
- [x] `netlify.toml` - Netlify build configuratie
- [x] `next.config.js` - Aangepast voor static export
- [x] Environment variables lijst

## 🚀 Stap-voor-stap Netlify Deployment

### Stap 1: GitHub Repository
```bash
# Zorg dat je code op GitHub staat
git add .
git commit -m "Add Netlify configuration"
git push origin main
```

### Stap 2: Netlify Account & Project
1. Ga naar [netlify.com](https://netlify.com)
2. Klik "Sign up" en maak een account aan
3. Klik "New site from Git"
4. Kies "GitHub" als provider
5. Selecteer je repository: `quotefast-dashboard`
6. Klik "Deploy site"

### Stap 3: Build Settings
Netlify detecteert automatisch de instellingen uit `netlify.toml`:
- **Build command**: `npm run build`
- **Publish directory**: `out`
- **Node version**: 18

### Stap 4: Environment Variables
In Netlify Dashboard → Site Settings → Environment Variables, voeg toe:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://qgyboabomydquodygomq.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFneWJvYWJvbXlkcXVvZHlnb21xIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTUyNjQ5NTAsImV4cCI6MjA3MDg0MDk1MH0.K53Ufks0Jw8h8ky-iKkl6eaqCRiZZFvkBPvOgttyzDQ
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFneWJvYWJvbXlkcXVvZHlnb21xIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NTI2NDk1MCwiZXhwIjoyMDcwODQwOTUwfQ.sSUH2MIL7vVukSwuV4CVxlcGU_u4V8nNpkR3WvSokw4

# Stripe Configuration (optioneel)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret

# OpenAI Configuration (optioneel)
OPENAI_API_KEY=sk-your_openai_api_key

# Email Configuration (optioneel)
RESEND_API_KEY=re_your_resend_api_key

# Application URL
NEXT_PUBLIC_APP_URL=https://your-site-name.netlify.app
```

### Stap 5: Deploy
1. Klik "Deploy site" in Netlify
2. Wacht 2-5 minuten voor de build
3. Je site is live op: `https://your-site-name.netlify.app`

## 🔧 Belangrijke Aanpassingen voor Netlify

### ⚠️ **API Routes Limitaties**
Netlify static hosting ondersteunt geen server-side API routes. Je hebt twee opties:

**Optie A: Netlify Functions (Aanbevolen)**
```bash
# Maak functions directory
mkdir netlify/functions

# Verplaats API routes naar functions
# Bijvoorbeeld: netlify/functions/auth.js
```

**Optie B: Externe API**
- Gebruik Supabase Edge Functions
- Of een aparte API service (Vercel, Railway, etc.)

### 🔄 **Redirects & Routing**
De `netlify.toml` bevat al de juiste redirects voor Next.js routing.

### 🖼️ **Image Optimization**
Images zijn geconfigureerd als `unoptimized: true` voor static export.

## 🎯 **Je Live Dashboard**
Na succesvolle deployment krijg je een URL zoals:
`https://quotefast-dashboard-123456.netlify.app`

## 🔍 **Troubleshooting**

### Build Fails
```bash
# Test lokaal
npm run build
npm run export
```

### Environment Variables
- Controleer of alle variabelen correct zijn ingesteld
- Herstart de deployment na wijzigingen

### Routing Issues
- Controleer of `netlify.toml` redirects correct zijn
- Test alle pagina's handmatig

## 📊 **Performance Tips**

### 1. **CDN & Caching**
Netlify gebruikt automatisch een CDN. De `netlify.toml` bevat cache headers.

### 2. **Image Optimization**
```javascript
// Gebruik Next.js Image component
import Image from 'next/image'

<Image
  src="/your-image.jpg"
  alt="Description"
  width={500}
  height={300}
  unoptimized={true} // Voor static export
/>
```

### 3. **Bundle Size**
```bash
# Analyseer bundle size
npm run analyze
```

## 🔒 **Security**

### Environment Variables
- Nooit API keys in code committen
- Gebruik Netlify's environment variables
- Rotate keys regelmatig

### Headers
De `netlify.toml` bevat security headers:
- X-Frame-Options
- X-XSS-Protection
- X-Content-Type-Options

## 🚀 **Custom Domain (Optioneel)**

### Stap 1: Domain Kopen
- Koop een domain bij een provider (Namecheap, GoDaddy, etc.)

### Stap 2: DNS Configuratie
```dns
# Voeg CNAME record toe
CNAME www your-site-name.netlify.app
CNAME @ your-site-name.netlify.app
```

### Stap 3: Netlify Domain Setup
1. Ga naar Site Settings → Domain Management
2. Voeg je custom domain toe
3. Configureer SSL (automatisch)

## 📈 **Monitoring & Analytics**

### Netlify Analytics
- Ingebouwd in Netlify Pro plan
- Of gebruik Google Analytics

### Error Tracking
```javascript
// Voeg Sentry toe voor error tracking
import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.SENTRY_DSN,
});
```

## 🎉 **Je Dashboard is Live!**

Na deze stappen heb je:
- ✅ Een live dashboard op Netlify
- ✅ Automatische deployments bij code changes
- ✅ CDN en caching geconfigureerd
- ✅ Security headers ingesteld
- ✅ Custom domain mogelijk (optioneel)

## 📞 **Support**

Als je problemen hebt:
1. Check Netlify build logs
2. Test lokaal met `npm run build`
3. Controleer environment variables
4. Bekijk Netlify documentation

**🎯 Je QuoteFast Dashboard is nu live op Netlify!**
