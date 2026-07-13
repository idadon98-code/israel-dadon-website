'use client';

import { useEffect, useState } from 'react';
import { Heebo } from 'next/font/google';

/**
 * Single typeface for the entire site: Heebo. The logo wordmark uses a
 * bolder weight to carry brand presence without needing a separate serif
 * display font.
 */
const heebo = Heebo({
  subsets: ['hebrew', 'latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-heebo',
  display: 'swap',
});

export interface NavItem {
  label: string;
  href: string;
}

export interface HeaderProps {
  /** Studio name shown as the top line of the logo */
  logoName?: string;
  /** Tagline shown under the studio name */
  logoTagline?: string;
  /** Main navigation links */
  navItems?: NavItem[];
  /** Label for the WhatsApp CTA button */
  ctaLabel?: string;
  /** WhatsApp (or contact) link for the CTA button */
  ctaHref?: string;
}

const defaultNavItems: NavItem[] = [
  { label: 'בית', href: '#home' },
  { label: 'גלריה', href: '#gallery' },
  { label: 'מגנטים', href: '#magnets' },
  { label: 'אודות', href: '#about' },
  { label: 'יצירת קשר', href: '#contact' },
];

/**
 * Header — sticky top navigation for a premium photography studio site.
 *
 * Layout: fixed height of exactly var(--header-height) (80px, within the
 * 72–84px target range) with all content vertically centered via flex +
 * items-center. The logo uses justify-center on its flex column so the
 * two lines sit centered as one visual unit rather than hugging the top.
 *
 * Visibility fix: the desktop navigation now switches on at the `md`
 * breakpoint (768px) instead of `lg` (1024px). At `lg` the nav was
 * disappearing on common laptop/browser-window widths between 768–1024px
 * while the hamburger button was also hidden at `sm`, leaving a bar with
 * no visible navigation at all — this is what read as "nav almost
 * invisible". Nav links, the mobile toggle, and the CTA breakpoints are
 * now aligned so exactly one navigation method is always visible.
 *
 * Colors: unchanged — driven entirely by the CSS variables defined in
 * globals.css. Nav links use the full-opacity primary text color against
 * the solid white header so they read clearly at every size.
 */
export default function Header({
  logoName = 'ישראל דדון',
  logoTagline = 'צילום אירועים',
  navItems = defaultNavItems,
  ctaLabel = 'קבלו הצעת מחיר',
  ctaHref = 'https://wa.me/972509978499',
}: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Add the hairline border + soft shadow once the page has scrolled a bit.
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock body scroll while the full-screen mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  // Close the mobile menu on Escape for keyboard users.
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsMenuOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  return (
    <header
      dir="rtl"
      className={`${heebo.variable} sticky top-0 z-50 w-full bg-[var(--color-card)] font-[family-name:var(--font-heebo)] transition-shadow duration-300 ${
        isScrolled
          ? 'border-b border-[var(--color-border)] shadow-[0_1px_8px_rgba(0,0,0,0.04)]'
          : 'border-b border-transparent'
      }`}
    >
      <div className="mx-auto flex h-[var(--header-height)] max-w-[1280px] items-center justify-between px-6 sm:px-10 lg:px-16">
        {/* Logo — centered as a block, not top-aligned */}
        <a
          href="#home"
          className="flex shrink-0 flex-col justify-center leading-tight"
          aria-label="ישראל דדון צילום אירועים — חזרה לעמוד הבית"
        >
          <span className="text-xl font-bold text-[var(--color-text-primary)] sm:text-2xl">
            {logoName}
          </span>
          <span className="mt-0.5 text-xs font-normal tracking-wide text-[var(--color-text-secondary)] sm:text-sm">
            {logoTagline}
          </span>
        </a>

        {/* Desktop navigation — visible from md (768px) up */}
        <nav aria-label="ניווט ראשי" className="hidden md:block">
          <ul className="flex items-center gap-6 lg:gap-8">
            {navItems.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  className="relative inline-block py-2 text-[15px] font-semibold text-[var(--color-text-primary)] transition-colors duration-200 after:absolute after:bottom-0 after:right-1/2 after:left-1/2 after:h-[1.5px] after:bg-[var(--color-primary-gold)] after:transition-all after:duration-300 hover:text-[var(--color-primary-gold-hover)] hover:after:right-0 hover:after:left-0"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* CTA + mobile menu toggle */}
        <div className="flex shrink-0 items-center gap-3">
          <a
            href={ctaHref}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center justify-center rounded-md bg-[var(--color-primary-gold)] px-5 py-3 text-sm font-semibold text-[var(--color-text-on-gold)] shadow-[0_1px_6px_rgba(0,0,0,0.05)] transition-all duration-200 ease-out hover:-translate-y-0.5 hover:bg-[var(--color-primary-gold-hover)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.08)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary-gold)] sm:inline-flex"
          >
            {ctaLabel}
          </a>

          {/* Hamburger — visible only below md, matching the nav's md breakpoint */}
          <button
            type="button"
            aria-label={isMenuOpen ? 'סגירת תפריט' : 'פתיחת תפריט'}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            onClick={() => setIsMenuOpen((open) => !open)}
            className="flex h-11 w-11 items-center justify-center rounded-md border border-[var(--color-border)] text-[var(--color-text-primary)] transition-colors duration-200 hover:border-[var(--color-primary-gold)] md:hidden"
          >
            <span className="relative block h-4 w-5" aria-hidden="true">
              <span
                className={`absolute right-0 h-[1.5px] w-5 bg-[var(--color-text-primary)] transition-all duration-300 ${
                  isMenuOpen ? 'top-[7px] rotate-45' : 'top-0'
                }`}
              />
              <span
                className={`absolute right-0 top-[7px] h-[1.5px] w-5 bg-[var(--color-text-primary)] transition-opacity duration-200 ${
                  isMenuOpen ? 'opacity-0' : 'opacity-100'
                }`}
              />
              <span
                className={`absolute right-0 h-[1.5px] w-5 bg-[var(--color-text-primary)] transition-all duration-300 ${
                  isMenuOpen ? 'top-[7px] -rotate-45' : 'top-[14px]'
                }`}
              />
            </span>
          </button>
        </div>
      </div>

      {/* Full-screen mobile menu panel — matches the md breakpoint */}
      <div
        id="mobile-menu"
        className={`fixed inset-x-0 bottom-0 top-[var(--header-height)] z-40 bg-[var(--color-card)] transition-opacity duration-300 ease-out md:hidden ${
          isMenuOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
        }`}
      >
        <nav
          aria-label="ניווט נייד"
          className="flex h-full flex-col justify-between px-6 pb-10 pt-8"
        >
          <ul className="flex flex-col gap-1">
            {navItems.map((item, index) => (
              <li
                key={item.label}
                className={`border-b border-[var(--color-border)] transition-all duration-300 ${
                  isMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-2 opacity-0'
                }`}
                style={{ transitionDelay: isMenuOpen ? `${index * 40}ms` : '0ms' }}
              >
                <a
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="block py-4 text-2xl font-semibold text-[var(--color-text-primary)] transition-colors duration-200 hover:text-[var(--color-primary-gold-hover)]"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          <a
            href={ctaHref}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setIsMenuOpen(false)}
            className="inline-flex w-full items-center justify-center rounded-md bg-[var(--color-primary-gold)] px-6 py-4 text-base font-semibold text-[var(--color-text-on-gold)] shadow-[0_1px_6px_rgba(0,0,0,0.05)] transition-all duration-200 hover:bg-[var(--color-primary-gold-hover)]"
          >
            {ctaLabel}
          </a>
        </nav>
      </div>
    </header>
  );
}
