import SectionHeading from "./SectionHeading";

const STEPS = [
  {
    title: "Browse the fleet",
    body: "Explore our cars by category, compare specs and daily rates, and shortlist the vehicle that fits your trip.",
  },
  {
    title: "Send a WhatsApp request",
    body: "Tap “Book on WhatsApp”. We pre-fill a clean message with your car, dates and details — you just press send.",
  },
  {
    title: "We confirm availability",
    body: "Our Mauritius team checks the car is free for your dates and replies with the final price and any deposit.",
  },
  {
    title: "Collect & drive",
    body: "Pick up at the airport or your hotel. We inspect the car together, hand over the keys, and you are on your way.",
  },
];

export default function HowItWorks() {
  return (
    <section className="bg-ink">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <SectionHeading
          eyebrow="Simple process"
          title="How booking works"
          intro="Four quick steps from browsing to driving — most requests are confirmed the same day."
          center
          light
        />
        <ol className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((step, i) => (
            <li key={step.title} className="relative rounded-xl border border-white/10 bg-white/[0.03] p-6">
              <span className="font-display text-3xl font-bold text-gold">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-3 font-display text-lg font-bold text-white">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/65">{step.body}</p>
              {i < STEPS.length - 1 && (
                <span className="absolute -right-3 top-1/2 hidden -translate-y-1/2 text-gold/40 lg:block" aria-hidden="true">
                  <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 6l6 6-6 6" />
                  </svg>
                </span>
              )}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
