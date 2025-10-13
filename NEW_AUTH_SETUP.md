# 🔐 Nieuwe Supabase Authenticatie Setup Guide

## Probleem
Je krijgt de foutmelding "Legacy API keys disabled" omdat je oude Supabase API keys gebruikt.

## Oplossing

### 1. 🔑 Nieuwe API Keys Ophalen

1. **Ga naar Supabase Dashboard**
   - Open [supabase.com](https://supabase.com)
   - Log in met je account
   - Selecteer je project: `qgyboabomydquodygomq`

2. **Kopieer Nieuwe Keys**
   - Ga naar **Settings** → **API**
   - Kopieer de **Project URL**
   - Kopieer de **anon public** key
   - Kopieer de **service_role** key (optioneel)

3. **Update Environment File**
   ```bash
   # Open .env.local
   nano .env.local
   
   # Vervang de oude keys met nieuwe:
   NEXT_PUBLIC_SUPABASE_URL=https://qgyboabomydquodygomq.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_NEW_ANON_KEY_HERE
   SUPABASE_SERVICE_ROLE_KEY=YOUR_NEW_SERVICE_ROLE_KEY_HERE
   ```

### 2. 🗄️ Database Schema Setup

Voer dit SQL script uit in je Supabase SQL Editor:

```sql
-- Voer scripts/setup-auth-tables.sql uit
```

Of handmatig via de Supabase dashboard:
1. Ga naar **SQL Editor**
2. Kopieer de inhoud van `scripts/setup-auth-tables.sql`
3. Voer het script uit

### 3. 🧪 Test de Implementatie

```bash
# Test de nieuwe authenticatie
node scripts/test-new-auth.js
```

### 4. 🚀 Start de Applicatie

```bash
# Herstart de development server
npm run dev
```

## Code Voorbeelden

### Login Implementatie
```typescript
// lib/auth-service.ts
login: async (email: string, password: string): Promise<AuthResponse> => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email.trim().toLowerCase(),
    password
  });
  
  if (error) {
    return {
      user: null,
      error: error.message,
      status: error.status || 500
    };
  }
  
  // Haal gebruikersprofiel op
  const userData = await authService.getUserProfile(data.user.id);
  
  return {
    user: userData,
    error: null,
    status: 200
  };
}
```

### Registratie Implementatie
```typescript
// lib/auth-service.ts
register: async (email: string, password: string, name: string, company?: string): Promise<AuthResponse> => {
  const { data, error } = await supabase.auth.signUp({
    email: email.trim().toLowerCase(),
    password,
    options: {
      data: {
        full_name: name.trim(),
        company_name: company?.trim()
      }
    }
  });
  
  if (error) {
    return {
      user: null,
      error: error.message,
      status: error.status || 500
    };
  }
  
  // Wacht voor database trigger
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Haal profiel op
  const userData = await authService.getUserProfile(data.user.id);
  
  return {
    user: userData,
    error: null,
    status: 200
  };
}
```

### Gebruik in React Component
```typescript
// app/login/page.tsx
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsLoading(true);
  setError('');

  try {
    await login(email, password);
    router.push('/dashboard');
  } catch (err: any) {
    setError(err.message || 'Inloggen mislukt');
  } finally {
    setIsLoading(false);
  }
};
```

## Belangrijke Features

### ✅ Moderne Supabase Client
- Gebruikt `@supabase/ssr` voor Next.js
- Ondersteunt zowel client-side als server-side rendering
- Automatische sessie management

### ✅ Robuuste Error Handling
- Gebruiksvriendelijke foutmeldingen in het Nederlands
- Specifieke error codes voor verschillende scenario's
- Console logging voor debugging

### ✅ Automatische Profiel Management
- Database triggers voor automatische profiel aanmaak
- Fallback mechanismen voor ontbrekende profielen
- RLS (Row Level Security) policies

### ✅ Type Safety
- Volledige TypeScript ondersteuning
- Gedefinieerde interfaces voor alle responses
- Type-safe database queries

## Troubleshooting

### "Legacy API keys disabled"
- Vervang je API keys met nieuwe van Supabase dashboard
- Controleer of je de juiste environment variabelen gebruikt

### "Profile not found"
- Voer het database setup script uit
- Controleer of de database triggers actief zijn

### "RLS policy violation"
- Controleer of de RLS policies correct zijn ingesteld
- Zorg dat gebruikers zijn ingelogd voordat je profiel data ophaalt

## Support

Als je problemen ondervindt:
1. Controleer de browser console voor errors
2. Voer het test script uit: `node scripts/test-new-auth.js`
3. Controleer de Supabase logs in het dashboard
4. Zorg dat alle environment variabelen correct zijn ingesteld