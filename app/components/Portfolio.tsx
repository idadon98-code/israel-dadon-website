'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { Heebo } from 'next/font/google';

/** Single typeface for the entire site: Heebo. */
const heebo = Heebo({
  subsets: ['hebrew', 'latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-heebo',
  display: 'swap',
});

export interface PortfolioCategory {
  /** Unique id */
  id: string;
  /** Category label shown on the card and in the lightbox */
  label: string;
  /** Path to the category's cover image under public/images/ */
  image: string;
  /** Real pixel dimensions of `image`, used to size the Lightbox correctly */
  width: number;
  height: number;
}

export interface PortfolioProps {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  ctaLabel?: string;
  ctaHref?: string;
  categories?: PortfolioCategory[];
}

const defaultCategories: PortfolioCategory[] = [
  {
    id: 'aliyah-torah',
    label: 'עלייה לתורה',
    image: '/images/aliyah-torah/aliyah.jpg',
    width: 8256,
    height: 5504,
  },
  {
    id: 'bar-mitzvah',
    label: 'בר מצווה',
    image: '/images/bar-mitzvah/bar.jpg',
    width: 8256,
    height: 5504,
  },
  {
    id: 'bat-mitzvah',
    label: 'בת מצווה',
    image: '/images/bat-mitzvah/cover.jpg',
    width: 8256,
    height: 5504,
  },
  {
    id: 'sefer-torah',
    label: 'הכנסת ספר תורה',
    image: '/images/sefer-torah/cover.jpg',
    width: 4088,
    height: 6132,
  },
];

function ChevronIcon({ direction }: { direction: 'start' | 'end' }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5"
      aria-hidden="true"
    >
      {direction === 'start' ? <path d="m15 5-7 7 7 7" /> : <path d="m9 5 7 7-7 7" />}
    </svg>
  );
}

function CloseIcon() {
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
      <path d="M6 6l12 12M18 6 6 18" />
    </svg>
  );
}

/**
 * PortfolioCard — a single large category tile.
 *
 * Colors: driven entirely by the CSS variables defined in globals.css.
 * The card sits on a white surface with a thin border (per brand spec),
 * and a soft neutral gradient behind the image as a graceful fallback
 * surface before real photography is dropped in. On hover, four thin
 * "viewfinder" corner brackets close in around the frame and a small
 * gold focus-dot appears — the same lens-focusing motif used across the
 * site — while the image itself eases into a slightly closer crop.
 *
 * Behavior: opens the category's photo in the Lightbox below rather than
 * linking to an anchor — there's no separate per-category gallery page
 * yet, only a single cover photo each, so a full-size lightbox view is
 * the honest "view this category" action.
 */
function PortfolioCard({
  category,
  onOpen,
}: {
  category: PortfolioCategory;
  onOpen: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className="group relative block aspect-[4/5] w-full overflow-hidden rounded-lg border border-[var(--color-border)] bg-[var(--color-card)] text-right shadow-[0_1px_6px_rgba(0,0,0,0.04)] transition-shadow duration-300 hover:shadow-[0_6px_20px_rgba(0,0,0,0.07)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary-gold)]"
      aria-label={`צפייה בתמונה מקטגוריית ${category.label}`}
    >
      {/* Placeholder / photography image */}
      <Image
        src={category.image}
        alt={`עבודות נבחרות — ${category.label}`}
        fill
        loading="lazy"
        sizes="(max-width: 639px) 100vw, (max-width: 1279px) 50vw, 640px"
        className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
      />

      {/* Bottom gradient — keeps the label readable over any image */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-[var(--color-text-primary)]/70 via-[var(--color-text-primary)]/10 to-transparent transition-opacity duration-300 group-hover:from-[var(--color-text-primary)]/80"
      />

      {/* Viewfinder corner brackets — appear on hover */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-4 opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-100"
      >
        <span className="absolute right-0 top-0 h-6 w-6 border-r-2 border-t-2 border-[var(--color-card)]" />
        <span className="absolute left-0 top-0 h-6 w-6 border-l-2 border-t-2 border-[var(--color-card)]" />
        <span className="absolute bottom-0 right-0 h-6 w-6 border-b-2 border-r-2 border-[var(--color-card)]" />
        <span className="absolute bottom-0 left-0 h-6 w-6 border-b-2 border-l-2 border-[var(--color-card)]" />
      </span>

      {/* Focus dot — small gold accent that appears at card center on hover */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--color-primary-gold)] opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-100"
      />

      {/* Category label */}
      <span className="absolute inset-x-0 bottom-0 flex items-center justify-between px-5 py-5 sm:px-6 sm:py-6">
        <span className="text-lg font-semibold text-[var(--color-card)] transition-transform duration-300 ease-out group-hover:-translate-y-1 sm:text-xl">
          {category.label}
        </span>
        <span
          aria-hidden="true"
          className="text-[var(--color-card)]/80 transition-transform duration-300 ease-out group-hover:-translate-x-1"
        >
          ←
        </span>
      </span>
    </button>
  );
}

/** How long the fade/scale open-close transition takes, in ms. Kept as a
 * constant so the CSS duration class and the setTimeout that delays the
 * actual unmount on close always agree. */
const LIGHTBOX_TRANSITION_MS = 200;

/**
 * Lightbox — full-screen overlay showing one category's photo at a
 * larger size, with prev/next navigation between categories.
 *
 * Behavior: Escape closes, left/right arrow keys move between
 * categories (mapped to the RTL reading direction — right arrow moves
 * to the previous card, left arrow to the next), Tab/Shift+Tab cycle
 * focus between the three buttons without escaping to the page behind
 * it, the backdrop closes on click, and body scroll is locked while
 * open — mirroring the pattern already used for Header's mobile menu.
 *
 * Animation: fades and scales in on mount (the same "isLoaded +
 * requestAnimationFrame" technique Hero uses for its entrance), and
 * plays the same transition in reverse on close — actual unmount is
 * delayed by LIGHTBOX_TRANSITION_MS so the exit animation can finish.
 * Switching categories crossfades the image via a simple loaded-state
 * toggle rather than swapping instantly.
 */
function Lightbox({
  categories,
  activeIndex,
  onClose,
  onNavigate,
}: {
  categories: PortfolioCategory[];
  activeIndex: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
}) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [loadedForIndex, setLoadedForIndex] = useState(activeIndex);
  const category = categories[activeIndex];

  // Reset the crossfade when the category changes. Adjusted directly during
  // render (React's documented pattern for this) rather than in an effect,
  // since setting state synchronously inside an effect triggers an extra
  // render pass for no benefit here.
  if (activeIndex !== loadedForIndex) {
    setLoadedForIndex(activeIndex);
    setIsImageLoaded(false);
  }

  const goToPrevious = useCallback(
    () => onNavigate((activeIndex - 1 + categories.length) % categories.length),
    [activeIndex, categories.length, onNavigate]
  );
  const goToNext = useCallback(
    () => onNavigate((activeIndex + 1) % categories.length),
    [activeIndex, categories.length, onNavigate]
  );

  const handleClose = useCallback(() => {
    setIsVisible(false);
    window.setTimeout(onClose, LIGHTBOX_TRANSITION_MS);
  }, [onClose]);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setIsVisible(true));
    closeButtonRef.current?.focus();
    document.body.style.overflow = 'hidden';
    return () => {
      cancelAnimationFrame(frame);
      document.body.style.overflow = '';
    };
  }, []);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        handleClose();
        return;
      }
      if (event.key === 'ArrowRight') goToPrevious();
      if (event.key === 'ArrowLeft') goToNext();

      if (event.key === 'Tab') {
        const focusable = dialogRef.current?.querySelectorAll<HTMLButtonElement>('button');
        if (!focusable || focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    }
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [handleClose, goToPrevious, goToNext]);

  return (
    <div
      ref={dialogRef}
      dir="rtl"
      role="dialog"
      aria-modal="true"
      aria-label={`תמונה מקטגוריית ${category.label}`}
      className={`fixed inset-0 z-[60] flex items-center justify-center bg-[var(--color-text-primary)]/90 p-4 backdrop-blur-sm transition-opacity duration-200 ease-out sm:p-8 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      onClick={handleClose}
    >
      <button
        ref={closeButtonRef}
        type="button"
        onClick={handleClose}
        aria-label="סגירה"
        className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-[var(--color-card)]/10 text-[var(--color-card)] transition-colors duration-200 hover:bg-[var(--color-card)]/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary-gold)] sm:right-8 sm:top-8"
      >
        <CloseIcon />
      </button>

      <button
        type="button"
        onClick={(event) => {
          event.stopPropagation();
          goToPrevious();
        }}
        aria-label="הקטגוריה הקודמת"
        className="absolute right-2 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-[var(--color-card)]/10 text-[var(--color-card)] transition-colors duration-200 hover:bg-[var(--color-card)]/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary-gold)] sm:right-4"
      >
        <ChevronIcon direction="start" />
      </button>

      <button
        type="button"
        onClick={(event) => {
          event.stopPropagation();
          goToNext();
        }}
        aria-label="הקטגוריה הבאה"
        className="absolute left-2 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-[var(--color-card)]/10 text-[var(--color-card)] transition-colors duration-200 hover:bg-[var(--color-card)]/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary-gold)] sm:left-4"
      >
        <ChevronIcon direction="end" />
      </button>

      <div
        className={`flex max-h-full max-w-3xl flex-col items-center gap-4 transition-transform duration-200 ease-out ${
          isVisible ? 'scale-100' : 'scale-95'
        }`}
        onClick={(event) => event.stopPropagation()}
      >
        <Image
          src={category.image}
          alt={`עבודות נבחרות — ${category.label}`}
          width={category.width}
          height={category.height}
          sizes="(max-width: 768px) 100vw, 768px"
          onLoad={() => setIsImageLoaded(true)}
          className={`h-auto max-h-[75vh] w-auto max-w-full rounded-lg object-contain shadow-[0_10px_40px_rgba(0,0,0,0.3)] transition-opacity duration-300 ease-out ${
            isImageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        />
        <p className="text-lg font-semibold text-[var(--color-card)]">{category.label}</p>
      </div>
    </div>
  );
}

/**
 * Portfolio — "עבודות נבחרות" section.
 *
 * Displays the four core categories as large, editorial image cards in a
 * light, ivory-toned grid: עלייה לתורה, בר מצווה, בת מצווה, and הכנסת
 * ספר תורה — each pointing at its real cover image under
 * public/images/&lt;category&gt;/cover.jpg. Clicking a card opens that
 * photo in a full-size Lightbox. All colors are driven by the CSS
 * variables defined in globals.css.
 */
export default function Portfolio({
  eyebrow = 'גלריה',
  title = 'עבודות נבחרות',
  subtitle = 'כמה מהרגעים שזכיתי לתעד',
  ctaLabel = 'לצפייה בגלריה המלאה באינסטגרם',
  ctaHref = 'https://www.instagram.com/israel_dadon1?igsh=MjZ1bDk2b2FseTZx&utm_source=qr',
  categories = defaultCategories,
}: PortfolioProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <section
      id="gallery"
      dir="rtl"
      aria-label="עבודות נבחרות מהפורטפוליו"
      className={`${heebo.variable} w-full bg-[var(--color-background)] py-20 font-[family-name:var(--font-heebo)] sm:py-28`}
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

        {/* Category grid */}
        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-7 lg:gap-8">
          {categories.map((category, index) => (
            <PortfolioCard
              key={category.id}
              category={category}
              onOpen={() => setActiveIndex(index)}
            />
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

      {activeIndex !== null && (
        <Lightbox
          categories={categories}
          activeIndex={activeIndex}
          onClose={() => setActiveIndex(null)}
          onNavigate={setActiveIndex}
        />
      )}
    </section>
  );
}
