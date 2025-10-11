import { createClient } from '@supabase/supabase-js';

// Supabase configuration with enhanced settings
export const supabaseConfig = {
  url: process.env.NEXT_PUBLIC_SUPABASE_URL!,
  anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  serviceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY!,
};

// Client-side Supabase client
export const supabase = createClient(
  supabaseConfig.url,
  supabaseConfig.anonKey,
  {
    auth: {
      // Enhanced auth settings
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true,
      flowType: 'pkce',
    },
    // Global settings
    global: {
      headers: {
        'X-Client-Info': 'dashboard-starter@1.0.0',
      },
    },
    // Real-time settings
    realtime: {
      params: {
        eventsPerSecond: 10,
      },
    },
  }
);

// Server-side Supabase client for API routes
export const createServerSupabaseClient = () => {
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

// Admin client for server-side operations
export const supabaseAdmin = createClient(
  supabaseConfig.url,
  supabaseConfig.serviceRoleKey,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  }
);

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
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();
    return { data, error };
  },

  // Update user profile
  async updateUserProfile(userId: string, updates: any) {
    const { data, error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', userId)
      .select()
      .single();
    return { data, error };
  },

  // Create user profile
  async createUserProfile(userId: string, profileData: any) {
    const { data, error } = await supabase
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

// Storage helper functions
export const storageHelpers = {
  // Upload file
  async uploadFile(bucket: string, path: string, file: File) {
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(path, file);
    return { data, error };
  },

  // Get public URL
  getPublicUrl(bucket: string, path: string) {
    const { data } = supabase.storage
      .from(bucket)
      .getPublicUrl(path);
    return data.publicUrl;
  },

  // Delete file
  async deleteFile(bucket: string, path: string) {
    const { data, error } = await supabase.storage
      .from(bucket)
      .remove([path]);
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

// Email helper functions
export const emailHelpers = {
  // Send welcome email
  async sendWelcomeEmail(email: string, name: string) {
    // This would typically integrate with your email service
    console.log(`Welcome email sent to ${email} for ${name}`);
    return { success: true };
  },

  // Send password reset email
  async sendPasswordResetEmail(email: string) {
    console.log(`Password reset email sent to ${email}`);
    return { success: true };
  },

  // Send email confirmation
  async sendEmailConfirmation(email: string) {
    console.log(`Email confirmation sent to ${email}`);
    return { success: true };
  },
};

export default supabase;
