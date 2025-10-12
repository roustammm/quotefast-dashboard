# 🚀 Supabase Setup Guide voor QuoteFast Dashboard

Deze gids helpt je bij het configureren van Supabase met mooie email templates en alle nodige instellingen voor een professionele gebruikerservaring.

## 📋 Overzicht

Dit project gebruikt Supabase voor:
- 🔐 **Authenticatie** - Gebruikersregistratie, inloggen, wachtwoord reset
- 📧 **Email Templates** - Mooie HTML emails voor alle auth acties
- 🗄️ **Database** - Gebruikersprofielen, facturen, klanten, projecten
- 🛡️ **Security** - Row Level Security (RLS) policies
- 📁 **Storage** - Bestand uploads
- 🔄 **Real-time** - Live updates

## 🚀 Snelle Start

### 1. Environment Setup

Maak een `.env.local` bestand aan:

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Application Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Email Configuration (Optioneel - voor custom email service)
RESEND_API_KEY=re_your_resend_api_key
```

### 2. Database Setup

Voer de database migratie uit:

```sql
-- Voer dit uit in je Supabase SQL Editor
-- Bestand: supabase/migrations/001_initial_schema.sql
```

### 3. Run Setup Script

```bash
node scripts/setup-supabase.js
```

## 📧 Email Templates Configuratie

### Supabase Dashboard Setup

1. Ga naar je **Supabase Dashboard**
2. Navigeer naar **Authentication > Email Templates**
3. Vervang de standaard templates met onze mooie HTML templates:

#### ✅ Confirm Signup Template

**Subject:** `Welkom bij QuoteFast Dashboard! Bevestig je account`

**HTML Body:**
```html
<!-- Gebruik de HTML uit lib/email-templates.ts - welcome functie -->
<!-- Kopieer de volledige HTML template -->
```

#### 🔐 Reset Password Template

**Subject:** `Wachtwoord Reset - QuoteFast Dashboard`

**HTML Body:**
```html
<!-- Gebruik de HTML uit lib/email-templates.ts - passwordReset functie -->
```

#### ✨ Magic Link Template

**Subject:** `Inloggen zonder Wachtwoord - QuoteFast Dashboard`

**HTML Body:**
```html
<!-- Gebruik de HTML uit lib/email-templates.ts - magicLink functie -->
```

### Email Template Features

Onze email templates bevatten:
- 🎨 **Mooie HTML design** met gradients en moderne styling
- 📱 **Responsive design** voor alle apparaten
- 🌍 **Nederlandse teksten** voor Nederlandse gebruikers
- 🔗 **Veilige links** met proper redirects
- ⏰ **Tijdslimieten** voor beveiliging
- 🛡️ **Beveiligingswaarschuwingen** waar nodig

## 🔐 Authentication Instellingen

### Supabase Dashboard Configuratie

1. **Authentication > Settings:**
   - ✅ Enable email confirmations
   - ✅ Enable magic link authentication
   - ✅ Set password reset redirect URL

2. **Site URL:**
   ```
   http://localhost:3000 (development)
   https://yourdomain.com (production)
   ```

3. **Redirect URLs:**
   ```
   http://localhost:3000/auth/callback
   https://yourdomain.com/auth/callback
   ```

4. **Password Reset Redirect:**
   ```
   http://localhost:3000/auth/reset-password
   https://yourdomain.com/auth/reset-password
   ```

## 🗄️ Database Schema

### Tabellen

- **`profiles`** - Gebruikersprofielen (extends auth.users)
- **`customers`** - Klantgegevens
- **`invoices`** - Facturen
- **`invoice_items`** - Factuurregels
- **`offers`** - Offertes
- **`offer_items`** - Offerteregels
- **`projects`** - Projecten
- **`activities`** - Activiteiten feed
- **`settings`** - Gebruikersinstellingen

### Security Features

- 🔒 **Row Level Security (RLS)** op alle tabellen
- 👤 **User isolation** - gebruikers zien alleen hun eigen data
- 🔑 **Proper foreign keys** voor data integriteit
- 📊 **Indexes** voor optimale performance
- 🔄 **Auto-updating timestamps** met triggers

## 🛡️ Security Policies

### RLS Policies

Alle tabellen hebben RLS policies die ervoor zorgen dat:
- Gebruikers alleen hun eigen data kunnen zien
- Gebruikers alleen hun eigen data kunnen wijzigen
- Gebruikers alleen hun eigen data kunnen verwijderen
- Proper toegangscontrole op gerelateerde data

### Storage Policies

- Gebruikers kunnen alleen hun eigen bestanden uploaden
- Bestanden zijn georganiseerd per gebruiker
- Proper toegangscontrole op bestanden

## 🔄 Real-time Features

### Live Updates

- **Activity Feed** - Real-time updates van gebruikersactiviteiten
- **Dashboard Metrics** - Live updates van statistieken
- **Notifications** - Real-time notificaties

### Configuration

```typescript
// Real-time settings in supabase-config.ts
realtime: {
  params: {
    eventsPerSecond: 10,
  },
}
```

## 📁 File Storage

### Storage Bucket

- **Bucket Name:** `uploads`
- **Public Access:** Ja (voor geüploade bestanden)
- **User Isolation:** Gebruikers kunnen alleen hun eigen bestanden zien

### File Organization

```
uploads/
├── {user_id}/
│   ├── avatars/
│   ├── documents/
│   └── invoices/
```

## 🧪 Testing

### Test Checklist

- [ ] Gebruikersregistratie werkt
- [ ] Email bevestiging werkt
- [ ] Inloggen met wachtwoord werkt
- [ ] Magic link inloggen werkt
- [ ] Wachtwoord reset werkt
- [ ] Email templates zien er mooi uit
- [ ] Database queries werken
- [ ] RLS policies werken correct
- [ ] File uploads werken
- [ ] Real-time updates werken

### Test Commands

```bash
# Start development server
npm run dev

# Test authentication flow
# 1. Ga naar /register
# 2. Maak een account aan
# 3. Controleer email
# 4. Bevestig account
# 5. Log in
# 6. Test wachtwoord reset
```

## 🐛 Troubleshooting

### Veelvoorkomende Problemen

#### Email Templates Niet Werken
- Controleer of HTML correct is gekopieerd
- Test met verschillende email providers
- Controleer spam folder

#### Authentication Errors
- Controleer redirect URLs
- Controleer environment variables
- Controleer Supabase logs

#### Database Errors
- Controleer of migratie is uitgevoerd
- Controleer RLS policies
- Controleer foreign key constraints

#### File Upload Errors
- Controleer storage bucket
- Controleer storage policies
- Controleer file permissions

### Debug Tips

1. **Browser Console** - Check voor JavaScript errors
2. **Supabase Logs** - Check dashboard logs
3. **Network Tab** - Check API calls
4. **Environment Variables** - Verify all are set

## 📚 Aanvullende Resources

### Documentatie
- [Supabase Docs](https://supabase.com/docs)
- [Next.js Auth](https://nextjs.org/docs/authentication)
- [React Context](https://reactjs.org/docs/context.html)

### Bestanden
- `lib/supabase-config.ts` - Supabase configuratie
- `lib/email-templates.ts` - Email templates
- `lib/auth-service-enhanced.ts` - Auth service
- `contexts/AuthContextEnhanced.tsx` - Auth context
- `supabase/migrations/001_initial_schema.sql` - Database schema

### Support
- 📧 Email: support@quotefast.nl
- 📖 Documentation: docs/ folder
- 🐛 Issues: GitHub issues

## 🎉 Volgende Stappen

Na het voltooien van deze setup:

1. **Test alle functionaliteit**
2. **Configureer productie environment**
3. **Setup monitoring en logging**
4. **Implementeer backup strategie**
5. **Setup CI/CD pipeline**

---

**🎯 Je Supabase setup is nu klaar voor een professionele gebruikerservaring!**
