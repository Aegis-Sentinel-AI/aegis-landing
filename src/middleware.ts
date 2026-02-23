import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { hostname, pathname } = request.nextUrl

  // ─── .no → .online redirect ───
  if (hostname === 'aegissentinel.no' || hostname === 'www.aegissentinel.no') {
    const newHost = hostname.replace('.no', '.online')
    const url = request.nextUrl.clone()
    url.hostname = newHost
    url.port = ''
    return NextResponse.redirect(url, 301)
  }

  // ─── Auth guard for /dashboard routes ───
  if (pathname.startsWith('/dashboard')) {
    const authCookie = request.cookies.get('aegis_auth_token')

    if (!authCookie?.value) {
      const loginUrl = request.nextUrl.clone()
      loginUrl.pathname = '/login'
      loginUrl.searchParams.set('redirect', pathname)
      return NextResponse.redirect(loginUrl)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    // Match all dashboard routes
    '/dashboard/:path*',
    // Match root for domain redirect (only affects .no domains)
    '/((?!_next|api|favicon.ico|images|icons).*)',
  ],
}
