import { ImageResponse } from 'next/og';
import { loadHeeboFont } from './lib/og-font';

export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

export default async function AppleIcon() {
  const heeboBold = await loadHeeboFont(700);

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#1e1e1e',
        }}
      >
        <span
          style={{
            display: 'flex',
            fontFamily: 'Heebo',
            fontWeight: 700,
            fontSize: 88,
            color: '#cbb78c',
            direction: 'rtl',
          }}
        >
          יד
        </span>
      </div>
    ),
    { ...size, fonts: [{ name: 'Heebo', data: heeboBold, weight: 700, style: 'normal' }] }
  );
}
