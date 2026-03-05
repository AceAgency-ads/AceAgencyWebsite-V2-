import { ImageResponse } from 'next/og';
import type { NextRequest } from 'next/server';

export const runtime = 'edge';

/**
 * Dynamic OG image generation endpoint.
 * Produces a branded 1200x630 image with the Laboratorul de Conversii branding and optional title.
 * Usage: /api/og?title=Your+Page+Title
 */
export async function GET(request: NextRequest): Promise<ImageResponse> {
  const { searchParams } = request.nextUrl;
  const title = searchParams.get('title') ?? 'Laboratorul de Conversii';
  const subtitle = searchParams.get('subtitle') ?? 'Growth Lab din Bucuresti';

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #262523 0%, #1a1918 50%, #262523 100%)',
          fontFamily: 'sans-serif',
        }}
      >
        {/* Accent gradient overlay */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'radial-gradient(ellipse at 20% 50%, rgba(101, 12, 190, 0.15) 0%, transparent 60%)',
            display: 'flex',
          }}
        />

        {/* Top accent bar */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '6px',
            background: 'linear-gradient(90deg, #650CBE, #4500D0, #66F3A6)',
            display: 'flex',
          }}
        />

        {/* Content */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '60px 80px',
            textAlign: 'center',
            gap: '24px',
          }}
        >
          {/* Brand name */}
          <div
            style={{
              fontSize: '28px',
              fontWeight: 700,
              color: '#66F3A6',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              display: 'flex',
            }}
          >
            Laboratorul de Conversii
          </div>

          {/* Title */}
          <div
            style={{
              fontSize: '56px',
              fontWeight: 700,
              color: '#FFFFFF',
              lineHeight: 1.1,
              maxWidth: '900px',
              display: 'flex',
            }}
          >
            {title}
          </div>

          {/* Subtitle */}
          <div
            style={{
              fontSize: '24px',
              color: '#D9D9D9',
              maxWidth: '700px',
              display: 'flex',
            }}
          >
            {subtitle}
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            position: 'absolute',
            bottom: '30px',
            display: 'flex',
            gap: '8px',
            alignItems: 'center',
          }}
        >
          <div
            style={{
              fontSize: '14px',
              color: '#a0a0a0',
              display: 'flex',
            }}
          >
            aceagency.ro
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
