/* Complete AppProviders wrapper voor QuoteFast */

'use client'

import React, { ReactNode, createContext, useState, useEffect } from 'react'
import { ThemeProvider as ThemeWrapper } from '@/contexts/ThemeContext'
import { Toaster } from 'react-hot-toast'

type User = {
  id: string
  email: string
  full_name: string | null
  avatar_url: string | null
}

// Auth context (simple implementation)
const AuthContext = createContext<{
  user: User | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<void>
  signOut: () => Promise<void>
  signUp: (email: string, password: string, name: string) => Promise<void>
  updateProfile: (updates: { full_name?: string; email?: string }) => Promise<void>
}>({
  user: null,
  loading: false,
  signIn: async () => {},
  signOut: async () => {},
  signUp: async () => {},
  updateProfile: async () => {}
})

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(false)

  const signIn = async (email: string, password: string) => {
    setLoading(true)
    // Mock auth for now
    await new Promise(resolve => setTimeout(resolve, 1000))
    setUser({ email, id: 'user123', full_name: 'Test User', avatar_url: null })
    setLoading(false)
  }

  const signOut = async () => {
    setLoading(true)
    await new Promise(resolve => setTimeout(resolve, 500))
    setUser(null)
    setLoading(false)
  }

  const signUp = async (email: string, password: string, name: string) => {
    setLoading(true)
    // Mock auth for now
    await new Promise(resolve => setTimeout(resolve, 1000))
    setUser({ email, id: 'user123', full_name: name, avatar_url: null })
    setLoading(false)
  }

  const updateProfile = async (updates: { full_name?: string; email?: string }) => {
    setLoading(true)
    // Mock update for now
    await new Promise(resolve => setTimeout(resolve, 500))
    if (user) {
      setUser({ ...user, ...updates })
    }
    setLoading(false)
  }

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signOut, signUp, updateProfile }}>
      {children}
    </AuthContext.Provider>
  )
}

// Export useAuth hook
export const useAuth = () => {
  const context = React.useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

// Standby context (simple implementation)
const StandbyContext = createContext({
  isStandby: false,
  setStandby: (standby: boolean) => {}
})

export const StandbyProvider = ({ children }: { children: ReactNode }) => {
  const [isStandby, setIsStandby] = useState(false)

  const setStandby = (standby: boolean) => {
    setIsStandby(standby)
  }

  return (
    <StandbyContext.Provider value={{ isStandby, setStandby }}>
      {children}
    </StandbyContext.Provider>
  )
}

// Main AppProviders component
export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <ThemeWrapper>
      <AuthProvider>
        <StandbyProvider>
          {children}
          <Toaster 
            position="top-right"
            reverseOrder={false}
            gutter={8}
            toastOptions={{
              duration: 4000,
              style: {
                background: '#363636',
                color: '#fff',
              },
            }}
          />
        </StandbyProvider>
      </AuthProvider>
    </ThemeWrapper>
  )
}

// Simple loading wrapper (without NProgress)
export function LoadingWrapper({ children }: { children: ReactNode }) {
  return <>{children}</>
}
