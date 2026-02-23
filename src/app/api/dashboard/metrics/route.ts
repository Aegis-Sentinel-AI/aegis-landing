import { NextResponse } from 'next/server'
import { generateMetrics } from '@/lib/dashboard-data'

export const dynamic = 'force-dynamic'

export async function GET() {
  const metrics = await generateMetrics()
  return NextResponse.json(metrics, {
    headers: {
      'Cache-Control': 'no-store, max-age=0',
    },
  })
}
