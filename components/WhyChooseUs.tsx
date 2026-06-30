
const REASONS = [
  {
    title: "Instant WhatsApp confirmation",
    body: "Customers can send their booking request directly on WhatsApp with car, dates, pickup location and total amount. Your team can confirm availability faster without long email exchanges.",
    icon: "M8 10h.01M12 10h.01M16 10h.01M9 16l-4 3v-3H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2H9z",
    stat: "Fast replies",
  },
  {
    title: "Automatic rental price calculation",
    body: "The website calculates rental days and total amount automatically from pickup and return dates, helping customers understand the price before they continue to payment.",
    icon: "M12 8c-1.7 0-3 .9-3 2s1.3 2 3 2 3 .9 3 2-1.3 2-3 2m0-8c1.1 0 2 .4 2.6 1M12 8V6m0 10v-2m0 2c-1.1 0-2-.4-2.6-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
    stat: "Clear totals",
  },
  {
    title: "Airport pickup and hotel delivery",
    body: "Perfect for Mauritius travellers. Offer SSR Airport pickup, hotel delivery, villa delivery and flexible drop-off options across the island.",
    icon: "M21 16v-2l-8-5V3.5a1.5 1.5 0 00-3 0V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5L21 16z",
    stat: "Islandwide",
  },
  {
    title: "Secure payment flow ready",
    body: "The booking journey is prepared for PayPal and MCB payment setup, while still allowing manual WhatsApp confirmation when online payment keys are not yet active.",
    icon: "M3 10h18M7 15h2m4 0h4M5 6h14a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2z",
    stat: "PayPal + MCB",
  },
  {
    title: "Premium fleet presentation",
    body: "Showcase every vehicle with clean images, category, seats, luggage, fuel type, transmission, daily price and availability so customers can choose confidently.",
    icon: "M11.05 4.55 12 3l.95 1.55a2 2 0 0 0 1.5.95l1.8.2-1.3 1.3a2 2 0 0 0-.55 1.7l.3 1.8-1.6-.85a2 2 0 0 0-1.9 0L9.9 11.5l.3-1.8a2 2 0 0 0-.55-1.7L8.35 6.7l1.8-.2a2 2 0 0 0 1.5-.95zM7 14l-4 7M17 14l4 7M8 13l4 8 4-8",
    stat: "12 vehicles",
  },
  {
    title: "Built for Mauritius car rentals",
    body: "The site is designed for local rental businesses serving tourists, families and corporate clients, with mobile-first booking and WhatsApp support at the centre.",
    icon: "M12 21s-6-5.7-6-10a6 6 0 1112 0c0 4.3-6 10-6 10zm0-7.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z",
    stat: "Local market",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="relative overflow-hidden bg-white">
      {/* Premium background accents */}
      <div
        className="absolute inset-0 bg-[radial-gradient(circle_at_15%_10%,rgba(198,161,91,0.12),transparent_30%),radial-gradient(circle_at_85%_80%,rgba(18,42,69,0.10),transparent_34%)]"
        aria-hidden="true"
      />
      <div
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <p className="eyebrow text-gold-deep">Why choose us</p>

          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl lg:text-5xl">
            A smarter way to book{" "}
            <span className="text-gold-deep">car rental in Mauritius</span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-ink/65 sm:text-lg">
            Mobiz Car Rental gives customers a smooth premium booking experience:
            clear car details, automatic price calculation, WhatsApp confirmation
            and payment-ready checkout.
          </p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {REASONS.map((reason, index) => (
            <div
              key={reason.title}
              className="group relative overflow-hidden rounded-2xl border border-line bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-gold/60 hover:shadow-2xl hover:shadow-ink/10"
            >
              <div
                className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-gold/20 via-gold to-gold/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                aria-hidden="true"
              />

              <div className="flex items-start justify-between gap-4">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-ink text-gold shadow-lg shadow-ink/15 ring-1 ring-gold/20 transition-all duration-300 group-hover:scale-105 group-hover:bg-navy">
                  <svg
                    className="h-6 w-6"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d={reason.icon} />
                  </svg>
                </span>

                <span className="rounded-full border border-gold/20 bg-gold/10 px-3 py-1 text-[0.65rem] font-bold uppercase tracking-[0.16em] text-gold-deep">
                  {reason.stat}
                </span>
              </div>

              <h3 className="mt-5 font-display text-xl font-bold tracking-tight text-ink">
                {reason.title}
              </h3>

              <p className="mt-3 text-sm leading-relaxed text-ink/65">
                {reason.body}
              </p>

              <div className="mt-6 flex items-center justify-between border-t border-line pt-4">
                <span className="text-xs font-bold uppercase tracking-[0.18em] text-ink/40">
                  0{index + 1}
                </span>

                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-sand text-gold-deep transition-all duration-300 group-hover:bg-gold group-hover:text-ink">
                  <svg
                    className="h-4 w-4"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 rounded-3xl border border-gold/25 bg-ink px-5 py-6 text-center shadow-2xl shadow-ink/20 sm:px-8 lg:mt-14 lg:flex lg:items-center lg:justify-between lg:text-left">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-gold">
              Premium booking experience
            </p>
            <h3 className="mt-2 font-display text-2xl font-bold text-white sm:text-3xl">
              Designed to convert visitors into real car rental enquiries.
            </h3>
          </div>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-white/65 lg:mx-0 lg:mt-0 lg:max-w-md">
            Customers can browse the fleet, calculate rental cost, continue to
            payment and confirm instantly through WhatsApp.
          </p>
        </div>
      </div>
    </section>
  );
}
