const { createClient } = require('@supabase/supabase-js');

// Load environment variables
require('dotenv').config({ path: '.env.local' });
require('dotenv').config();

console.log('🧪 Eenvoudige Supabase Connectie Test\n');

async function testConnection() {
  try {
    // Check environment variables
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    console.log('1️⃣ Environment variabelen controleren...');
    
    if (!supabaseUrl) {
      console.error('❌ NEXT_PUBLIC_SUPABASE_URL ontbreekt');
      console.log('💡 Maak een .env.local bestand aan met je Supabase URL');
      return;
    }
    
    if (!supabaseAnonKey) {
      console.error('❌ NEXT_PUBLIC_SUPABASE_ANON_KEY ontbreekt');
      console.log('💡 Voeg je Supabase anon key toe aan .env.local');
      return;
    }

    console.log('✅ Environment variabelen gevonden');
    console.log(`   URL: ${supabaseUrl}`);
    console.log(`   Key: ${supabaseAnonKey.substring(0, 20)}...`);

    // Create Supabase client
    console.log('\n2️⃣ Supabase client aanmaken...');
    const supabase = createClient(supabaseUrl, supabaseAnonKey);
    console.log('✅ Supabase client aangemaakt');

    // Test basic connection
    console.log('\n3️⃣ Database connectie testen...');
    
    // Try to access auth (this should always work)
    const { data: authData, error: authError } = await supabase.auth.getSession();
    
    if (authError) {
      console.error('❌ Auth connectie fout:', authError.message);
      return;
    }
    
    console.log('✅ Auth connectie werkt');

    // Try to access profiles table
    console.log('\n4️⃣ Profiles tabel controleren...');
    const { data: profilesData, error: profilesError } = await supabase
      .from('profiles')
      .select('count')
      .limit(1);

    if (profilesError) {
      console.error('❌ Profiles tabel fout:', profilesError.message);
      
      if (profilesError.message.includes('relation "public.profiles" does not exist')) {
        console.log('\n🔧 Database tabellen ontbreken!');
        console.log('   Run: node quick_database_fix.js');
        console.log('   Of voer ONE_CLICK_SETUP.sql uit in Supabase');
      } else if (profilesError.message.includes('permission denied')) {
        console.log('\n🔒 Toegang geweigerd - dit is normaal voor lege databases');
        console.log('   De connectie werkt, maar er zijn nog geen tabellen');
      }
      
      return;
    }

    console.log('✅ Profiles tabel toegankelijk');

    // Success!
    console.log('\n🎉 ALLE TESTS GESLAAGD!');
    console.log('✅ Environment variabelen correct');
    console.log('✅ Supabase connectie werkt');
    console.log('✅ Database tabellen bestaan');
    console.log('\n🚀 Je kunt nu je app starten: npm run dev');

  } catch (error) {
    console.error('\n❌ Onverwachte fout:', error.message);
    
    if (error.message.includes('Invalid API key')) {
      console.log('\n🔑 Je Supabase API key is ongeldig');
      console.log('   Check je .env.local bestand');
      console.log('   Haal je keys op van: https://supabase.com/dashboard');
    } else if (error.message.includes('fetch')) {
      console.log('\n🌐 Netwerk connectie probleem');
      console.log('   Check je internetverbinding');
      console.log('   Controleer of de Supabase URL correct is');
    }
  }
}

// Run the test
testConnection().catch(console.error);
