# 🚀 Netlify Functions Setup Guide

## ✅ **Wat ik heb gedaan:**

Ik heb al je API routes geconverteerd naar Netlify Functions:

### 📁 **Nieuwe Netlify Functions:**
- `netlify/functions/auth-reset-password.js` - Password reset
- `netlify/functions/customers.js` - Customer management
- `netlify/functions/invoices.js` - Invoice management  
- `netlify/functions/create-checkout-session.js` - Stripe payments
- `netlify/functions/stripe-webhook.js` - Stripe webhooks

### 🔧 **Configuratie Updates:**
- `netlify.toml` - API redirects naar functions
- `netlify/functions/package.json` - Dependencies voor functions

## 🚀 **Stappen om te deployen:**

### Stap 1: Code pushen
```bash
git add .
git commit -m "Add Netlify Functions for API routes"
git push origin main
```

### Stap 2: Netlify Environment Variables
In Netlify Dashboard → Site Settings → Environment Variables, voeg toe:

```env
# Supabase (Verplicht)
NEXT_PUBLIC_SUPABASE_URL=https://qgyboabomydquodygomq.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFneWJvYWJvbXlkcXVvZHlnb21xIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTUyNjQ5NTAsImV4cCI6MjA3MDg0MDk1MH0.K53Ufks0Jw8h8ky-iKkl6eaqCRiZZFvkBPvOgttyzDQ
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFneWJvYWJvbXlkcXVvZHlnb21xIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NTI2NDk1MCwiZXhwIjoyMDcwODQwOTUwfQ.sSUH2MIL7vVukSwuV4CVxlcGU_u4V8nNpkR3WvSokw4

# Stripe (Optioneel)
STRIPE_ENABLED=true
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret

# App URL
NEXT_PUBLIC_APP_URL=https://your-site-name.netlify.app
```

### Stap 3: Deploy
1. Netlify detecteert automatisch de functions
2. Bouwt en deployt alles
3. Je API routes werken nu via functions

## 🎯 **Hoe het werkt:**

### **Voor de conversie:**
```
/api/customers → Next.js API route (werkte niet op static hosting)
```

### **Na de conversie:**
```
/api/customers → Netlify Function → Supabase
```

### **Redirect Flow:**
1. Client maakt request naar `/api/customers`
2. Netlify redirect naar `/.netlify/functions/customers`
3. Function verwerkt request en communiceert met Supabase
4. Response terug naar client

## 🔍 **Testing je Functions:**

### Lokaal testen:
```bash
# Installeer Netlify CLI
npm install -g netlify-cli

# Test functions lokaal
netlify dev
```

### Live testing:
```bash
# Test je API endpoints
curl https://your-site.netlify.app/api/customers
curl -X POST https://your-site.netlify.app/api/customers \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@example.com"}'
```

## 🚨 **Belangrijke Opmerkingen:**

### **CORS Headers**
Alle functions hebben CORS headers voor cross-origin requests.

### **Error Handling**
Functions hebben proper error handling en logging.

### **Environment Variables**
Functions gebruiken dezelfde env vars als je app.

### **Stripe Webhooks**
Webhook endpoint is nu: `https://your-site.netlify.app/api/webhooks/stripe`

## 🔧 **Troubleshooting:**

### **Function niet werkt:**
1. Check Netlify function logs
2. Verify environment variables
3. Test lokaal met `netlify dev`

### **CORS errors:**
- Functions hebben CORS headers
- Check browser network tab

### **Database errors:**
- Verify Supabase credentials
- Check RLS policies

## 📊 **Function URLs:**

Na deployment zijn je API endpoints beschikbaar op:
- `https://your-site.netlify.app/api/customers`
- `https://your-site.netlify.app/api/invoices`
- `https://your-site.netlify.app/api/auth/reset-password`
- `https://your-site.netlify.app/api/create-checkout-session`
- `https://your-site.netlify.app/api/webhooks/stripe`

## 🎉 **Resultaat:**

Je hebt nu:
- ✅ Werkende API routes op Netlify
- ✅ Server-side functionaliteit
- ✅ Database integratie
- ✅ Payment processing
- ✅ Webhook handling
- ✅ Proper error handling

**🎯 Je dashboard is nu volledig functioneel op Netlify!**
