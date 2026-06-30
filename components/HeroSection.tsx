import Image from "next/image";
import Link from "next/link";
import SearchBox from "./SearchBox";
import WhatsAppButton from "./WhatsAppButton";
import { createWhatsAppChatUrl } from "@/lib/whatsapp";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-ink">
      {/* Desktop hero image */}
      <Image
        src="/images/cars/hero-banner.png"
        alt="Premium Mobiz Car Rental vehicle lineup in Mauritius"
        fill
        priority
        fetchPriority="high"
        sizes="(min-width: 1024px) 100vw, 0px"
        className="hidden object-cover object-center lg:block"
     />
      {/* Mobile hero image */}
      <Image
        src="/images/cars/hero-banner-mobile.png"
        alt="Premium Mobiz Car Rental mobile vehicle lineup"
        fill
        priority
        fetchPriority="high"
        sizes="(max-width: 1023px) 100vw, 0px"
        className="object-cover object-center lg:hidden"
      />

      {/* Premium overlay for text readability */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-ink/35 via-ink/60 to-ink/95 lg:bg-gradient-to-r lg:from-ink/95 lg:via-ink/70 lg:to-ink/25"
        aria-hidden="true"
      />

      <div
        className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,rgba(198,161,91,0.20),transparent_32%),radial-gradient(circle_at_80%_85%,rgba(198,161,91,0.10),transparent_34%)]"
        aria-hidden="true"
      />

      <div className="relative mx-auto flex min-h-[calc(100vh-104px)] max-w-7xl flex-col justify-end px-4 pb-8 pt-20 sm:min-h-[760px] sm:px-6 sm:pb-10 sm:pt-24 lg:min-h-[820px] lg:px-8 lg:pb-14 lg:pt-32">
        <div className="grid items-end gap-10 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,0.08fr)]">
          <div className="max-w-3xl text-center lg:text-left">
            <p className="eyebrow fade-up text-gold/90">
              Premium car rental · Mauritius
            </p>

            <h1 className="fade-up mt-4 font-display text-4xl font-bold leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-6xl">
              Premium Car Rental
              <span className="block text-gold">in Mauritius</span>
            </h1>

            <p className="fade-up mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/75 sm:text-lg lg:mx-0">
              Book economy cars, SUVs, 7-seaters, luxury vehicles and airport
              transfers with fast WhatsApp confirmation and secure payment options.
            </p>

            <div className="fade-up mt-8 flex flex-col justify-center gap-3 sm:flex-row sm:flex-wrap lg:justify-start">
              <Link
                href="/cars"
                className="inline-flex items-center justify-center gap-2 rounded-md bg-gold px-6 py-3.5 text-sm font-semibold text-ink shadow-sm transition-colors hover:bg-gold-soft"
              >
                View Cars
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
              </Link>

              <Link
                href="/booking"
                className="inline-flex items-center justify-center gap-2 rounded-md border border-white/25 bg-white/10 px-6 py-3.5 text-sm font-semibold text-white shadow-sm backdrop-blur transition-colors hover:border-gold hover:text-gold"
              >
                Start Booking
              </Link>

              <WhatsAppButton url={createWhatsAppChatUrl()} className="px-6 py-3.5">
                WhatsApp Us
              </WhatsAppButton>
            </div>

            {/* Trust strip */}
            <dl className="fade-up mx-auto mt-10 grid max-w-xl grid-cols-3 gap-4 border-t border-white/10 pt-6 text-center lg:mx-0 lg:text-left">
              {[
                { k: "12+", v: "Vehicles ready" },
                { k: "24/7", v: "Airport pickups" },
                { k: "Secure", v: "Payment options" },
              ].map((s) => (
                <div key={s.v}>
                  <dt className="font-display text-2xl font-bold text-gold">
                    {s.k}
                  </dt>
                  <dd className="mt-1 text-xs text-white/65">{s.v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        {/* Quick search box */}
        <div className="fade-up mx-auto mt-10 w-full max-w-5xl sm:mt-12 lg:mt-14">
          <SearchBox />
        </div>
      </div>
    </section>
  );
}