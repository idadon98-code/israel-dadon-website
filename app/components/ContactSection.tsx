'use client';

import { useState, type FormEvent } from 'react';
import { Heebo } from 'next/font/google';

const WEB3FORMS_ENDPOINT = 'https://api.web3forms.com/submit';
const WEB3FORMS_ACCESS_KEY = 'a237aa74-4a1b-4f1c-9553-741fe33444b4';

type SubmitStatus = 'idle' | 'submitting' | 'success' | 'error';

/** Single typeface for the entire site: Heebo. */
const heebo = Heebo({
  subsets: ['hebrew', 'latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-heebo',
  display: 'swap',
});

export interface ContactSectionProps {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  submitLabel?: string;
  whatsappLabel?: string;
  whatsappHref?: string;
}

const eventTypeOptions = [
  'עלייה לתורה',
  'בר מצווה',
  'בת מצווה',
  'הכנסת ספר תורה',
  'מגנטים לאירוע',
  'חתונה',
  'חינה',
  'אחר',
];

/**
 * Shared field styling — a single source of truth so every input,
 * select and textarea in the form looks identical: thin border, white
 * surface, gold focus ring, comfortable padding.
 */
const fieldClasses =
  'w-full rounded-md border border-[var(--color-border)] bg-[var(--color-card)] px-4 py-3 text-base text-[var(--color-text-primary)] placeholder:text-[var(--color-text-secondary)]/70 transition-colors duration-200 ease-out focus:border-[var(--color-primary-gold)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-gold)]/30';

/**
 * ContactSection — "בואו נדבר" section.
 *
 * Layout: a two-column grid on desktop. The contact copy and WhatsApp
 * CTA are placed first in markup, so in this RTL grid they land in the
 * rightmost column; the form card is placed second and lands on the
 * left. Both stack into a single column on mobile in the same order.
 *
 * Form behavior: submits to Web3Forms (https://api.web3forms.com/submit)
 * via fetch. A status message (aria-live, so screen readers hear it too)
 * only ever shows "success" once Web3Forms' own JSON response confirms
 * it — a 200 alone isn't treated as success. The submit button disables
 * and reads "שולח..." while the request is in flight.
 *
 * Colors: driven entirely by the CSS variables defined in globals.css.
 */
export default function ContactSection({
  eyebrow = 'בואו נדבר',
  title = 'מתכננים אירוע?',
  subtitle = 'ספרו לי על האירוע שלכם ואחזור אליכם עם כל הפרטים.',
  submitLabel = 'שליחת פרטים',
  whatsappLabel = 'שלחו הודעה בוואטסאפ',
  whatsappHref = 'https://wa.me/972509978499',
}: ContactSectionProps) {
  const [status, setStatus] = useState<SubmitStatus>('idle');
  const isSubmitting = status === 'submitting';
  // Built from local date parts (not toISOString, which is UTC and can be a
  // day off near midnight) so "today" matches the visitor's own calendar day.
  const now = new Date();
  const todayIsoDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setStatus('submitting');

    try {
      const response = await fetch(WEB3FORMS_ENDPOINT, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: new FormData(form),
      });
      const result = await response.json();

      if (response.ok && result.success) {
        setStatus('success');
        form.reset();
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  }

  return (
    <section
      id="contact"
      dir="rtl"
      aria-label="בואו נדבר — יצירת קשר"
      className={`${heebo.variable} w-full bg-[var(--color-background)] py-20 font-[family-name:var(--font-heebo)] sm:py-28`}
    >
      <div className="mx-auto max-w-[1280px] px-6 sm:px-10 lg:px-16">
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Contact copy + WhatsApp CTA — lands on the right in this RTL grid */}
          <div>
            <p className="text-sm font-medium tracking-wide text-[var(--color-primary-gold-hover)]">
              {eyebrow}
            </p>
            <h2 className="mt-3 text-3xl font-bold leading-tight text-[var(--color-text-primary)] sm:text-4xl lg:text-5xl">
              {title}
            </h2>
            <p className="mt-4 max-w-md text-base font-normal leading-relaxed text-[var(--color-text-secondary)] sm:text-lg">
              {subtitle}
            </p>

            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center justify-center rounded-md border border-[var(--color-border)] bg-[var(--color-card)] px-8 py-4 text-base font-semibold text-[var(--color-text-primary)] shadow-[0_1px_6px_rgba(0,0,0,0.04)] transition-all duration-200 ease-out hover:-translate-y-0.5 hover:border-[var(--color-primary-gold)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.07)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary-gold)]"
            >
              {whatsappLabel}
            </a>
          </div>

          {/* Form card — lands on the left in this RTL grid */}
          <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-card)] p-6 shadow-[0_1px_10px_rgba(0,0,0,0.05)] sm:p-8">
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <input type="hidden" name="access_key" value={WEB3FORMS_ACCESS_KEY} />
              <input
                type="hidden"
                name="subject"
                value="פנייה חדשה מאתר Israel Dadon Photography"
              />
              <input type="hidden" name="from_name" value="Israel Dadon Photography Website" />
              {/* Web3Forms honeypot — real visitors never see or fill this in;
                  if it arrives non-empty, Web3Forms treats the submission as spam. */}
              <input
                type="checkbox"
                name="botcheck"
                className="hidden"
                style={{ display: 'none' }}
                tabIndex={-1}
                autoComplete="off"
              />

              <div className="flex flex-col gap-2">
                <label
                  htmlFor="contact-name"
                  className="text-sm font-medium text-[var(--color-text-primary)]"
                >
                  שם מלא
                </label>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  className={fieldClasses}
                  placeholder="לדוגמה: ישראל ישראלי"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label
                  htmlFor="contact-phone"
                  className="text-sm font-medium text-[var(--color-text-primary)]"
                >
                  טלפון
                </label>
                <input
                  id="contact-phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  required
                  pattern="[\d\-\+\s()]{7,20}"
                  title="מספר טלפון תקין, לדוגמה: 050-0000000"
                  className={fieldClasses}
                  placeholder="050-0000000"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label
                  htmlFor="contact-event-type"
                  className="text-sm font-medium text-[var(--color-text-primary)]"
                >
                  סוג האירוע
                </label>
                <select
                  id="contact-event-type"
                  name="eventType"
                  required
                  defaultValue=""
                  className={fieldClasses}
                >
                  <option value="" disabled>
                    בחרו סוג אירוע
                  </option>
                  {eventTypeOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col gap-2">
                <label
                  htmlFor="contact-date"
                  className="text-sm font-medium text-[var(--color-text-primary)]"
                >
                  תאריך האירוע
                </label>
                <input
                  id="contact-date"
                  name="eventDate"
                  type="date"
                  min={todayIsoDate}
                  className={fieldClasses}
                />
              </div>

              <div className="flex flex-col gap-2">
                <label
                  htmlFor="contact-message"
                  className="text-sm font-medium text-[var(--color-text-primary)]"
                >
                  הודעה
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={4}
                  className={`${fieldClasses} resize-none`}
                  placeholder="ספרו לי קצת על האירוע שלכם..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-2 inline-flex items-center justify-center rounded-md border border-[var(--color-primary-gold)] bg-[var(--color-primary-gold)] px-8 py-4 text-base font-semibold text-[var(--color-text-on-gold)] shadow-[0_2px_10px_rgba(0,0,0,0.10)] transition-all duration-200 ease-out hover:-translate-y-0.5 hover:border-[var(--color-primary-gold-hover)] hover:bg-[var(--color-primary-gold-hover)] hover:shadow-[0_6px_16px_rgba(0,0,0,0.14)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary-gold-hover)] disabled:cursor-not-allowed disabled:opacity-70 motion-reduce:transition-none motion-reduce:hover:translate-y-0"
              >
                {isSubmitting ? 'שולח...' : submitLabel}
              </button>

              {(status === 'success' || status === 'error') && (
                <p
                  role="status"
                  aria-live="polite"
                  className="border-r-2 border-[var(--color-primary-gold)] pr-4 text-base font-medium leading-relaxed text-[var(--color-text-primary)]"
                >
                  {status === 'success'
                    ? 'הפרטים נשלחו בהצלחה! אחזור אליכם בהקדם.'
                    : 'אירעה שגיאה בשליחת הטופס. נסו שוב או פנו אליי בוואטסאפ.'}
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
