import { supabase } from './supabase';

// Type definities
export interface User {
  id: string;
  email: string;
  name: string;
  company?: string;
  subscription?: {
    plan: string;
    status: string;
    currentPeriodEnd: string;
  };
}

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

      // Haal gebruikersgegevens op
      const { data: userData, error: userError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', data.user.id)
        .single();

      if (userError) {
        console.error('User data fetch error:', userError);
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
        name: userData?.full_name || '',
        company: userData?.company_name,
        subscription: userData?.subscription
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

      // Het profiel wordt automatisch aangemaakt via de database trigger
      // Wacht even en haal het profiel op
      await new Promise(resolve => setTimeout(resolve, 1000));

      const { data: userData, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', data.user.id)
        .single();

      if (profileError) {
        console.error('Profile fetch error:', profileError);
        // Het profiel bestaat mogelijk nog niet, maak het handmatig aan
        const { error: insertError } = await supabase
          .from('profiles')
          .insert([
            {
              id: data.user.id,
              email: data.user.email,
              full_name: name,
              company_name: company,
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString()
            }
          ]);

        if (insertError) {
          console.error('Profile creation error:', insertError);
          // Verwijder de gebruiker als het profiel niet kan worden aangemaakt
          await supabase.auth.admin.deleteUser(data.user.id);
          
          return {
            user: null,
            error: 'Fout bij het aanmaken van gebruikersprofiel',
            status: 500
          };
        }
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
      const { data: userData, error: userError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', data.user.id)
        .single();

      if (userError) {
        console.error('User data fetch error:', userError);
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
        name: userData?.full_name || '',
        company: userData?.company_name,
        subscription: userData?.subscription
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
      
      const { data, error } = await supabase
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