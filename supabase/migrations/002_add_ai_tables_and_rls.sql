-- supabase/migrations/002_add_ai_tables_and_rls.sql

-- Create AiTemplate table
CREATE TABLE IF NOT EXISTS public.ai_templates (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    name TEXT NOT NULL,
    description TEXT,
    content TEXT NOT NULL,
    type TEXT DEFAULT 'offer' CHECK (type IN ('offer', 'invoice', 'email')),
    is_default BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    metadata JSONB DEFAULT '{}'
);

-- Create QuoteGeneration table
CREATE TABLE IF NOT EXISTS public.quote_generations (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    offer_id UUID REFERENCES public.offers(id) ON DELETE CASCADE,
    template_id UUID REFERENCES public.ai_templates(id) ON DELETE SET NULL,
    prompt TEXT,
    generated_content TEXT,
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'failed')),
    tokens_used INTEGER,
    model_used TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    metadata JSONB DEFAULT '{}'
);

-- Add updated_at triggers for new tables
DROP TRIGGER IF EXISTS update_ai_templates_updated_at ON public.ai_templates;
CREATE TRIGGER update_ai_templates_updated_at BEFORE UPDATE ON public.ai_templates FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_quote_generations_updated_at ON public.quote_generations;
CREATE TRIGGER update_quote_generations_updated_at BEFORE UPDATE ON public.quote_generations FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Enable RLS for new tables
ALTER TABLE public.ai_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quote_generations ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for AiTemplate
DROP POLICY IF EXISTS "Users can view own AI templates" ON public.ai_templates;
CREATE POLICY "Users can view own AI templates" ON public.ai_templates
    FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert own AI templates" ON public.ai_templates;
CREATE POLICY "Users can insert own AI templates" ON public.ai_templates
    FOR INSERT WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update own AI templates" ON public.ai_templates;
CREATE POLICY "Users can update own AI templates" ON public.ai_templates
    FOR UPDATE USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can delete own AI templates" ON public.ai_templates;
CREATE POLICY "Users can delete own AI templates" ON public.ai_templates
    FOR DELETE USING (auth.uid() = user_id);

-- Create RLS policies for QuoteGeneration
DROP POLICY IF EXISTS "Users can view own quote generations" ON public.quote_generations;
CREATE POLICY "Users can view own quote generations" ON public.quote_generations
    FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert own quote generations" ON public.quote_generations;
CREATE POLICY "Users can insert own quote generations" ON public.quote_generations
    FOR INSERT WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update own quote generations" ON public.quote_generations;
CREATE POLICY "Users can update own quote generations" ON public.quote_generations
    FOR UPDATE USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can delete own quote generations" ON public.quote_generations;
CREATE POLICY "Users can delete own quote generations" ON public.quote_generations
    FOR DELETE USING (auth.uid() = user_id);
