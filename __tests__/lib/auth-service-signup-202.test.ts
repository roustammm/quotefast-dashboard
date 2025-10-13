import { authService } from '@/lib/auth-service'

// Extended mock for the supabase client used in auth-service
jest.mock('@/lib/supabase/client', () => ({
  createClient: jest.fn(() => ({
    auth: {
      signUp: jest.fn(() => Promise.resolve({ data: {}, error: null }))
    },
    from: jest.fn(() => ({
      select: jest.fn(() => ({
        eq: jest.fn(() => ({
          maybeSingle: jest.fn(() => Promise.resolve({ data: null, error: null }))
        }))
      }))
    }))
  }))
}))

describe('AuthService signUp fallback', () => {
  it('returns 202 when signUp provides no user and no profile is found', async () => {
    // Allow longer for this test because it simulates polling
    jest.setTimeout(30000)
    jest.useFakeTimers()

    // Start the register call (it will internally poll with setTimeout)
    const promise = authService.register('test@example.com', 'password', 'Test User')

    // Advance timers enough to cover all polling/wait timeouts in the implementation
    // (maxAttempts * 2000ms) + extra waits -> 20s is safe
    jest.advanceTimersByTime(20000)

    // Run any remaining timers (safety) and flush microtasks
    jest.runAllTimers()
    await Promise.resolve()

    const result = await promise

    expect(result).toBeDefined()
    expect(result.status).toBe(202)
    expect(result.user).toBeNull()
    expect(result.error).toMatch(/controleer je e-mail/i)

    jest.useRealTimers()
  })
})
