import { authService } from '@/lib/auth-service'

// Mock Supabase client
jest.mock('@/lib/supabase/client', () => ({
  createClient: jest.fn(() => ({
    auth: {
      signInWithPassword: jest.fn(),
      signUp: jest.fn(),
      signOut: jest.fn(),
      getUser: jest.fn(),
      resetPasswordForEmail: jest.fn(),
      updateUser: jest.fn()
    },
    from: jest.fn(() => ({
      select: jest.fn(() => ({
        eq: jest.fn(() => ({
          single: jest.fn()
        }))
      })),
      update: jest.fn(() => ({
        eq: jest.fn(() => ({
          select: jest.fn(() => ({
            single: jest.fn()
          }))
        }))
      }))
    }))
  }))
}))

// Mock logger
jest.mock('@/lib/logger', () => ({
  logger: {
    error: jest.fn(),
    info: jest.fn(),
    warn: jest.fn()
  }
}))

describe('AuthService - Simple Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('Input Validation', () => {
    it('should validate email and password for login', async () => {
      const result = await authService.login('', '')
      
      expect(result.user).toBeNull()
      expect(result.error).toBe('Email en wachtwoord zijn verplicht')
      expect(result.status).toBe(400)
    })

    it('should validate email for login', async () => {
      const result = await authService.login('', 'password')
      
      expect(result.user).toBeNull()
      expect(result.error).toBe('Email en wachtwoord zijn verplicht')
      expect(result.status).toBe(400)
    })

    it('should validate password for login', async () => {
      const result = await authService.login('test@example.com', '')
      
      expect(result.user).toBeNull()
      expect(result.error).toBe('Email en wachtwoord zijn verplicht')
      expect(result.status).toBe(400)
    })
  })

  describe('Registration Validation', () => {
    it('should validate required fields for registration', async () => {
      const result = await authService.register('', '', '')
      
      expect(result.user).toBeNull()
      expect(result.error).toBe('Email, wachtwoord en naam zijn verplicht')
      expect(result.status).toBe(400)
    })

    it('should validate email for registration', async () => {
      const result = await authService.register('', 'password', 'Test User')
      
      expect(result.user).toBeNull()
      expect(result.error).toBe('Email, wachtwoord en naam zijn verplicht')
      expect(result.status).toBe(400)
    })

    it('should validate password for registration', async () => {
      const result = await authService.register('test@example.com', '', 'Test User')
      
      expect(result.user).toBeNull()
      expect(result.error).toBe('Email, wachtwoord en naam zijn verplicht')
      expect(result.status).toBe(400)
    })

    it('should validate name for registration', async () => {
      const result = await authService.register('test@example.com', 'password', '')
      
      expect(result.user).toBeNull()
      expect(result.error).toBe('Email, wachtwoord en naam zijn verplicht')
      expect(result.status).toBe(400)
    })
  })

  describe('Password Reset Validation', () => {
    it('should validate email for password reset', async () => {
      const result = await authService.resetPassword('')
      
      expect(result.error).toBe('Email is verplicht')
    })
  })

  describe('Password Update Validation', () => {
    it('should validate password strength', async () => {
      const result = await authService.updatePassword('123')
      
      expect(result.error).toBe('Wachtwoord moet minimaal 6 tekens bevatten')
    })

    it('should validate empty password', async () => {
      const result = await authService.updatePassword('')
      
      expect(result.error).toBe('Wachtwoord moet minimaal 6 tekens bevatten')
    })
  })
})
