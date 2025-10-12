import { NextRequest } from 'next/server'
import { GET, POST } from '@/app/api/customers/route'
import { createServer } from '@/lib/supabase/server'

// Mock Supabase server
const mockSupabaseServerServer = {
  from: jest.fn(() => ({
    select: jest.fn(() => ({
      order: jest.fn(() => ({
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
    insert: jest.fn(() => ({
      select: jest.fn(() => ({
        single: jest.fn(() => ({
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
    getUser: jest.fn(() => ({
      data: { user: { id: '1' } },
      error: null
    }))
  }
}

jest.mock('@/lib/supabase/server', () => ({
  createServer: jest.fn(() => mockSupabaseServerServer)
}))

describe('/api/customers', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('GET /api/customers', () => {
    it('should return customers successfully', async () => {
      const request = new NextRequest('http://localhost:3000/api/customers')
      const response = await GET(request)
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.customers).toBeDefined()
      expect(data.customers).toHaveLength(1)
      expect(data.customers[0].name).toBe('Test Customer')
    })

    it('should handle database error', async () => {
      mockSupabaseServerServer.from().select().order.mockResolvedValue({
        data: null,
        error: { message: 'Database error' }
      })

      const request = new NextRequest('http://localhost:3000/api/customers')
      const response = await GET(request)
      const data = await response.json()

      expect(response.status).toBe(500)
      expect(data.error).toBe('Failed to fetch customers')
    })

    it('should handle unexpected error', async () => {
      mockSupabaseServer.from.mockImplementation(() => {
        throw new Error('Unexpected error')
      })

      const request = new NextRequest('http://localhost:3000/api/customers')
      const response = await GET(request)
      const data = await response.json()

      expect(response.status).toBe(500)
      expect(data.error).toBe('Internal server error')
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

      const request = new NextRequest('http://localhost:3000/api/customers', {
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

      const request = new NextRequest('http://localhost:3000/api/customers', {
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

    it('should return error for invalid JSON', async () => {
      const request = new NextRequest('http://localhost:3000/api/customers', {
        method: 'POST',
        body: 'invalid json',
        headers: {
          'Content-Type': 'application/json'
        }
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(500)
      expect(data.error).toBe('Internal server error')
    })

    it('should handle database error on create', async () => {
      mockSupabaseServer.from().insert().select().single.mockResolvedValue({
        data: null,
        error: { message: 'Database error' }
      })

      const customerData = {
        name: 'New Customer',
        email: 'new@example.com'
      }

      const request = new NextRequest('http://localhost:3000/api/customers', {
        method: 'POST',
        body: JSON.stringify(customerData),
        headers: {
          'Content-Type': 'application/json'
        }
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(500)
      expect(data.error).toBe('Failed to create customer')
    })
  })
})
