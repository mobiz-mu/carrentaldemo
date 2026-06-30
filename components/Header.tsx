"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_LINKS } from "@/lib/constants";
import { createWhatsAppChatUrl } from "@/lib/whatsapp";
import WhatsAppButton from "./WhatsAppButton";

const ANNOUNCEMENTS = [
  "Premium Car Rental Mauritius",
  "Airport Pickup Available",
  "Book Fast on WhatsApp",
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [announcementIndex, setAnnouncementIndex] = useState(0);
  const pathname = usePathname();
  const chatUrl = createWhatsAppChatUrl();

  // Rotate premium announcement text every 5 seconds.
  useEffect(() => {
    const timer = window.setInterval(() => {
      setAnnouncementIndex((current) => (current + 1) % ANNOUNCEMENTS.length);
    }, 5000);

    return () => window.clearInterval(timer);
  }, []);

  // Close the mobile menu whenever the route changes.
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- resetting UI state on navigation is intentional
    setOpen(false);
  }, [pathname]);

  // Lock body scroll while the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
      {/* Premium announcement bar */}
      <div className="border-b border-gold/20 bg-ink text-white">
        <div className="mx-auto flex min-h-9 max-w-7xl items-center justify-center px-4 text-center sm:px-6 lg:px-8">
          <p
            key={announcementIndex}
            className="text-[0.68rem] font-bold uppercase tracking-[0.18em] text-gold sm:text-xs md:text-sm"
          >
            {ANNOUNCEMENTS[announcementIndex]}
          </p>
        </div>
      </div>

      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:h-20 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          href="/"
          className="flex min-w-0 items-center gap-3 sm:gap-4"
          aria-label="Mobiz Car Rental home"
        >
          <span className="relative flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-full bg-transparent sm:h-16 sm:w-16">
            <Image
              src="/images/mobiz-mu-logo.png"
              alt="Mobiz.mu logo"
              fill
              sizes="64px"
              priority
              className="rounded-full object-contain"
            />
          </span>

          <span className="flex min-w-0 flex-col leading-none">
            <span className="font-display text-lg font-extrabold tracking-tight text-ink sm:text-2xl">
              Car <span className="text-gold-deep">Rental</span>
            </span>
            <span className="mt-1 text-[0.6rem] font-bold uppercase tracking-[0.24em] text-ink/50 sm:text-[0.7rem]">
              Mauritius
            </span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          {NAV_LINKS.map((link) => {
            const active =
              pathname === link.href ||
              (link.href !== "/" && pathname.startsWith(link.href));

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                  active ? "text-gold-deep" : "text-ink/70 hover:text-ink"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden lg:block">
          <WhatsAppButton url={chatUrl} className="px-4 py-2.5">
            WhatsApp Booking
          </WhatsAppButton>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-md text-ink lg:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <svg
            className="h-6 w-6"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden="true"
          >
            {open ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12M18 6L6 18" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 7h16M4 12h16M4 17h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="border-t border-line bg-white lg:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col px-4 py-3 sm:px-6" aria-label="Mobile">
            {NAV_LINKS.map((link) => {
              const active =
                pathname === link.href ||
                (link.href !== "/" && pathname.startsWith(link.href));

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`rounded-md px-3 py-3 text-base font-medium ${
                    active ? "bg-sand text-gold-deep" : "text-ink/80"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}

            <div className="mt-3">
              <WhatsAppButton url={chatUrl} fullWidth>
                WhatsApp Booking
              </WhatsAppButton>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}