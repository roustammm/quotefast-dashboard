# 🔧 Troubleshooting Guide

This guide helps you resolve common issues with the QuoteFast dashboard application.

## 🚨 Common Errors and Solutions

### 1. Multiple GoTrueClient Instances Error

**Error:** `Multiple GoTrueClient instances detected in the same browser context`

**Solution:** ✅ **FIXED** - The Supabase client has been updated to use a singleton pattern to prevent multiple instances.

### 2. User Data Fetch Errors

**Error:** `User data fetch error: PGRST116 - The result contains 0 rows`

**Solution:** ✅ **FIXED** - The auth service now automatically creates missing user profiles.

### 3. Profile Creation Error

**Error:** `Profile creation error: 23503 - insert or update on table "profiles" violates foreign key constraint`

**Solution:** ✅ **FIXED** - The system now handles missing user records gracefully.

### 4. Missing Environment Variables

**Error:** `NEXT_PUBLIC_SUPABASE_URL is missing from environment variables`

**Solution:**
```bash
npm run setup:env
```

This will guide you through setting up your environment variables interactively.

### 5. Database Connection Issues

**Error:** Database connection failures or RLS policy errors

**Solution:**
```bash
npm run fix:database
```

This comprehensive script will:
- Check database tables
- Fix orphaned profiles
- Create missing profiles
- Verify RLS policies
- Test basic operations

## 🛠️ Quick Fix Commands

### Setup Environment Variables
```bash
npm run setup:env
```

### Fix Database Issues
```bash
npm run fix:database
```

### Test Database Connection
```bash
npm run test:connection
```

### Test User Registration
```bash
npm run test:registration
```

## 📋 Step-by-Step Setup

### 1. Environment Setup
1. Run `npm run setup:env`
2. Enter your Supabase credentials
3. Optionally add Stripe, OpenAI, and other API keys

### 2. Database Setup
1. Go to your Supabase project dashboard
2. Navigate to SQL Editor
3. Copy and paste the contents of `ONE_CLICK_SETUP.sql`
4. Click "Run" to execute the migration

### 3. Fix Database Issues
1. Run `npm run fix:database`
2. This will automatically fix common database issues

### 4. Start Development Server
```bash
npm run dev
```

## 🔍 Debugging Tips

### Check Environment Variables
Make sure your `.env.local` file contains:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

### Verify Database Tables
In your Supabase dashboard, check that these tables exist:
- `profiles`
- `customers`
- `invoices`
- `offers`
- `projects`
- `activities`
- `settings`

### Check RLS Policies
Make sure Row Level Security is enabled and policies are in place for all tables.

### Browser Console
Check the browser console for any JavaScript errors or warnings.

## 🆘 Still Having Issues?

### 1. Clear Browser Cache
- Hard refresh (Ctrl+Shift+R or Cmd+Shift+R)
- Clear browser cache and cookies
- Try in an incognito/private window

### 2. Restart Development Server
```bash
# Stop the server (Ctrl+C)
# Then restart
npm run dev
```

### 3. Check Supabase Project Status
- Verify your Supabase project is active
- Check if you have the correct permissions
- Ensure your API keys are valid

### 4. Database Reset (Last Resort)
If all else fails, you can reset your database:
1. Go to Supabase dashboard
2. Navigate to Settings > Database
3. Click "Reset database" (⚠️ This will delete all data)
4. Run the migration again

## 📞 Getting Help

If you're still experiencing issues:

1. Check the browser console for error messages
2. Run the diagnostic scripts above
3. Verify your Supabase project configuration
4. Check the application logs in your terminal

## 🎯 Common Solutions Summary

| Error | Quick Fix |
|-------|-----------|
| Multiple GoTrueClient | ✅ Fixed in code |
| User data fetch error | ✅ Fixed in code |
| Profile creation error | ✅ Fixed in code |
| Missing env vars | `npm run setup:env` |
| Database issues | `npm run fix:database` |
| Connection problems | `npm run test:connection` |

## 🔄 Recent Fixes Applied

- ✅ Fixed multiple Supabase client instances
- ✅ Added automatic profile creation for missing users
- ✅ Improved error handling in auth service
- ✅ Added comprehensive database fix script
- ✅ Created interactive environment setup
- ✅ Enhanced error messages and logging

The application should now work much more reliably! 🎉
