/**
 * Single source of truth for brand/contact facts referenced across
 * metadata, structured data, the sitemap, and robots.txt.
 */
export const siteConfig = {
  name: 'ישראל דדון',
  tagline: 'צילום אירועים',
  /** Full formal business name/English name — used in structured data
   *  (JSON-LD), kept separate from `name`/`tagline` above since those two
   *  also drive the generated Open Graph image's on-image text. */
  businessName: 'ישראל דדון – צילום אירועים',
  businessNameEn: 'Israel Dadon Photography',
  title: 'ישראל דדון | צילום אירועים, מגנטים ואלבומים',
  description:
    'ישראל דדון – צילום אירועים מקצועי, חתונות, בר ובת מצווה, מגנטים, הדפסות ואלבומים בעיצוב מוקפד. לתיעוד מרגש ואיכותי של הרגעים החשובים שלכם.',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://israeldadon.co.il',
  phoneIntl: '+972509978499',
  instagramUrl: 'https://www.instagram.com/israel_dadon1?igsh=MjZ1bDk2b2FseTZx&utm_source=qr',
};
