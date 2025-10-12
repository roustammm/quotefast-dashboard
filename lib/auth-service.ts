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

// Authenticatie service met verbeterde error handling en sessie management
export const authService = {
  // Inloggen met email en wachtwoord
  login: async (email: string, password: string): Promise<AuthResponse> => {
    try {
      // Validatie
      if (!email || !password) {
        return {
          user: null,
          error: 'Email en wachtwoord zijn verplicht',
          status: 400
        };
      }

      // Inloggen bij Supabase
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) {
        console.error('Login error:', error);
        
        // Gebruiksvriendelijke foutmeldingen
        if (error.message.includes('Invalid login credentials')) {
          return {
            user: null,
            error: 'Ongeldige inloggegevens. Controleer je email en wachtwoord.',
            status: 401
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

      // Haal gebruikersgegevens op met fallback voor ontbrekende profielen
      const userData = await authService.getOrCreateUserProfile(data.user.id, data.user.email || '', data.user.user_metadata);

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
      console.error('Unexpected login error:', error);
      return {
        user: null,
        error: 'Er is een onverwachte fout opgetreden bij het inloggen',
        status: 500
      };
    }
  },

  // Registreren van een nieuwe gebruiker
  register: async (email: string, password: string, name: string, company?: string): Promise<AuthResponse> => {
    try {
      // Validatie
      if (!email || !password || !name) {
        return {
          user: null,
          error: 'Email, wachtwoord en naam zijn verplicht',
          status: 400
        };
      }

      // Registreren bij Supabase
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: name,
            company_name: company
          }
        }
      });

      if (error) {
        console.error('Registration error:', error);
        
        // Gebruiksvriendelijke foutmeldingen
        if (error.message.includes('already registered')) {
          return {
            user: null,
            error: 'Dit emailadres is al geregistreerd. Probeer in te loggen.',
            status: 409
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
          error: 'Registratie mislukt. Probeer het later opnieuw.',
          status: 500
        };
      }

      // Wacht even voor de database trigger (nu langer omdat we niet meer handmatig aanmaken)
      await new Promise(resolve => setTimeout(resolve, 3000));

      // Probeer het profiel op te halen of aan te maken
      const userData = await authService.getOrCreateUserProfile(data.user.id, data.user.email || '', { full_name: name, company_name: company });

      if (!userData) {
        return {
          user: null,
          error: 'Fout bij het aanmaken van gebruikersprofiel',
          status: 500
        };
      }

      // Stel gebruiker samen
      const user: User = {
        id: data.user.id,
        email: data.user.email || '',
        name,
        company
      };

      return {
        user,
        error: null,
        status: 200
      };
    } catch (error: any) {
      console.error('Unexpected registration error:', error);
      return {
        user: null,
        error: 'Er is een onverwachte fout opgetreden bij het registreren',
        status: 500
      };
    }
  },

  // Helper functie om profiel op te halen of aan te maken
  getOrCreateUserProfile: async (userId: string, email: string, metadata?: any) => {
    try {
      // Wacht even voor de database trigger om het profile aan te maken
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Probeer het profiel op te halen (trigger zou het moeten hebben aangemaakt)
      const { data: userData, error: userError } = await (supabase as any)
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (userError) {
        console.error('User data fetch error:', userError);
        
        // Als het profiel nog steeds niet bestaat na de trigger, wacht langer en probeer opnieuw
        if (userError.code === 'PGRST116') {
          logger.info('Profile not found, waiting for trigger...', 'auth');
          await new Promise(resolve => setTimeout(resolve, 3000));
          
          const { data: retryData, error: retryError } = await (supabase as any)
            .from('profiles')
            .select('*')
            .eq('id', userId)
            .single();
            
          if (retryError) {
            console.error('Profile still not found after trigger wait:', retryError);
            return null;
          }
          
          return retryData;
        }
        
        return null;
      }

      return userData;
    } catch (error) {
      console.error('Error in getOrCreateUserProfile:', error);
      return null;
    }
  },

  // Uitloggen
  logout: async (): Promise<{ error: string | null }> => {
    try {
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        console.error('Logout error:', error);
        return { error: error.message };
      }
      
      return { error: null };
    } catch (error: any) {
      console.error('Unexpected logout error:', error);
      return { error: 'Er is een fout opgetreden bij het uitloggen' };
    }
  },

  // Huidige gebruiker ophalen
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

      // Haal gebruikersgegevens op
      const userData = await authService.getOrCreateUserProfile(data.user.id, data.user.email || '', data.user.user_metadata);

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
      console.error('Unexpected getCurrentUser error:', error);
      return {
        user: null,
        error: 'Er is een fout opgetreden bij het ophalen van de gebruiker',
        status: 500
      };
    }
  },

  // Gebruikersgegevens bijwerken
  updateUser: async (userId: string, userData: Partial<User>): Promise<AuthResponse> => {
    try {
      // Validatie
      if (!userId) {
        return {
          user: null,
          error: 'Gebruikers-ID is verplicht',
          status: 400
        };
      }

      // Update gebruikersgegevens
      const updateData = {
        full_name: userData.name,
        company_name: userData.company,
        updated_at: new Date().toISOString(),
        ...userData
      };
      delete updateData.name;
      delete updateData.company;
      
      const { data, error } = await (supabase as any)
        .from('profiles')
        .update(updateData)
        .eq('id', userId)
        .select()
        .single();

      if (error) {
        console.error('User update error:', error);
        return {
          user: null,
          error: error.message,
          status: 500
        };
      }

      // Stel bijgewerkte gebruiker samen
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
      console.error('Unexpected updateUser error:', error);
      return {
        user: null,
        error: 'Er is een onverwachte fout opgetreden bij het bijwerken van de gebruiker',
        status: 500
      };
    }
  },

  // Wachtwoord reset
  resetPassword: async (email: string): Promise<{ error: string | null }> => {
    try {
      // Validatie
      if (!email) {
        return { error: 'Email is verplicht' };
      }

      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (error) {
        console.error('Password reset error:', error);
        return { error: error.message };
      }

      return { error: null };
    } catch (error: any) {
      console.error('Unexpected password reset error:', error);
      return { error: 'Er is een fout opgetreden bij het resetten van het wachtwoord' };
    }
  },

  // Wachtwoord wijzigen
  updatePassword: async (password: string): Promise<{ error: string | null }> => {
    try {
      // Validatie
      if (!password || password.length < 6) {
        return { error: 'Wachtwoord moet minimaal 6 tekens bevatten' };
      }

      const { error } = await supabase.auth.updateUser({
        password
      });

      if (error) {
        console.error('Password update error:', error);
        return { error: error.message };
      }

      return { error: null };
    } catch (error: any) {
      console.error('Unexpected password update error:', error);
      return { error: 'Er is een fout opgetreden bij het wijzigen van het wachtwoord' };
    }
  }
};
