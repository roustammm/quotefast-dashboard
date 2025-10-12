# Account Creation Fix - QuoteFast Dashboard

## 🚨 Problem Identified
Users could not create accounts due to authentication flow issues between the frontend AuthContext and the backend auth service.

## 🔧 Fixes Applied

### 1. Fixed AuthContext Registration Function
**File:** `contexts/AuthContext.tsx`

**Issue:** The registration function was directly calling Supabase auth instead of using the properly configured `authService.register()` method.

**Fix:** Updated the `register`, `login`, and `logout` functions to use `authService` methods with proper error handling and user state management.

```typescript
// Before (broken)
const register = async (email: string, password: string, name: string, company?: string) => {
  const { error } = await supabase.auth.signUp({ ... });
  if (error) throw new Error(error.message);
  router.refresh();
}

// After (fixed)
const register = async (email: string, password: string, name: string, company?: string) => {
  const { user, error } = await authService.register(email, password, name, company);
  if (error) throw new Error(error);
  if (user) {
    setUser(user);
  }
  router.refresh();
}
```

### 2. Fixed Database Trigger for User Profile Creation
**File:** `supabase/migrations/001_initial_schema.sql`

**Issue:** The `handle_new_user()` trigger was missing the `company_name` field and wasn't properly handling user metadata.

**Fix:** Updated the trigger function to include `company_name` and properly extract metadata:

```sql
-- Updated function
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, email, full_name, company_name, avatar_url, created_at, updated_at)
    VALUES (
        NEW.id,
        NEW.email,
        COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name'),
        NEW.raw_user_meta_data->>'company_name',
        NEW.raw_user_meta_data->>'avatar_url',
        NOW(),
        NOW()
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
```

## 📋 Manual Steps Required

### 1. Apply Database Fix
Run the following SQL in your Supabase SQL Editor:

```sql
-- Drop existing trigger and function
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS public.handle_new_user();

-- Create updated function with company_name support
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, email, full_name, company_name, avatar_url, created_at, updated_at)
    VALUES (
        NEW.id,
        NEW.email,
        COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name'),
        NEW.raw_user_meta_data->>'company_name',
        NEW.raw_user_meta_data->>'avatar_url',
        NOW(),
        NOW()
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Recreate trigger
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
```

### 2. Test Registration Process
1. Start the development server: `npm run dev`
2. Navigate to `http://localhost:3000/register`
3. Fill out the registration form with:
   - Name: Test User
   - Email: test@example.com
   - Password: testpassword123
4. Click "Account aanmaken"
5. Check if the registration completes successfully
6. Verify the user is redirected to the onboarding wizard

### 3. Verify User Profile Creation
After successful registration:
1. Check the Supabase Dashboard > Database > Profiles table
2. Verify a new profile was created with:
   - Correct email
   - Full name populated
   - Company name (if provided)
   - Proper timestamps

## 🐛 Troubleshooting

### If Registration Still Fails:
1. **Check Console Errors:** Open browser dev tools and look for JavaScript errors
2. **Check Supabase Logs:** Go to Supabase Dashboard > Logs
3. **Verify Environment Variables:** Ensure `.env.local` has correct Supabase credentials
4. **Check Network Requests:** Verify API calls are being made correctly

### Common Issues:
- **Email Confirmation:** Supabase might require email confirmation. Check your email or disable this in Supabase settings during development.
- **RLS Policies:** Ensure Row Level Security policies are correctly configured
- **Trigger Issues:** Make sure the database trigger was applied successfully

## ✅ Expected Behavior After Fix

1. **Registration Flow:**
   - User fills out form → Account created → User profile created → Redirect to onboarding

2. **Error Handling:**
   - Clear error messages for duplicate emails
   - Proper validation for required fields
   - Graceful handling of network issues

3. **User State:**
   - User immediately logged in after registration
   - Profile data accessible throughout the app
   - Proper redirect to dashboard after onboarding

## 📞 Support
If issues persist after applying these fixes:
1. Check the browser console for specific error messages
2. Verify the database trigger was applied correctly
3. Ensure all environment variables are properly configured

---
**🎯 Account creation should now work properly!**