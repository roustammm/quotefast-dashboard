'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { useRouter } from 'next/navigation' // Importeren
import { createClient } from '@/lib/supabase/client' // Directe import
import { User } from '../types/user'
import { authService, AuthResponse } from '@/lib/auth-service' // Correct pad

interface AuthContextType {
  user: User | null
  loading: boolean
  login: (email: string, password: string) => Promise<void>
  register: (email: string, password: string, name: string, company?: string) => Promise<AuthResponse>
  logout: () => Promise<void> // Maak logout async
  updateUser: (userData: Partial<User>) => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Supabase client hier aanmaken
const supabase = createClient();

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter() // Router hook

  useEffect(() => {
    setLoading(true);

    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        let appUser: User | null = null;
        if (session?.user) {
          // Als er een sessie is, haal het volledige gebruikersprofiel op.
          // Dit is een goed moment om je eigen `authService` te gebruiken als die extra logica bevat.
          const { user: profile } = await authService.getCurrentUser();
          appUser = profile;
        }
        
        setUser(appUser);
        setLoading(false);

        // Optionele redirects op basis van auth event
        if (event === 'SIGNED_IN') {
          // router.push('/dashboard'); // Overweeg of dit gewenst is
        } else if (event === 'SIGNED_OUT') {
          // router.push('/');
        }
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [supabase]);

  // Login functie
  const login = async (email: string, password: string) => {
    const { user, error } = await authService.login(email, password);
    if (error) throw new Error(error);
    if (user) {
      setUser(user);
    }
    router.refresh(); // Server state vernieuwen
  }

  // Registratie functie
  const register = async (email: string, password: string, name: string, company?: string): Promise<AuthResponse> => {
    const result = await authService.register(email, password, name, company);

    // Als registratie een gebruiker teruggeeft, stel die in
    if (result.user) {
      setUser(result.user);
    }

    // router.refresh voor server state; laat de caller beslissen bij 202 (email confirm)
    router.refresh();

    return result;
  }

  // Uitlog functie
  const logout = async () => {
    const { error } = await authService.logout();
    if (error) throw new Error(error);
    setUser(null);
    router.refresh(); // Server state vernieuwen
  }

  // Gebruiker bijwerken
  const updateUser = async (userData: Partial<User>) => {
    if (!user) return
    
    setLoading(true)
    const { user: updatedUser, error } = await authService.updateUser(user.id, userData)
    
    if (error) {
      setLoading(false)
      throw new Error(error)
    }
    
    setUser(updatedUser)
    router.refresh() // Server state vernieuwen
    setLoading(false)
  }

  // Context waarde
  const value = {
    user,
    loading,
    login,
    register,
    logout,
    updateUser
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

// Hook om de auth context te gebruiken
export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

