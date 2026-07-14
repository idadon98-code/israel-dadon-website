'use client';

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react';

export type ScrollRevealVariant = 'fade-up' | 'fade-scale' | 'from-right' | 'from-left';
export type ScrollRevealTag = 'div' | 'li' | 'article';

interface ScrollRevealProps {
  children: ReactNode;
  /** Which element ScrollReveal itself renders as — pick the tag the
   *  target element would have used anyway (e.g. "li" inside a <ul>), so
   *  no extra wrapper node is introduced and list/grid semantics stay
   *  intact. Defaults to "div". */
  as?: ScrollRevealTag;
  variant?: ScrollRevealVariant;
  /** Stagger delay in ms, for siblings (cards in a row) revealing one
   *  after another instead of all at once. */
  delayMs?: number;
  /** How long the reveal transition itself takes, in ms. */
  durationMs?: number;
  className?: string;
}

const HIDDEN_CLASSES: Record<ScrollRevealVariant, string> = {
  'fade-up': 'opacity-0 translate-y-6',
  'fade-scale': 'opacity-0 scale-[0.96]',
  'from-right': 'opacity-0 translate-x-6',
  'from-left': 'opacity-0 -translate-x-6',
};

const VISIBLE_CLASSES = 'opacity-100 translate-x-0 translate-y-0 scale-100';

/**
 * ScrollReveal — reveals its content once, the first time it scrolls
 * into view, using IntersectionObserver plus a CSS transition on
 * opacity/transform only (both are paint-only properties that don't
 * affect layout, so this is safe inside grid/flex rows).
 *
 * Renders the element itself (via the `as` prop) rather than cloning an
 * existing child — an earlier version used cloneElement to animate a
 * child in place, but that produced a real hydration mismatch: children
 * created by a Server Component parent and cloned inside this Client
 * Component came out different on the server render vs. the client's
 * first render. Owning the element directly sidesteps that entirely,
 * and also avoids ever putting a non-`li` element directly inside a
 * `<ul>`/`<ol>` (pass `as="li"` for those).
 *
 * The transition's property/duration/delay are applied via inline style
 * ONLY while the reveal is in flight, then removed once it's done, so a
 * card's own hover transition (e.g. "transition-all duration-300
 * hover:-translate-y-1") is never permanently overridden by the reveal's
 * duration — inline style beats Tailwind's utility classes for as long
 * as it's present, so it must clear itself afterward.
 *
 * The animation runs once per element (the IntersectionObserver
 * disconnects after the first trigger) and is skipped entirely for
 * prefers-reduced-motion — those users get the final, fully-visible
 * state immediately, with no observer and no transition.
 */
export default function ScrollReveal({
  children,
  as: Tag = 'div',
  variant = 'fade-up',
  delayMs = 0,
  durationMs = 650,
  className = '',
}: ScrollRevealProps) {
  const ref = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [transitionActive, setTransitionActive] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      // No observer, no transition — reveal immediately via a timer
      // callback (rather than setting state directly in the effect body)
      // so this stays a plain "subscribe, then setState in a callback"
      // effect, exactly like the IntersectionObserver branch below.
      const immediate = window.setTimeout(() => setIsVisible(true), 0);
      return () => window.clearTimeout(immediate);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTransitionActive(true);
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -10% 0px' }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!transitionActive) return;
    const timeout = window.setTimeout(
      () => setTransitionActive(false),
      durationMs + delayMs + 50
    );
    return () => window.clearTimeout(timeout);
  }, [transitionActive, durationMs, delayMs]);

  const style: CSSProperties | undefined = transitionActive
    ? {
        transitionProperty: 'opacity, transform',
        transitionDuration: `${durationMs}ms`,
        transitionTimingFunction: 'ease-out',
        transitionDelay: delayMs ? `${delayMs}ms` : undefined,
      }
    : undefined;

  return (
    <Tag
      // The ref is deliberately untyped to the specific tag: `as` can be
      // "div" | "li" | "article", and a dynamic tag makes TS require a ref
      // type intersecting all three simultaneously. This component only
      // ever reads the node for IntersectionObserver purposes, never
      // tag-specific properties, so a single shared HTMLElement ref is fine.
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ref={ref as any}
      style={style}
      className={`${className} motion-reduce:transition-none ${isVisible ? VISIBLE_CLASSES : HIDDEN_CLASSES[variant]}`.trim()}
    >
      {children}
    </Tag>
  );
}
