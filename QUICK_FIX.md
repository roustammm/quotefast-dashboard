# 🚨 QUICK FIX: Database Setup

## The Problem
Your dashboard shows errors like:
- `Could not find the table 'public.customers'`
- `Could not find the table 'public.invoices'`
- `Could not find the table 'public.users'`

## The Solution (2 minutes)

### Step 1: Open Supabase Dashboard
Go to: **https://qgyboabomydquodygomq.supabase.co/project/default/sql**

### Step 2: Copy & Paste SQL
1. Open the file: `supabase/migrations/001_initial_schema.sql`
2. Copy ALL the contents (463 lines)
3. Paste into the SQL editor in Supabase
4. Click "Run"

### Step 3: Done!
Refresh your dashboard at http://localhost:3001

## What This Creates
- ✅ User profiles
- ✅ Customers table
- ✅ Invoices table  
- ✅ Offers table
- ✅ Projects table
- ✅ All security policies

## Alternative: Use Supabase CLI
```bash
cd /Users/innovars_lab/Downloads/dashboard-starter
supabase db reset
```

---
**Time needed**: 2 minutes
**Difficulty**: Easy (copy/paste)
**Result**: Working dashboard with all data