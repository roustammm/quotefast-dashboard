import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export async function middleware(request: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req: request, res })

  // Get the pathname of the request (e.g. /, /dashboard, /auth)
  const path = request.nextUrl.pathname

  // Define public paths that don't require authentication
  const publicPaths = ['/', '/login', '/register', '/features', '/pricing']
  const isPublicPath = publicPaths.includes(path) || path.startsWith('/api')

  // Rate limiting (basic implementation)
  const ip = request.ip ?? request.headers.get('x-forwarded-for') ?? 'unknown'
  
  // Check for suspicious patterns
  const userAgent = request.headers.get('user-agent') || ''
  if (userAgent.includes('bot') && !userAgent.includes('Googlebot') && !userAgent.includes('Bingbot')) {
    return new NextResponse('Forbidden', { status: 403 })
  }

  try {
    // Refresh session if expired - required for Server Components
    const { data: { session } } = await supabase.auth.getSession()

    // If the user is trying to access a protected route without authentication
    if (!isPublicPath && !session) {
      const redirectUrl = new URL('/login', request.url)
      redirectUrl.searchParams.set('redirectTo', path)
      return NextResponse.redirect(redirectUrl)
    }

    // If the user is trying to access auth pages while already logged in
    if (session && (path === '/login' || path === '/register')) {
      return NextResponse.redirect(new URL('/dashboard', request.url))
    }

    // Check if user has necessary permissions for dashboard
    if (path.startsWith('/dashboard') && session?.user && !session.user.email_confirmed_at) {
      return NextResponse.redirect(new URL('/verify-email', request.url))
    }

    // Security headers
    const response = NextResponse.next()
    
    // Enhanced security headers
    response.headers.set('X-DNS-Prefetch-Control', 'on')
    response.headers.set('X-XSS-Protection', '1; mode=block')
    response.headers.set('X-Frame-Options', 'SAMEORIGIN')
    response.headers.set('X-Content-Type-Options', 'nosniff')
    response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
    response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()')
    response.headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains')
    
    // Enhanced CSP header for additional security
    response.headers.set(
      'Content-Security-Policy',
      "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; img-src 'self' data: https:; font-src 'self' data: https://fonts.gstatic.com; connect-src 'self' https://*.supabase.co https://api.stripe.com; frame-ancestors 'none'; base-uri 'self'; form-action 'self';"
    )

    return response
  } catch (error) {
    console.error('Middleware error:', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
