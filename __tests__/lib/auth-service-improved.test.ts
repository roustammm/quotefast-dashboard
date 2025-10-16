import { authService } from '@/lib/auth-service'

// Mock the logger first
vi.mock('@/lib/logger', () => ({
  logger: {
    info: vi.fn(),
    error: vi.fn(),
    warn: vi.fn()
  }
}))

// Mock Supabase client
vi.mock('@/lib/supabase/client', () => ({
  createClient: vi.fn()
}))

describe('AuthService Improved Tests', () => {
  let mockSupabaseClient: any

  beforeEach(() => {
    vi.clearAllMocks()
    
    // Create fresh mock for each test
    mockSupabaseClient = {
      auth: {
        signUp: vi.fn(),
        signInWithPassword: vi.fn(),
        signOut: vi.fn(),
        getUser: vi.fn(),
        updateUser: vi.fn(),
        resetPasswordForEmail: vi.fn()
      },
      from: vi.fn(() => ({
        select: vi.fn(() => ({
          eq: vi.fn(() => ({
            single: vi.fn(),
            maybeSingle: vi.fn()
          }))
        })),
        insert: vi.fn(() => ({
          select: vi.fn(() => ({
            single: vi.fn()
          }))
        }))
      })),
      rpc: vi.fn()
    }

    // Mock the createClient function to return our mock
    const { createClient } = require('@/lib/supabase/client')
    createClient.mockReturnValue(mockSupabaseClient)
  })

  describe('Registration with profile creation', () => {
    it('should create profile via RPC when trigger fails', async () => {
      // Mock successful signup but no user returned (email confirmation required)
      mockSupabaseClient.auth.signUp.mockResolvedValue({
        data: { user: null },
        error: null
      })

      // Mock profile not found initially
      mockSupabaseClient.from.mockReturnValue({
        select: vi.fn(() => ({
          eq: vi.fn(() => ({
            single: vi.fn().mockResolvedValue({
              data: null,
              error: { code: 'PGRST116' }
            })
          }))
        }))
      })

      // Mock successful RPC profile creation
      mockSupabaseClient.rpc.mockResolvedValue({
        data: true,
        error: null
      })

      // Mock successful profile fetch after RPC creation
      const mockProfile = {
        id: 'test-user-id',
        email: 'test@example.com',
        full_name: 'Test User',
        company_name: 'Test Company'
      }

      // Reset mock for the second call
      mockSupabaseClient.from.mockReturnValue({
        select: vi.fn(() => ({
          eq: vi.fn(() => ({
            single: vi.fn().mockResolvedValue({
              data: mockProfile,
              error: null
            })
          }))
        }))
      })

      const result = await authService.register('test@example.com', 'password123', 'Test User', 'Test Company')

      expect(result.status).toBe(200)
      expect(result.user).toBeDefined()
      expect(result.user?.email).toBe('test@example.com')
      expect(mockSupabaseClient.rpc).toHaveBeenCalledWith('create_user_profile', {
        user_id: 'test-user-id',
        user_email: 'test@example.com',
        user_name: 'Test User',
        user_company: 'Test Company'
      })
    })

    it('should create profile via direct insert when RPC fails', async () => {
      // Mock successful signup
      mockSupabaseClient.auth.signUp.mockResolvedValue({
        data: { 
          user: {
            id: 'test-user-id',
            email: 'test@example.com'
          }
        },
        error: null
      })

      // Mock profile not found initially
      mockSupabaseClient.from.mockReturnValue({
        select: vi.fn(() => ({
          eq: vi.fn(() => ({
            single: vi.fn().mockResolvedValue({
              data: null,
              error: { code: 'PGRST116' }
            })
          }))
        }))
      })

      // Mock failed RPC profile creation
      mockSupabaseClient.rpc.mockResolvedValue({
        data: null,
        error: { message: 'RPC failed' }
      })

      // Mock successful direct insert
      const mockProfile = {
        id: 'test-user-id',
        email: 'test@example.com',
        full_name: 'Test User',
        company_name: 'Test Company'
      }

      // Reset mock for direct insert
      mockSupabaseClient.from.mockReturnValue({
        insert: vi.fn(() => ({
          select: vi.fn(() => ({
            single: vi.fn().mockResolvedValue({
              data: mockProfile,
              error: null
            })
          }))
        }))
      })

      const result = await authService.register('test@example.com', 'password123', 'Test User', 'Test Company')

      expect(result.status).toBe(200)
      expect(result.user).toBeDefined()
      expect(result.user?.email).toBe('test@example.com')
    })

    it('should handle complete profile creation failure gracefully', async () => {
      // Mock successful signup
      mockSupabaseClient.auth.signUp.mockResolvedValue({
        data: { 
          user: {
            id: 'test-user-id',
            email: 'test@example.com'
          }
        },
        error: null
      })

      // Mock profile not found initially
      mockSupabaseClient.from.mockReturnValue({
        select: vi.fn(() => ({
          eq: vi.fn(() => ({
            single: vi.fn().mockResolvedValue({
              data: null,
              error: { code: 'PGRST116' }
            })
          }))
        }))
      })

      // Mock failed RPC profile creation
      mockSupabaseClient.rpc.mockResolvedValue({
        data: null,
        error: { message: 'RPC failed' }
      })

      // Mock failed direct insert
      mockSupabaseClient.from.mockReturnValue({
        insert: vi.fn(() => ({
          select: vi.fn(() => ({
            single: vi.fn().mockResolvedValue({
              data: null,
              error: { message: 'Insert failed' }
            })
          }))
        }))
      })

      const result = await authService.register('test@example.com', 'password123', 'Test User', 'Test Company')

      expect(result.status).toBe(500)
      expect(result.user).toBeNull()
      expect(result.error).toBe('Fout bij het aanmaken van gebruikersprofiel')
    })

    it('should handle existing user with existing profile', async () => {
      // Mock successful signup
      mockSupabaseClient.auth.signUp.mockResolvedValue({
        data: { 
          user: {
            id: 'test-user-id',
            email: 'test@example.com'
          }
        },
        error: null
      })

      // Mock existing profile found
      const mockProfile = {
        id: 'test-user-id',
        email: 'test@example.com',
        full_name: 'Existing User',
        company_name: 'Existing Company'
      }

      mockSupabaseClient.from.mockReturnValue({
        select: vi.fn(() => ({
          eq: vi.fn(() => ({
            single: vi.fn().mockResolvedValue({
              data: mockProfile,
              error: null
            })
          }))
        }))
      })

      const result = await authService.register('test@example.com', 'password123', 'Test User', 'Test Company')

      expect(result.status).toBe(200)
      expect(result.user).toBeDefined()
      expect(result.user?.email).toBe('test@example.com')
      expect(result.user?.name).toBe('Existing User') // Should use existing profile data
    })
  })

  describe('Login with profile handling', () => {
    it('should handle login when profile exists', async () => {
      // Mock successful login
      mockSupabaseClient.auth.signInWithPassword.mockResolvedValue({
        data: { 
          user: {
            id: 'test-user-id',
            email: 'test@example.com'
          }
        },
        error: null
      })

      // Mock existing profile
      const mockProfile = {
        id: 'test-user-id',
        email: 'test@example.com',
        full_name: 'Test User',
        company_name: 'Test Company'
      }

      mockSupabaseClient.from.mockReturnValue({
        select: vi.fn(() => ({
          eq: vi.fn(() => ({
            single: vi.fn().mockResolvedValue({
              data: mockProfile,
              error: null
            })
          }))
        }))
      })

      const result = await authService.login('test@example.com', 'password123')

      expect(result.status).toBe(200)
      expect(result.user).toBeDefined()
      expect(result.user?.email).toBe('test@example.com')
      expect(result.user?.name).toBe('Test User')
    })

    it('should handle login when profile needs to be created', async () => {
      // Mock successful login
      mockSupabaseClient.auth.signInWithPassword.mockResolvedValue({
        data: { 
          user: {
            id: 'test-user-id',
            email: 'test@example.com'
          }
        },
        error: null
      })

      // Mock profile not found initially
      mockSupabaseClient.from.mockReturnValue({
        select: vi.fn(() => ({
          eq: vi.fn(() => ({
            single: vi.fn().mockResolvedValue({
              data: null,
              error: { code: 'PGRST116' }
            })
          }))
        }))
      })

      // Mock successful RPC profile creation
      mockSupabaseClient.rpc.mockResolvedValue({
        data: true,
        error: null
      })

      // Mock successful profile fetch after RPC creation
      const mockProfile = {
        id: 'test-user-id',
        email: 'test@example.com',
        full_name: 'Test User',
        company_name: 'Test Company'
      }

      // Reset mock for the second call
      mockSupabaseClient.from.mockReturnValue({
        select: vi.fn(() => ({
          eq: vi.fn(() => ({
            single: vi.fn().mockResolvedValue({
              data: mockProfile,
              error: null
            })
          }))
        }))
      })

      const result = await authService.login('test@example.com', 'password123')

      expect(result.status).toBe(200)
      expect(result.user).toBeDefined()
      expect(result.user?.email).toBe('test@example.com')
    })
  })

  describe('Error handling', () => {
    it('should handle network errors gracefully', async () => {
      // Mock network error
      mockSupabaseClient.auth.signUp.mockRejectedValue(new Error('Network error'))

      const result = await authService.register('test@example.com', 'password123', 'Test User', 'Test Company')

      expect(result.status).toBe(500)
      expect(result.user).toBeNull()
      expect(result.error).toBe('Er is een onverwachte fout opgetreden bij het registreren')
    })

    it('should handle validation errors', async () => {
      const result = await authService.register('', 'password123', 'Test User', 'Test Company')

      expect(result.status).toBe(400)
      expect(result.user).toBeNull()
      expect(result.error).toBe('Email, wachtwoord en naam zijn verplicht')
    })
  })
})