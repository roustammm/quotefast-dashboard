/* Complete database schema voor QuoteFast */

-- Enable extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Users table (extends Supabase auth.users)
CREATE TABLE IF NOT EXISTS public.users (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  phone TEXT,
  role TEXT DEFAULT 'user' CHECK (role IN ('owner', 'admin', 'user')),
  company_name TEXT,
  industry TEXT,
  team_size INTEGER DEFAULT 1,
  subscription_tier TEXT DEFAULT 'free' CHECK (role IN ('free', 'pro', 'enterprise')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Organizations table
CREATE TABLE IF NOT EXISTS public.organizations (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  owner_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  industry TEXT,
  max_team_size INTEGER DEFAULT 5,
  subscription_tier TEXT DEFAULT 'free' CHECK (subscription_tier IN ('free', 'pro', 'enterprise')),
  stripe_customer_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Team members table
CREATE TABLE IF NOT EXISTS public.team_members (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  organization_id UUID NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('owner', 'admin', 'developer', 'designer', 'support')),
  status TEXT DEFAULT 'invited' CHECK (status IN ('invited', 'active', 'inactive')),
  joined_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  invited_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  UNIQUE(user_id, organization_id)
);

-- Customers table
CREATE TABLE IF NOT EXISTS public.customers (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  organization_id UUID NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  company TEXT,
  address JSONB,
  status TEXT DEFAULT 'lead' CHECK (status IN ('lead', 'customer', 'vip', 'inactive')),
  source TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Offers table
CREATE TABLE IF NOT EXISTS public.offers (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  organization_id UUID NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  client_name TEXT NOT NULL,
  client_id UUID REFERENCES public.customers(id) ON DELETE SET NULL,
  amount DECIMAL(10,2) NOT NULL,
  currency TEXT DEFAULT 'EUR' CHECK (currency IN ('EUR', 'USD')),
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'sent', 'viewed', 'accepted', 'rejected', 'expired')),
  due_date DATE,
  terms JSONB,
  products JSONB,
  pdf_url TEXT,
  viewed_at TIMESTAMP WITH TIME ZONE,
  created_by UUID REFERENCES public.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Invoices table
CREATE TABLE IF NOT EXISTS public.invoices (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  organization_id UUID NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
  offer_id UUID REFERENCES public.offers(id) ON DELETE SET NULL,
  customer_id UUID REFERENCES public.customers(id) ON DELETE SET NULL,
  invoice_number TEXT UNIQUE NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  currency TEXT DEFAULT 'EUR' CHECK (currency IN ('EUR', 'USD')),
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'sent', 'paid', 'overdue', 'cancelled')),
  due_date DATE NOT NULL,
  paid_at TIMESTAMP WITH TIME ZONE,
  pdf_url TEXT,
  stripe_invoice_id TEXT,
  created_by UUID REFERENCES public.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Email templates table
CREATE TABLE IF NOT EXISTS public.email_templates (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  organization_id UUID NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
  type TEXT NOT NULL CHECK (type IN ('welcome', 'offer', 'invoice', 'team_invite', 'password_reset', 'newsletter')),
  subject TEXT NOT NULL,
  html_content TEXT,
  text_content TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- API keys table
CREATE TABLE IF NOT EXISTS public.api_keys (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  organization_id UUID NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  key_hash TEXT UNIQUE NOT NULL,
  permissions JSONB,
  last_used TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Activity log table
CREATE TABLE IF NOT EXISTS public.activity_log (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  organization_id UUID NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
  user_id UUID REFERENCES public.users(id),
  action TEXT NOT NULL,
  resource_type TEXT,
  resource_id UUID,
  metadata JSONB,
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_users_email ON public.users(email);
CREATE INDEX IF NOT EXISTS idx_users_role ON public.users(role);
CREATE INDEX IF NOT EXISTS idx_organizations_slug ON public.organizations(slug);
CREATE INDEX IF NOT EXISTS idx_team_members_user_id ON public.team_members(user_id);
CREATE INDEX IF NOT EXISTS idx_team_members_org_id ON public.team_members(organization_id);
CREATE INDEX IF NOT EXISTS idx_customers_org_id ON public.customers(organization_id);
CREATE INDEX IF NOT EXISTS idx_offers_org_id ON public.offers(organization_id);
CREATE INDEX IF NOT EXISTS idx_offers_status ON public.offers(status);
CREATE INDEX IF NOT EXISTS idx_offers_created_at ON public.offers(created_at);
CREATE INDEX IF NOT EXISTS idx_invoices_org_id ON public.invoices(organization_id);
CREATE INDEX IF NOT EXISTS idx_invoices_status ON public.invoices(status);
CREATE INDEX IF NOT EXISTS idx_invoices_due_date ON public.invoices(due_date);
CREATE INDEX IF NOT EXISTS idx_activity_log_org_id ON public.activity_log(organization_id);
CREATE INDEX IF NOT EXISTS idx_activity_log_created_at ON public.activity_log(created_at);

-- RLS policies (Row Level Security)
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.offers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.api_keys ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.activity_log ENABLE ROW LEVEL SECURITY;

-- User can view own profile
CREATE POLICY "Users can view own profile" ON public.users
  FOR SELECT USING (auth.uid() = id);

-- Organization owner can manage everything
CREATE POLICY "Organization owners can manage everything" ON public.organizations
  FOR ALL USING (owner_id = auth.uid())
  WITH CHECK (owner_id = auth.uid());

-- Team members can view their organization
CREATE POLICY "Team members can view their organization" ON public.organizations
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.team_members 
      WHERE team_members.user_id = auth.uid() 
      AND team_members.organization_id = organizations.id
    )
  );

-- Users can view their team members
CREATE POLICY "Users can view team members" ON public.team_members
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.team_members 
      WHERE team_members.user_id = auth.uid() 
      AND team_members.organization_id = team_members.organization_id
    )
  );

-- Users can manage their customers
CREATE POLICY "Users can manage customers" ON public.customers
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.team_members 
      WHERE team_members.user_id = auth.uid() 
      AND team_members.organization_id = customers.organization_id
    )
  );

-- Users can manage their offers
CREATE POLICY "Users can manage offers" ON public.offers
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.team_members 
      WHERE team_members.user_id = auth.uid() 
      AND team_members.organization_id = offers.organization_id
    )
  );

-- Users can manage their invoices
CREATE POLICY "Users can manage invoices" ON public.invoices
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.team_members 
      WHERE team_members.user_id = auth.uid() 
      AND team_members.organization_id = invoices.organization_id
    )
  );

-- API keys only for organization members
CREATE POLICY "API keys for organization members" ON public.api_keys
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.team_members 
      WHERE team_members.user_id = auth.uid() 
      AND team_members.organization_id = api_keys.organization_id
    )
  );

-- Activity log for organization members
CREATE POLICY "Activity log for organization" ON public.activity_log
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.team_members 
      WHERE team_members.user_id = auth.uid() 
      AND team_members.organization_id = activity_log.organization_id
    )
  );

-- Enable realtime for offers and invoices
ALTER TABLE public.offers ENABLE REPLICATION;
ALTER TABLE public.invoices ENABLE REPLICATION;
ALTER TABLE public.customers ENABLE REPLICATION;

-- Default data (for development)
INSERT INTO public.users (id, email, full_name, role, company_name, industry, team_size)
VALUES 
  (gen_random_uuid(), 'admin@quotefast.com', 'Admin User', 'owner', 'QuoteFast Demo', 'SaaS', 5),
  (gen_random_uuid(), 'user@quotefast.com', 'Regular User', 'admin', 'QuoteFast Demo', 'SaaS', 5);

INSERT INTO public.organizations (id, name, slug, owner_id, industry, max_team_size, subscription_tier)
VALUES 
  (gen_random_uuid(), 'QuoteFast Demo', 'quotefast-demo', (SELECT id FROM public.users WHERE email = 'admin@quotefast.com'), 'SaaS', 10, 'pro');

INSERT INTO public.team_members (user_id, organization_id, role, status)
VALUES 
  ((SELECT id FROM public.users WHERE email = 'admin@quotefast.com'), (SELECT id FROM public.organizations WHERE slug = 'quotefast-demo'), 'owner', 'active'),
  ((SELECT id FROM public.users WHERE email = 'user@quotefast.com'), (SELECT id FROM public.organizations WHERE slug = 'quotefast-demo'), 'admin', 'active');

-- Views voor complex queries
CREATE OR REPLACE VIEW public.organization_stats AS
SELECT 
  o.id,
  o.name,
  o.slug,
  o.subscription_tier,
  COUNT(DISTINCT tm.user_id) as team_size,
  COUNT(DISTINCT c.id) as customer_count,
  COUNT(DISTINCT off.id) as offer_count,
  COUNT(DISTINCT i.id) as invoice_count,
  COALESCE(SUM(off.amount), 0) as total_offers_value,
  COALESCE(SUM(i.amount), 0) as total_invoices_value
FROM public.organizations o
LEFT JOIN public.team_members tm ON o.id = tm.organization_id
LEFT JOIN public.customers c ON o.id = c.organization_id
LEFT JOIN public.offers off ON o.id = off.organization_id
LEFT JOIN public.invoices i ON o.id = i.organization_id
GROUP BY o.id, o.name, o.slug, o.subscription_tier;

-- Functions voor business logic
CREATE OR REPLACE FUNCTION public.calculate_invoice_total(
  offer_id UUID
)
RETURNS DECIMAL(10,2)
LANGUAGE plpgsql
AS $$
DECLARE
  total DECIMAL(10,2) := 0;
BEGIN
  SELECT COALESCE(SUM((p->>'price')::DECIMAL * (p->>'quantity')::INTEGER), 0)
  INTO total
  FROM public.offers o,
  jsonb_array_elements(o.products) p
  WHERE o.id = offer_id;
  
  RETURN total;
END;
$$;

-- Triggers voor automatic updates
CREATE OR REPLACE FUNCTION public.handle_offer_status_change()
RETURNS TRIGGER AS $$
BEGIN
  -- Log activity when offer status changes
  INSERT INTO public.activity_log (
    organization_id,
    user_id,
    action,
    resource_type,
    resource_id,
    metadata
  )
  VALUES (
    NEW.organization_id,
    auth.uid(),
    CONCAT('offer_status_changed:', NEW.status),
    'offer',
    NEW.id,
    jsonb_build_object(
      'old_status', OLD.status,
      'new_status', NEW.status,
      'offer_id', NEW.id,
      'amount', NEW.amount
    )
  );
  
  -- Send email notifications for certain status changes
  IF NEW.status = 'sent' AND OLD.status != 'sent' THEN
    -- Trigger email service (in application layer)
    PERFORM pg_notify(
      'offer_status_change',
      jsonb_build_object(
        'event', 'offer_sent',
        'offer_id', NEW.id,
        'client_id', NEW.client_id
      )::text
    );
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_offer_status_change
  AFTER UPDATE OF status ON public.offers
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_offer_status_change();
