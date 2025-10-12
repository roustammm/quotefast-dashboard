# Database Setup Instructions

## 🚨 URGENT: Database Tables Missing

Your dashboard is showing errors because the database tables don't exist. Here's how to fix it:

## Method 1: Manual Setup (Recommended)

### Step 1: Open Supabase Dashboard
1. Go to: https://qgyboabomydquodygomq.supabase.co/project/default/sql
2. Log in to your Supabase account

### Step 2: Execute SQL Migration
1. Click on "New Query" or the SQL editor
2. Copy the entire contents of `supabase/migrations/001_initial_schema.sql`
3. Paste it into the SQL editor
4. Click "Run" to execute the migration

### Step 3: Verify Setup
1. Go to the "Table Editor" in your Supabase dashboard
2. You should see these tables:
   - `profiles`
   - `customers` 
   - `invoices`
   - `invoice_items`
   - `offers`
   - `offer_items`
   - `projects`
   - `activities`
   - `settings`

### Step 4: Refresh Dashboard
1. Go back to your dashboard: http://localhost:3001
2. The errors should be gone and data should load properly

## Method 2: Supabase CLI (If Available)

If you have Supabase CLI installed:

```bash
# Navigate to your project
cd /Users/innovars_lab/Downloads/dashboard-starter

# Reset and apply migrations
supabase db reset
```

## What This Migration Does

The migration creates:
- ✅ User profiles table
- ✅ Customers management
- ✅ Invoices and invoice items
- ✅ Offers and offer items  
- ✅ Projects tracking
- ✅ Activity logging
- ✅ User settings
- ✅ Row Level Security (RLS) policies
- ✅ Database triggers and functions
- ✅ Storage bucket for file uploads

## After Setup

Once the database is set up, your dashboard will:
- ✅ Load customer data
- ✅ Display invoice information
- ✅ Show offer statistics
- ✅ Track user activities
- ✅ Store user preferences

## Need Help?

If you encounter any issues:
1. Check the Supabase dashboard for error messages
2. Verify your Supabase project is active
3. Make sure you have the correct permissions

---
**Status**: ⚠️ Database tables missing - Manual setup required
**Next Action**: Execute SQL migration in Supabase dashboard