import { NextRequest, NextResponse } from 'next/server'
import { getNetworkThreatInsights } from '@/lib/dashboard-data'
import { requireAuth } from '@/lib/api-auth'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  const denied = await requireAuth(request)
  if (denied) return denied

  const insights = await getNetworkThreatInsights()
  return NextResponse.json(insights, {
    headers: {
      'Cache-Control': 'no-store, max-age=0',
    },
  })
}
