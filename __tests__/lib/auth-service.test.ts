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

describe('AuthService', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('login', () => {
    it('should return error for missing credentials', async () => {
      const result = await authService.login('', '')

      expect(result.user).toBeNull()
      expect(result.error).toBe('Email en wachtwoord zijn verplicht')
      expect(result.status).toBe(400)
    })

    it('should return error for missing email', async () => {
      const result = await authService.login('', 'password')

      expect(result.user).toBeNull()
      expect(result.error).toBe('Email en wachtwoord zijn verplicht')
      expect(result.status).toBe(400)
    })

    it('should return error for missing password', async () => {
      const result = await authService.login('test@example.com', '')

      expect(result.user).toBeNull()
      expect(result.error).toBe('Email en wachtwoord zijn verplicht')
      expect(result.status).toBe(400)
    })
  })

  describe('register', () => {
    it('should return error for missing required fields', async () => {
      const result = await authService.register('', '', '')

      expect(result.user).toBeNull()
      expect(result.error).toBe('Email, wachtwoord en naam zijn verplicht')
      expect(result.status).toBe(400)
    })

    it('should return error for missing email', async () => {
      const result = await authService.register('', 'password', 'Test User')

      expect(result.user).toBeNull()
      expect(result.error).toBe('Email, wachtwoord en naam zijn verplicht')
      expect(result.status).toBe(400)
    })

    it('should return error for missing password', async () => {
      const result = await authService.register('test@example.com', '', 'Test User')

      expect(result.user).toBeNull()
      expect(result.error).toBe('Email, wachtwoord en naam zijn verplicht')
      expect(result.status).toBe(400)
    })

    it('should return error for missing name', async () => {
      const result = await authService.register('test@example.com', 'password', '')

      expect(result.user).toBeNull()
      expect(result.error).toBe('Email, wachtwoord en naam zijn verplicht')
      expect(result.status).toBe(400)
    })
  })

  describe('resetPassword', () => {
    it('should return error for missing email', async () => {
      const result = await authService.resetPassword('')

      expect(result.error).toBe('Email is verplicht')
    })
  })

  describe('updatePassword', () => {
    it('should return error for weak password', async () => {
      const result = await authService.updatePassword('123')

      expect(result.error).toBe('Wachtwoord moet minimaal 6 tekens bevatten')
    })

    it('should return error for empty password', async () => {
      const result = await authService.updatePassword('')

      expect(result.error).toBe('Wachtwoord is verplicht')
    })
  })
})