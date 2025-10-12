# ✅ Netlify Deployment Checklist

## 🎯 **Wat er nog nodig is voor Netlify deployment:**

### 1. **GitHub Repository Setup**
- [ ] Code committen en pushen naar GitHub
- [ ] Repository publiek maken (of Netlify account koppelen)

### 2. **Netlify Account & Project**
- [ ] Netlify account aanmaken op [netlify.com](https://netlify.com)
- [ ] "New site from Git" selecteren
- [ ] GitHub repository koppelen
- [ ] Build settings controleren (automatisch via `netlify.toml`)

### 3. **Environment Variables Instellen**
In Netlify Dashboard → Site Settings → Environment Variables:

```env
# Verplicht
NEXT_PUBLIC_SUPABASE_URL=https://qgyboabomydquodygomq.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFneWJvYWJvbXlkcXVvZHlnb21xIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTUyNjQ5NTAsImV4cCI6MjA3MDg0MDk1MH0.K53Ufks0Jw8h8ky-iKkl6eaqCRiZZFvkBPvOgttyzDQ
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFneWJvYWJvbXlkcXVvZHlnb21xIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NTI2NDk1MCwiZXhwIjoyMDcwODQwOTUwfQ.sSUH2MIL7vVukSwuV4CVxlcGU_u4V8nNpkR3WvSokw4
NEXT_PUBLIC_APP_URL=https://your-site-name.netlify.app

# Optioneel (voor volledige functionaliteit)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret
OPENAI_API_KEY=sk-your_openai_api_key
RESEND_API_KEY=re_your_resend_api_key
```

### 4. **API Routes Aanpassen (Belangrijk!)**
⚠️ **Netlify static hosting ondersteunt geen server-side API routes**

**Opties:**
- [ ] **Optie A**: Verplaats API routes naar Netlify Functions
- [ ] **Optie B**: Gebruik Supabase Edge Functions
- [ ] **Optie C**: Gebruik externe API service

### 5. **Test & Deploy**
- [ ] Lokaal testen: `npm run build`
- [ ] Netlify deployment starten
- [ ] Build logs controleren
- [ ] Site testen op live URL

## 🚀 **Snelle Start (5 minuten):**

1. **Push naar GitHub:**
```bash
git add .
git commit -m "Add Netlify configuration"
git push origin main
```

2. **Netlify Setup:**
   - Ga naar netlify.com
   - "New site from Git"
   - Selecteer je repository
   - Klik "Deploy site"

3. **Environment Variables:**
   - Site Settings → Environment Variables
   - Voeg Supabase keys toe
   - Update `NEXT_PUBLIC_APP_URL` met je Netlify URL

4. **Deploy:**
   - Netlify bouwt automatisch
   - Je site is live in 2-5 minuten

## ⚠️ **Belangrijke Opmerkingen:**

### **API Routes Probleem**
Je huidige API routes (`/app/api/*`) werken niet op Netlify static hosting. Je hebt deze opties:

1. **Netlify Functions** (Aanbevolen)
2. **Supabase Edge Functions**
3. **Externe API service**

### **Static Export**
De app is nu geconfigureerd voor static export. Dit betekent:
- ✅ Snelle loading
- ✅ CDN caching
- ❌ Geen server-side rendering
- ❌ Geen API routes

## 🎯 **Resultaat:**
Na deze stappen heb je een live dashboard op:
`https://your-site-name.netlify.app`

## 📞 **Hulp nodig?**
- Check de `NETLIFY_DEPLOYMENT_GUIDE.md` voor details
- Test lokaal met `npm run build`
- Controleer Netlify build logs bij problemen
