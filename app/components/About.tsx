import Image from 'next/image';
import { Heebo } from 'next/font/google';

/** Single typeface for the entire site: Heebo. */
const heebo = Heebo({
  subsets: ['hebrew', 'latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-heebo',
  display: 'swap',
});

export interface AboutProps {
  eyebrow?: string;
  title?: string;
  paragraph?: string;
  highlightLine?: string;
  ctaLabel?: string;
  ctaHref?: string;
  /** Local path to the portrait image under /public */
  imageSrc?: string;
}

/**
 * About — "נעים להכיר" section.
 *
 * Layout: a two-column grid on desktop with the portrait image on the
 * left and text on the right. In this RTL grid, the text block is placed
 * first in markup order so it lands in the rightmost column, and the
 * image block second so it lands on the left — the two are then
 * reordered independently for mobile (order-1 / order-2) so the image
 * stacks above the text there instead.
 *
 * Design: a short thin gold rule under the eyebrow acts as the section's
 * single accent mark, echoed again as a vertical gold border beside the
 * highlighted closing line. The portrait sits in a bordered frame with a
 * very soft shadow rather than a heavy drop shadow, keeping the section
 * calm and minimal. All colors are driven by the CSS variables defined
 * in globals.css.
 */
export default function About({
  eyebrow = 'נעים להכיר, ',
  title = 'ישראל דדון',
  paragraph = 'צלם אירועים שמתמחה בתיעוד רגעים אמיתיים, מרגשים ובלתי נשכחים. מבחינתי צילום טוב הוא לא רק תמונה יפה, אלא חוויה רגועה, יחס אישי ותוצאה שנשארת איתכם לשנים.',
  highlightLine = 'אני מלווה כל לקוח באופן אישי — משלב התכנון ועד למסירת התמונות.',
  ctaLabel = 'בואו נדבר',
  ctaHref = 'https://wa.me/972509978499',
  imageSrc = '/images/about/cover.jpg',
}: AboutProps) {
  return (
    <section
      dir="rtl"
      aria-label="נעים להכיר — קצת עליי"
      className={`${heebo.variable} w-full bg-[var(--color-background)] py-20 font-[family-name:var(--font-heebo)] sm:py-28`}
    >
      <div className="mx-auto max-w-[1280px] px-6 sm:px-10 lg:px-16">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Text block — first in markup so it lands on the right in
              this RTL grid; stacks below the image on mobile. */}
          <div className="order-2 lg:order-1">
            <span className="mb-4 block h-[2px] w-12 bg-[var(--color-primary-gold)]" aria-hidden="true" />

            <p className="text-sm font-medium tracking-wide text-[var(--color-primary-gold-hover)]">
              {eyebrow}
            </p>

            <h2 className="mt-3 text-3xl font-bold leading-tight text-[var(--color-text-primary)] sm:text-4xl lg:text-5xl">
              {title}
            </h2>

            <p className="mt-6 max-w-xl text-base font-normal leading-relaxed text-[var(--color-text-secondary)] sm:text-lg">
              {paragraph}
            </p>

            <p className="mt-6 max-w-xl border-r-2 border-[var(--color-primary-gold)] pr-4 text-base font-medium leading-relaxed text-[var(--color-text-primary)] sm:text-lg">
              {highlightLine}
            </p>

            <a
              href={ctaHref}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center justify-center rounded-md border border-[var(--color-primary-gold)] bg-[var(--color-primary-gold)] px-8 py-4 text-base font-semibold text-[var(--color-text-on-gold)] shadow-[0_2px_10px_rgba(0,0,0,0.10)] transition-all duration-200 ease-out hover:-translate-y-0.5 hover:border-[var(--color-primary-gold-hover)] hover:bg-[var(--color-primary-gold-hover)] hover:shadow-[0_6px_16px_rgba(0,0,0,0.14)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary-gold-hover)] motion-reduce:transition-none motion-reduce:hover:translate-y-0"
            >
              {ctaLabel}
            </a>
          </div>

          {/* Image block — second in markup so it lands on the left in
              this RTL grid; stacks above the text on mobile. */}
          <div className="order-1 lg:order-2">
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-lg border border-[var(--color-border)] bg-[var(--color-card)] shadow-[0_1px_10px_rgba(0,0,0,0.05)]">
              <Image
                src={imageSrc}
                alt="ישראל דדון — צלם אירועים"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
