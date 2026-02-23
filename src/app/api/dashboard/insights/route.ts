import { NextResponse } from 'next/server'
import { getNetworkThreatInsights } from '@/lib/dashboard-data'

export const dynamic = 'force-dynamic'

export async function GET() {
  const insights = await getNetworkThreatInsights()
  return NextResponse.json(insights, {
    headers: {
      'Cache-Control': 'no-store, max-age=0',
    },
  })
}
