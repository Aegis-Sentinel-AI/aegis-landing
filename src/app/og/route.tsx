import { ImageResponse } from '@vercel/og'

export const runtime = 'edge'

export async function GET() {
  // Fetch the logo image
  const logoData = await fetch(
    new URL('/logo.jpg', 'https://aegissentinel.online')
  ).then((res) => res.arrayBuffer())

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
        {/* Logo */}
        <img
          src={logoData as unknown as string}
          width={200}
          height={200}
          style={{
            marginBottom: 40,
            borderRadius: 20,
          }}
        />

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
