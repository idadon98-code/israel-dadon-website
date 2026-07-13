import { Heebo } from 'next/font/google';

/** Single typeface for the entire site: Heebo. */
const heebo = Heebo({
  subsets: ['hebrew', 'latin'],
  weight: ['500', '600'],
  variable: '--font-heebo',
  display: 'swap',
});

export interface FloatingWhatsAppProps {
  href?: string;
  label?: string;
  ariaLabel?: string;
}

/** Clean inline WhatsApp glyph — no external icon library. */
function WhatsappIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-6 w-6 shrink-0"
      aria-hidden="true"
    >
      <path d="M12 3.5a8.5 8.5 0 0 0-7.3 12.8L3.5 20.5l4.3-1.2A8.5 8.5 0 1 0 12 3.5Z" />
      <path d="M8.7 8.4c.2-.5.5-.5.8-.5h.5c.2 0 .4 0 .6.4.2.5.7 1.6.7 1.7.1.1.1.3 0 .4-.1.2-.2.3-.3.4l-.4.5c-.1.1-.3.3-.1.6.2.4.8 1.3 1.7 2.1 1.2 1 2.1 1.4 2.4 1.5.3.1.5.1.6-.1l.6-.7c.2-.2.4-.2.6-.1l1.5.7c.2.1.4.2.4.4.1.2.1 1-.2 1.4-.4.4-1.2.9-2.1.8-1-.1-3-.8-4.8-2.5-1.7-1.6-2.7-3.4-3-4.4-.2-.7 0-1.2.2-1.6Z" />
    </svg>
  );
}

/**
 * FloatingWhatsApp — persistent bottom-left contact shortcut.
 *
 * Position: fixed to the bottom-left corner of the viewport regardless
 * of the page's RTL text direction — this is a screen-anchored UI
 * element, not part of the document flow, so it intentionally does not
 * follow `dir="rtl"` placement the way in-flow content does.
 *
 * Responsive shape: below `sm` it renders as a plain circular icon
 * button (56px) to stay unobtrusive on small screens; from `sm` up it
 * expands into a pill with the icon plus the "דברו איתי בוואטסאפ" label,
 * matching the button styling used elsewhere on the site.
 *
 * Colors: champagne-gold background with a white icon/label — the
 * standard WhatsApp green is intentionally not used, per the brand's
 * gold/ivory/charcoal palette. Driven entirely by the CSS variables
 * defined in globals.css, with the hover state switching to
 * --color-primary-gold-hover.
 */
export default function FloatingWhatsApp({
  href = 'https://wa.me/972509978499',
  label = 'דברו איתי בוואטסאפ',
  ariaLabel = 'שליחת הודעה בוואטסאפ',
}: FloatingWhatsAppProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={ariaLabel}
      dir="rtl"
      className={`${heebo.variable} fixed bottom-5 left-5 z-50 flex h-14 w-14 items-center justify-center gap-2 rounded-full bg-[var(--color-primary-gold)] text-[var(--color-text-on-gold)] shadow-[0_4px_16px_rgba(0,0,0,0.18)] transition-all duration-200 ease-out hover:-translate-y-0.5 hover:bg-[var(--color-primary-gold-hover)] hover:shadow-[0_8px_22px_rgba(0,0,0,0.22)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary-gold-hover)] motion-reduce:transition-none motion-reduce:hover:translate-y-0 sm:h-auto sm:w-auto sm:rounded-full sm:px-5 sm:py-3.5 font-[family-name:var(--font-heebo)]`}
    >
      <WhatsappIcon />
      <span className="hidden text-sm font-semibold sm:inline">{label}</span>
    </a>
  );
}
