import { NextResponse } from 'next/server'
import { getEngineHealth, getEngineStatus, isEngineOnline } from '@/lib/ai-engine'

export const dynamic = 'force-dynamic'

export async function GET() {
  const [health, status, online] = await Promise.all([
    getEngineHealth(),
    getEngineStatus(),
    isEngineOnline(),
  ])

  return NextResponse.json(
    {
      online,
      health,
      status,
      timestamp: new Date().toISOString(),
    },
    { headers: { 'Cache-Control': 'no-store, max-age=0' } }
  )
}
