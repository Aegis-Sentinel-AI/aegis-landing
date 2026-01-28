import { ImageResponse } from '@vercel/og'

export const runtime = 'edge'

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#0A0A0F',
          backgroundImage: 'radial-gradient(ellipse at 50% 0%, rgba(59, 130, 246, 0.15) 0%, transparent 50%), radial-gradient(ellipse at 80% 80%, rgba(191, 255, 0, 0.1) 0%, transparent 40%)',
        }}
      >
        {/* Shield Icon */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 40,
          }}
        >
          <svg
            width="120"
            height="140"
            viewBox="0 0 60 70"
            fill="none"
          >
            {/* Shield body */}
            <path
              d="M30 5L5 15V35C5 52 30 65 30 65C30 65 55 52 55 35V15L30 5Z"
              fill="url(#shieldGradient)"
              stroke="#BFFF00"
              strokeWidth="2"
            />
            {/* Inner shield detail */}
            <path
              d="M30 12L12 20V35C12 48 30 58 30 58C30 58 48 48 48 35V20L30 12Z"
              fill="rgba(191, 255, 0, 0.1)"
              stroke="rgba(191, 255, 0, 0.3)"
              strokeWidth="1"
            />
            {/* Center lock/checkmark */}
            <path
              d="M22 35L28 41L40 29"
              stroke="#BFFF00"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <defs>
              <linearGradient id="shieldGradient" x1="30" y1="5" x2="30" y2="65" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#1a1a2e" />
                <stop offset="100%" stopColor="#0A0A0F" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Title */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <div
            style={{
              fontSize: 72,
              fontWeight: 800,
              color: 'white',
              letterSpacing: '-2px',
              marginBottom: 16,
            }}
          >
            AEGIS SENTINEL
          </div>
          <div
            style={{
              fontSize: 32,
              color: '#BFFF00',
              fontWeight: 500,
              marginBottom: 40,
            }}
          >
            Automated AI Defense for the Decentralized Era
          </div>
        </div>

        {/* Tech badges */}
        <div
          style={{
            display: 'flex',
            gap: 24,
          }}
        >
          {['AI-Powered', 'Zero-Knowledge', 'L2-Native'].map((badge) => (
            <div
              key={badge}
              style={{
                padding: '12px 24px',
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: 8,
                color: 'rgba(255, 255, 255, 0.7)',
                fontSize: 20,
                fontFamily: 'monospace',
              }}
            >
              {badge}
            </div>
          ))}
        </div>

        {/* Domain */}
        <div
          style={{
            position: 'absolute',
            bottom: 40,
            right: 50,
            fontSize: 24,
            color: 'rgba(255, 255, 255, 0.4)',
            fontFamily: 'monospace',
          }}
        >
          aegissentinel.online
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  )
}
