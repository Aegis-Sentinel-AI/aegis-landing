import { NextRequest, NextResponse } from 'next/server'

const KIT_API_KEY = process.env.KIT_API_KEY
const KIT_FORM_ID = process.env.KIT_FORM_ID || '9023867'

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Valid email is required' },
        { status: 400 }
      )
    }

    if (!KIT_API_KEY) {
      console.error('KIT_API_KEY is not configured')
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      )
    }

    // Kit.com (ConvertKit) API v4
    const response = await fetch(
      `https://api.convertkit.com/v3/forms/${KIT_FORM_ID}/subscribe`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          api_key: KIT_API_KEY,
          email: email,
        }),
      }
    )

    const data = await response.json()

    if (!response.ok) {
      console.error('Kit API error:', data)
      return NextResponse.json(
        { error: data.message || 'Failed to subscribe' },
        { status: response.status }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Successfully joined the waitlist',
    })
  } catch (error) {
    console.error('Waitlist API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
