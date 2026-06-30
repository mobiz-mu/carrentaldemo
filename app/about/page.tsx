import type { Metadata } from "next";
import Link from "next/link";
import SectionHeading from "@/components/SectionHeading";
import WhatsAppButton from "@/components/WhatsAppButton";
import { createWhatsAppChatUrl } from "@/lib/whatsapp";
import { CATEGORIES } from "@/lib/cars";

export const metadata: Metadata = {
  title: "About Mobiz Car Rental Mauritius",
  description:
    "Mobiz Car Rental is a Mauritius-based car rental demo offering easy WhatsApp booking, airport pickup, family cars, economy cars, SUVs and luxury options with fast confirmation and transparent daily pricing.",
  alternates: { canonical: "/about" },
};

const POINTS = [
  {
    title: "Easy WhatsApp booking",
    body: "No accounts, no online payment forms. Send your request on WhatsApp and we reply fast.",
  },
  {
    title: "Airport pickup",
    body: "Meet-and-greet pickups at SSR International Airport for any flight time, by arrangement.",
  },
  {
    title: "Family & group cars",
    body: "7-seaters, minibuses and spacious family vehicles for trips around the island.",
  },
  {
    title: "Economy to luxury",
    body: "From light hybrids that sip fuel to premium sedans — a vehicle for every budget.",
  },
  {
    title: "Fast confirmation",
    body: "We check availability manually and confirm your booking and final price quickly.",
  },
  {
    title: "Transparent pricing",
    body: "Clear daily rates in Mauritian rupees. The price you see is the price we talk about.",
  },
];

export default function AboutPage() {
  const chatUrl = createWhatsAppChatUrl(
    "Hello Mobiz Car Rental, I'd like to know more about renting a car in Mauritius."
  );

  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="border-b border-line bg-sand/60">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
          <p className="eyebrow">About Us</p>
          <h1 className="mt-3 max-w-3xl font-display text-4xl font-bold tracking-tight text-ink sm:text-5xl">
            Premium car rental, the Mauritian way
          </h1>
          <div className="rule-gold mt-5" />
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink/70">
            Mobiz Car Rental is a premium car rental website demo built for
            Mauritius. We make renting a car simple: browse the fleet, pick your
            vehicle, and send your booking request straight to WhatsApp. No
            online payment, no friction — just fast, personal service.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <SectionHeading
              eyebrow="Our approach"
              title="Booking should be as relaxed as the island"
            />
            <div className="mt-6 space-y-4 text-base leading-relaxed text-ink/70">
              <p>
                Mauritius runs on WhatsApp, so that is where we meet our
                customers. Instead of asking you to enter card details into a
                website, we let you send a clear request in seconds and confirm
                everything personally.
              </p>
              <p>
                It is faster for you and better for us: we can check the exact
                vehicle, confirm availability for your dates, and agree the final
                price before anything is paid. You always speak to a real person.
              </p>
              <p>
                From economy hybrids to 7-seaters and luxury sedans, our fleet
                covers every kind of trip — airport transfers, family holidays,
                business travel and island road trips.
              </p>
            </div>
          </div>

          <div className="rounded-2xl border border-line bg-sand/40 p-8">
            <h3 className="font-display text-xl font-bold text-ink">
              Categories we cover
            </h3>
            <div className="rule-gold mt-3" />
            <ul className="mt-5 grid grid-cols-2 gap-3 text-sm">
              {CATEGORIES.map((c) => (
                <li
                  key={c}
                  className="rounded-lg border border-line bg-white px-3 py-2 font-medium text-ink/80"
                >
                  {c}
                </li>
              ))}
            </ul>
            <Link
              href="/cars"
              className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-gold-deep hover:underline"
            >
              Browse the full fleet
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Why points */}
      <section className="border-y border-line bg-sand/40">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Why Mobiz"
            title="What you can count on"
            center
          />
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {POINTS.map((p) => (
              <div
                key={p.title}
                className="rounded-2xl border border-line bg-white p-6 shadow-sm"
              >
                <h3 className="font-display text-lg font-bold text-ink">
                  {p.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink/65">
                  {p.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-ink px-6 py-12 text-center sm:px-12">
          <h2 className="font-display text-2xl font-bold text-white sm:text-3xl">
            Ready to find your car?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-white/65">
            Browse the fleet or message us directly on WhatsApp — we are happy to
            recommend the right vehicle for your trip.
          </p>
          <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/cars"
              className="inline-flex items-center justify-center rounded-md bg-gold px-6 py-3 text-sm font-semibold text-ink transition-colors hover:bg-gold-deep"
            >
              View Available Cars
            </Link>
            <WhatsAppButton url={chatUrl}>Message us on WhatsApp</WhatsAppButton>
          </div>
        </div>
      </section>
    </div>
  );
}
