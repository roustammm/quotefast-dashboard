# 🚨 URGENT: Fix API Keys Configuration

## ❌ Probleem geïdentificeerd:
Je gebruikt de **service_role** key als **anon** key in je .env.local bestand. Dit is verkeerd en veroorzaakt de "Legacy API keys are disabled" fout.

## ✅ Oplossing:

### Stap 1: Ga naar Supabase Dashboard
1. Open: https://supabase.com/dashboard/project/qgyboabomydquodygomq/settings/api
2. Scroll naar beneden naar **"Project API keys"**

### Stap 2: Kopieer de JUISTE keys
Je ziet twee verschillende keys:

1. **anon public** - Dit is voor client-side gebruik (NEXT_PUBLIC_SUPABASE_ANON_KEY)
2. **service_role** - Dit is voor server-side gebruik (SUPABASE_SERVICE_ROLE_KEY)

### Stap 3: Update je .env.local bestand
Vervang de huidige inhoud van .env.local met:

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://qgyboabomydquodygomq.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=PASTE_ANON_PUBLIC_KEY_HERE
SUPABASE_SERVICE_ROLE_KEY=PASTE_SERVICE_ROLE_KEY_HERE

# Application Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
NODE_ENV=development
```

### Stap 4: Belangrijke verschillen
- **anon public** key: Begint meestal met `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9` en heeft `"role":"anon"`
- **service_role** key: Begint met hetzelfde maar heeft `"role":"service_role"`

### Stap 5: Herstart de server
```bash
npm run dev
```

## 🔍 Hoe te controleren:
1. Open je .env.local bestand
2. Controleer of NEXT_PUBLIC_SUPABASE_ANON_KEY de **anon public** key is
3. Controleer of SUPABASE_SERVICE_ROLE_KEY de **service_role** key is

## ⚠️ Veiligheid:
- De **anon** key is veilig voor client-side gebruik
- De **service_role** key is GEHEIM en mag alleen server-side gebruikt worden
- Deel de **service_role** key NOOIT in client-side code

## 🎯 Na de fix:
De "Legacy API keys are disabled" fout zou moeten verdwijnen en registratie/login zou moeten werken.
