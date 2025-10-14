/* Simplified AuthContext without Supabase dependencies */

'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'react-hot-toast'

type User = {
  id: string
  email: string
  full_name: string | null
  avatar_url: string | null
}

type AuthContextType = {
  user: User | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<void>
  signUp: (email: string, password: string, fullName: string) => Promise<void>
  signOut: () => Promise<void>
  updateProfile: (updates: Partial<User>) => Promise<void>
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  // Initialize auth state (simplified)
  useEffect(() => {
    const initAuth = async () => {
      try {
        setLoading(true)
        // Simple mock auth - check localStorage for user
        const savedUser = localStorage.getItem('user')
        if (savedUser) {
          setUser(JSON.parse(savedUser))
        }
      } catch (error) {
        console.error('Auth initialization error:', error)
      } finally {
        setLoading(false)
      }
    }

    initAuth()
  }, [])

  // Sign in function
  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true)
      // Mock authentication
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const mockUser: User = {
        id: 'user123',
        email,
        full_name: 'Test User',
        avatar_url: null
      }
      
      setUser(mockUser)
      localStorage.setItem('user', JSON.stringify(mockUser))
      toast.success('Succesvol ingelogd!')
      router.push('/dashboard')
    } catch (error) {
      console.error('Sign in error:', error)
      toast.error('Fout bij inloggen')
    } finally {
      setLoading(false)
    }
  }

  // Sign up function
  const signUp = async (email: string, password: string, fullName: string) => {
    try {
      setLoading(true)
      // Mock registration
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const mockUser: User = {
        id: 'user123',
        email,
        full_name: fullName,
        avatar_url: null
      }
      
      setUser(mockUser)
      localStorage.setItem('user', JSON.stringify(mockUser))
      toast.success('Account succesvol aangemaakt!')
      router.push('/dashboard')
    } catch (error) {
      console.error('Sign up error:', error)
      toast.error('Fout bij registreren')
    } finally {
      setLoading(false)
    }
  }

  // Sign out function
  const signOut = async () => {
    try {
      setLoading(true)
      setUser(null)
      localStorage.removeItem('user')
      toast.success('Succesvol uitgelogd!')
      router.push('/')
    } catch (error) {
      console.error('Sign out error:', error)
      toast.error('Fout bij uitloggen')
    } finally {
      setLoading(false)
    }
  }

  // Update profile function
  const updateProfile = async (updates: Partial<User>) => {
    try {
      if (!user) return
      
      const updatedUser = { ...user, ...updates }
      setUser(updatedUser)
      localStorage.setItem('user', JSON.stringify(updatedUser))
      toast.success('Profiel bijgewerkt!')
    } catch (error) {
      console.error('Update profile error:', error)
      toast.error('Fout bij bijwerken profiel')
    }
  }

  const value: AuthContextType = {
    user,
    loading,
    signIn,
    signUp,
    signOut,
    updateProfile,
    isAuthenticated: !!user
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}