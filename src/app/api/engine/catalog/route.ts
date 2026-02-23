import { NextResponse } from 'next/server'
import { getEngineCatalog } from '@/lib/ai-engine'

export const dynamic = 'force-dynamic'

export async function GET() {
  const catalog = await getEngineCatalog()

  if (!catalog) {
    return NextResponse.json(
      { error: 'AI engine is offline or unreachable' },
      { status: 503 }
    )
  }

  return NextResponse.json(catalog, {
    headers: { 'Cache-Control': 'public, max-age=300' },
  })
}
