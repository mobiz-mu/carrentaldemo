import Link from "next/link";
import { SITE, PHONE_DISPLAY, WHATSAPP_NUMBER } from "@/lib/constants";
import { CATEGORIES } from "@/lib/cars";
import { createWhatsAppChatUrl } from "@/lib/whatsapp";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-line-dark bg-ink text-white/80">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2">
              <span className="font-display text-xl font-bold text-white">
                Mobiz <span className="text-gold">Car Rental</span>
              </span>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/60">
              Premium car rental in Mauritius. Browse economy cars, SUVs,
              7-seaters and luxury vehicles, then confirm your booking fast on
              WhatsApp — no online payment required.
            </p>
            <p className="mt-4 text-xs uppercase tracking-[0.18em] text-gold/80">
              Demo website
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wider text-white">
              Quick Links
            </h2>
            <ul className="mt-4 space-y-2.5 text-sm">
              {[
                { label: "Home", href: "/" },
                { label: "All Cars", href: "/cars" },
                { label: "Booking", href: "/booking" },
                { label: "About Us", href: "/about" },
                { label: "Contact", href: "/contact" },
                { label: "Terms", href: "/terms" },
                { label: "Privacy", href: "/privacy" },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-white/60 transition-colors hover:text-gold">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wider text-white">
              Car Categories
            </h2>
            <ul className="mt-4 space-y-2.5 text-sm">
              {CATEGORIES.map((c) => (
                <li key={c}>
                  <Link
                    href={`/cars?category=${encodeURIComponent(c)}`}
                    className="text-white/60 transition-colors hover:text-gold"
                  >
                    {c} rental Mauritius
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wider text-white">
              Get in Touch
            </h2>
            <ul className="mt-4 space-y-3 text-sm text-white/60">
              <li>
                <span className="block text-white/40">WhatsApp & Phone</span>
                <a href={createWhatsAppChatUrl()} className="text-gold hover:underline" target="_blank" rel="noopener noreferrer">
                  {PHONE_DISPLAY}
                </a>
              </li>
              <li>
                <span className="block text-white/40">Location</span>
                Mauritius — island-wide delivery
              </li>
              <li>
                <span className="block text-white/40">Airport</span>
                SSR International Airport pickups
              </li>
            </ul>
            <a
              href={createWhatsAppChatUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2 rounded-md bg-[#25D366] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#1da851]"
            >
              Chat on WhatsApp
            </a>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs text-white/50 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {SITE.name}. All rights reserved. WhatsApp +{WHATSAPP_NUMBER}.
          </p>
          <p className="text-white/40">
            Demo website — no online payment. Bookings confirmed via WhatsApp.
          </p>
        </div>
      </div>
    </footer>
  );
}
