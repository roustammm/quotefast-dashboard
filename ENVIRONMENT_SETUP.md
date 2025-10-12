# 🔧 Environment Setup - Oplossing voor "supabaseKey is required"

## Probleem
De fout `supabaseKey is required` betekent dat je Supabase environment variabelen ontbreken.

## ⚡ Snelle Oplossing

### Stap 1: Maak .env.local bestand
Maak een nieuw bestand `.env.local` in de root van je project:

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://qgyboabomydquodygomq.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=jouw_anon_key_hier
SUPABASE_SERVICE_ROLE_KEY=jouw_service_role_key_hier

# Application Configuration  
NEXT_PUBLIC_APP_URL=http://localhost:3002
NODE_ENV=development
```

### Stap 2: Haal je Supabase Keys op
1. Ga naar: https://supabase.com/dashboard
2. Selecteer je project: `qgyboabomydquodygomq`
3. Ga naar **Settings** → **API**
4. Kopieer de keys:
   - **anon public key** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **service_role key** → `SUPABASE_SERVICE_ROLE_KEY`

### Stap 3: Start opnieuw
```bash
npm run dev
```

## 🤖 Automatische Setup

Run dit script om automatisch te helpen:
```bash
node setup_environment.js
```

## 🔍 Verificatie

Na het instellen, test de connectie:
```bash
node test_registration.js
```

## ⚠️ Belangrijke Opmerkingen

1. **Bestandslocatie**: `.env.local` moet in de root staan (naast package.json)
2. **Herstart**: Altijd development server herstarten na env wijzigingen
3. **Gitignore**: .env.local wordt automatisch genegeerd door git
4. **Keys**: Gebruik NOOIT service_role key in client-side code

## 🔧 Alternatieve Oplossing

Als je geen toegang hebt tot de Supabase keys, kan je tijdelijk deze demo keys gebruiken:

```bash
# Demo keys (alleen voor development)
NEXT_PUBLIC_SUPABASE_URL=https://qgyboabomydquodygomq.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFneWJvYWJvbXlkcXVvZHlnb21xIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQxNzk4MjIsImV4cCI6MjA0OTc1NTgyMn0.9y6KhqCF_TnLEGqoWYVF-5_PGFKhPEzCXtjFRqQbFqc
```

⚠️ **Let op**: Dit is een voorbeeld key die mogelijk niet werkt. Je hebt de echte keys nodig.

## 🎯 Resultaat

Na correcte setup:
- ✅ Geen "supabaseKey is required" errors
- ✅ Login/registratie werkt
- ✅ Database connectie actief
- ✅ App start zonder crashes

## 🆘 Hulp Nodig?

Als je nog steeds problemen hebt:
1. Check of `.env.local` in de juiste map staat
2. Controleer of de keys correct zijn gekopieerd
3. Herstart je development server
4. Run `node setup_environment.js` voor diagnostics
