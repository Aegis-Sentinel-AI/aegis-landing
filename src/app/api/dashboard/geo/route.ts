import { NextResponse } from 'next/server'
import { getGeoAttackData } from '@/lib/dashboard-data'

export const dynamic = 'force-dynamic'

export async function GET() {
  const geoData = await getGeoAttackData()
  return NextResponse.json(geoData, {
    headers: {
      'Cache-Control': 'no-store, max-age=0',
    },
  })
}
