import { authService } from '@/lib/auth-service'

// Extended mock for the supabase client used in auth-service
vi.mock('@/lib/supabase/client', () => ({
  createClient: vi.fn(() => ({
    auth: {
      signUp: vi.fn(() => Promise.resolve({ data: {}, error: null }))
    },
    from: vi.fn(() => ({
      select: vi.fn(() => ({
        eq: vi.fn(() => ({
          maybeSingle: vi.fn(() => Promise.resolve({ data: null, error: null }))
        }))
      }))
    }))
  }))
}))

describe('AuthService signUp fallback', () => {
  it('returns 202 when signUp provides no user and no profile is found', async () => {
    // Allow longer for this test because it simulates polling
    vi.setTimeout(30000)
    vi.useFakeTimers()

    // Start the register call (it will internally poll with setTimeout)
    const promise = authService.register('test@example.com', 'password', 'Test User')

    // Advance timers enough to cover all polling/wait timeouts in the implementation
    // (maxAttempts * 2000ms) + extra waits -> 20s is safe
    vi.advanceTimersByTime(20000)

    // Run any remaining timers (safety) and flush microtasks
    vi.runAllTimers()
    await Promise.resolve()

    const result = await promise

    expect(result).toBeDefined()
    expect(result.status).toBe(202)
    expect(result.user).toBeNull()
    expect(result.error).toMatch(/controleer je e-mail/i)

    vi.useRealTimers()
  })
})
