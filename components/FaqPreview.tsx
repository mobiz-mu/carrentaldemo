import Link from "next/link";

const FAQS = [
  {
    q: "How do I book a car?",
    a: "Choose a vehicle, select pickup and return dates, review the calculated total, then continue to payment or confirm on WhatsApp.",
  },
  {
    q: "How is the price calculated?",
    a: "The system calculates rental days automatically. Total = rental days × daily car price, with a minimum of one rental day.",
  },
  {
    q: "Can I pay online?",
    a: "Yes. The checkout is prepared for PayPal and MCB payments. WhatsApp confirmation is also available for manual arrangements.",
  },
  {
    q: "Do you offer airport pickup?",
    a: "Yes. SSR Airport pickup and islandwide delivery can be arranged after booking confirmation.",
  },
];

export default function FaqPreview() {
  return (
    <section className="relative overflow-hidden bg-white">
      <div
        className="absolute inset-0 bg-[radial-gradient(circle_at_15%_10%,rgba(198,161,91,0.10),transparent_28%),radial-gradient(circle_at_85%_85%,rgba(18,42,69,0.08),transparent_32%)]"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-14 lg:px-8 lg:py-16">
        <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <div className="text-center lg:sticky lg:top-28 lg:text-left">
            <p className="eyebrow text-gold-deep">Good to know</p>

            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
              Quick answers before you book
            </h2>

            <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-ink/65 sm:text-base lg:mx-0">
              Everything customers need to know about booking, pricing, payment
              and airport pickup in Mauritius.
            </p>

            <div className="mt-6">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-full border border-gold/30 bg-gold/10 px-5 py-2.5 text-sm font-bold text-gold-deep transition-colors hover:bg-gold hover:text-ink"
              >
                Contact us
                <span className="ml-2" aria-hidden="true">
                  →
                </span>
              </Link>
            </div>
          </div>

          <div className="grid gap-3">
            {FAQS.map((faq) => (
              <details
                key={faq.q}
                className="group rounded-2xl border border-line bg-white/80 p-4 shadow-sm shadow-ink/5 backdrop-blur transition-all duration-300 open:border-gold/50 open:shadow-lg open:shadow-ink/10"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-bold text-ink marker:content-[''] sm:text-base">
                  <span>{faq.q}</span>

                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-ink text-gold transition-transform duration-300 group-open:rotate-45">
                    +
                  </span>
                </summary>

                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink/65">
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}