import { createPagesBrowserClient } from '@supabase/auth-helpers-nextjs';
import { createClient } from '@supabase/supabase-js';

// Supabase configuration with fallbacks and validation
const getSupabaseConfig = () => {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  // In development, provide helpful warnings instead of throwing errors
  if (!url) {
    console.warn('⚠️ NEXT_PUBLIC_SUPABASE_URL is missing from environment variables');
    console.warn('Run: npm run setup:env');
    return null;
  }
  
  if (!anonKey) {
    console.warn('⚠️ NEXT_PUBLIC_SUPABASE_ANON_KEY is missing from environment variables');
    console.warn('Run: npm run setup:env');
    return null;
  }

  if (process.env.NODE_ENV === 'production' && !serviceRoleKey) {
    throw new Error('SUPABASE_SERVICE_ROLE_KEY is missing from environment variables for production');
  }

  return {
    url,
    anonKey,
    serviceRoleKey: serviceRoleKey,
  };
};

const supabaseConfig = getSupabaseConfig();

// Enhanced client-side Supabase client with fallback
export const supabase = (() => {
  if (!supabaseConfig) {
    // Return a mock client that will show helpful error messages
    return createClient(
      'https://placeholder.supabase.co',
      'placeholder-key',
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false,
        },
      }
    );
  }

  return createPagesBrowserClient({
    supabaseUrl: supabaseConfig.url,
    supabaseKey: supabaseConfig.anonKey,
  });
})();

// Server-side Supabase client for API routes
export const createServerSupabaseClient = () => {
  if (!supabaseConfig) {
    throw new Error('Supabase configuration is missing. Run: npm run setup:env');
  }

  if (!supabaseConfig.serviceRoleKey) {
    // In development, you might not have a service role key.
    // You can either use the anon key or throw an error.
    // Using anon key for development is fine, but not for production.
    if (process.env.NODE_ENV !== 'production') {
      return createClient(supabaseConfig.url, supabaseConfig.anonKey);
    }
    throw new Error('SUPABASE_SERVICE_ROLE_KEY is required for server-side clients');
  }
  return createClient(supabaseConfig.url, supabaseConfig.serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
};

// Admin client for server-side operations (lazy initialization)
export const getSupabaseAdmin = () => {
  if (typeof window !== 'undefined') {
    throw new Error('Supabase admin client should only be used on the server-side');
  }

  if (!supabaseConfig) {
    throw new Error('Supabase configuration is missing. Run: npm run setup:env');
  }

  if (!supabaseConfig.serviceRoleKey) {
    throw new Error('SUPABASE_SERVICE_ROLE_KEY is required for admin client. Run: npm run setup:env');
  }

  return createClient(
    supabaseConfig.url,
    supabaseConfig.serviceRoleKey,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    }
  );
};

// For backward compatibility, but should be avoided in client-side code
export const supabaseAdmin = (() => {
  if (typeof window !== 'undefined') {
    // Return a mock client for client-side to prevent errors
    return createClient(
      'https://placeholder.supabase.co',
      'placeholder-key',
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false,
        },
      }
    );
  }
  
  return getSupabaseAdmin();
})();

// Auth helper functions
export const authHelpers = {
  // Sign up with email
  async signUp(email: string, password: string, metadata?: any) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: metadata,
        emailRedirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/callback`,
      },
    });
    return { data, error };
  },

  // Sign in with email
  async signIn(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    return { data, error };
  },

  // Sign out
  async signOut() {
    const { error } = await supabase.auth.signOut();
    return { error };
  },

  // Reset password
  async resetPassword(email: string) {
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/reset-password`,
    });
    return { data, error };
  },

  // Update password
  async updatePassword(newPassword: string) {
    const { data, error } = await supabase.auth.updateUser({
      password: newPassword,
    });
    return { data, error };
  },

  // Update user profile
  async updateProfile(updates: any) {
    const { data, error } = await supabase.auth.updateUser({
      data: updates,
    });
    return { data, error };
  },

  // Get current user
  async getCurrentUser() {
    const { data: { user }, error } = await supabase.auth.getUser();
    return { user, error };
  },

  // Get current session
  async getCurrentSession() {
    const { data: { session }, error } = await supabase.auth.getSession();
    return { session, error };
  },
};

// Database helper functions
export const dbHelpers = {
  // Get user profile
  async getUserProfile(userId: string) {
    const { data, error } = await (supabase as any)
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();
    return { data, error };
  },

  // Update user profile
  async updateUserProfile(userId: string, updates: any) {
    const { data, error } = await (supabase as any)
      .from('profiles')
      .update(updates)
      .eq('id', userId)
      .select()
      .single();
    return { data, error };
  },

  // Create user profile
  async createUserProfile(userId: string, profileData: any) {
    const { data, error } = await (supabase as any)
      .from('profiles')
      .insert({
        id: userId,
        ...profileData,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .select()
      .single();
    return { data, error };
  },
};

// Error handling
export const handleSupabaseError = (error: any) => {
  console.error('Supabase Error:', error);
  
  // Common error messages in Dutch
  const errorMessages: { [key: string]: string } = {
    'Invalid login credentials': 'Ongeldige inloggegevens',
    'Email not confirmed': 'E-mailadres niet bevestigd',
    'User already registered': 'Gebruiker is al geregistreerd',
    'Password should be at least 6 characters': 'Wachtwoord moet minimaal 6 tekens bevatten',
    'Unable to validate email address': 'Kan e-mailadres niet valideren',
    'Email rate limit exceeded': 'Te veel e-mails verzonden, probeer het later opnieuw',
    'Invalid email': 'Ongeldig e-mailadres',
    'Password reset request limit exceeded': 'Te veel wachtwoord reset verzoeken, probeer het later opnieuw',
  };

  return errorMessages[error.message] || error.message || 'Er is een onbekende fout opgetreden';
};