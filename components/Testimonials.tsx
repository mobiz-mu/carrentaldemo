import SectionHeading from "./SectionHeading";

const TESTIMONIALS = [
  {
    quote:
      "Booked a Honda Vezel for our honeymoon in two WhatsApp messages. The car was waiting at the airport and spotless. Effortless.",
    name: "Sarah & James",
    detail: "United Kingdom · Honda Vezel",
  },
  {
    quote:
      "We needed a 12-seater for a family reunion. Quick reply, fair daily price and a clean Hiace. Exactly what was promised.",
    name: "Ravi P.",
    detail: "Mauritius · Toyota Hiace",
  },
  {
    quote:
      "No upfront online payment made me comfortable. They confirmed everything first, then we settled on pickup. Very professional.",
    name: "Élodie M.",
    detail: "France · Suzuki Swift",
  },
];

function Stars() {
  return (
    <div className="flex gap-0.5 text-gold" aria-label="5 out of 5 stars">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path d="M10 1.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L10 15l-5.2 2.6 1-5.8L1.5 7.7l5.9-.9L10 1.5z" />
        </svg>
      ))}
    </div>
  );
}

export default function Testimonials() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
      <SectionHeading
        eyebrow="Trusted by travellers"
        title="What our customers say"
        intro="Visitors and locals alike rent with confidence — here is a flavour of the feedback we love to receive."
        center
      />
      <div className="mt-12 grid gap-6 lg:grid-cols-3">
        {TESTIMONIALS.map((t) => (
          <figure key={t.name} className="flex flex-col rounded-xl border border-line bg-white p-6 shadow-sm">
            <Stars />
            <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-ink/75">
              “{t.quote}”
            </blockquote>
            <figcaption className="mt-5 border-t border-line pt-4">
              <p className="font-display text-sm font-bold text-ink">{t.name}</p>
              <p className="mt-0.5 text-xs text-ink/55">{t.detail}</p>
            </figcaption>
          </figure>
        ))}
      </div>

      {/* Trust badges */}
      <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {[
          { k: "Same-day", v: "Confirmations" },
          { k: "Island-wide", v: "Delivery" },
          { k: "Insured", v: "Vehicles" },
          { k: "Local", v: "Mauritius team" },
        ].map((b) => (
          <div key={b.v} className="rounded-xl bg-sand px-4 py-5 text-center">
            <p className="font-display text-lg font-bold text-ink">{b.k}</p>
            <p className="mt-1 text-xs uppercase tracking-wider text-ink/55">{b.v}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
