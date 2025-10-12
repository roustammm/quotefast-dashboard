# 🔑 Get Real Supabase API Key

## ❌ Current Problem
The current anon key in `.env.local` has a placeholder signature and is causing "Invalid API key" errors.

## ✅ Solution Steps

### 1. Go to Supabase Dashboard
1. Open your browser and go to: **https://supabase.com/dashboard**
2. Sign in to your account
3. Select your project: **qgyboabomydquodygomq**

### 2. Get the Real Anon Key
1. In your project dashboard, go to **Settings** (gear icon in left sidebar)
2. Click on **API** in the settings menu
3. Find the **"anon public"** key in the API Keys section
4. Copy the entire key (it should be a long JWT token)

### 3. Update .env.local
Replace the current anon key in `.env.local`:

```bash
# Current (WRONG):
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFneWJvYWJvbXlkcXVvZHlnb21xIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTUyNjQ5NTAsImV4cCI6MjA3MDg0MDk1MH0.Ej8Ej8Ej8Ej8Ej8Ej8Ej8Ej8Ej8Ej8Ej8Ej8Ej8Ej8

# Replace with (CORRECT):
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFneWJvYWJvbXlkcXVvZHlnb21xIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTUyNjQ5NTAsImV4cCI6MjA3MDg0MDk1MH0.REAL_SIGNATURE_FROM_DASHBOARD
```

### 4. Restart Development Server
After updating the key:
```bash
# Stop the current server (Ctrl+C)
# Then restart:
npm run dev
```

## 🧪 Test Authentication
1. Go to **http://localhost:3003/register**
2. Try to create a new account
3. The "Invalid API key" error should be gone

## 🔍 How to Identify the Correct Key
The real anon key should:
- Start with: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9`
- Have a real signature at the end (not `Ej8Ej8Ej8Ej8Ej8Ej8Ej8Ej8Ej8Ej8Ej8Ej8Ej8Ej8`)
- Be much longer than the placeholder

## ⚠️ Security Note
- The **anon key** is safe to use in frontend code (it's public)
- The **service role key** should NEVER be exposed in frontend code
- Keep your `.env.local` file secure and don't commit it to git

## 🆘 Still Having Issues?
If you're still getting "Invalid API key" errors:
1. Double-check you copied the entire key from Supabase dashboard
2. Make sure there are no extra spaces or characters
3. Verify the key is in the correct line in `.env.local`
4. Restart the development server completely
