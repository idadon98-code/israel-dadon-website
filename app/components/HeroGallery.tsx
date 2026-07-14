import Image from 'next/image';

/**
 * HeroGallery — editorial photo composition for the hero section, built
 * from five hand-picked shots (public/images/hero). One dominant image
 * plus four supporting ones in a classic large + 2x2 grid arrangement,
 * which keeps five photos on screen without feeling cluttered.
 *
 * Mobile shows all five images too: hero-1 full-width on top, then the
 * same four supporting shots in a 2x2 grid underneath, reusing the exact
 * same aspect ratio and object-position as their desktop cells so the
 * crop treatment stays identical across breakpoints.
 *
 * Every `fill` image's direct parent sets its own explicit `aspect-*`
 * class (not just a height inherited via CSS grid stretch through
 * several nested levels) — relying on multi-level grid stretch left
 * cells with a computed height of 0 in some load/cache conditions,
 * which silently dropped images from the desktop grid. An explicit
 * aspect-ratio on every leaf container guarantees a non-zero size
 * regardless of parent grid timing.
 *
 * Each object-position value was chosen by eye against the source photo
 * so that cover-cropping in these differently-shaped cells never cuts
 * into a face or the main subject.
 */
export default function HeroGallery() {
  return (
    <div className="w-full">
      {/* Mobile / tablet (below lg): main image full-width, then all four
          supporting images in a 2x2 grid underneath — one grid, so the
          main image's row and the 2x2 rows all share the same gap-3. */}
      <div className="grid grid-cols-2 gap-3 lg:hidden">
        <div className="relative col-span-2 aspect-[16/11] overflow-hidden rounded-2xl sm:aspect-[16/9]">
          <Image
            src="/images/hero/hero-1.jpg"
            alt="חוגגת לצד הבריכה בשעת בין ערביים - צילום ישראל דדון"
            fill
            priority
            sizes="100vw"
            className="object-cover object-[58%_50%]"
          />
        </div>
        <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
          <Image
            src="/images/hero/hero-2.jpg"
            alt="פורטרט אישי בגינה"
            fill
            sizes="50vw"
            className="object-cover object-[50%_18%]"
          />
        </div>
        <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
          <Image
            src="/images/hero/hero-3-new.jpg"
            alt="נגן מבצע בהופעה חיה באירוע"
            fill
            sizes="50vw"
            className="object-cover object-[38%_32%]"
          />
        </div>
        <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
          <Image
            src="/images/hero/hero-4.jpg"
            alt="רגע מרגש מול ארון הקודש בבית הכנסת"
            fill
            sizes="50vw"
            className="object-cover object-[50%_42%]"
          />
        </div>
        <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
          <Image
            src="/images/hero/hero-5.jpg"
            alt="זמר מופיע באירוע בבית הכנסת"
            fill
            sizes="50vw"
            className="object-cover object-[42%_45%]"
          />
        </div>
      </div>

      {/* Desktop (lg+): main image + four supporting in a 2x2 grid. Each
          cell carries its own aspect-ratio rather than relying on the
          parent grid to stretch a height down through several nested
          levels, so every cell always has a real, non-zero size. The
          gallery now takes 8 of the section's 12 columns (up from an
          even 6/12 split), scaling the whole composition up by ~37%
          while the 7:5 main/side ratio — and every crop — stays as-is. */}
      <div className="hidden lg:grid lg:grid-cols-12 lg:items-start lg:gap-4">
        <div className="relative col-span-7 aspect-[6/5] overflow-hidden rounded-2xl">
          <Image
            src="/images/hero/hero-1.jpg"
            alt="חוגגת לצד הבריכה בשעת בין ערביים - צילום ישראל דדון"
            fill
            priority
            sizes="(min-width: 1024px) 35vw"
            className="object-cover object-[58%_50%]"
          />
        </div>

        <div className="col-span-5 grid grid-cols-2 gap-4">
          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
            <Image
              src="/images/hero/hero-2.jpg"
              alt="פורטרט אישי בגינה"
              fill
              sizes="(min-width: 1024px) 12vw"
              className="object-cover object-[50%_18%]"
            />
          </div>
          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
            <Image
              src="/images/hero/hero-3-new.jpg"
              alt="נגן מבצע בהופעה חיה באירוע"
              fill
              sizes="(min-width: 1024px) 12vw"
              className="object-cover object-[38%_32%]"
            />
          </div>
          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
            <Image
              src="/images/hero/hero-4.jpg"
              alt="רגע מרגש מול ארון הקודש בבית הכנסת"
              fill
              sizes="(min-width: 1024px) 12vw"
              className="object-cover object-[50%_42%]"
            />
          </div>
          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
            <Image
              src="/images/hero/hero-5.jpg"
              alt="זמר מופיע באירוע בבית הכנסת"
              fill
              sizes="(min-width: 1024px) 12vw"
              className="object-cover object-[42%_45%]"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
