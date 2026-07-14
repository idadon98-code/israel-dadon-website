import type { ReactNode } from 'react';
import { Heebo } from 'next/font/google';
import ScrollReveal from './ScrollReveal';

/** Single typeface for the entire site: Heebo. */
const heebo = Heebo({
  subsets: ['hebrew', 'latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-heebo',
  display: 'swap',
});

export interface MagnetsFeature {
  icon: ReactNode;
  title: string;
  text: string;
}

export interface MagnetsProps {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  features?: MagnetsFeature[];
  ctaLabel?: string;
  ctaHref?: string;
}

/**
 * Line icons — thin (1.5px stroke), monochrome, no fills — matching the
 * icon style used in TrustBar and WhyChooseMe elsewhere on the site.
 */
function MagnetIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-6 w-6"
      aria-hidden="true"
    >
      <path d="M6 4v7a6 6 0 0 0 12 0V4" />
      <path d="M6 4H3" />
      <path d="M9 4H6" />
      <path d="M18 4h3" />
      <path d="M15 4h3" />
      <path d="M4 4h5v6H4z" />
      <path d="M15 4h5v6h-5z" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-6 w-6"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" />
    </svg>
  );
}

function SparkleIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-6 w-6"
      aria-hidden="true"
    >
      <path d="M12 3v4M12 17v4M4.2 12H3M21 12h-1.2M6.3 6.3 5.5 5.5M18.5 18.5l-.8-.8M6.3 17.7l-.8.8M18.5 5.5l-.8.8" />
      <circle cx="12" cy="12" r="3.2" />
    </svg>
  );
}

const defaultFeatures: MagnetsFeature[] = [
  {
    icon: <MagnetIcon />,
    title: 'הדפסה במקום האירוע',
    text: 'עמדת הדפסה חיה באירוע — האורחים מקבלים מגנט אישי כמזכרת עוד לפני שהאירוע נגמר.',
  },
  {
    icon: <ClockIcon />,
    title: 'תוך דקות ספורות',
    text: 'מרגע הצילום ועד למגנט המודפס וביד — זמן המתנה קצר שלא פוגע בקצב האירוע.',
  },
  {
    icon: <SparkleIcon />,
    title: 'איכות ועיצוב מותאם',
    text: 'הדפסה איכותית ועמידה, עם עיצוב מסגרת אישי התואם את האופי והנושא של האירוע שלכם.',
  },
];

/**
 * Magnets — "מגנטים" section.
 *
 * A calm, icon-driven section introducing the on-site magnet printing
 * service — referenced from the Hero copy and TrustBar, but until now
 * without its own dedicated content block or nav anchor.
 *
 * Colors: driven entirely by the CSS variables defined in globals.css.
 * Section surface uses --color-card (white) so it reads as a distinct
 * band between the surrounding --color-background sections (Portfolio
 * above, About below), following the same alternating pattern already
 * used across the page.
 */
export default function Magnets({
  eyebrow = 'מגנטים',
  title = 'מגנט אישי מהאירוע שלכם, מודפס במקום',
  subtitle = 'שירות הדפסת מגנטים חי, שהופך כל אורח למי שיוצא עם מזכרת אמיתית מהאירוע שלכם.',
  features = defaultFeatures,
  ctaLabel = 'בואו נדבר על מגנטים לאירוע',
  ctaHref = 'https://wa.me/972509978499',
}: MagnetsProps) {
  return (
    <section
      id="magnets"
      dir="rtl"
      aria-label="מגנטים — הדפסה במקום האירוע"
      className={`${heebo.variable} w-full bg-[var(--color-card)] py-20 font-[family-name:var(--font-heebo)] sm:py-28`}
    >
      <div className="mx-auto max-w-[1280px] px-6 sm:px-10 lg:px-16">
        {/* Section header */}
        <ScrollReveal variant="fade-up" className="mx-auto max-w-xl text-center">
          <p className="text-sm font-medium tracking-wide text-[var(--color-primary-gold-hover)]">
            {eyebrow}
          </p>
          <h2 className="mt-3 text-3xl font-bold leading-tight text-[var(--color-text-primary)] sm:text-4xl lg:text-5xl">
            {title}
          </h2>
          <p className="mt-4 text-base font-normal leading-relaxed text-[var(--color-text-secondary)] sm:text-lg">
            {subtitle}
          </p>
        </ScrollReveal>

        {/* Feature grid */}
        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-3 sm:gap-7 lg:gap-8">
          {features.map((feature, index) => (
            <ScrollReveal
              key={feature.title}
              variant="fade-up"
              delayMs={index * 100}
              className="group flex flex-col items-center gap-4 rounded-lg border border-[var(--color-border)] bg-[var(--color-background)] px-6 py-8 text-center shadow-[0_1px_6px_rgba(0,0,0,0.03)] transition-all duration-300 ease-out hover:-translate-y-1 hover:border-[var(--color-primary-gold)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.06)]"
            >
              <span
                className="flex h-14 w-14 items-center justify-center rounded-full border border-[var(--color-border)] text-[var(--color-primary-gold-hover)] transition-colors duration-300 ease-out group-hover:border-[var(--color-primary-gold)] group-hover:bg-[var(--color-primary-gold)]/10"
                aria-hidden="true"
              >
                {feature.icon}
              </span>

              <h3 className="text-lg font-semibold text-[var(--color-text-primary)] sm:text-xl">
                {feature.title}
              </h3>

              <p className="text-sm font-normal leading-relaxed text-[var(--color-text-secondary)] sm:text-base">
                {feature.text}
              </p>
            </ScrollReveal>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-14 flex justify-center sm:mt-16">
          <a
            href={ctaHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-md bg-[var(--color-primary-gold)] px-8 py-4 text-base font-medium text-[var(--color-text-on-gold)] shadow-[0_1px_6px_rgba(0,0,0,0.05)] transition-all duration-200 ease-out hover:-translate-y-0.5 hover:bg-[var(--color-primary-gold-hover)] hover:shadow-[0_4px_14px_rgba(0,0,0,0.08)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary-gold)] motion-reduce:transition-none motion-reduce:hover:translate-y-0"
          >
            {ctaLabel}
          </a>
        </div>
      </div>
    </section>
  );
}
