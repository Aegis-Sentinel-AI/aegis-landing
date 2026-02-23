import { NextResponse } from 'next/server'
import { triggerScan } from '@/lib/ai-engine'

export const dynamic = 'force-dynamic'

export async function POST(request: Request) {
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
