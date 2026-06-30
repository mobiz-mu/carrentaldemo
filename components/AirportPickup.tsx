import Link from "next/link";
import WhatsAppButton from "./WhatsAppButton";
import { createWhatsAppChatUrl } from "@/lib/whatsapp";

export default function AirportPickup() {
  const url = createWhatsAppChatUrl(
    "Hello Mobiz Car Rental, I would like to arrange an airport pickup at SSR International Airport. Please confirm availability."
  );
  return (
    <section className="bg-sand">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="overflow-hidden rounded-2xl border border-line bg-white shadow-sm">
          <div className="grid items-center gap-0 lg:grid-cols-2">
            {/* Visual side */}
            <div
              className="relative min-h-[260px] p-8 text-white lg:min-h-[360px]"
              style={{
                background:
                  "radial-gradient(120% 120% at 0% 0%, #1c3a5e 0%, #0e2138 55%, #0b1220 100%)",
              }}
            >
              <p className="eyebrow text-gold/90">SSR International Airport</p>
              <h2 className="mt-3 font-display text-3xl font-bold leading-tight sm:text-4xl">
                Land, meet your car, and go
              </h2>
              <p className="mt-4 max-w-md text-sm leading-relaxed text-white/70">
                We track your flight and meet you in the arrivals hall — day or
                night. From compact economy cars to 12-seat minibuses for groups,
                your airport transfer is sorted before you even land.
              </p>
              <svg className="absolute bottom-0 right-0 w-40 opacity-20" viewBox="0 0 200 120" fill="none" aria-hidden="true">
                <path d="M180 80V70l-60-35V20a8 8 0 00-16 0v15L44 70v10l60-18v38l-14 9v8l22-6 22 6v-8l-14-9V62l60 18z" fill="#c6a15b" />
              </svg>
            </div>

            {/* Content side */}
            <div className="p-8 lg:p-10">
              <ul className="space-y-4">
                {[
                  "Meet & greet in the arrivals hall",
                  "Flight tracking for any arrival time",
                  "Clean, fuelled and inspected vehicle",
                  "Vans & minibuses for larger groups",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-success/15 text-success">
                      <svg className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M16.7 5.3a1 1 0 010 1.4l-7.5 7.5a1 1 0 01-1.4 0L3.3 9.7a1 1 0 011.4-1.4l3.1 3.1 6.8-6.8a1 1 0 011.4 0z" clipRule="evenodd" />
                      </svg>
                    </span>
                    <span className="text-sm text-ink/75">{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <WhatsAppButton url={url}>Arrange airport pickup</WhatsAppButton>
                <Link
                  href="/cars?category=Airport+Transfer"
                  className="inline-flex items-center justify-center rounded-md border border-ink/15 px-5 py-3 text-sm font-semibold text-ink transition-colors hover:border-gold-deep hover:text-gold-deep"
                >
                  View transfer vehicles
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
