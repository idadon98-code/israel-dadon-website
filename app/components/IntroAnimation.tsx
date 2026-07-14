'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

/**
 * IntroAnimation — a one-time, ~1.85s opening sequence shown over the
 * whole site on load: black screen → large thin gold camera silhouette
 * draws on → right as the drawing finishes, the lens gives a quick
 * shutter-click pulse and a full-screen camera flash fires → the flash's
 * brightness hides a fast crossfade from the camera into the existing
 * brand logo → the whole overlay fades away to reveal the real page
 * underneath, immediately after the flash.
 *
 * Implementation: pure CSS/SVG (no animation library, no video). All
 * timing lives in the <style jsx> block below as a sequence of delayed
 * keyframe animations sharing one timeline, so the whole choreography
 * stays in sync without JS having to drive individual frames. JS only
 * handles: locking page scroll while the intro is up, unmounting once
 * the final fade-out animation ends, and the skip button/Escape key.
 *
 * The real page content underneath is rendered from the very first
 * server response — this overlay only ever sits on top of it via fixed
 * positioning, it never delays or hides that content from crawlers, so
 * it has no effect on SEO. It also always unmounts (returns null), so
 * it can never linger and block later clicks on the header/nav.
 *
 * Reduced motion: prefers-reduced-motion switches to a plain, short
 * fade (no drawing, no shutter click, no flash) entirely via the CSS
 * media query below — the JSX itself doesn't change based on
 * JS-detected motion preference.
 */

// Safety net only — the real timing lives in CSS. If `animationend`
// somehow never fires, this guarantees the overlay can't block the
// site forever.
const SAFETY_UNMOUNT_MS = 2600;

export default function IntroAnimation() {
  const [isVisible, setIsVisible] = useState(true);
  const [isSkipping, setIsSkipping] = useState(false);
  const skipButtonRef = useRef<HTMLButtonElement>(null);

  // Locks scroll via the <html> element rather than <body> — Header's own
  // mobile-menu lock also toggles document.body.style.overflow, and since
  // that effect runs on every mount too (isMenuOpen starts false), it would
  // immediately clobber a body-based lock set here. Using documentElement
  // keeps this fully independent of that.
  useEffect(() => {
    document.documentElement.style.overflow = 'hidden';
    return () => {
      document.documentElement.style.overflow = '';
    };
  }, []);

  useEffect(() => {
    skipButtonRef.current?.focus();
  }, []);

  useEffect(() => {
    const safety = window.setTimeout(() => {
      document.documentElement.style.overflow = '';
      setIsVisible(false);
    }, SAFETY_UNMOUNT_MS);
    return () => window.clearTimeout(safety);
  }, []);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') setIsSkipping(true);
    }
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  function handleOverlayAnimationEnd(event: React.AnimationEvent<HTMLDivElement>) {
    if (event.target !== event.currentTarget) return;
    document.documentElement.style.overflow = '';
    setIsVisible(false);
  }

  if (!isVisible) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="מסך פתיחה"
      onAnimationEnd={handleOverlayAnimationEnd}
      className={`intro-overlay fixed inset-0 z-[200] flex items-center justify-center bg-black ${
        isSkipping ? 'intro-overlay--skipping' : ''
      }`}
    >
      <div className="relative flex h-[156px] w-[206px] items-center justify-center sm:h-[230px] sm:w-[310px]">
        <div
          className="intro-icon-wrap absolute inset-0 flex items-center justify-center overflow-hidden"
          aria-hidden="true"
        >
          <svg viewBox="0 0 200 140" className="intro-camera h-[116px] w-auto sm:h-[190px]" fill="none">
            <rect
              x="76"
              y="16"
              width="48"
              height="22"
              rx="6"
              pathLength={1}
              stroke="var(--color-primary-gold)"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <rect
              x="18"
              y="36"
              width="164"
              height="94"
              rx="16"
              pathLength={1}
              stroke="var(--color-primary-gold)"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle
              cx="100"
              cy="88"
              r="34"
              pathLength={1}
              stroke="var(--color-primary-gold)"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <circle
              cx="100"
              cy="88"
              r="19"
              pathLength={1}
              stroke="var(--color-primary-gold)"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </div>

        <Image
          src="/images/logo-header.png"
          alt="ישראל דדון — צילום אירועים"
          width={4339}
          height={1419}
          className="intro-logo absolute h-12 w-auto sm:h-16"
        />
      </div>

      <button
        ref={skipButtonRef}
        type="button"
        onClick={() => setIsSkipping(true)}
        className="intro-skip absolute bottom-6 left-1/2 -translate-x-1/2 text-xs font-medium tracking-wide text-white/60 transition-colors duration-200 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-primary-gold)] sm:bottom-10 sm:text-sm"
      >
        דלג
      </button>

      {/* Camera flash — a brief full-screen white flash timed to the end
          of the camera drawing, simulating a real photo being taken. */}
      <span className="intro-flash absolute inset-0 bg-white" aria-hidden="true" />

      <style jsx>{`
        @keyframes introDraw {
          from {
            stroke-dashoffset: 1;
          }
          to {
            stroke-dashoffset: 0;
          }
        }
        @keyframes introGlow {
          0% {
            filter: drop-shadow(0 0 0px rgba(203, 183, 140, 0));
          }
          60% {
            filter: drop-shadow(0 0 9px rgba(203, 183, 140, 0.65));
          }
          100% {
            filter: drop-shadow(0 0 4px rgba(203, 183, 140, 0.35));
          }
        }
        @keyframes introShutterClick {
          0% {
            transform: scale(1);
          }
          45% {
            transform: scale(0.88);
          }
          100% {
            transform: scale(1);
          }
        }
        @keyframes introFlash {
          0% {
            opacity: 0;
          }
          12% {
            opacity: 1;
          }
          100% {
            opacity: 0;
          }
        }
        @keyframes introCameraFadeOut {
          to {
            opacity: 0;
          }
        }
        @keyframes introLogoFadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes introSkipButtonFadeIn {
          to {
            opacity: 1;
          }
        }
        @keyframes introOverlayFadeOut {
          to {
            opacity: 0;
            visibility: hidden;
          }
        }
        @keyframes introSkipFadeOut {
          to {
            opacity: 0;
            visibility: hidden;
          }
        }

        .intro-camera :global(rect),
        .intro-camera :global(circle) {
          stroke-dasharray: 1;
          stroke-dashoffset: 1;
          animation: introDraw 1000ms ease-out 150ms forwards;
        }
        .intro-camera {
          transform-origin: center;
          animation:
            introGlow 1000ms ease-out 150ms forwards,
            introShutterClick 180ms ease-in-out 1000ms forwards,
            introCameraFadeOut 150ms ease-in 1180ms forwards;
        }
        .intro-flash {
          opacity: 0;
          pointer-events: none;
          z-index: 20;
          animation: introFlash 200ms ease-out 1150ms forwards;
        }
        :global(.intro-logo) {
          opacity: 0;
          animation: introLogoFadeIn 150ms ease-out 1200ms forwards;
        }
        .intro-skip {
          opacity: 0;
          animation: introSkipButtonFadeIn 400ms ease-out 200ms forwards;
        }
        .intro-overlay {
          animation: introOverlayFadeOut 500ms ease-out 1350ms forwards;
        }
        .intro-overlay.intro-overlay--skipping {
          animation: introSkipFadeOut 300ms ease-out forwards;
        }
        .intro-overlay.intro-overlay--skipping .intro-camera,
        .intro-overlay.intro-overlay--skipping .intro-flash,
        .intro-overlay.intro-overlay--skipping .intro-logo,
        .intro-overlay.intro-overlay--skipping .intro-skip {
          animation-play-state: paused;
        }

        @media (prefers-reduced-motion: reduce) {
          .intro-camera,
          .intro-flash {
            display: none;
          }
          :global(.intro-logo) {
            opacity: 1;
            animation: none;
          }
          .intro-skip {
            opacity: 1;
            animation: none;
          }
          .intro-overlay {
            animation: introOverlayFadeOut 400ms ease-out 150ms forwards;
          }
          .intro-overlay.intro-overlay--skipping {
            animation: introSkipFadeOut 250ms ease-out forwards;
          }
        }
      `}</style>
    </div>
  );
}
