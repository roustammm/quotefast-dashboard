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
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
NEXT_PUBLIC_APP_URL=https://your-site-name.netlify.app # Vervang dit met je Netlify URL

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
