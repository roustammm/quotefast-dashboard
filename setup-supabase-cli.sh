#!/bin/bash

# Supabase CLI Setup Script for QuoteFast Dashboard
echo "🔧 Setting up Supabase CLI..."

# Check if Supabase CLI is installed
if ! command -v supabase &> /dev/null; then
    echo "📦 Installing Supabase CLI..."
    
    # Install Supabase CLI based on OS
    if [[ "$OSTYPE" == "darwin"* ]]; then
        # macOS
        if command -v brew &> /dev/null; then
            brew install supabase/tap/supabase
        else
            echo "❌ Homebrew not found. Please install Homebrew first or install Supabase CLI manually."
            echo "Visit: https://supabase.com/docs/guides/cli/getting-started"
            exit 1
        fi
    elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
        # Linux
        curl -fsSL https://supabase.com/install.sh | sh
    else
        echo "❌ Unsupported OS. Please install Supabase CLI manually."
        echo "Visit: https://supabase.com/docs/guides/cli/getting-started"
        exit 1
    fi
else
    echo "✅ Supabase CLI already installed"
fi

# Check if user is logged in
if ! supabase projects list &> /dev/null; then
    echo "🔐 Please login to Supabase CLI:"
    echo "Run: supabase login"
    echo "Then run this script again."
    exit 1
fi

echo "✅ Supabase CLI setup complete!"
echo ""
echo "🚀 Available Supabase CLI commands:"
echo "- supabase projects list          # List your projects"
echo "- supabase db pull                # Pull database schema"
echo "- supabase db push                # Push local changes"
echo "- supabase gen types typescript   # Generate TypeScript types"
echo "- supabase start                  # Start local development"
echo "- supabase stop                   # Stop local development"
echo ""
echo "📚 For more commands: supabase --help"
