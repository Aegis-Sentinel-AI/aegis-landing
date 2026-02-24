import { NextRequest, NextResponse } from 'next/server'
import { triggerScan } from '@/lib/ai-engine'
import { requireAuth } from '@/lib/api-auth'

export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  const denied = await requireAuth(request)
  if (denied) return denied

  const body = await request.json().catch(() => ({}))
  const target = (body as { target?: string }).target || 'all'

  const result = await triggerScan(target)

  if (!result) {
    return NextResponse.json(
      { error: 'AI engine is offline or unreachable' },
      { status: 503 }
    )
  }

  return NextResponse.json(result, {
    headers: { 'Cache-Control': 'no-store, max-age=0' },
  })
}
