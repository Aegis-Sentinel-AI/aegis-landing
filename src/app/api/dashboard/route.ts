import { NextRequest, NextResponse } from 'next/server'
import { getDashboardData } from '@/lib/dashboard-data'
import { requireAuth } from '@/lib/api-auth'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  const denied = await requireAuth(request)
  if (denied) return denied

  const data = await getDashboardData()
  return NextResponse.json(data, {
    headers: {
      'Cache-Control': 'no-store, max-age=0',
    },
  })
}
