#!/usr/bin/env node

/**
 * Simple Database Setup Script
 * Creates missing tables via direct SQL execution
 */

const { createClient } = require('@supabase/supabase-js');

// Supabase configuration
const supabaseUrl = 'https://qgyboabomydquodygomq.supabase.co';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'your_service_role_key_here';

const supabase = createClient(supabaseUrl, supabaseKey);

async function setupDatabase() {
  console.log('🚀 Starting database setup...');
  
  try {
    // Check if tables exist first
    console.log('📋 Checking existing tables...');
    
    const { data: tables, error: tablesError } = await supabase
      .from('information_schema.tables')
      .select('table_name')
      .eq('table_schema', 'public')
      .in('table_name', ['user_email_settings', 'user_whatsapp_settings']);
    
    if (tablesError) {
      console.log('⚠️ Could not check existing tables, proceeding with creation...');
    } else {
      const existingTables = tables?.map(t => t.table_name) || [];
      console.log('📊 Existing tables:', existingTables);
      
      if (existingTables.includes('user_email_settings') && existingTables.includes('user_whatsapp_settings')) {
        console.log('✅ All required tables already exist!');
        return;
      }
    }
    
    // Create user_email_settings table
    console.log('📄 Creating user_email_settings table...');
    const createEmailSettingsSQL = `
      CREATE TABLE IF NOT EXISTS public.user_email_settings (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
        smtp_host TEXT,
        smtp_port INTEGER DEFAULT 587,
        smtp_username TEXT,
        smtp_password TEXT,
        from_email TEXT,
        from_name TEXT,
        reply_to TEXT,
        use_tls BOOLEAN DEFAULT true,
        use_ssl BOOLEAN DEFAULT false,
        enabled BOOLEAN DEFAULT false,
        created_at TIMESTAMPTZ DEFAULT NOW(),
        updated_at TIMESTAMPTZ DEFAULT NOW(),
        UNIQUE(user_id)
      );
    `;
    
    const { error: emailError } = await supabase.rpc('exec_sql', { sql: createEmailSettingsSQL });
    if (emailError) {
      console.error('❌ user_email_settings creation failed:', emailError);
    } else {
      console.log('✅ user_email_settings table created');
    }
    
    // Create user_whatsapp_settings table
    console.log('📄 Creating user_whatsapp_settings table...');
    const createWhatsappSettingsSQL = `
      CREATE TABLE IF NOT EXISTS public.user_whatsapp_settings (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
        business_account_id TEXT,
        access_token TEXT,
        phone_number_id TEXT,
        webhook_verify_token TEXT,
        enabled BOOLEAN DEFAULT false,
        auto_reply_enabled BOOLEAN DEFAULT false,
        auto_reply_message TEXT,
        business_hours JSONB DEFAULT '{}',
        created_at TIMESTAMPTZ DEFAULT NOW(),
        updated_at TIMESTAMPTZ DEFAULT NOW(),
        UNIQUE(user_id)
      );
    `;
    
    const { error: whatsappError } = await supabase.rpc('exec_sql', { sql: createWhatsappSettingsSQL });
    if (whatsappError) {
      console.error('❌ user_whatsapp_settings creation failed:', whatsappError);
    } else {
      console.log('✅ user_whatsapp_settings table created');
    }
    
    // Enable RLS
    console.log('📄 Enabling RLS...');
    const enableRLSSQL = `
      ALTER TABLE public.user_email_settings ENABLE ROW LEVEL SECURITY;
      ALTER TABLE public.user_whatsapp_settings ENABLE ROW LEVEL SECURITY;
    `;
    
    const { error: rlsError } = await supabase.rpc('exec_sql', { sql: enableRLSSQL });
    if (rlsError) {
      console.error('❌ RLS enablement failed:', rlsError);
    } else {
      console.log('✅ RLS enabled');
    }
    
    console.log('🎉 Database setup completed successfully!');
    
  } catch (error) {
    console.error('❌ Database setup failed:', error);
    console.log('💡 Make sure you have the correct SUPABASE_SERVICE_ROLE_KEY in your environment variables');
  }
}

// Run the setup
setupDatabase();
