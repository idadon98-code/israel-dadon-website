import { ImageResponse } from 'next/og';
import { loadHeeboFont } from './lib/og-font';
import { siteConfig } from './lib/site';

export const alt = siteConfig.title;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  const [heeboBold, heeboRegular] = await Promise.all([
    loadHeeboFont(700),
    loadHeeboFont(400),
  ]);

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
          backgroundColor: '#1e1e1e',
          position: 'relative',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: 14,
            backgroundColor: '#cbb78c',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: 14,
            backgroundColor: '#cbb78c',
          }}
        />

        <div
          style={{
            display: 'flex',
            fontFamily: 'Heebo',
            fontWeight: 700,
            fontSize: 104,
            color: '#ffffff',
            direction: 'rtl',
          }}
        >
          {siteConfig.name}
        </div>

        <div
          style={{
            display: 'flex',
            marginTop: 22,
            fontFamily: 'Heebo',
            fontWeight: 400,
            fontSize: 44,
            color: '#cbb78c',
            direction: 'rtl',
          }}
        >
          {siteConfig.tagline}
        </div>

        <div
          style={{
            display: 'flex',
            marginTop: 56,
            fontFamily: 'Heebo',
            fontWeight: 400,
            fontSize: 30,
            color: 'rgba(255, 255, 255, 0.7)',
            direction: 'rtl',
          }}
        >
          בר/בת מצווה &middot; עלייה לתורה &middot; מגנטים לאירוע
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: 'Heebo', data: heeboBold, weight: 700, style: 'normal' },
        { name: 'Heebo', data: heeboRegular, weight: 400, style: 'normal' },
      ],
    }
  );
}
