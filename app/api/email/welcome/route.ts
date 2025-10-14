/* API route voor welcome emails */

import { NextRequest, NextResponse } from 'next/server'
import { emailUtils } from '@/lib/email'

export async function POST(request: NextRequest) {
  try {
    const { email, name } = await request.json()

    if (!email || !name) {
      return NextResponse.json(
        { error: 'Email and name are required' },
        { status: 400 }
      )
    }

    const result = await emailUtils.sendWelcome({ email, name })

    if (result.error) {
      console.error('Welcome email failed:', result.error)
      return NextResponse.json(
        { error: 'Failed to send welcome email' },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { 
        success: true, 
        message: 'Welcome email sent successfully',
        id: result.data?.id 
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Welcome email API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
