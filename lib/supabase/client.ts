import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  // Fallback voor development zonder environment variabelen
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://qgyboabomydquodygomq.supabase.co'
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFneWJvYWJvbXlkcXVvZHlnb21xIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzE3NzQ4MDAsImV4cCI6MjA0NzM1MDgwMH0.placeholder_key'

  return createBrowserClient(
    supabaseUrl,
    supabaseKey
  )
}

// Server-side client voor API routes
export function createServerClient() {
  const { createServerClient } = require('@supabase/ssr')
  const { cookies } = require('next/headers')
  
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookies().getAll()
        },
        setAll(cookiesToSet: any[]) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookies().set(name, value, options)
            )
          } catch {
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    }
  )
}