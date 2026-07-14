const testimonials = [
  {
    name: "אבישג חג׳בי",
    event: "בת מצווה",
    text: "ישראל היה פשוט מקצוען — סבלני, אדיב וקשוב. אנחנו מרוצים מאוד מהשירות ומהתמונות!",
  },
  {
    name: "אלעד אלמסי",
    event: "עלייה לתורה",
    text: "תמונות יפהפיות ושירות מכל הלב. ברור לנו שנבחר בישראל גם באירוע הבא שלנו!",
  },
  {
    name: "לאה קלימי",
    event: "מסיבת פרידה",
    text: "ערכו עבורי מסיבת הפתעה לרגל העזיבה, וישראל היה שם כדי לתעד הכול. הוא תפס רגעים יפים וזיכרונות שילוו אותי לאורך זמן. ללא ספק נבחר בו שוב!",
  },
];

export default function Testimonials() {
  return (
    <section
      id="testimonials"
      dir="rtl"
      className="bg-white px-6 py-16 md:px-10 md:py-24"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <p className="mb-3 text-sm font-semibold tracking-widest text-[var(--color-primary-gold)]">
            החוויה שלכם, הזיכרונות שלנו
          </p>

          <h2 className="text-3xl font-bold text-neutral-900 md:text-4xl">
            לקוחות מספרים
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-neutral-600">
            הזכות הגדולה שלי היא להיות שם ברגעים החשובים שלכם
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((testimonial) => (
            <article
              key={testimonial.name}
              className="flex h-full flex-col rounded-2xl border border-neutral-200 bg-neutral-50 p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <div
                className="mb-5 text-xl tracking-wider text-[var(--color-primary-gold)]"
                aria-label="5 כוכבים"
              >
                ★★★★★
              </div>

              <blockquote className="flex-1 leading-8 text-neutral-700">
                ״{testimonial.text}״
              </blockquote>

              <div className="mt-7 border-t border-neutral-200 pt-5">
                <p className="font-bold text-neutral-900">
                  {testimonial.name}
                </p>
                <p className="mt-1 text-sm text-neutral-500">
                  {testimonial.event}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}