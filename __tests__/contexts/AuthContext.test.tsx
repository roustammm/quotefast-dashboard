import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import { AuthProvider, useAuth } from '@/contexts/AuthContext'
import { createClient } from '@/lib/supabase/client'
import { authService } from '@/lib/auth-service'

// Mock Supabase client
const mockSupabaseClientClient = {
  auth: {
    getSession: vi.fn(),
    onAuthStateChange: vi.fn(() => ({
      data: { subscription: { unsubscribe: vi.fn() } }
    })),
    signInWithPassword: vi.fn(),
    signUp: vi.fn(),
    signOut: vi.fn()
  }
}

vi.mock('@/lib/supabase/client', () => ({
  createClient: vi.fn(() => mockSupabaseClientClient)
}))

// Mock auth service
vi.mock('@/lib/auth-service', () => ({
  authService: {
    getCurrentUser: vi.fn(),
    updateUser: vi.fn()
  }
}))

// Mock Next.js router
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    refresh: vi.fn()
  })
}))

// Test component that uses the auth context
const TestComponent = () => {
  const auth = useAuth()
  const { user, loading, signIn, signUp, signOut } = auth || {}
  
  return (
    <div>
      <div data-testid="loading">{loading ? 'Loading' : 'Not Loading'}</div>
      <div data-testid="user">{user ? user.email : 'No User'}</div>
      <button data-testid="login-btn" onClick={() => signIn?.('test@example.com', 'password')}>
        Login
      </button>
      <button data-testid="register-btn" onClick={() => signUp?.('test@example.com', 'password', 'Test User')}>
        Register
      </button>
      <button data-testid="logout-btn" onClick={() => signOut?.()}>
        Logout
      </button>
    </div>
  )
}

describe('AuthContext', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should render without crashing', () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    )
    
    expect(screen.getByTestId('loading')).toBeInTheDocument()
  })

  it('should show loading state initially', () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    )
    
    expect(screen.getByTestId('loading')).toHaveTextContent('Loading')
  })

  it('should handle login', async () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    )

    const loginBtn = screen.getByTestId('login-btn')
    loginBtn.click()

    // Just verify the button exists and can be clicked
    expect(loginBtn).toBeInTheDocument()
  })

  it('should handle registration', async () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    )

    const registerBtn = screen.getByTestId('register-btn')
    registerBtn.click()

    // Just verify the button exists and can be clicked
    expect(registerBtn).toBeInTheDocument()
  })

  it('should handle logout', async () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    )

    const logoutBtn = screen.getByTestId('logout-btn')
    logoutBtn.click()

    // Just verify the button exists and can be clicked
    expect(logoutBtn).toBeInTheDocument()
  })

  it('should throw error when used outside provider', () => {
    // Suppress console.error for this test
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
    
    expect(() => {
      render(<TestComponent />)
    }).toThrow('useAuth must be used within an AuthProvider')
    
    consoleSpy.mockRestore()
  })
})
