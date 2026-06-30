import Link from "next/link";
import WhatsAppButton from "./WhatsAppButton";
import { createWhatsAppChatUrl } from "@/lib/whatsapp";
import { PHONE_DISPLAY } from "@/lib/constants";

export default function CTASection() {
  return (
    <section className="relative overflow-hidden bg-gold">
      <div
        className="absolute inset-0 opacity-25"
        style={{
          backgroundImage:
            "radial-gradient(60% 120% at 90% 10%, rgba(11,18,32,0.35), transparent 60%)",
        }}
        aria-hidden="true"
      />
      <div className="relative mx-auto flex max-w-7xl flex-col items-start gap-6 px-4 py-14 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8 lg:py-16">
        <div className="max-w-2xl">
          <h2 className="font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            Ready to book your car in Mauritius?
          </h2>
          <p className="mt-3 text-base leading-relaxed text-ink/75">
            Send your request on WhatsApp and we will confirm availability and
            the final price fast. No online payment — just a quick, friendly chat.
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
          <WhatsAppButton url={createWhatsAppChatUrl()} className="px-6 py-3.5">
            Book on WhatsApp
          </WhatsAppButton>
          <Link
            href="/cars"
            className="inline-flex items-center justify-center rounded-md border border-ink/25 bg-white/30 px-6 py-3.5 text-sm font-semibold text-ink transition-colors hover:bg-white/60"
          >
            Browse all cars
          </Link>
        </div>
      </div>
      <div className="relative border-t border-ink/10 bg-ink/[0.04]">
        <p className="mx-auto max-w-7xl px-4 py-3 text-center text-sm font-medium text-ink/70 sm:px-6 lg:px-8">
          Prefer to call? Reach us on WhatsApp at{" "}
          <a href={createWhatsAppChatUrl()} className="font-semibold text-ink underline" target="_blank" rel="noopener noreferrer">
            {PHONE_DISPLAY}
          </a>
        </p>
      </div>
    </section>
  );
}
