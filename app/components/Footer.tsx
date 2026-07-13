import { Heebo } from 'next/font/google';

/** Single typeface for the entire site: Heebo. */
const heebo = Heebo({
  subsets: ['hebrew', 'latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-heebo',
  display: 'swap',
});

export interface FooterNavItem {
  label: string;
  href: string;
}

export interface FooterProps {
  logoName?: string;
  logoTagline?: string;
  shortText?: string;
  navItems?: FooterNavItem[];
  phone?: string;
  whatsapp?: string;
  instagramHandle?: string;
  instagramHref?: string;
  copyrightLine?: string;
}

const defaultNavItems: FooterNavItem[] = [
  { label: 'בית', href: '#home' },
  { label: 'גלריה', href: '#gallery' },
  { label: 'אודות', href: '#about' },
  { label: 'למה לבחור בי', href: '#services' },
  { label: 'איך זה עובד', href: '#process' },
  { label: 'יצירת קשר', href: '#contact' },
];

/** Thin line icons — kept local, no external icon library. */
function PhoneIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4 shrink-0"
      aria-hidden="true"
    >
      <path d="M4.5 4h3.2l1.3 4.3-2 1.6a12 12 0 0 0 5.1 5.1l1.6-2 4.3 1.3v3.2a1.5 1.5 0 0 1-1.6 1.5C9.8 18.4 5.6 14.2 5 7.6A1.5 1.5 0 0 1 4.5 4Z" />
    </svg>
  );
}

function WhatsappIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4 shrink-0"
      aria-hidden="true"
    >
      <path d="M12 3.5a8.5 8.5 0 0 0-7.3 12.8L3.5 20.5l4.3-1.2A8.5 8.5 0 1 0 12 3.5Z" />
      <path d="M8.7 8.4c.2-.5.5-.5.8-.5h.5c.2 0 .4 0 .6.4.2.5.7 1.6.7 1.7.1.1.1.3 0 .4-.1.2-.2.3-.3.4l-.4.5c-.1.1-.3.3-.1.6.2.4.8 1.3 1.7 2.1 1.2 1 2.1 1.4 2.4 1.5.3.1.5.1.6-.1l.6-.7c.2-.2.4-.2.6-.1l1.5.7c.2.1.4.2.4.4.1.2.1 1-.2 1.4-.4.4-1.2.9-2.1.8-1-.1-3-.8-4.8-2.5-1.7-1.6-2.7-3.4-3-4.4-.2-.7 0-1.2.2-1.6Z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4 shrink-0"
      aria-hidden="true"
    >
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17" cy="7" r="0.8" fill="currentColor" stroke="none" />
    </svg>
  );
}

function ArrowUpIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-3.5 w-3.5 shrink-0"
      aria-hidden="true"
    >
      <path d="M12 19V5" />
      <path d="M6 11 12 5l6 6" />
    </svg>
  );
}

/**
 * Footer — site-wide closing section.
 *
 * Colors: sits on --color-text-primary (the site's charcoal) as its own
 * surface, inverting the usual light-on-dark relationship — main text is
 * white, secondary text is white at reduced opacity (used instead of
 * introducing a new "light gray" color not defined in globals.css, so
 * the palette stays centrally managed), and every interactive element
 * uses the same gold accent as the rest of the site on hover. A thin
 * gold rule marks the top edge as the one deliberate accent line on an
 * otherwise calm, dark surface.
 *
 * Layout: 3 columns on desktop (brand, navigation, contact), stacking to
 * a single column on mobile. A slim bottom bar holds the copyright line
 * and a small back-to-top link.
 */
export default function Footer({
  logoName = 'ישראל דדון',
  logoTagline = 'צילום אירועים',
  shortText = 'צילום אירועים מקצועי, אישי ומדויק — מהרגע הראשון ועד למסירת התמונות.',
  navItems = defaultNavItems,
  phone = '050-9978499',
  whatsapp = '050-9978499',
  instagramHandle = 'Israel_Dadon.photographer',
  instagramHref = 'https://www.instagram.com/israel_dadon1?igsh=MjZ1bDk2b2FseTZx&utm_source=qr',
  copyrightLine = '© 2026 ישראל דדון. כל הזכויות שמורות.',
}: FooterProps) {
  const whatsappHref = `https://wa.me/972${whatsapp.replace(/\D/g, '').replace(/^0/, '')}`;
  const phoneHref = `tel:${phone.replace(/\D/g, '')}`;

  return (
    <footer
      dir="rtl"
      className={`${heebo.variable} w-full border-t-2 border-[var(--color-primary-gold)] bg-[var(--color-text-primary)] font-[family-name:var(--font-heebo)]`}
    >
      <div className="mx-auto max-w-[1280px] px-6 py-16 sm:px-10 sm:py-20 lg:px-16">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {/* Brand */}
          <div>
            <p className="text-xl font-bold text-white">{logoName}</p>
            <p className="mt-1 text-sm text-white/60">{logoTagline}</p>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/60">
              {shortText}
            </p>
          </div>

          {/* Navigation */}
          <div>
            <p className="text-sm font-semibold tracking-wide text-white">ניווט</p>
            <ul className="mt-2 flex flex-col">
              {navItems.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="inline-flex min-h-11 items-center text-sm text-white/60 transition-colors duration-200 ease-out hover:text-[var(--color-primary-gold)]"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="text-sm font-semibold tracking-wide text-white">יצירת קשר</p>
            <ul className="mt-2 flex flex-col">
              <li>
                <a
                  href={phoneHref}
                  className="flex min-h-11 items-center gap-2 text-sm text-white/60 transition-colors duration-200 ease-out hover:text-[var(--color-primary-gold)]"
                >
                  <PhoneIcon />
                  <span>{phone}</span>
                </a>
              </li>
              <li>
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex min-h-11 items-center gap-2 text-sm text-white/60 transition-colors duration-200 ease-out hover:text-[var(--color-primary-gold)]"
                >
                  <WhatsappIcon />
                  <span>{whatsapp}</span>
                </a>
              </li>
              <li>
                <a
                  href={instagramHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex min-h-11 items-center gap-2 text-sm text-white/60 transition-colors duration-200 ease-out hover:text-[var(--color-primary-gold)]"
                >
                  <InstagramIcon />
                  <span>{instagramHandle}</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 flex flex-col items-center gap-4 border-t border-white/10 pt-8 sm:flex-row sm:justify-between">
          <p className="text-xs text-white/50">{copyrightLine}</p>

          <a
            href="#home"
            className="inline-flex min-h-11 items-center gap-1.5 text-xs font-medium text-white/60 transition-colors duration-200 ease-out hover:text-[var(--color-primary-gold)]"
          >
            <span>חזרה למעלה</span>
            <ArrowUpIcon />
          </a>
        </div>
      </div>
    </footer>
  );
}
