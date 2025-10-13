# Supabase Migration Instructions

## Authentication Fixes to Apply

Je hebt de Supabase database aangepast en nu moeten we de authentication fixes toepassen. Hier zijn de stappen:

### Methode 1: Via Supabase Dashboard (Aanbevolen)

1. Ga naar je Supabase Dashboard: https://supabase.com/dashboard/project/qgyboabomydquodygomq
2. Klik op "SQL Editor" in het linker menu
3. Kopieer en plak de volgende SQL code:

```sql
-- Authentication Fixes for QuoteFast Dashboard
-- This script applies all necessary authentication fixes to the Supabase database

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

4. Klik op "Run" om de SQL uit te voeren
5. Controleer of je de success message ziet: "Authentication fixes applied successfully!"

### Methode 2: Via Supabase CLI (Als je het database wachtwoord hebt)

Als je het database wachtwoord hebt, kun je ook de volgende commando's uitvoeren:

```bash
# Ga naar de project directory
cd /Users/innovars_lab/quotefast-dashboard

# Push de migraties naar de remote database
supabase db push

# Of voer het SQL script direct uit
supabase db reset --linked
```

### Wat deze fixes doen:

1. **INSERT Policy Fix**: Voegt de ontbrekende INSERT policy toe voor de profiles tabel
2. **Service Role Policy**: Zorgt ervoor dat de service role ook profiles kan aanmaken (voor triggers)
3. **Improved Trigger Function**: Verbeterde `handle_new_user()` functie met betere error handling
4. **Trigger Setup**: Zorgt ervoor dat de trigger correct is ingesteld
5. **Manual Profile Creation**: Voegt een functie toe om handmatig profiles aan te maken voor bestaande gebruikers

### Verificatie:

Na het toepassen van de fixes, kun je controleren of alles werkt door:

1. Een nieuwe gebruiker te registreren
2. Te controleren of er automatisch een profile wordt aangemaakt
3. Te controleren of bestaande gebruikers nog steeds kunnen inloggen

### Troubleshooting:

Als je problemen ondervindt:

1. Controleer de Supabase logs in de Dashboard
2. Zorg ervoor dat alle policies correct zijn toegepast
3. Test de registratie flow opnieuw

De migratie bestanden zijn ook opgeslagen in:
- `supabase/migrations/003_fix_authentication_issues.sql`
- `apply-auth-fixes.sql`
