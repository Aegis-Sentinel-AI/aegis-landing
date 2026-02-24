/**
 * Shared auth helper for API routes.
 *
 * Dashboard API routes are excluded from the Next.js middleware auth matcher
 * (so they can return proper JSON 401s instead of redirects).
 * Every sensitive route must call requireAuth() and check the result.
 */

import { NextRequest, NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'

const UNAUTHORIZED = NextResponse.json(
  { error: 'Authentication required' },
  { status: 401 }
)

/**
 * Returns null if authenticated, or a 401 NextResponse if not.
 * Usage:
 *   const denied = await requireAuth(request)
 *   if (denied) return denied
 */
export async function requireAuth(request: NextRequest): Promise<NextResponse | null> {
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  })

  if (!token) return UNAUTHORIZED
  return null
}
