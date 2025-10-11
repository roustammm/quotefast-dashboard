import { supabase, authHelpers, handleSupabaseError, emailHelpers } from './supabase-config';
import { User } from '@supabase/supabase-js';

// Enhanced auth service with beautiful email templates and better UX
export class AuthService {
  // Sign up with email confirmation
  async signUp(email: string, password: string, userData?: any) {
    try {
      const { data, error } = await authHelpers.signUp(email, password, userData);
      
      if (error) {
        return {
          success: false,
          error: handleSupabaseError(error),
          data: null,
        };
      }

      // Send welcome email if user was created
      if (data.user && !data.user.email_confirmed_at) {
        const confirmUrl = `${process.env.NEXT_PUBLIC_APP_URL}/auth/confirm?token=${data.user.id}`;
        await emailHelpers.sendWelcomeEmail(
          email,
          userData?.full_name || 'Gebruiker',
          confirmUrl
        );
      }

      return {
        success: true,
        error: null,
        data: {
          user: data.user,
          session: data.session,
          message: 'Account aangemaakt! Controleer je e-mail voor bevestiging.',
        },
      };
    } catch (error) {
      return {
        success: false,
        error: 'Er is een onbekende fout opgetreden',
        data: null,
      };
    }
  }

  // Sign in with email and password
  async signIn(email: string, password: string) {
    try {
      const { data, error } = await authHelpers.signIn(email, password);
      
      if (error) {
        return {
          success: false,
          error: handleSupabaseError(error),
          data: null,
        };
      }

      return {
        success: true,
        error: null,
        data: {
          user: data.user,
          session: data.session,
          message: 'Succesvol ingelogd!',
        },
      };
    } catch (error) {
      return {
        success: false,
        error: 'Er is een onbekende fout opgetreden',
        data: null,
      };
    }
  }

  // Sign in with magic link
  async signInWithMagicLink(email: string) {
    try {
      const { data, error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/callback`,
        },
      });

      if (error) {
        return {
          success: false,
          error: handleSupabaseError(error),
          data: null,
        };
      }

      // Send magic link email
      const loginUrl = `${process.env.NEXT_PUBLIC_APP_URL}/auth/callback?token=${data.user?.id}`;
      await emailHelpers.sendMagicLinkEmail(
        email,
        'Gebruiker',
        loginUrl
      );

      return {
        success: true,
        error: null,
        data: {
          message: 'Inloglink verzonden! Controleer je e-mail.',
        },
      };
    } catch (error) {
      return {
        success: false,
        error: 'Er is een onbekende fout opgetreden',
        data: null,
      };
    }
  }

  // Reset password
  async resetPassword(email: string) {
    try {
      const { data, error } = await authHelpers.resetPassword(email);
      
      if (error) {
        return {
          success: false,
          error: handleSupabaseError(error),
          data: null,
        };
      }

      // Send password reset email
      const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL}/auth/reset-password?token=${data.user?.id}`;
      await emailHelpers.sendPasswordResetEmail(
        email,
        'Gebruiker',
        resetUrl
      );

      return {
        success: true,
        error: null,
        data: {
          message: 'Wachtwoord reset link verzonden! Controleer je e-mail.',
        },
      };
    } catch (error) {
      return {
        success: false,
        error: 'Er is een onbekende fout opgetreden',
        data: null,
      };
    }
  }

  // Update password
  async updatePassword(newPassword: string) {
    try {
      const { data, error } = await authHelpers.updatePassword(newPassword);
      
      if (error) {
        return {
          success: false,
          error: handleSupabaseError(error),
          data: null,
        };
      }

      // Send password changed confirmation email
      if (data.user?.email) {
        await emailHelpers.sendPasswordChangedEmail(
          data.user.email,
          data.user.user_metadata?.full_name || 'Gebruiker'
        );
      }

      return {
        success: true,
        error: null,
        data: {
          user: data.user,
          message: 'Wachtwoord succesvol gewijzigd!',
        },
      };
    } catch (error) {
      return {
        success: false,
        error: 'Er is een onbekende fout opgetreden',
        data: null,
      };
    }
  }

  // Update user profile
  async updateProfile(updates: any) {
    try {
      const { data, error } = await authHelpers.updateProfile(updates);
      
      if (error) {
        return {
          success: false,
          error: handleSupabaseError(error),
          data: null,
        };
      }

      return {
        success: true,
        error: null,
        data: {
          user: data.user,
          message: 'Profiel succesvol bijgewerkt!',
        },
      };
    } catch (error) {
      return {
        success: false,
        error: 'Er is een onbekende fout opgetreden',
        data: null,
      };
    }
  }

  // Change email address
  async changeEmail(newEmail: string) {
    try {
      const { data, error } = await supabase.auth.updateUser({
        email: newEmail,
      });
      
      if (error) {
        return {
          success: false,
          error: handleSupabaseError(error),
          data: null,
        };
      }

      // Send email change confirmation
      if (data.user?.email) {
        const confirmUrl = `${process.env.NEXT_PUBLIC_APP_URL}/auth/confirm-email?token=${data.user.id}`;
        await emailHelpers.sendEmailChangedEmail(
          newEmail,
          data.user.user_metadata?.full_name || 'Gebruiker',
          newEmail,
          confirmUrl
        );
      }

      return {
        success: true,
        error: null,
        data: {
          user: data.user,
          message: 'E-mailadres wijziging verzonden! Controleer je nieuwe e-mail.',
        },
      };
    } catch (error) {
      return {
        success: false,
        error: 'Er is een onbekende fout opgetreden',
        data: null,
      };
    }
  }

  // Sign out
  async signOut() {
    try {
      const { error } = await authHelpers.signOut();
      
      if (error) {
        return {
          success: false,
          error: handleSupabaseError(error),
        };
      }

      return {
        success: true,
        error: null,
        message: 'Succesvol uitgelogd!',
      };
    } catch (error) {
      return {
        success: false,
        error: 'Er is een onbekende fout opgetreden',
      };
    }
  }

  // Get current user
  async getCurrentUser() {
    try {
      const { user, error } = await authHelpers.getCurrentUser();
      
      if (error) {
        return {
          success: false,
          error: handleSupabaseError(error),
          data: null,
        };
      }

      return {
        success: true,
        error: null,
        data: { user },
      };
    } catch (error) {
      return {
        success: false,
        error: 'Er is een onbekende fout opgetreden',
        data: null,
      };
    }
  }

  // Get current session
  async getCurrentSession() {
    try {
      const { session, error } = await authHelpers.getCurrentSession();
      
      if (error) {
        return {
          success: false,
          error: handleSupabaseError(error),
          data: null,
        };
      }

      return {
        success: true,
        error: null,
        data: { session },
      };
    } catch (error) {
      return {
        success: false,
        error: 'Er is een onbekende fout opgetreden',
        data: null,
      };
    }
  }

  // Delete account
  async deleteAccount() {
    try {
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      
      if (userError || !user) {
        return {
          success: false,
          error: 'Gebruiker niet gevonden',
        };
      }

      // Delete user data from profiles table
      const { error: profileError } = await supabase
        .from('profiles')
        .delete()
        .eq('id', user.id);

      if (profileError) {
        console.warn('Profile deletion error:', profileError);
      }

      // Delete user from auth
      const { error: authError } = await supabase.auth.admin.deleteUser(user.id);
      
      if (authError) {
        return {
          success: false,
          error: handleSupabaseError(authError),
        };
      }

      return {
        success: true,
        error: null,
        message: 'Account succesvol verwijderd!',
      };
    } catch (error) {
      return {
        success: false,
        error: 'Er is een onbekende fout opgetreden',
      };
    }
  }

  // Verify email
  async verifyEmail(token: string) {
    try {
      const { data, error } = await supabase.auth.verifyOtp({
        token_hash: token,
        type: 'email',
      });
      
      if (error) {
        return {
          success: false,
          error: handleSupabaseError(error),
          data: null,
        };
      }

      return {
        success: true,
        error: null,
        data: {
          user: data.user,
          session: data.session,
          message: 'E-mailadres succesvol bevestigd!',
        },
      };
    } catch (error) {
      return {
        success: false,
        error: 'Er is een onbekende fout opgetreden',
        data: null,
      };
    }
  }

  // Resend confirmation email
  async resendConfirmation(email: string) {
    try {
      const { data, error } = await supabase.auth.resend({
        type: 'signup',
        email,
        options: {
          emailRedirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/callback`,
        },
      });

      if (error) {
        return {
          success: false,
          error: handleSupabaseError(error),
          data: null,
        };
      }

      return {
        success: true,
        error: null,
        data: {
          message: 'Bevestigingsmail opnieuw verzonden!',
        },
      };
    } catch (error) {
      return {
        success: false,
        error: 'Er is een onbekende fout opgetreden',
        data: null,
      };
    }
  }
}

// Create singleton instance
export const authService = new AuthService();

// Auth state management
export class AuthStateManager {
  private listeners: Array<(user: User | null) => void> = [];

  constructor() {
    // Listen for auth state changes
    supabase.auth.onAuthStateChange((event, session) => {
      this.notifyListeners(session?.user || null);
    });
  }

  // Subscribe to auth state changes
  subscribe(listener: (user: User | null) => void) {
    this.listeners.push(listener);
    
    // Return unsubscribe function
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  // Notify all listeners
  private notifyListeners(user: User | null) {
    this.listeners.forEach(listener => listener(user));
  }

  // Get current user
  async getCurrentUser() {
    const { data: { user } } = await supabase.auth.getUser();
    return user;
  }

  // Get current session
  async getCurrentSession() {
    const { data: { session } } = await supabase.auth.getSession();
    return session;
  }
}

// Create singleton instance
export const authStateManager = new AuthStateManager();

export default authService;
