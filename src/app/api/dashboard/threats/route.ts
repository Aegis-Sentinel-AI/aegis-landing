import { NextRequest, NextResponse } from 'next/server'
import { getRecentThreats } from '@/lib/dashboard-data'
import { requireAuth } from '@/lib/api-auth'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  const denied = await requireAuth(request)
  if (denied) return denied

  const threats = await getRecentThreats()
  return NextResponse.json(threats, {
    headers: {
      'Cache-Control': 'no-store, max-age=0',
    },
  })
}
