import { NextRequest, NextResponse } from 'next/server'
import { generateMetrics } from '@/lib/dashboard-data'
import { requireAuth } from '@/lib/api-auth'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  const denied = await requireAuth(request)
  if (denied) return denied

  const metrics = await generateMetrics()
  return NextResponse.json(metrics, {
    headers: {
      'Cache-Control': 'no-store, max-age=0',
    },
  })
}
