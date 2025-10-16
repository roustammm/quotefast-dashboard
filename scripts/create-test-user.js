// Script om een test gebruiker aan te maken voor development
// Gebruik dit om snel een gebruiker te hebben voor testing

const { createClient } = require('@supabase/supabase-js')

// Supabase configuratie (gebruik dezelfde als in je .env.local)
const supabaseUrl = 'https://qgyboabomydquodygomq.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFneWJvYWJvbXlkcXVvZHlnb21xIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzE3NzQ4MDAsImV4cCI6MjA0NzM1MDgwMH0.placeholder_key_replace_with_real'

const supabase = createClient(supabaseUrl, supabaseKey)

async function createTestUser() {
  console.log('🔄 Test gebruiker aanmaken...')

  const testUser = {
    email: 'test@quotefast.nl',
    password: 'testpassword123',
    full_name: 'Test Gebruiker',
    company_name: 'QuoteFast Demo'
  }

  try {
    // 1. Gebruiker registreren
    const { data, error } = await supabase.auth.signUp({
      email: testUser.email,
      password: testUser.password,
      options: {
        data: {
          full_name: testUser.full_name,
          company_name: testUser.company_name
        }
      }
    })

    if (error) {
      console.error('❌ Fout bij registreren:', error.message)
      return
    }

    console.log('✅ Gebruiker geregistreerd:', data.user?.email)

    // 2. Wacht even voor de database trigger
    await new Promise(resolve => setTimeout(resolve, 2000))

    // 3. Probeer in te loggen om te bevestigen dat alles werkt
    const { data: loginData, error: loginError } = await supabase.auth.signInWithPassword({
      email: testUser.email,
      password: testUser.password
    })

    if (loginError) {
      console.log('⚠️  Inloggen mislukt (mogelijk vanwege email bevestiging):', loginError.message)
      console.log('💡 Gebruik deze gegevens om handmatig in te loggen:')
    } else {
      console.log('✅ Inloggen succesvol!')
    }

    console.log('\n📋 Test gebruiker gegevens:')
    console.log('Email:', testUser.email)
    console.log('Wachtwoord:', testUser.password)
    console.log('Naam:', testUser.full_name)

  } catch (error) {
    console.error('❌ Onverwachte fout:', error)
  }
}

// Voer het script uit
createTestUser()
