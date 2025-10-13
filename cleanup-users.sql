-- Cleanup script to remove all users and profiles from Supabase
-- WARNING: This will delete ALL users and their data!

-- First, let's see what users exist
SELECT 
    u.id,
    u.email,
    u.created_at,
    p.full_name,
    p.company_name
FROM auth.users u
LEFT JOIN public.profiles p ON u.id = p.id
ORDER BY u.created_at DESC;

-- Delete all profiles first (due to foreign key constraints)
DELETE FROM public.profiles;

-- Delete all users from auth.users
DELETE FROM auth.users;

-- Reset any sequences if needed
-- (This is optional, but can help with clean IDs)

-- Verify cleanup
SELECT 'Users remaining:' as status, COUNT(*) as count FROM auth.users;
SELECT 'Profiles remaining:' as status, COUNT(*) as count FROM public.profiles;
