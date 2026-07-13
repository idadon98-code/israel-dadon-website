import { Heebo } from 'next/font/google';

/** Single typeface for the entire site: Heebo. */
const heebo = Heebo({
  subsets: ['hebrew', 'latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-heebo',
  display: 'swap',
});

export interface HowItWorksStep {
  title: string;
  text: string;
}

export interface HowItWorksProps {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  steps?: HowItWorksStep[];
}

const defaultSteps: HowItWorksStep[] = [
  {
    title: 'יוצרים קשר',
    text: 'שולחים הודעה או מתקשרים, מספרים לי על האירוע ומקבלים מענה אישי ומהיר.',
  },
  {
    title: 'מתאמים את הפרטים',
    text: 'עוברים יחד על סוג האירוע, השעות, המיקום וכל מה שחשוב לכם.',
  },
  {
    title: 'נפגשים ביום האירוע',
    text: 'אני מגיע מוכן, רגוע ומדויק כדי שתוכלו ליהנות ולהרגיש טבעיים מול המצלמה.',
  },
  {
    title: 'מקבלים את התמונות',
    text: 'התמונות עוברות מיון ועריכה ומגיעות אליכם בגלריה דיגיטלית מסודרת ונוחה.',
  },
];

/**
 * StepNumber — a small circular badge with a two-digit step number.
 *
 * Design: outlined in gold on the card/background surface by default; on
 * hover the circle fills solid gold and the number flips to white, with
 * a one-pixel lift — a restrained, single motion rather than a bounce or
 * scale effect. Shared between the desktop and mobile layouts so both
 * timelines feel identical up close.
 */
function StepNumber({ index }: { index: number }) {
  return (
    <span
      className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-2 border-[var(--color-primary-gold)] bg-[var(--color-card)] text-base font-bold text-[var(--color-primary-gold-hover)] shadow-[0_1px_6px_rgba(0,0,0,0.04)] transition-all duration-300 ease-out group-hover:-translate-y-1 group-hover:bg-[var(--color-primary-gold)] group-hover:text-[var(--color-text-on-gold)] group-hover:shadow-[0_6px_16px_rgba(0,0,0,0.10)]"
      aria-hidden="true"
    >
      {String(index + 1).padStart(2, '0')}
    </span>
  );
}

/**
 * HowItWorks — "איך זה עובד" section.
 *
 * Layout: a clean horizontal timeline on desktop (lg and up) — four
 * numbered circles connected by a thin --color-border line running
 * through their centers, with title and text stacked underneath each.
 * On mobile, the same four steps switch to a vertical timeline: the
 * numbered circles form a column connected by a thin vertical line, with
 * each step's title and text sitting beside its circle (to the right, in
 * this RTL layout, since the circle is placed first in markup and RTL
 * flex rows start from the right).
 *
 * Colors: driven entirely by the CSS variables defined in globals.css —
 * background is --color-background, the connecting line and any card
 * hairlines use --color-border, and the accent is --color-primary-gold /
 * --color-primary-gold-hover throughout.
 */
export default function HowItWorks({
  eyebrow = 'איך זה עובד',
  title = 'תהליך פשוט, ברור ונעים',
  subtitle = 'מהפנייה הראשונה ועד למסירת התמונות — אני מלווה אתכם באופן אישי לאורך כל הדרך.',
  steps = defaultSteps,
}: HowItWorksProps) {
  return (
    <section
      id="process"
      dir="rtl"
      aria-label="איך זה עובד"
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

        {/* Desktop: horizontal timeline */}
        <div className="relative mt-16 hidden lg:grid lg:grid-cols-4 lg:gap-8">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute right-[12.5%] left-[12.5%] top-7 h-px bg-[var(--color-border)]"
          />

          {steps.map((step, index) => (
            <div
              key={step.title}
              className="group relative flex flex-col items-center gap-4 text-center"
            >
              <StepNumber index={index} />
              <h3 className="text-lg font-semibold text-[var(--color-text-primary)] transition-colors duration-300 ease-out group-hover:text-[var(--color-primary-gold-hover)]">
                {step.title}
              </h3>
              <p className="max-w-[230px] text-sm font-normal leading-relaxed text-[var(--color-text-secondary)]">
                {step.text}
              </p>
            </div>
          ))}
        </div>

        {/* Mobile / tablet: vertical timeline */}
        <ol className="relative mt-14 flex flex-col gap-10 lg:hidden">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute right-7 top-2 bottom-2 w-px bg-[var(--color-border)]"
          />

          {steps.map((step, index) => (
            <li key={step.title} className="group relative flex items-start gap-5">
              <StepNumber index={index} />
              <div className="pt-2.5">
                <h3 className="text-lg font-semibold text-[var(--color-text-primary)] transition-colors duration-300 ease-out group-hover:text-[var(--color-primary-gold-hover)]">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm font-normal leading-relaxed text-[var(--color-text-secondary)] sm:text-base">
                  {step.text}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
