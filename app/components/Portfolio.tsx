import { Heebo } from 'next/font/google';

/** Single typeface for the entire site: Heebo. */
const heebo = Heebo({
  subsets: ['hebrew', 'latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-heebo',
  display: 'swap',
});

export interface PortfolioCategory {
  /** Unique id, also used as the anchor/link target */
  id: string;
  /** Category label shown on the card */
  label: string;
  /** Path to the category's cover image under public/images/ */
  image: string;
  /** Link target for the category (e.g. a filtered gallery view) */
  href: string;
}

export interface PortfolioProps {
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
    image: "/images/aliyah-torah/aliyah.jpg",
    href: '#gallery-aliyah-torah',
  },
  {
    id: 'bar-mitzvah',
    label: 'בר מצווה',
    image: "/images/bar-mitzvah/bar.jpg",
    href: '#gallery-bar-mitzvah',
  },
  {
    id: 'bat-mitzvah',
    label: 'בת מצווה',
    image:'/images/bat-mitzvah/cover.jpg',
    href: '#gallery-bat-mitzvah',
  },
  {
    id: 'sefer-torah',
    label: 'הכנסת ספר תורה',
    image:'/images/sefer-torah/cover.jpg',
    href: '#gallery-sefer-torah',
  },
];

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
 */
function PortfolioCard({ category }: { category: PortfolioCategory }) {
  return (
    <a
      href={category.href}
      className="group relative block aspect-[4/5] overflow-hidden rounded-lg border border-[var(--color-border)] bg-[var(--color-card)] shadow-[0_1px_6px_rgba(0,0,0,0.04)] transition-shadow duration-300 hover:shadow-[0_6px_20px_rgba(0,0,0,0.07)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary-gold)]"
      aria-label={`צפייה בעבודות בקטגוריית ${category.label}`}
    >
      {/* Placeholder / photography image */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={category.image}
        alt={`עבודות נבחרות — ${category.label}`}
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
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
    </a>
  );
}

/**
 * Portfolio — "עבודות נבחרות" section.
 *
 * Displays the four core categories as large, editorial image cards in a
 * light, ivory-toned grid: עלייה לתורה, בר מצווה, בת מצווה, and הכנסת
 * ספר תורה — each pointing at its real cover image under
 * public/images/&lt;category&gt;/cover.jpg. All colors are driven by the
 * CSS variables defined in globals.css.
 */
export default function Portfolio({
  title = 'עבודות נבחרות',
  subtitle = 'כמה מהרגעים שזכיתי לתעד',
  ctaLabel = 'לצפייה בגלריה המלאה',
  ctaHref = '#gallery',
  categories = defaultCategories,
}: PortfolioProps) {
  return (
    <section
      dir="rtl"
      aria-label="עבודות נבחרות מהפורטפוליו"
      className={`${heebo.variable} w-full bg-[var(--color-background)] py-20 font-[family-name:var(--font-heebo)] sm:py-28`}
    >
      <div className="mx-auto max-w-[1280px] px-6 sm:px-10 lg:px-16">
        {/* Section header */}
        <div className="mx-auto max-w-xl text-center">
          <h2 className="text-3xl font-bold leading-tight text-[var(--color-text-primary)] sm:text-4xl lg:text-5xl">
            {title}
          </h2>
          <p className="mt-4 text-base font-normal text-[var(--color-text-secondary)] sm:text-lg">
            {subtitle}
          </p>
        </div>

        {/* Category grid */}
        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-7 lg:gap-8">
          {categories.map((category) => (
            <PortfolioCard key={category.id} category={category} />
          ))}
        </div>

        {/* CTA */}
        <div className="mt-14 flex justify-center sm:mt-16">
          <a
            href={ctaHref}
            className="inline-flex items-center justify-center rounded-md bg-[var(--color-primary-gold)] px-8 py-4 text-base font-medium text-[var(--color-text-on-gold)] shadow-[0_1px_6px_rgba(0,0,0,0.05)] transition-all duration-200 ease-out hover:-translate-y-0.5 hover:bg-[var(--color-primary-gold-hover)] hover:shadow-[0_4px_14px_rgba(0,0,0,0.08)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary-gold)] motion-reduce:transition-none motion-reduce:hover:translate-y-0"
          >
            {ctaLabel}
          </a>
        </div>
      </div>
    </section>
  );
}
