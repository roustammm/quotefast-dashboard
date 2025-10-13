import { createClient } from '@/lib/supabase/client';
import { logger } from './logger';
import { User } from '../types/user';

const supabase = createClient();

// Type definities
export interface AuthResponse {
  user: User | null;
  error: string | null;
  status: number;
}

// Authenticatie service met moderne Supabase implementatie
export const authService = {
  // 🔐 INLOGGEN - Moderne implementatie
  login: async (email: string, password: string): Promise<AuthResponse> => {
    try {
      console.log('🔐 Attempting login for:', email);
      
      // Validatie
      if (!email || !password) {
        return {
          user: null,
          error: 'Email en wachtwoord zijn verplicht',
          status: 400
        };
      }

      // Moderne Supabase login
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim().toLowerCase(),
        password
      });

      if (error) {
        console.error('❌ Login error:', error);
        
        // Gebruiksvriendelijke foutmeldingen
        if (error.message.includes('Invalid login credentials')) {
          return {
            user: null,
            error: 'Ongeldige inloggegevens. Controleer je email en wachtwoord.',
            status: 401
          };
        }
        
        if (error.message.includes('Email not confirmed')) {
          return {
            user: null,
            error: 'Je email is nog niet bevestigd. Controleer je inbox.',
            status: 403
          };
        }
        
        return {
          user: null,
          error: error.message,
          status: error.status || 500
        };
      }

      if (!data.user) {
        return {
          user: null,
          error: 'Inloggen mislukt. Probeer het later opnieuw.',
          status: 500
        };
      }

      console.log('✅ Login successful for user:', data.user.id);

      // Haal gebruikersprofiel op
      const userData = await authService.getUserProfile(data.user.id);

      if (!userData) {
        return {
          user: null,
          error: 'Fout bij het ophalen van gebruikersgegevens',
          status: 500
        };
      }

      // Stel gebruiker samen
      const user: User = {
        id: data.user.id,
        email: data.user.email || '',
        name: userData.full_name || '',
        company: userData.company_name,
        subscription: userData.subscription
      };

      return {
        user,
        error: null,
        status: 200
      };
    } catch (error: any) {
      console.error('💥 Unexpected login error:', error);
      return {
        user: null,
        error: 'Er is een onverwachte fout opgetreden bij het inloggen',
        status: 500
      };
    }
  },

  // 📝 REGISTREREN - Moderne implementatie
  register: async (email: string, password: string, name: string, company?: string): Promise<AuthResponse> => {
    try {
      console.log('📝 Attempting registration for:', email);
      
      // Validatie
      if (!email || !password || !name) {
        return {
          user: null,
          error: 'Email, wachtwoord en naam zijn verplicht',
          status: 400
        };
      }

      if (password.length < 8) {
        return {
          user: null,
          error: 'Wachtwoord moet minimaal 8 karakters bevatten',
          status: 400
        };
      }

      // Moderne Supabase registratie
      const { data, error } = await supabase.auth.signUp({
        email: email.trim().toLowerCase(),
        password,
        options: {
          data: {
            full_name: name.trim(),
            company_name: company?.trim()
          }
        }
      });

      if (error) {
        console.error('❌ Registration error:', error);
        
        // Gebruiksvriendelijke foutmeldingen
        if (error.message.includes('already registered') || error.message.includes('already been registered')) {
          return {
            user: null,
            error: 'Dit emailadres is al geregistreerd. Probeer in te loggen.',
            status: 409
          };
        }
        
        if (error.message.includes('Password should be at least')) {
          return {
            user: null,
            error: 'Wachtwoord moet minimaal 8 karakters bevatten',
            status: 400
          };
        }
        
        return {
          user: null,
          error: error.message,
          status: error.status || 500
        };
      }

      console.log('✅ Registration successful for user:', data.user?.id);

      // Als email bevestiging vereist is
      if (!data.user) {
        return {
          user: null,
          error: 'Registratie succesvol! Controleer je e-mail om je account te activeren.',
          status: 202
        };
      }

      // Wacht even voor database trigger
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Haal gebruikersprofiel op
      const userData = await authService.getUserProfile(data.user.id);

      if (!userData) {
        return {
          user: null,
          error: 'Account aangemaakt, maar profiel kon niet worden opgehaald. Probeer opnieuw in te loggen.',
          status: 201
        };
      }

      // Stel gebruiker samen
      const user: User = {
        id: data.user.id,
        email: data.user.email || '',
        name: userData.full_name || name,
        company: userData.company_name || company
      };

      return {
        user,
        error: null,
        status: 200
      };
    } catch (error: any) {
      console.error('💥 Unexpected registration error:', error);
      return {
        user: null,
        error: 'Er is een onverwachte fout opgetreden bij het registreren',
        status: 500
      };
    }
  },

  // 👤 GEBRUIKERSPROFIEL OPHALEN
  getUserProfile: async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        console.error('❌ Profile fetch error:', error);
        return null;
      }

      return data;
    } catch (error) {
      console.error('💥 Profile fetch unexpected error:', error);
      return null;
    }
  },

  // 🚪 UITLOGGEN
  logout: async (): Promise<{ error: string | null }> => {
    try {
      console.log('🚪 Logging out user');
      
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        console.error('❌ Logout error:', error);
        return { error: error.message };
      }
      
      console.log('✅ Logout successful');
      return { error: null };
    } catch (error: any) {
      console.error('💥 Unexpected logout error:', error);
      return { error: 'Er is een fout opgetreden bij het uitloggen' };
    }
  },

  // 🔍 HUIDIGE GEBRUIKER OPHALEN
  getCurrentUser: async (): Promise<AuthResponse> => {
    try {
      const { data, error } = await supabase.auth.getUser();
      
      if (error || !data.user) {
        return {
          user: null,
          error: error?.message || 'Geen gebruiker gevonden',
          status: 401
        };
      }

      // Haal gebruikersprofiel op
      const userData = await authService.getUserProfile(data.user.id);

      if (!userData) {
        return {
          user: null,
          error: 'Fout bij het ophalen van gebruikersgegevens',
          status: 500
        };
      }

      // Stel gebruiker samen
      const user: User = {
        id: data.user.id,
        email: data.user.email || '',
        name: userData.full_name || '',
        company: userData.company_name,
        subscription: userData.subscription
      };

      return {
        user,
        error: null,
        status: 200
      };
    } catch (error: any) {
      console.error('💥 Unexpected getCurrentUser error:', error);
      return {
        user: null,
        error: 'Er is een fout opgetreden bij het ophalen van de gebruiker',
        status: 500
      };
    }
  },

  // ✏️ GEBRUIKER BIJWERKEN
  updateUser: async (userId: string, userData: Partial<User>): Promise<AuthResponse> => {
    try {
      if (!userId) {
        return {
          user: null,
          error: 'Gebruikers-ID is verplicht',
          status: 400
        };
      }

      const updateData = {
        full_name: userData.name,
        company_name: userData.company,
        updated_at: new Date().toISOString()
      };
      
      const { data, error } = await supabase
        .from('profiles')
        .update(updateData)
        .eq('id', userId)
        .select()
        .single();

      if (error) {
        console.error('❌ User update error:', error);
        return {
          user: null,
          error: error.message,
          status: 500
        };
      }

      const user: User = {
        id: data.id,
        email: data.email,
        name: data.full_name,
        company: data.company_name,
        subscription: data.subscription
      };

      return {
        user,
        error: null,
        status: 200
      };
    } catch (error: any) {
      console.error('💥 Unexpected updateUser error:', error);
      return {
        user: null,
        error: 'Er is een onverwachte fout opgetreden bij het bijwerken van de gebruiker',
        status: 500
      };
    }
  },

  // 🔑 WACHTWOORD RESET
  resetPassword: async (email: string): Promise<{ error: string | null }> => {
    try {
      if (!email) {
        return { error: 'Email is verplicht' };
      }

      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/reset-password`,
      });

      if (error) {
        console.error('❌ Password reset error:', error);
        return { error: error.message };
      }

      return { error: null };
    } catch (error: any) {
      console.error('💥 Unexpected password reset error:', error);
      return { error: 'Er is een fout opgetreden bij het resetten van het wachtwoord' };
    }
  }
};