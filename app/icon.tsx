import { ImageResponse } from 'next/og';
import { loadHeeboFont } from './lib/og-font';

export const size = { width: 32, height: 32 };
export const contentType = 'image/png';

export default async function Icon() {
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
          borderRadius: '50%',
        }}
      >
        <span
          style={{
            display: 'flex',
            fontFamily: 'Heebo',
            fontWeight: 700,
            fontSize: 16,
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
