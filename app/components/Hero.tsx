'use client';

import { useEffect, useState } from 'react';
import { Heebo } from 'next/font/google';

/**
 * Single typeface for the entire site: Heebo. Multiple weights are
 * loaded so we can express hierarchy (headline vs. body vs. UI) purely
 * through weight and size.
 */
const heebo = Heebo({
  subsets: ['hebrew', 'latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-heebo',
  display: 'swap',
});

export interface HeroCta {
  label: string;
  href: string;
}

export interface HeroProps {
  /** Main headline (Heebo, bold) */
  headline?: string;
  /** Supporting one-line description under the headline */
  subheadline?: string;
  /** Primary action — should always be the WhatsApp inquiry link */
  primaryCta?: HeroCta;
  /** Secondary action — usually scrolls to the portfolio section */
  secondaryCta?: HeroCta;
  /** Path to the background video (mp4, muted loop). Optional. */
  videoSrc?: string;
  /** Poster image — used as the video fallback, the mobile background,
   *  and as the sole background when no video is supplied. Optional. */
  posterSrc?: string;
  /** id of the section the scroll indicator should jump to */
  scrollTargetId?: string;
}

/**
 * Hero — full-bleed opening section.
 *
 * Colors: driven entirely by the CSS variables defined in globals.css.
 * The section defaults to the brand's warm ivory background
 * (--color-background) with primary-text-colored headline. If a video or
 * poster image is supplied, the section switches to a photo/video-filled
 * frame with a soft dark gradient at the bottom edge only — just enough
 * to keep the headline readable — while the rest of the site around it
 * stays bright. Dark tones are used here strictly as an overlay on top of
 * a photo, never as a standalone background color. If no media is
 * supplied, the section falls back to the plain background with dark
 * text and no overlay at all.
 */
export default function Hero({
  headline = 'רגעים שנשארים לנצח, דרך העדשה שלי',
  subheadline = 'צילום אירועים, בר ובת מצווה והדפסת מגנטים בגישה אישית וברמת גימור פרימיום',
  primaryCta = { label: 'שלחו הודעה בוואטסאפ', href: 'https://wa.me/972509978499' },
  secondaryCta = { label: 'צפו בעבודות', href: '#portfolio' },
  videoSrc,
  posterSrc,
  scrollTargetId = 'portfolio',
}: HeroProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const hasMedia = Boolean(videoSrc || posterSrc);

  useEffect(() => {
    // Trigger the staggered entrance animation on mount, one frame after
    // paint, so the browser has something to transition *from*.
    const frame = requestAnimationFrame(() => setIsLoaded(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  const fadeUp =
    'transition-all duration-700 ease-out motion-reduce:transition-none motion-reduce:transform-none';

  return (
    <section
      dir="rtl"
      aria-label="פתיחה — Israel Dadon Photography"
      className={`${heebo.variable} relative flex h-[100svh] min-h-[560px] w-full items-end overflow-hidden ${
        hasMedia ? 'bg-[var(--color-text-primary)]' : 'bg-[var(--color-background)]'
      } font-[family-name:var(--font-heebo)]`}
    >
      {/* Background media layer — only rendered when media is supplied */}
      {hasMedia && (
        <div className="absolute inset-0" aria-hidden="true">
          {/* Poster image: always rendered when present, acts as the LCP
              element and as the *only* background on mobile — keeps
              data/battery cost low on phones where a full-screen
              autoplay video isn't worth it. */}
          {posterSrc && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={posterSrc}
              alt=""
              className="absolute inset-0 h-full w-full object-cover"
            />
          )}

          {/* Video: only mounted visually from md breakpoint up, and only
              if a video source was actually provided. */}
          {videoSrc && (
            <video
              className="absolute inset-0 hidden h-full w-full object-cover md:block"
              src={videoSrc}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
            />
          )}

          {/* Soft cinematic overlay: dark only at the bottom where the
              text sits, clear at the top — keeps the frame readable
              without turning the whole hero dark. This is the one place
              on the page a dark tone is used, and only as a scrim on
              top of a photo. */}
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-text-primary)] via-[var(--color-text-primary)]/45 to-transparent" />
        </div>
      )}

      {/* No-media fallback background: a soft gradient made purely of
          light brand tones — no dark overlay, since there is no photo to
          protect text contrast against. */}
      {!hasMedia && (
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-b from-[var(--color-background)] to-[var(--color-card)]"
        />
      )}

      {/* Content */}
      <div className="relative z-10 mx-auto w-full max-w-[1280px] px-6 pb-20 sm:px-10 sm:pb-28 lg:px-16 lg:pb-32">
        <h1
          className={`max-w-3xl text-[38px] font-bold leading-[1.15] sm:text-[56px] lg:text-[80px] ${
            hasMedia ? 'text-[var(--color-card)]' : 'text-[var(--color-text-primary)]'
          } ${fadeUp} ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'}`}
        >
          {headline}
        </h1>

        <p
          className={`mt-6 max-w-xl text-base font-normal leading-relaxed sm:text-lg ${
            hasMedia ? 'text-[var(--color-card)]/80' : 'text-[var(--color-text-secondary)]'
          } ${fadeUp} delay-150 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'}`}
        >
          {subheadline}
        </p>

        <div
          className={`mt-10 flex flex-col gap-4 sm:flex-row ${fadeUp} delay-300 ${
            isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
          }`}
        >
          <a
            href={primaryCta.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-md bg-[var(--color-primary-gold)] px-8 py-4 text-base font-medium text-[var(--color-text-on-gold)] shadow-[0_1px_6px_rgba(0,0,0,0.05)] transition-all duration-200 ease-out hover:-translate-y-0.5 hover:bg-[var(--color-primary-gold-hover)] hover:shadow-[0_4px_14px_rgba(0,0,0,0.08)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary-gold)] motion-reduce:transition-none motion-reduce:hover:translate-y-0"
          >
            {primaryCta.label}
          </a>

          <a
            href={secondaryCta.href}
            className={`inline-flex items-center justify-center rounded-md border px-8 py-4 text-base font-medium transition-all duration-200 ease-out motion-reduce:transition-none ${
              hasMedia
                ? 'border-[var(--color-card)]/50 text-[var(--color-card)] hover:border-[var(--color-card)] hover:bg-[var(--color-card)]/10'
                : 'border-[var(--color-border)] bg-[var(--color-card)] text-[var(--color-text-primary)] shadow-[0_1px_6px_rgba(0,0,0,0.04)] hover:border-[var(--color-primary-gold)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.06)]'
            }`}
          >
            {secondaryCta.label}
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <a
        href={`#${scrollTargetId}`}
        aria-label="גללו למטה לתוכן הבא"
        className={`absolute bottom-8 left-1/2 z-10 -translate-x-1/2 transition-opacity delay-500 duration-700 ease-out motion-reduce:transition-none ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <span
          className={`block h-10 w-px animate-scroll-hint ${
            hasMedia ? 'bg-[var(--color-card)]/60' : 'bg-[var(--color-text-primary)]/25'
          }`}
        />
      </a>

      <style jsx>{`
        @keyframes scrollHint {
          0% {
            transform: translateY(0);
            opacity: 1;
          }
          50% {
            transform: translateY(12px);
            opacity: 0.3;
          }
          100% {
            transform: translateY(0);
            opacity: 1;
          }
        }
        .animate-scroll-hint {
          animation: scrollHint 2s ease-in-out infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-scroll-hint {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
}
