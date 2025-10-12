# 🔧 Handmatige RLS Fix - Oplossing voor Registratie Problemen

## Probleem
De registratie mislukt omdat Row Level Security (RLS) policies de frontend client blokkeren om profielen aan te maken.

## ⚡ Snelle Oplossing

### Stap 1: Ga naar Supabase Dashboard
1. Open: https://supabase.com/dashboard
2. Selecteer je project: `qgyboabomydquodygomq`
3. Ga naar **Authentication** → **Policies**

### Stap 2: Fix de Profiles Tabel Policies
1. **Zoek de `profiles` tabel** in de policies lijst
2. **Klik op "New Policy"**
3. **Selecteer "For full customization"**
4. **Vul in:**

```sql
-- Policy Name: Enable insert for authenticated users
-- Operation: INSERT
-- Target roles: authenticated
-- USING expression: (auth.uid() = id)
-- WITH CHECK expression: (auth.uid() = id)
```

### Stap 3: Of Schakel RLS Tijdelijk Uit
**Alternatief (sneller):**
1. Ga naar **Table Editor**
2. Selecteer **`profiles` tabel**
3. Klik op **Settings** (tandwiel icoon)
4. **Schakel "Enable Row Level Security" UIT**
5. Klik **Save**

### Stap 4: Test Registratie
1. Ga terug naar je browser: http://localhost:3002/register
2. Probeer opnieuw te registreren
3. Het zou nu moeten werken!

## 🎯 Wat Dit Oplost

- ✅ **RLS Policy Violation**: Frontend kan nu profielen aanmaken
- ✅ **Registratie Flow**: Volledig functioneel
- ✅ **Auth Trigger**: Werkt automatisch
- ✅ **Profile Creation**: Geen meer 403 errors

## 🔒 Veiligheid

**RLS Uitgeschakeld** (tijdelijk):
- ⚠️ Minder veilig, maar werkt voor development
- ✅ Perfect voor testing en development
- 🔄 Later weer inschakelen voor productie

**RLS Met Policy** (aanbevolen):
- ✅ Veilig en correct
- ✅ Alleen eigen profiel aanmaken/wijzigen
- ✅ Productie-ready

## 🚀 Na de Fix

Je registratie zou nu moeten werken:
1. Vul het formulier in
2. Klik "Account aanmaken"
3. Succes! Je wordt ingelogd
4. Dashboard wordt toegankelijk

## 🆘 Als Het Nog Niet Werkt

1. **Clear browser cache** (Ctrl+Shift+R)
2. **Herstart development server**:
   ```bash
   # Stop server (Ctrl+C)
   npm run dev -- -p 3002
   ```
3. **Check console** voor nieuwe errors
4. **Test met andere email** adres

---

**💡 TIP**: Voor productie, gebruik altijd RLS policies in plaats van RLS uitschakelen!
