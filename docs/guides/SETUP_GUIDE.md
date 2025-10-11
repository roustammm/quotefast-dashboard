# 🚀 Setup Guide - QuoteFast Dashboard

## 📋 **Environment Variables Setup**

### **1. Create .env.local File**
Maak een `.env.local` bestand in je project root met deze inhoud:

```env
# =============================================================================
# SUPABASE CONFIGURATION (Required)
# =============================================================================
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# =============================================================================
# OPENAI API (Required for AI features)
# =============================================================================
OPENAI_API_KEY=your_openai_api_key

# =============================================================================
# STRIPE PAYMENTS (Required for billing)
# =============================================================================
STRIPE_SECRET_KEY=your_stripe_secret_key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key

# =============================================================================
# ENCRYPTION (Required for sensitive data)
# =============================================================================
ENCRYPTION_KEY=your_32_character_encryption_key

# =============================================================================
# EMAIL PROVIDERS (Optional)
# =============================================================================
GMAIL_CLIENT_ID=your_gmail_client_id
GMAIL_CLIENT_SECRET=your_gmail_client_secret
OUTLOOK_CLIENT_ID=your_outlook_client_id
OUTLOOK_CLIENT_SECRET=your_outlook_client_secret

# =============================================================================
# WHATSAPP BUSINESS API (Optional)
# =============================================================================
WHATSAPP_ACCESS_TOKEN=your_whatsapp_token
WHATSAPP_PHONE_NUMBER_ID=your_phone_number_id
WHATSAPP_WEBHOOK_VERIFY_TOKEN=your_webhook_token
```

### **2. Get Your API Keys**

#### **Supabase Setup:**
1. Ga naar [supabase.com](https://supabase.com)
2. Maak een nieuw project aan
3. Ga naar Settings > API
4. Kopieer de URL en anon key
5. Kopieer de service role key (geheim!)

#### **OpenAI Setup:**
1. Ga naar [platform.openai.com](https://platform.openai.com)
2. Maak een API key aan
3. Kopieer de key (begint met `sk-`)

#### **Stripe Setup:**
1. Ga naar [dashboard.stripe.com](https://dashboard.stripe.com)
2. Ga naar Developers > API keys
3. Kopieer de secret key en publishable key

#### **Encryption Key:**
Genereer een 32-karakter willekeurige string:
```bash
# In terminal:
openssl rand -hex 16
```

### **3. Database Setup**

#### **Run Database Migration:**
```bash
# Maak Supabase storage bucket
node create_bucket.js

# Check database tables
node check_tables.js
```

## 🚀 **Deployment Steps**

### **Option 1: Vercel (Recommended)**

#### **1. GitHub Repository:**
```bash
# Push naar GitHub
git remote add origin https://github.com/JOUW_USERNAME/quotefast-dashboard.git
git push -u origin main
```

#### **2. Vercel Deployment:**
1. Ga naar [vercel.com](https://vercel.com)
2. Sign in met GitHub
3. Import je repository
4. Add environment variables in Vercel dashboard
5. Deploy!

#### **3. Environment Variables in Vercel:**
Voeg deze toe in Vercel dashboard:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `OPENAI_API_KEY`
- `STRIPE_SECRET_KEY`
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
- `ENCRYPTION_KEY`

### **Option 2: Netlify**

#### **1. Build Settings:**
```toml
[build]
  command = "npm run build"
  publish = ".next"

[build.environment]
  NODE_VERSION = "18"
```

#### **2. Environment Variables:**
Add in Netlify dashboard onder Site Settings > Environment Variables

### **Option 3: Railway**

#### **1. Railway Setup:**
```bash
# Install Railway CLI
npm install -g @railway/cli

# Login and deploy
railway login
railway init
railway up
```

## 🔧 **Post-Deployment Setup**

### **1. Database Verification:**
```bash
# Test database connection
curl https://your-app.vercel.app/api/offers
```

### **2. Storage Setup:**
- Verify Supabase storage bucket is accessible
- Test file upload functionality

### **3. Email Configuration:**
- Configure SMTP settings in dashboard
- Test email sending functionality

### **4. WhatsApp Setup:**
- Configure WhatsApp Business API
- Test message sending

## 📊 **Monitoring & Analytics**

### **1. Vercel Analytics:**
- Enable in Vercel dashboard
- Monitor performance metrics

### **2. Error Tracking:**
- Consider Sentry integration
- Monitor API errors

### **3. Database Monitoring:**
- Use Supabase dashboard
- Monitor query performance

## 🔒 **Security Checklist**

### **✅ Environment Security:**
- [ ] All secrets in environment variables
- [ ] No hardcoded API keys
- [ ] Encryption key properly generated

### **✅ Database Security:**
- [ ] RLS policies enabled
- [ ] Service role key secured
- [ ] Database backups configured

### **✅ API Security:**
- [ ] Rate limiting implemented
- [ ] Input validation enabled
- [ ] CORS properly configured

## 🚨 **Troubleshooting**

### **Common Issues:**

#### **Build Failures:**
```bash
# Clear cache and rebuild
rm -rf .next node_modules
npm install
npm run build
```

#### **Database Connection Issues:**
- Verify Supabase URL and keys
- Check RLS policies
- Test connection in Supabase dashboard

#### **Environment Variable Issues:**
- Verify all required vars are set
- Check variable names match exactly
- Restart deployment after changes

### **Support Resources:**
- [Next.js Deployment Docs](https://nextjs.org/docs/deployment)
- [Vercel Documentation](https://vercel.com/docs)
- [Supabase Documentation](https://supabase.com/docs)

## 🎯 **Go Live Checklist**

### **Final Steps:**
- [ ] Domain configured
- [ ] SSL certificate active
- [ ] All features tested in production
- [ ] Backup strategy in place
- [ ] Monitoring configured
- [ ] Error tracking enabled

### **Launch:**
1. **Soft Launch**: Test with limited users
2. **Monitor**: Watch for errors and performance
3. **Full Launch**: Open to all users
4. **Post-Launch**: Monitor and optimize

---

**🎉 Your QuoteFast Dashboard is ready for production!**

For support, check the GitHub Issues or contact the development team.
