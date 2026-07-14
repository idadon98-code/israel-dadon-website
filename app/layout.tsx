import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { siteConfig } from "./lib/site";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: siteConfig.title,
  description: siteConfig.description,
  alternates: {
    canonical: siteConfig.url,
  },
  keywords: [
    "צילום אירועים",
    "צלם אירועים",
    "צילום בר מצווה",
    "צילום בת מצווה",
    "צילום עלייה לתורה",
    "צילום הכנסת ספר תורה",
    "הדפסת מגנטים לאירועים",
    "ישראל דדון",
  ],
  openGraph: {
    title: siteConfig.title,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    locale: "he_IL",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
  },
};

const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: siteConfig.title,
  description: siteConfig.description,
  url: siteConfig.url,
  telephone: siteConfig.phoneIntl,
  image: `${siteConfig.url}/images/about/cover.jpg`,
  sameAs: [siteConfig.instagramUrl],
  areaServed: "IL",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="he"
      dir="rtl"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
        />
        <a
          href="#home"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:right-4 focus:z-[100] focus:rounded-md focus:bg-[var(--color-primary-gold)] focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-[var(--color-text-on-gold)] focus:shadow-[0_2px_10px_rgba(0,0,0,0.15)] focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-[var(--color-text-primary)]"
        >
          דילוג לתוכן הראשי
        </a>
        {children}
      </body>
    </html>
  );
}
