import type { ReactNode } from 'react';
import { Heebo } from 'next/font/google';

/** Single typeface for the entire site: Heebo. */
const heebo = Heebo({
  subsets: ['hebrew', 'latin'],
  weight: ['300', '400', '500'],
  variable: '--font-heebo',
  display: 'swap',
});

export interface TrustItem {
  /** Line-icon rendered above the label */
  icon: ReactNode;
  /** Short label describing the trust point */
  label: string;
}

export interface TrustBarProps {
  items?: TrustItem[];
}

/**
 * Line icons — thin (1.5px stroke), monochrome, no fills.
 * Kept local to this file so TrustBar has zero external icon
 * dependencies and stays fully self-contained and reusable.
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

function StarIcon() {
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
      <path d="M12 3.5 14.5 9l6 .8-4.3 4.1 1 6-5.2-2.8-5.2 2.8 1-6L3.5 9.8l6-.8L12 3.5Z" />
    </svg>
  );
}

function HandshakeIcon() {
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
      <path d="M3 10.5 7 7l4 2.5" />
      <path d="M21 10.5 17 7l-3.2 2" />
      <path d="M7 7 3.3 10.7a1.4 1.4 0 0 0 2 2L8 10" />
      <path d="M17 7l3.7 3.7a1.4 1.4 0 0 1-2 2L16 10" />
      <path d="m8 10 2.3 2.3a1.3 1.3 0 0 0 1.9 0 1.3 1.3 0 0 0 0-1.9L11 9" />
      <path d="m16 10-2.3 2.3a1.3 1.3 0 0 1-1.9 0" />
    </svg>
  );
}

const defaultItems: TrustItem[] = [
  { icon: <CameraIcon />, label: 'צילום אירועים מקצועי' },
  { icon: <MagnetIcon />, label: 'הדפסת מגנטים במקום' },
  { icon: <StarIcon />, label: 'צילום בר ובת מצווה' },
  { icon: <HandshakeIcon />, label: 'שירות אישי וליווי מלא' },
];

/**
 * TrustBar — a quiet, confident strip of four trust points shown right
 * after the Hero.
 *
 * Colors: driven entirely by the CSS variables defined in globals.css.
 * White card surface with a thin border instead of a shadow, generous
 * internal spacing, and a single row of dividers on desktop that
 * collapses into a clean stacked list on mobile.
 */
export default function TrustBar({ items = defaultItems }: TrustBarProps) {
  return (
    <section
      dir="rtl"
      aria-label="נקודות אמון עיקריות"
      className={`${heebo.variable} w-full bg-[var(--color-card)] py-10 font-[family-name:var(--font-heebo)] sm:py-12`}
    >
      <div className="mx-auto max-w-[1280px] px-6 sm:px-10 lg:px-16">
        <ul
          className="
            grid grid-cols-1 gap-y-8
            border-y border-[var(--color-border)]
            sm:grid-cols-2 sm:gap-y-10
            lg:grid-cols-4 lg:gap-y-0
          "
        >
          {items.map((item, index) => (
            <li
              key={item.label}
              className="
                flex flex-col items-center gap-3 px-4 py-6 text-center
                sm:py-8
                lg:border-r lg:border-[var(--color-border)] lg:py-10
                lg:last:border-r-0
              "
            >
              <span
                className="flex h-12 w-12 items-center justify-center rounded-full border border-[var(--color-border)] text-[var(--color-primary-gold-hover)]"
                aria-hidden="true"
              >
                {item.icon}
              </span>
              <span className="text-sm font-medium leading-snug text-[var(--color-text-primary)] sm:text-base">
                {item.label}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
