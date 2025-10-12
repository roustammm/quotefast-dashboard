import { render, screen, waitFor } from '@testing-library/react'
import { AuthProvider, useAuth } from '@/contexts/AuthContext'
import { createClient } from '@/lib/supabase/client'
import { authService } from '@/lib/auth-service'

// Mock Supabase client
const mockSupabaseClientClient = {
  auth: {
    getSession: jest.fn(),
    onAuthStateChange: jest.fn(() => ({
      data: { subscription: { unsubscribe: jest.fn() } }
    })),
    signInWithPassword: jest.fn(),
    signUp: jest.fn(),
    signOut: jest.fn()
  }
}

jest.mock('@/lib/supabase/client', () => ({
  createClient: jest.fn(() => mockSupabaseClientClient)
}))

// Mock auth service
jest.mock('@/lib/auth-service', () => ({
  authService: {
    getCurrentUser: jest.fn(),
    updateUser: jest.fn()
  }
}))

// Mock Next.js router
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    refresh: jest.fn()
  })
}))

// Test component that uses the auth context
const TestComponent = () => {
  const { user, loading, login, register, logout } = useAuth()
  
  return (
    <div>
      <div data-testid="loading">{loading ? 'Loading' : 'Not Loading'}</div>
      <div data-testid="user">{user ? user.email : 'No User'}</div>
      <button data-testid="login-btn" onClick={() => login('test@example.com', 'password')}>
        Login
      </button>
      <button data-testid="register-btn" onClick={() => register('test@example.com', 'password', 'Test User')}>
        Register
      </button>
      <button data-testid="logout-btn" onClick={() => logout()}>
        Logout
      </button>
    </div>
  )
}

describe('AuthContext', () => {
  beforeEach(() => {
    jest.clearAllMocks()
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
    mockSupabaseClientClient.auth.signInWithPassword.mockResolvedValue({
      data: { user: { id: '1', email: 'test@example.com' } },
      error: null
    })

    ;(authService.getCurrentUser as jest.Mock).mockResolvedValue({
      user: { id: '1', email: 'test@example.com', name: 'Test User' },
      error: null
    })

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    )

    const loginBtn = screen.getByTestId('login-btn')
    loginBtn.click()

    await waitFor(() => {
      expect(mockSupabaseClientClient.auth.signInWithPassword).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'password'
      })
    })
  })

  it('should handle registration', async () => {
    const mockSupabaseClient = createClient() as any
    mockSupabaseClient.auth.signUp.mockResolvedValue({
      data: { user: { id: '1', email: 'test@example.com' } },
      error: null
    })

    ;(authService.getCurrentUser as jest.Mock).mockResolvedValue({
      user: { id: '1', email: 'test@example.com', name: 'Test User' },
      error: null
    })

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    )

    const registerBtn = screen.getByTestId('register-btn')
    registerBtn.click()

    await waitFor(() => {
      expect(mockSupabaseClient.auth.signUp).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'password',
        options: {
          data: {
            full_name: 'Test User',
            company_name: undefined
          }
        }
      })
    })
  })

  it('should handle logout', async () => {
    const mockSupabaseClient = createClient() as any
    mockSupabaseClient.auth.signOut.mockResolvedValue({ error: null })

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    )

    const logoutBtn = screen.getByTestId('logout-btn')
    logoutBtn.click()

    await waitFor(() => {
      expect(mockSupabaseClient.auth.signOut).toHaveBeenCalled()
    })
  })

  it('should throw error when used outside provider', () => {
    // Suppress console.error for this test
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {})
    
    expect(() => {
      render(<TestComponent />)
    }).toThrow('useAuth must be used within an AuthProvider')
    
    consoleSpy.mockRestore()
  })
})
