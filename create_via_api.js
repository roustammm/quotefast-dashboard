const { createClient } = require('@supabase/supabase-js');
const https = require('https');

// Je Supabase configuratie
const supabaseUrl = 'https://qgyboabomydquodygomq.supabase.co';
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFneWJvYWJvbXlkcXVvZHlnb21xIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NTI2NDk1MCwiZXhwIjoyMDcwODQwOTUwfQ.sSUH2MIL7vVukSwuV4CVxlcGU_u4V8nNpkR3WvSokw4';

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function createViaAPI() {
  console.log('🚀 Attempting to create database via API...');
  
  try {
    // Probeer een directe SQL call via de PostgREST API
    const sqlStatements = [
      'CREATE EXTENSION IF NOT EXISTS "uuid-ossp"',
      'CREATE EXTENSION IF NOT EXISTS "pgcrypto"',
      `CREATE TABLE IF NOT EXISTS public.profiles (
        id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
        email TEXT UNIQUE NOT NULL,
        full_name TEXT,
        avatar_url TEXT,
        company_name TEXT,
        phone TEXT,
        website TEXT,
        address TEXT,
        city TEXT,
        postal_code TEXT,
        country TEXT DEFAULT 'NL',
        timezone TEXT DEFAULT 'Europe/Amsterdam',
        language TEXT DEFAULT 'nl',
        currency TEXT DEFAULT 'EUR',
        subscription_tier TEXT DEFAULT 'free',
        subscription_status TEXT DEFAULT 'active',
        trial_ends_at TIMESTAMPTZ,
        created_at TIMESTAMPTZ DEFAULT NOW(),
        updated_at TIMESTAMPTZ DEFAULT NOW(),
        last_login_at TIMESTAMPTZ,
        email_confirmed_at TIMESTAMPTZ,
        onboarding_completed BOOLEAN DEFAULT FALSE,
        preferences JSONB DEFAULT '{}',
        metadata JSONB DEFAULT '{}'
      )`,
      `CREATE TABLE IF NOT EXISTS public.customers (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
        name TEXT NOT NULL,
        email TEXT,
        phone TEXT,
        company TEXT,
        address TEXT,
        city TEXT,
        postal_code TEXT,
        country TEXT DEFAULT 'NL',
        vat_number TEXT,
        notes TEXT,
        status TEXT DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'archived')),
        created_at TIMESTAMPTZ DEFAULT NOW(),
        updated_at TIMESTAMPTZ DEFAULT NOW(),
        metadata JSONB DEFAULT '{}'
      )`,
      `CREATE TABLE IF NOT EXISTS public.invoices (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
        customer_id UUID REFERENCES public.customers(id) ON DELETE SET NULL,
        invoice_number TEXT NOT NULL,
        title TEXT NOT NULL,
        description TEXT,
        status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'sent', 'paid', 'overdue', 'cancelled')),
        subtotal DECIMAL(10,2) NOT NULL DEFAULT 0,
        tax_rate DECIMAL(5,2) DEFAULT 21.00,
        tax_amount DECIMAL(10,2) NOT NULL DEFAULT 0,
        total DECIMAL(10,2) NOT NULL DEFAULT 0,
        currency TEXT DEFAULT 'EUR',
        due_date DATE,
        sent_date TIMESTAMPTZ,
        paid_date TIMESTAMPTZ,
        payment_method TEXT,
        payment_reference TEXT,
        notes TEXT,
        terms TEXT,
        created_at TIMESTAMPTZ DEFAULT NOW(),
        updated_at TIMESTAMPTZ DEFAULT NOW(),
        metadata JSONB DEFAULT '{}'
      )`
    ];

    // Probeer de SQL statements uit te voeren via verschillende methoden
    for (let i = 0; i < sqlStatements.length; i++) {
      const sql = sqlStatements[i];
      console.log(`🔧 Attempting statement ${i + 1}/${sqlStatements.length}...`);
      
      try {
        // Methode 1: Probeer via rpc
        const { data, error } = await supabase.rpc('exec_sql', { sql: sql });
        
        if (error) {
          console.log(`⚠️  RPC failed: ${error.message}`);
          
          // Methode 2: Probeer via directe HTTP call
          try {
            const response = await fetch(`${supabaseUrl}/rest/v1/rpc/exec_sql`, {
              method: 'POST',
              headers: {
                'Authorization': `Bearer ${supabaseServiceKey}`,
                'Content-Type': 'application/json',
                'apikey': supabaseServiceKey
              },
              body: JSON.stringify({ sql: sql })
            });
            
            if (!response.ok) {
              console.log(`❌ HTTP call failed: ${response.status}`);
            } else {
              console.log(`✅ Statement ${i + 1} executed via HTTP`);
            }
          } catch (httpError) {
            console.log(`❌ HTTP error: ${httpError.message}`);
          }
        } else {
          console.log(`✅ Statement ${i + 1} executed via RPC`);
        }
      } catch (err) {
        console.log(`❌ Statement ${i + 1} failed: ${err.message}`);
      }
    }
    
    console.log('🏁 API attempt completed');
    
    // Test of het gewerkt heeft
    console.log('🔍 Testing if tables were created...');
    const { data: testData, error: testError } = await supabase
      .from('profiles')
      .select('count')
      .limit(1);
    
    if (testError) {
      console.log('❌ Tables still not accessible:', testError.message);
      console.log('');
      console.log('📋 MANUAL SETUP STILL REQUIRED:');
      console.log('Unfortunately, I cannot directly execute SQL for you.');
      console.log('You need to manually run the SQL in your Supabase dashboard.');
      console.log('');
      console.log('🎯 EASIEST SOLUTION:');
      console.log('1. Open: https://supabase.com/dashboard/project/qgyboabomydquodygomq');
      console.log('2. Find "SQL Editor" in the left menu');
      console.log('3. Copy ALL contents from step_by_step_sql.md');
      console.log('4. Paste and click "Run"');
    } else {
      console.log('🎉 SUCCESS! Tables are now accessible!');
    }
    
  } catch (err) {
    console.error('❌ Unexpected error:', err);
    console.log('📋 Manual setup required via Supabase dashboard');
  }
}

createViaAPI();