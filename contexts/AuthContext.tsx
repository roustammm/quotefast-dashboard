'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { authService, User } from '../lib/auth-service'
import { OnboardingData } from '../lib/onboarding'

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

  // Controleer de huidige gebruiker bij het laden
  useEffect(() => {
    const checkUser = async () => {
      setLoading(true)
      const { user } = await authService.getCurrentUser()
      setUser(user)
      setLoading(false)
    }
    
    checkUser()
  }, [])

  // Login functie
  const login = async (email: string, password: string) => {
    setLoading(true)
    const { user, error } = await authService.login(email, password)
    
    if (error) {
      setLoading(false)
      throw new Error(error)
    }
    
    setUser(user)
    setLoading(false)
  }

  // Registratie functie
  const register = async (email: string, password: string, name: string, company?: string) => {
    setLoading(true)
    const { user, error } = await authService.register(email, password, name, company)
    
    if (error) {
      setLoading(false)
      throw new Error(error)
    }
    
    setUser(user)
    setLoading(false)
  }

  // Uitlog functie
  const logout = async () => {
    setLoading(true)
    const { error } = await authService.logout()
    
    if (error) {
      console.error('Logout error:', error)
    }
    
    setUser(null)
    setLoading(false)
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

