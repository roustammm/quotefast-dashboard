'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { errorHandler, ErrorType } from '../lib/errorHandler'
import { OnboardingData } from '../lib/onboarding'

// Utility functions for cookie management (kept for backwards compatibility)
const setCookie = (name: string, value: string, days: number = 7) => {
  const expires = new Date()
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000)
  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`
}

const getCookie = (name: string): string | null => {
  const value = `; ${document.cookie}`
  const parts = value.split(`; ${name}=`)
  if (parts.length === 2) return parts.pop()?.split(';').shift() || null
  return null
}

const deleteCookie = (name: string) => {
  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`
}

interface User {
  id: string
  email: string
  name: string
  company?: string
  subscription?: {
    plan: string
    status: string
    currentPeriodEnd: string
  }
}

interface AuthContextType {
  user: User | null
  loading: boolean
  login: (email: string, password: string) => Promise<void>
  register: (email: string, password: string, name: string, company?: string) => Promise<void>
  logout: () => void
  updateUser: (userData: Partial<User>) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const supabase = createClientComponentClient()

  useEffect(() => {
    // Check if user is logged in
    const checkAuth = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession()
        
        if (error) {
          errorHandler.log(errorHandler.auth('Session check failed', 'SESSION_ERROR', error))
          setUser(null)
          return
        }

        if (session?.user) {
          // Map Supabase user to our User type
          setUser({
            id: session.user.id,
            email: session.user.email || '',
            name: session.user.user_metadata?.name || session.user.email?.split('@')[0] || 'User',
            company: session.user.user_metadata?.company,
            subscription: {
              plan: session.user.user_metadata?.subscription_plan || 'Starter',
              status: 'active',
              currentPeriodEnd: session.user.user_metadata?.subscription_end || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
            }
          })
        } else {
          setUser(null)
        }
      } catch (error) {
        errorHandler.log(error as Error, { context: 'AuthProvider.checkAuth' })
        setUser(null)
      } finally {
        setLoading(false)
      }
    }

    checkAuth()

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUser({
          id: session.user.id,
          email: session.user.email || '',
          name: session.user.user_metadata?.name || session.user.email?.split('@')[0] || 'User',
          company: session.user.user_metadata?.company,
          subscription: {
            plan: session.user.user_metadata?.subscription_plan || 'Starter',
            status: 'active',
            currentPeriodEnd: session.user.user_metadata?.subscription_end || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
          }
        })
      } else {
        setUser(null)
      }
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [supabase])

  const login = async (email: string, password: string): Promise<void> => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        errorHandler.log(errorHandler.auth('Login failed', 'LOGIN_ERROR', error))
        
        // Provide specific error messages
        if (error.message.includes('Invalid login credentials')) {
          throw errorHandler.auth('Ongeldige inloggegevens. Controleer je email en wachtwoord.')
        } else if (error.message.includes('Email not confirmed')) {
          throw errorHandler.auth('Je email is nog niet bevestigd. Controleer je inbox.')
        } else {
          throw errorHandler.auth('Inloggen mislukt. Probeer het later opnieuw.')
        }
      }

      if (data.user) {
        setUser({
          id: data.user.id,
          email: data.user.email || '',
          name: data.user.user_metadata?.name || data.user.email?.split('@')[0] || 'User',
          company: data.user.user_metadata?.company,
          subscription: {
            plan: data.user.user_metadata?.subscription_plan || 'Starter',
            status: 'active',
            currentPeriodEnd: data.user.user_metadata?.subscription_end || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
          }
        })
      }
    } catch (error) {
      errorHandler.log(error as Error, { context: 'AuthProvider.login', email })
      throw error
    }
  }

  const register = async (email: string, password: string, name: string, company?: string, onboardingData?: OnboardingData): Promise<void> => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
            company,
            subscription_plan: 'Starter',
            subscription_end: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
            ...(onboardingData && {
              onboarding: {
                ...onboardingData,
                completedAt: new Date().toISOString()
              }
            })
          },
          emailRedirectTo: `${window.location.origin}/dashboard`
        }
      })

      if (error) {
        errorHandler.log(errorHandler.auth('Registration failed', 'REGISTER_ERROR', error))
        
        // Provide specific error messages
        if (error.message.includes('already registered')) {
          throw errorHandler.auth('Dit email adres is al geregistreerd. Probeer in te loggen.')
        } else if (error.message.includes('Password')) {
          throw errorHandler.validation('Wachtwoord moet minimaal 6 karakters bevatten.')
        } else {
          throw errorHandler.auth('Registratie mislukt. Probeer het later opnieuw.')
        }
      }

      if (data.user) {
        setUser({
          id: data.user.id,
          email: data.user.email || '',
          name,
          company,
          subscription: {
            plan: 'Starter',
            status: 'active',
            currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
          }
        })
      }
    } catch (error) {
      errorHandler.log(error as Error, { context: 'AuthProvider.register', email })
      throw error
    }
  }

  const logout = async (): Promise<void> => {
    try {
      const { error } = await supabase.auth.signOut()
      
      if (error) {
        errorHandler.log(errorHandler.auth('Logout failed', 'LOGOUT_ERROR', error))
      }
      
      setUser(null)
      deleteCookie('auth-token') // Cleanup legacy cookie
    } catch (error) {
      errorHandler.log(error as Error, { context: 'AuthProvider.logout' })
      // Still clear user state even if logout fails
      setUser(null)
    }
  }

  const updateUser = (userData: Partial<User>) => {
    if (user) {
      setUser({ ...user, ...userData })
    }
  }

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      login,
      register,
      logout,
      updateUser
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

