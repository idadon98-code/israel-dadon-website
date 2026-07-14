import Link from 'next/link';
import Header from './components/Header';
import Footer from './components/Footer';
import FloatingWhatsApp from './components/FloatingWhatsApp';

/**
 * Root not-found page — handles any unmatched route for the whole app
 * (this is a single-page site, so anything besides "/" lands here).
 * Reuses the existing Header/Footer rather than introducing new visual
 * design, with a simple centered message in between.
 */
export default function NotFound() {
  return (
    <>
      <Header />
      <main
        dir="rtl"
        className="flex w-full flex-1 flex-col items-center justify-center bg-[var(--color-background)] px-6 py-24 text-center sm:py-32"
      >
        <p className="text-sm font-medium tracking-wide text-[var(--color-primary-gold-hover)]">
          404
        </p>
        <h1 className="mt-3 text-3xl font-bold leading-tight text-[var(--color-text-primary)] sm:text-4xl">
          העמוד לא נמצא
        </h1>
        <p className="mt-4 max-w-md text-base font-normal leading-relaxed text-[var(--color-text-secondary)] sm:text-lg">
          נראה שהקישור שגוי או שהעמוד הוסר. אפשר לחזור לעמוד הבית ולהמשיך משם.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex items-center justify-center rounded-md bg-[var(--color-primary-gold)] px-8 py-4 text-base font-medium text-[var(--color-text-on-gold)] shadow-[0_1px_6px_rgba(0,0,0,0.05)] transition-all duration-200 ease-out hover:-translate-y-0.5 hover:bg-[var(--color-primary-gold-hover)] hover:shadow-[0_4px_14px_rgba(0,0,0,0.08)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary-gold)] motion-reduce:transition-none motion-reduce:hover:translate-y-0"
        >
          חזרה לעמוד הבית
        </Link>
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
