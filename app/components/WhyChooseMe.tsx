import type { ReactNode } from 'react';
import { Heebo } from 'next/font/google';

/** Single typeface for the entire site: Heebo. */
const heebo = Heebo({
  subsets: ['hebrew', 'latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-heebo',
  display: 'swap',
});

export interface WhyChooseMeCard {
  icon: ReactNode;
  title: string;
  text: string;
}

export interface WhyChooseMeProps {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  cards?: WhyChooseMeCard[];
}

/**
 * Line icons — thin (1.5px stroke), monochrome, no fills.
 * Kept local to this file so the section has zero external icon
 * dependencies, consistent with TrustBar's approach elsewhere on the
 * site.
 */
function CameraIcon() {
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
      <path d="M4 8h2.5l1.2-2h8.6l1.2 2H20a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1Z" />
      <circle cx="12" cy="13.5" r="3.5" />
    </svg>
  );
}

function HeartIcon() {
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
      <path d="M12 20.5s-7.5-4.6-9.8-9.1C.6 8.1 2 4.8 5.3 4.1c2-.4 3.9.5 5 2.1 1.1-1.6 3-2.5 5-2.1 3.3.7 4.7 4 3.1 7.3-2.3 4.5-9.8 9.1-9.8 9.1Z" />
    </svg>
  );
}

function SlidersIcon() {
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
      <path d="M4 6h9" />
      <path d="M17 6h3" />
      <circle cx="14" cy="6" r="2.2" />
      <path d="M4 12h3" />
      <path d="M11 12h9" />
      <circle cx="8" cy="12" r="2.2" />
      <path d="M4 18h9" />
      <path d="M17 18h3" />
      <circle cx="14" cy="18" r="2.2" />
    </svg>
  );
}

function GalleryIcon() {
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
      <rect x="3" y="4" width="15" height="14" rx="1.5" />
      <path d="m3 15 4-4 3.5 3.5L15 10l3 3" />
      <circle cx="8" cy="8.5" r="1.5" />
      <path d="M21 8v9a2 2 0 0 1-2 2H8" />
    </svg>
  );
}

const defaultCards: WhyChooseMeCard[] = [
  {
    icon: <CameraIcon />,
    title: 'ציוד מקצועי',
    text: 'עבודה עם ציוד צילום ותאורה מקצועיים לתוצאה חדה, נקייה ומרשימה.',
  },
  {
    icon: <HeartIcon />,
    title: 'יחס אישי',
    text: 'ליווי רגוע, סבלני ומדויק שמאפשר לכם להרגיש בנוח מול המצלמה.',
  },
  {
    icon: <SlidersIcon />,
    title: 'עריכה מקצועית',
    text: 'כל תמונה עוברת מיון ועריכה מוקפדת תוך שמירה על מראה טבעי ואיכותי.',
  },
  {
    icon: <GalleryIcon />,
    title: 'מסירה מסודרת',
    text: 'קבלת התמונות בגלריה דיגיטלית נוחה, ברורה ומוכנה לשיתוף.',
  },
];

/**
 * WhyChooseMeCard — a single benefit tile.
 *
 * Design: card surface uses --color-background against the section's
 * --color-card surface, so the cards read as a gentle inset rather than
 * a heavy block — with a thin --color-border hairline instead of a
 * shadow doing the separating. The icon badge and card border shift to
 * gold on hover, and the whole card lifts by one pixel — a restrained
 * motion, not a bounce or scale effect.
 */
function WhyChooseMeCardItem({ card }: { card: WhyChooseMeCard }) {
  return (
    <div
      className="group flex flex-col items-center gap-4 rounded-lg border border-[var(--color-border)] bg-[var(--color-background)] px-6 py-8 text-center shadow-[0_1px_6px_rgba(0,0,0,0.03)] transition-all duration-300 ease-out hover:-translate-y-1 hover:border-[var(--color-primary-gold)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.06)]"
    >
      <span
        className="flex h-14 w-14 items-center justify-center rounded-full border border-[var(--color-border)] text-[var(--color-primary-gold-hover)] transition-colors duration-300 ease-out group-hover:border-[var(--color-primary-gold)] group-hover:bg-[var(--color-primary-gold)]/10"
        aria-hidden="true"
      >
        {card.icon}
      </span>

      <h3 className="text-lg font-semibold text-[var(--color-text-primary)] sm:text-xl">
        {card.title}
      </h3>

      <p className="text-sm font-normal leading-relaxed text-[var(--color-text-secondary)] sm:text-base">
        {card.text}
      </p>
    </div>
  );
}

/**
 * WhyChooseMe — "למה לבחור בי" section.
 *
 * A calm, four-card grid explaining the studio's core value points.
 * Section surface uses --color-card (white) to sit as a distinct band
 * between the surrounding --color-background sections, with the cards
 * themselves using --color-background so the contrast reads the other
 * way around — a quiet inversion that keeps the whole page feeling like
 * one coherent, minimal system rather than repeating the same surface
 * twice in a row.
 */
export default function WhyChooseMe({
  eyebrow = 'למה לבחור בי',
  title = 'צילום מקצועי, יחס אישי וחוויה רגועה',
  subtitle = 'כל אירוע מקבל ממני את מלוא תשומת הלב — מהרגע הראשון ועד למסירת התמונות.',
  cards = defaultCards,
}: WhyChooseMeProps) {
  return (
    <section
      id="services"
      dir="rtl"
      aria-label="למה לבחור בי"
      className={`${heebo.variable} w-full bg-[var(--color-card)] py-20 font-[family-name:var(--font-heebo)] sm:py-28`}
    >
      <div className="mx-auto max-w-[1280px] px-6 sm:px-10 lg:px-16">
        {/* Section header */}
        <div className="mx-auto max-w-xl text-center">
          <p className="text-sm font-medium tracking-wide text-[var(--color-primary-gold-hover)]">
            {eyebrow}
          </p>
          <h2 className="mt-3 text-3xl font-bold leading-tight text-[var(--color-text-primary)] sm:text-4xl lg:text-5xl">
            {title}
          </h2>
          <p className="mt-4 text-base font-normal leading-relaxed text-[var(--color-text-secondary)] sm:text-lg">
            {subtitle}
          </p>
        </div>

        {/* Cards grid */}
        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {cards.map((card) => (
            <WhyChooseMeCardItem key={card.title} card={card} />
          ))}
        </div>
      </div>
    </section>
  );
}
