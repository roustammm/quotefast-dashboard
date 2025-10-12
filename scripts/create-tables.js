#!/usr/bin/env node

/**
 * Create Missing Tables Script
 * Creates the missing database tables directly
 */

const { createClient } = require('@supabase/supabase-js');

// Supabase configuration
const supabaseUrl = 'https://qgyboabomydquodygomq.supabase.co';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFneWJvYWJvbXlkcXVvZHlnb21xIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczNDk3NDgwMCwiZXhwIjoyMDUwNTUwODAwfQ.ServiceRoleKeyServiceRoleKeyServiceRoleKeyServiceRoleKey';

const supabase = createClient(supabaseUrl, supabaseKey);

async function createTables() {
  console.log('🚀 Creating missing database tables...');
  
  try {
    // Create user_email_settings table
    console.log('📄 Creating user_email_settings table...');
    const { error: error1 } = await supabase.rpc('exec_sql', {
      sql: `
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
      `
    });
    
    if (error1) {
      console.error('❌ user_email_settings creation failed:', error1);
    } else {
      console.log('✅ user_email_settings table created');
    }
    
    // Create user_whatsapp_settings table
    console.log('📄 Creating user_whatsapp_settings table...');
    const { error: error2 } = await supabase.rpc('exec_sql', {
      sql: `
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
      `
    });
    
    if (error2) {
      console.error('❌ user_whatsapp_settings creation failed:', error2);
    } else {
      console.log('✅ user_whatsapp_settings table created');
    }
    
    // Enable RLS
    console.log('📄 Enabling RLS...');
    const { error: error3 } = await supabase.rpc('exec_sql', {
      sql: `
        ALTER TABLE public.user_email_settings ENABLE ROW LEVEL SECURITY;
        ALTER TABLE public.user_whatsapp_settings ENABLE ROW LEVEL SECURITY;
      `
    });
    
    if (error3) {
      console.error('❌ RLS enablement failed:', error3);
    } else {
      console.log('✅ RLS enabled');
    }
    
    console.log('🎉 Database tables created successfully!');
    
  } catch (error) {
    console.error('❌ Table creation failed:', error);
  }
}

// Run the script
createTables();
