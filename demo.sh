#!/bin/bash

# QuoteFast Demo Script
# Dit script toont alle features van het QuoteFast platform

echo "🚀 QuoteFast Demo Script"
echo "========================"
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is niet geïnstalleerd. Installeer Node.js eerst."
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is niet geïnstalleerd. Installeer npm eerst."
    exit 1
fi

echo "✅ Node.js en npm zijn geïnstalleerd"
echo ""

# Install dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
    echo "📦 Dependencies installeren..."
    npm install
    echo ""
fi

# Check if .env.local exists
if [ ! -f ".env.local" ]; then
    echo "⚠️  .env.local bestand niet gevonden"
    echo "📝 Kopieer env.example naar .env.local en vul je API keys in:"
    echo "   cp env.example .env.local"
    echo ""
    echo "🔑 Benodigde API keys:"
    echo "   - NEXT_PUBLIC_SUPABASE_URL"
    echo "   - NEXT_PUBLIC_SUPABASE_ANON_KEY"
    echo "   - STRIPE_SECRET_KEY"
    echo "   - NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY"
    echo "   - OPENAI_API_KEY"
    echo ""
fi

echo "🎯 Features die je kunt testen:"
echo ""
echo "1. 🏠 Landing Page (/)"
echo "   - Moderne hero sectie"
echo "   - Features overzicht"
echo "   - Pricing informatie"
echo "   - Call-to-action buttons"
echo ""

echo "2. 🔐 Authenticatie (/auth)"
echo "   - Registratie formulier"
echo "   - Login formulier"
echo "   - Wachtwoord reset"
echo "   - Google OAuth (mock)"
echo ""

echo "3. 📊 Dashboard (/dashboard)"
echo "   - Overzicht van alle modules"
echo "   - Analytics en statistieken"
echo "   - Snelle acties"
echo ""

echo "4. 💳 Billing (/dashboard/billing)"
echo "   - Abonnement beheer"
echo "   - Betaalmethoden"
echo "   - Factuurgeschiedenis"
echo "   - Plan upgrades"
echo ""

echo "5. ⚡ Features (/features)"
echo "   - Uitgebreide features lijst"
echo "   - Statistieken en social proof"
echo "   - Call-to-action sectie"
echo ""

echo "6. 💰 Pricing (/pricing)"
echo "   - Drie verschillende plannen"
echo "   - Feature vergelijking"
echo "   - FAQ sectie"
echo ""

echo "🚀 Start de development server:"
echo "   npm run dev"
echo ""
echo "🌐 Open je browser en ga naar:"
echo "   http://localhost:3000"
echo ""

echo "📱 Test de responsive design op verschillende schermformaten"
echo "🎨 Bekijk het donkere thema en moderne UI"
echo "⚡ Test de snelle navigatie tussen pagina's"
echo ""

echo "🔧 Voor productie deployment:"
echo "   1. Vul alle environment variabelen in"
echo "   2. Configureer je Supabase database"
echo "   3. Setup Stripe webhooks"
echo "   4. Deploy naar Vercel/Netlify"
echo ""

echo "✨ Veel plezier met het testen van QuoteFast!"
