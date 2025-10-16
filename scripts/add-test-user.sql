-- Script om een test gebruiker toe te voegen aan de database
-- Voer dit uit in de Supabase SQL Editor

-- 1. Maak een gebruiker aan in auth.users (gebruik de service key voor dit)
-- Dit kun je doen via de Supabase Dashboard -> Authentication -> Users -> Add User
-- OF via de API met service key

-- 2. Voeg de gebruiker toe aan de profiles tabel
INSERT INTO public.profiles (id, email, full_name, created_at, updated_at)
VALUES (
    '550e8400-e29b-41d4-a716-446655440000', -- vervang met echte user ID
    'test@quotefast.nl',
    'Test Gebruiker',
    NOW(),
    NOW()
) ON CONFLICT (id) DO UPDATE SET
    email = EXCLUDED.email,
    full_name = EXCLUDED.full_name,
    updated_at = NOW();

-- 3. Geef de gebruiker toegang tot een demo organisatie
INSERT INTO public.organizations (id, name, slug, owner_id, industry, max_team_size, subscription_tier)
VALUES (
    '660e8400-e29b-41d4-a716-446655440000',
    'QuoteFast Demo',
    'quotefast-demo',
    '550e8400-e29b-41d4-a716-446655440000',
    'SaaS',
    10,
    'pro'
) ON CONFLICT (id) DO NOTHING;

-- 4. Voeg de gebruiker toe als team member
INSERT INTO public.team_members (user_id, organization_id, role, status)
VALUES (
    '550e8400-e29b-41d4-a716-446655440000',
    '660e8400-e29b-41d4-a716-446655440000',
    'owner',
    'active'
) ON CONFLICT (user_id, organization_id) DO UPDATE SET
    role = EXCLUDED.role,
    status = EXCLUDED.status;

-- 5. Voeg wat demo data toe
INSERT INTO public.customers (id, organization_id, name, email, company, status)
VALUES
    ('770e8400-e29b-41d4-a716-446655440000', '660e8400-e29b-41d4-a716-446655440000', 'Demo Klant 1', 'klant1@voorbeeld.nl', 'Voorbeeld Bedrijf 1', 'customer'),
    ('880e8400-e29b-41d4-a716-446655440000', '660e8400-e29b-41d4-a716-446655440000', 'Demo Klant 2', 'klant2@voorbeeld.nl', 'Voorbeeld Bedrijf 2', 'lead')
ON CONFLICT (id) DO NOTHING;

-- 6. Voeg wat demo offertes toe
INSERT INTO public.offers (id, organization_id, title, client_name, customer_id, amount, status)
VALUES
    ('990e8400-e29b-41d4-a716-446655440000', '660e8400-e29b-41d4-a716-446655440000', 'Website Development', 'Voorbeeld Bedrijf 1', '770e8400-e29b-41d4-a716-446655440000', 2500.00, 'sent'),
    ('aa0e8400-e29b-41d4-a716-446655440000', '660e8400-e29b-41d4-a716-446655440000', 'Mobile App Development', 'Voorbeeld Bedrijf 2', '880e8400-e29b-41d4-a716-446655440000', 5000.00, 'draft')
ON CONFLICT (id) DO NOTHING;
