/**
 * Single source of truth for brand/contact facts referenced across
 * metadata, structured data, the sitemap, and robots.txt. Placeholder
 * `url` — swap NEXT_PUBLIC_SITE_URL once a production domain exists.
 */
export const siteConfig = {
  name: 'ישראל דדון',
  tagline: 'צילום אירועים',
  title: 'ישראל דדון | צילום אירועים, בר/בת מצווה ומגנטים',
  description:
    'צילום אירועים מקצועי ואישי — בר מצווה, בת מצווה, עלייה לתורה, הכנסת ספר תורה והדפסת מגנטים במקום. ישראל דדון מלווה אתכם מהרגע הראשון ועד למסירת התמונות.',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://israel-dadon-photography.example.com',
  phoneIntl: '+972509978499',
  instagramUrl: 'https://www.instagram.com/israel_dadon1?igsh=MjZ1bDk2b2FseTZx&utm_source=qr',
};
