'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';

export interface EventImage {
  src: string;
  width: number;
  height: number;
}

interface EventGalleryProps {
  /** Event name, shown in the header and used to build alt text */
  title: string;
  images: EventImage[];
  onClose: () => void;
}

/** How long the fade/scale transition takes, kept as a constant so the
 * CSS duration class and the setTimeout that delays unmount agree. */
const TRANSITION_MS = 200;

/** Minimum horizontal finger movement, in px, to count as a swipe rather
 * than an accidental drag/tap. */
const SWIPE_THRESHOLD_PX = 50;

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

function GridIcon() {
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
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
    </svg>
  );
}

/**
 * EventGallery — public gallery for a single event's real photos.
 *
 * Two views share one overlay: a responsive thumbnail grid (the default,
 * `viewerIndex === null`) and a full-screen single-image viewer opened by
 * clicking any thumbnail. Escape and the close button exit the gallery
 * entirely from either view; a separate grid-icon button in the viewer
 * returns to the thumbnails without closing. Arrow keys and touch swipes
 * (RTL-mapped: swipe left / ArrowLeft = next, swipe right / ArrowRight =
 * previous — matching the existing category Lightbox's convention) only
 * apply in the viewer.
 *
 * Scroll lock uses `document.documentElement` rather than `document.body`
 * — the lesson from the intro animation's scroll-lock bug, where a
 * body-based lock got clobbered by another component's own body-overflow
 * effect. Using documentElement keeps this fully independent of any
 * other component touching body scroll.
 */
export default function EventGallery({ title, images, onClose }: EventGalleryProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [viewerIndex, setViewerIndex] = useState<number | null>(null);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const touchStartX = useRef<number | null>(null);

  const goToPrevious = useCallback(() => {
    setIsImageLoaded(false);
    setViewerIndex((current) =>
      current === null ? null : (current - 1 + images.length) % images.length
    );
  }, [images.length]);

  const goToNext = useCallback(() => {
    setIsImageLoaded(false);
    setViewerIndex((current) => (current === null ? null : (current + 1) % images.length));
  }, [images.length]);

  const openViewerAt = useCallback((index: number) => {
    setIsImageLoaded(false);
    setViewerIndex(index);
  }, []);

  const handleClose = useCallback(() => {
    setIsVisible(false);
    window.setTimeout(onClose, TRANSITION_MS);
  }, [onClose]);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setIsVisible(true));
    closeButtonRef.current?.focus();
    document.documentElement.style.overflow = 'hidden';
    return () => {
      cancelAnimationFrame(frame);
      document.documentElement.style.overflow = '';
    };
  }, []);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        handleClose();
        return;
      }
      if (viewerIndex !== null) {
        if (event.key === 'ArrowRight') goToPrevious();
        if (event.key === 'ArrowLeft') goToNext();
      }

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
  }, [handleClose, goToPrevious, goToNext, viewerIndex]);

  function handleTouchStart(event: React.TouchEvent) {
    touchStartX.current = event.touches[0].clientX;
  }

  function handleTouchEnd(event: React.TouchEvent) {
    if (touchStartX.current === null) return;
    const deltaX = event.changedTouches[0].clientX - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(deltaX) < SWIPE_THRESHOLD_PX) return;
    if (deltaX < 0) goToNext();
    else goToPrevious();
  }

  const activeImage = viewerIndex !== null ? images[viewerIndex] : null;

  return (
    <div
      ref={dialogRef}
      dir="rtl"
      role="dialog"
      aria-modal="true"
      aria-label={`גלריית תמונות — ${title}`}
      className={`fixed inset-0 z-[60] flex flex-col bg-[var(--color-text-primary)]/95 backdrop-blur-sm transition-opacity duration-200 ease-out ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      {/* Header: event title + close (and back-to-grid while viewing) */}
      <div className="flex items-center justify-between gap-4 px-4 py-4 sm:px-8">
        <p className="truncate text-lg font-semibold text-[var(--color-card)] sm:text-xl">
          {title}
        </p>
        <div className="flex shrink-0 items-center gap-2">
          {viewerIndex !== null && (
            <button
              type="button"
              onClick={() => setViewerIndex(null)}
              aria-label="חזרה לרשימת התמונות"
              className="flex h-11 w-11 items-center justify-center rounded-full bg-[var(--color-card)]/10 text-[var(--color-card)] transition-colors duration-200 hover:bg-[var(--color-card)]/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary-gold)]"
            >
              <GridIcon />
            </button>
          )}
          <button
            ref={closeButtonRef}
            type="button"
            onClick={handleClose}
            aria-label="סגירת הגלריה"
            className="flex h-11 w-11 items-center justify-center rounded-full bg-[var(--color-card)]/10 text-[var(--color-card)] transition-colors duration-200 hover:bg-[var(--color-card)]/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary-gold)]"
          >
            <CloseIcon />
          </button>
        </div>
      </div>

      {viewerIndex === null ? (
        // Thumbnail grid — clicking the backdrop margin below the grid closes.
        <div className="flex-1 overflow-y-auto px-4 pb-10 sm:px-8" onClick={handleClose}>
          <div
            className="mx-auto grid max-w-6xl grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4"
            onClick={(event) => event.stopPropagation()}
          >
            {images.map((image, index) => (
              <button
                key={image.src}
                type="button"
                onClick={() => openViewerAt(index)}
                className="group relative aspect-[4/5] w-full overflow-hidden rounded-lg bg-[var(--color-card)]/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary-gold)]"
                aria-label={`הצגת תמונה ${index + 1} מתוך ${images.length} — ${title}`}
              >
                <Image
                  src={image.src}
                  alt={`${title} - תמונה ${index + 1} מתוך ${images.length}`}
                  fill
                  loading="lazy"
                  sizes="(max-width: 639px) 50vw, (max-width: 1023px) 33vw, 25vw"
                  className="object-cover transition-transform duration-300 ease-out group-hover:scale-105"
                />
              </button>
            ))}
          </div>
        </div>
      ) : (
        // Full-screen viewer
        <div className="relative flex flex-1 items-center justify-center px-2 pb-4 sm:px-6">
          <button
            type="button"
            onClick={goToPrevious}
            aria-label="התמונה הקודמת"
            className="absolute right-2 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-[var(--color-card)]/10 text-[var(--color-card)] transition-colors duration-200 hover:bg-[var(--color-card)]/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary-gold)] sm:right-4"
          >
            <ChevronIcon direction="start" />
          </button>

          <button
            type="button"
            onClick={goToNext}
            aria-label="התמונה הבאה"
            className="absolute left-2 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-[var(--color-card)]/10 text-[var(--color-card)] transition-colors duration-200 hover:bg-[var(--color-card)]/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary-gold)] sm:left-4"
          >
            <ChevronIcon direction="end" />
          </button>

          <div
            className="flex max-h-full flex-col items-center gap-3"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {activeImage && (
              <Image
                key={activeImage.src}
                src={activeImage.src}
                alt={`${title} - תמונה ${viewerIndex + 1} מתוך ${images.length}`}
                width={activeImage.width}
                height={activeImage.height}
                sizes="(max-width: 768px) 100vw, 90vw"
                onLoad={() => setIsImageLoaded(true)}
                className={`h-auto max-h-[70vh] w-auto max-w-[92vw] rounded-lg object-contain shadow-[0_10px_40px_rgba(0,0,0,0.3)] transition-opacity duration-300 ease-out sm:max-h-[75vh] ${
                  isImageLoaded ? 'opacity-100' : 'opacity-0'
                }`}
              />
            )}
            {/* Forced LTR: in an RTL context the bidi algorithm treats
                "N / M" as weakly-directional and reorders it visually
                (e.g. showing "12 / 2" instead of "2 / 12"). */}
            <p dir="ltr" className="text-sm font-medium text-[var(--color-card)]/80">
              {viewerIndex + 1} / {images.length}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
