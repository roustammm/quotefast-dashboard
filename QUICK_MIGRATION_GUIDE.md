# Quick Migration Guide - Supabase Authentication Fixes

## 🚨 Probleem met CLI
De Supabase CLI heeft problemen met de database connectie. De **meest betrouwbare methode** is via de Supabase Dashboard.

## ✅ Aanbevolen Methode: Supabase Dashboard

### Stap 1: Ga naar je Supabase Dashboard
1. Open: https://supabase.com/dashboard/project/qgyboabomydquodygomq
2. Log in met je account

### Stap 2: Open SQL Editor
1. Klik op **"SQL Editor"** in het linker menu
2. Klik op **"New query"**

### Stap 3: Kopieer en plak deze SQL code:

```sql
-- Authentication Fixes for QuoteFast Dashboard
-- This script applies all necessary authentication fixes

-- Fix 1: Fix missing INSERT policy for profiles table
DROP POLICY IF EXISTS "Users can insert own profile" ON public.profiles;
CREATE POLICY "Users can insert own profile" ON public.profiles
    FOR INSERT WITH CHECK (auth.uid() = id);

-- Also allow the service role to insert profiles (for triggers)
DROP POLICY IF EXISTS "Service role can insert profiles" ON public.profiles;
CREATE POLICY "Service role can insert profiles" ON public.profiles
    FOR INSERT WITH CHECK (
      auth.role() = 'service_role' OR 
      auth.uid() = id
    );

-- Fix 2: Fix trigger function to handle edge cases
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    -- Check if profile already exists to avoid duplicates
    IF EXISTS (SELECT 1 FROM public.profiles WHERE id = NEW.id) THEN
        RETURN NEW;
    END IF;
    
    -- Insert profile with better error handling
    INSERT INTO public.profiles (
        id, 
        email, 
        full_name, 
        company_name, 
        avatar_url, 
        created_at, 
        updated_at,
        email_confirmed_at
    ) VALUES (
        NEW.id,
        NEW.email,
        COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name', 'User'),
        NEW.raw_user_meta_data->>'company_name',
        NEW.raw_user_meta_data->>'avatar_url',
        NOW(),
        NOW(),
        CASE 
            WHEN NEW.email_confirmed_at IS NOT NULL THEN NEW.email_confirmed_at
            ELSE NULL
        END
    );
    
    RETURN NEW;
EXCEPTION
    WHEN unique_violation THEN
        -- Profile already exists, that's okay
        RETURN NEW;
    WHEN OTHERS THEN
        -- Log the error but don't fail the user creation
        RAISE WARNING 'Failed to create profile for user %: %', NEW.id, SQLERRM;
        RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Fix 3: Ensure trigger is properly set up
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Fix 4: Add function to manually create profile for existing users
CREATE OR REPLACE FUNCTION public.create_user_profile(
    user_id UUID,
    user_email TEXT,
    user_name TEXT DEFAULT NULL,
    user_company TEXT DEFAULT NULL
)
RETURNS BOOLEAN AS $$
BEGIN
    -- Check if profile already exists
    IF EXISTS (SELECT 1 FROM public.profiles WHERE id = user_id) THEN
        RETURN TRUE; -- Already exists
    END IF;
    
    -- Insert profile
    INSERT INTO public.profiles (
        id, 
        email, 
        full_name, 
        company_name, 
        created_at, 
        updated_at
    ) VALUES (
        user_id,
        user_email,
        COALESCE(user_name, 'User'),
        user_company,
        NOW(),
        NOW()
    );
    
    RETURN TRUE;
EXCEPTION
    WHEN OTHERS THEN
        RAISE WARNING 'Failed to create profile for user %: %', user_id, SQLERRM;
        RETURN FALSE;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Success message
SELECT 'Authentication fixes applied successfully!' as status;
```

### Stap 4: Voer de SQL uit
1. Klik op **"Run"** (of druk Ctrl+Enter)
2. Wacht tot de query is uitgevoerd
3. Je zou de message moeten zien: **"Authentication fixes applied successfully!"**

## 🎯 Wat deze fixes doen:

1. **INSERT Policy Fix**: Voegt ontbrekende INSERT policy toe voor profiles tabel
2. **Service Role Policy**: Zorgt ervoor dat service role ook profiles kan aanmaken
3. **Improved Trigger Function**: Verbeterde `handle_new_user()` functie met betere error handling
4. **Trigger Setup**: Zorgt ervoor dat de trigger correct is ingesteld
5. **Manual Profile Creation**: Functie om handmatig profiles aan te maken voor bestaande gebruikers

## ✅ Verificatie:

Na het toepassen van de fixes:

1. **Test registratie**: Probeer een nieuwe gebruiker te registreren
2. **Controleer profile**: Zorg ervoor dat er automatisch een profile wordt aangemaakt
3. **Test login**: Controleer of bestaande gebruikers nog steeds kunnen inloggen

## 🔧 Troubleshooting:

Als je problemen ondervindt:

1. Controleer de Supabase logs in de Dashboard
2. Zorg ervoor dat alle policies correct zijn toegepast
3. Test de registratie flow opnieuw

## 📁 Bestanden:

De migratie bestanden zijn opgeslagen in:
- `supabase/migrations/003_fix_authentication_issues.sql`
- `apply-auth-fixes.sql`
- `SUPABASE_MIGRATION_INSTRUCTIONS.md`

**Deze methode via de Dashboard is 100% betrouwbaar en wordt aanbevolen!**
