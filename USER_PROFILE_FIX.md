# 🔧 User Profile Creation Fix

## Probleem
Er is een fout bij het aanmaken van gebruikersprofielen tijdens registratie.

## Oplossing

### Stap 1: Database Fix via Supabase Dashboard

1. Ga naar je [Supabase Dashboard](https://supabase.com/dashboard)
2. Selecteer je project
3. Ga naar **SQL Editor**
4. Kopieer en plak de volgende SQL code:

```sql
-- Quick Fix for User Profile Creation Issues
-- Run this SQL in your Supabase SQL Editor

-- 1. Ensure profiles table exists with correct structure
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    full_name TEXT,
    avatar_url TEXT,
    company_name TEXT,
    phone TEXT,
    website TEXT,
    address TEXT,
    city TEXT,
    postal_code TEXT,
    country TEXT DEFAULT 'NL',
    timezone TEXT DEFAULT 'Europe/Amsterdam',
    language TEXT DEFAULT 'nl',
    currency TEXT DEFAULT 'EUR',
    subscription_tier TEXT DEFAULT 'free',
    subscription_status TEXT DEFAULT 'active',
    trial_ends_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    last_login_at TIMESTAMPTZ,
    email_confirmed_at TIMESTAMPTZ,
    onboarding_completed BOOLEAN DEFAULT FALSE,
    preferences JSONB DEFAULT '{}',
    metadata JSONB DEFAULT '{}'
);

-- 2. Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- 3. Create RLS policies
DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;
CREATE POLICY "Users can view own profile" ON public.profiles
    FOR SELECT USING (auth.uid() = id);

DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
CREATE POLICY "Users can update own profile" ON public.profiles
    FOR UPDATE USING (auth.uid() = id);

DROP POLICY IF EXISTS "Users can insert own profile" ON public.profiles;
CREATE POLICY "Users can insert own profile" ON public.profiles
    FOR INSERT WITH CHECK (auth.uid() = id);

-- 4. Create function to handle new user registration
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, email, full_name, avatar_url, created_at, updated_at)
    VALUES (
        NEW.id,
        NEW.email,
        COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name'),
        NEW.raw_user_meta_data->>'avatar_url',
        NOW(),
        NOW()
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 5. Create trigger for new user registration
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 6. Create profiles for existing users who don't have them
INSERT INTO public.profiles (id, email, full_name, created_at, updated_at)
SELECT 
    au.id,
    au.email,
    COALESCE(au.raw_user_meta_data->>'full_name', au.raw_user_meta_data->>'name', 'User'),
    NOW(),
    NOW()
FROM auth.users au
LEFT JOIN public.profiles p ON au.id = p.id
WHERE p.id IS NULL;
```

5. Klik op **Run** om de SQL uit te voeren

### Stap 2: Verificatie

Na het uitvoeren van de SQL, controleer of alles werkt:

1. Ga naar **Table Editor** in je Supabase dashboard
2. Controleer of de `profiles` tabel bestaat
3. Probeer een nieuwe gebruiker te registreren op je website

### Stap 3: Test Registratie

1. Ga naar [https://dashboard-starter-ochre.vercel.app/register/](https://dashboard-starter-ochre.vercel.app/register/)
2. Probeer een nieuwe account aan te maken
3. Controleer of er geen foutmelding meer verschijnt

## Wat dit oplost

- ✅ Zorgt ervoor dat de `profiles` tabel bestaat
- ✅ Stelt Row Level Security (RLS) in
- ✅ Maakt een trigger aan die automatisch een profiel aanmaakt bij nieuwe gebruikers
- ✅ Maakt profielen aan voor bestaande gebruikers die er geen hebben
- ✅ Voorkomt toekomstige registratie fouten

## Als het probleem blijft bestaan

1. Controleer je Supabase logs in de **Logs** sectie
2. Zorg ervoor dat je environment variables correct zijn ingesteld
3. Controleer of de RLS policies correct zijn ingesteld

## Contact

Als je nog steeds problemen hebt, controleer dan:
- Supabase project status
- Environment variables in Vercel
- Database connectie
