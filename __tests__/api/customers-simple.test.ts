import { GET, POST } from '@/app/api/customers/route'

// Mock Supabase server
vi.mock('@/lib/supabase/server', () => ({
  createServer: vi.fn(() => ({
    from: vi.fn(() => ({
      select: vi.fn(() => ({
        order: vi.fn(() => ({
          data: [
            {
              id: '1',
              name: 'Test Customer',
              email: 'test@example.com',
              phone: '+1234567890',
              company: 'Test Company'
            }
          ],
          error: null
        }))
      })),
      insert: vi.fn(() => ({
        select: vi.fn(() => ({
          single: vi.fn(() => ({
            data: {
              id: '2',
              name: 'New Customer',
              email: 'new@example.com',
              phone: '+0987654321',
              company: 'New Company'
            },
            error: null
          }))
        }))
      }))
    })),
    auth: {
      getUser: vi.fn(() => ({
        data: { user: { id: '1' } },
        error: null
      }))
    }
  }))
}))

describe('/api/customers - Simple Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('GET /api/customers', () => {
    it('should return customers successfully', async () => {
      const request = new Request('http://localhost:3000/api/customers')
      const response = await GET(request)
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.customers).toBeDefined()
      expect(data.customers).toHaveLength(1)
      expect(data.customers[0].name).toBe('Test Customer')
    })
  })

  describe('POST /api/customers', () => {
    it('should create customer successfully', async () => {
      const customerData = {
        name: 'New Customer',
        email: 'new@example.com',
        phone: '+0987654321',
        company: 'New Company'
      }

      const request = new Request('http://localhost:3000/api/customers', {
        method: 'POST',
        body: JSON.stringify(customerData),
        headers: {
          'Content-Type': 'application/json'
        }
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(201)
      expect(data.customer).toBeDefined()
      expect(data.customer.name).toBe('New Customer')
      expect(data.customer.email).toBe('new@example.com')
    })

    it('should return error for missing required fields', async () => {
      const invalidData = {
        name: 'Test Customer'
        // Missing email
      }

      const request = new Request('http://localhost:3000/api/customers', {
        method: 'POST',
        body: JSON.stringify(invalidData),
        headers: {
          'Content-Type': 'application/json'
        }
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(400)
      expect(data.error).toBe('Missing required fields: name, email')
    })
  })
})
