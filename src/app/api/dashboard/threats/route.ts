import { NextResponse } from 'next/server'
import { getRecentThreats } from '@/lib/dashboard-data'

export const dynamic = 'force-dynamic'

export async function GET() {
  const threats = await getRecentThreats()
  return NextResponse.json(threats, {
    headers: {
      'Cache-Control': 'no-store, max-age=0',
    },
  })
}
