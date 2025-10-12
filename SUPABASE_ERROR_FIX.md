# 🚨 SUPABASE ERROR FIX

## Probleem: "supabaseKey is required"

Je krijgt deze error omdat je Supabase environment variabelen ontbreken.

## ⚡ SNELLE OPLOSSING (2 minuten)

### Stap 1: Run het fix script
```bash
node fix_supabase_error.js
```

### Stap 2: Vul je Supabase keys in

1. **Open** je Supabase dashboard: https://supabase.com/dashboard
2. **Selecteer** je project: `qgyboabomydquodygomq` 
3. **Ga naar** Settings → API
4. **Kopieer** de keys en vervang in `.env.local`:

```bash
# Vervang deze keys met je echte keys:
NEXT_PUBLIC_SUPABASE_ANON_KEY=jouw_anon_key_hier
SUPABASE_SERVICE_ROLE_KEY=jouw_service_role_key_hier
```

### Stap 3: Herstart je server
```bash
# Stop server (Ctrl+C)
# Start opnieuw:
npm run dev
```

## ✅ RESULTAAT

Na deze stappen:
- ❌ Geen "supabaseKey is required" errors meer
- ✅ Login/registratie werkt
- ✅ App start zonder crashes

## 🔍 VERIFICATIE

Test of het werkt:
```bash
node test_registration.js
```

## 🆘 HULP

Als het nog niet werkt:
1. Check of `.env.local` in de root staat (naast package.json)
2. Controleer of de keys correct zijn (geen extra spaties)
3. Herstart je development server volledig
4. Clear je browser cache

---

**💡 TIP**: De Supabase URL is al correct ingesteld gebaseerd op je console logs!
