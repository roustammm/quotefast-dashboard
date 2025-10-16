// Minimal middleware for Next.js to generate middleware manifest
// Full auth middleware is temporarily disabled due to missing Supabase dependencies

import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  // For now, just pass through all requests
  return NextResponse.next({
    request: {
      headers: request.headers,
    },
  })
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
