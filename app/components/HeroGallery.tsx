import Image from 'next/image';

/**
 * HeroGallery — editorial photo composition for the hero section, built
 * from five hand-picked shots (public/images/hero). One dominant image
 * plus four supporting ones in a classic large + 2x2 grid arrangement,
 * which keeps five photos on screen without feeling cluttered.
 *
 * Mobile shows only three images (main + two supporting) to keep the
 * composition light on small screens; the desktop 2x2 grid pair is
 * simply hidden rather than duplicated, so there is no extra image
 * weight loaded twice.
 *
 * Each object-position value was chosen by eye against the source photo
 * so that cover-cropping in these differently-shaped cells never cuts
 * into a face or the main subject.
 */
export default function HeroGallery() {
  return (
    <div className="w-full">
      {/* Mobile / tablet: main image + two supporting (below lg) */}
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
        <div className="relative aspect-[4/5] overflow-hidden rounded-xl">
          <Image
            src="/images/hero/hero-2.jpg"
            alt="פורטרט אישי בגינה"
            fill
            sizes="50vw"
            className="object-cover object-[50%_18%]"
          />
        </div>
        <div className="relative aspect-[4/5] overflow-hidden rounded-xl">
          <Image
            src="/images/hero/hero-4.jpg"
            alt="רגע מרגש מול ארון הקודש בבית הכנסת"
            fill
            sizes="50vw"
            className="object-cover object-[50%_42%]"
          />
        </div>
      </div>

      {/* Desktop (lg+): main image + four supporting in a 2x2 grid */}
      <div className="hidden lg:grid lg:h-[560px] lg:grid-cols-12 lg:gap-4">
        <div className="relative col-span-7 overflow-hidden rounded-2xl">
          <Image
            src="/images/hero/hero-1.jpg"
            alt="חוגגת לצד הבריכה בשעת בין ערביים - צילום ישראל דדון"
            fill
            priority
            sizes="(min-width: 1024px) 45vw"
            className="object-cover object-[58%_50%]"
          />
        </div>

        <div className="col-span-5 grid grid-rows-2 gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="relative overflow-hidden rounded-2xl">
              <Image
                src="/images/hero/hero-2.jpg"
                alt="פורטרט אישי בגינה"
                fill
                sizes="17vw"
                className="object-cover object-[50%_18%]"
              />
            </div>
            <div className="relative overflow-hidden rounded-2xl">
              <Image
                src="/images/hero/hero-3-new.jpg"
                alt="נגן מבצע בהופעה חיה באירוע"
                fill
                sizes="17vw"
                className="object-cover object-[38%_32%]"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="relative overflow-hidden rounded-2xl">
              <Image
                src="/images/hero/hero-4.jpg"
                alt="רגע מרגש מול ארון הקודש בבית הכנסת"
                fill
                sizes="17vw"
                className="object-cover object-[50%_42%]"
              />
            </div>
            <div className="relative overflow-hidden rounded-2xl">
              <Image
                src="/images/hero/hero-5.jpg"
                alt="זמר מופיע באירוע בבית הכנסת"
                fill
                sizes="17vw"
                className="object-cover object-[42%_45%]"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
