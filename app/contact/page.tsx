import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import WhatsAppButton from "@/components/WhatsAppButton";
import SectionHeading from "@/components/SectionHeading";
import { createWhatsAppChatUrl } from "@/lib/whatsapp";
import {
  PHONE_DISPLAY,
  BUSINESS_HOURS,
  PICKUP_LOCATIONS,
} from "@/lib/constants";

export const metadata: Metadata = {
  title: "Contact Mobiz Car Rental Mauritius",
  description:
    "Contact Mobiz Car Rental in Mauritius. Message us on WhatsApp at +230 5506 8119, send a quick enquiry, or check our business hours and pickup locations across the island.",
  alternates: { canonical: "/contact" },
};

const FAQS = [
  {
    q: "How do I book a car?",
    a: "Browse the fleet, open a car, fill in the booking form and submit. WhatsApp opens with your details pre-filled — send it and we confirm availability and the final price.",
  },
  {
    q: "Is there any online payment?",
    a: "No. This demo takes no card payments. Everything is confirmed through WhatsApp, and payment is arranged directly with us afterwards.",
  },
  {
    q: "Do you offer airport pickup?",
    a: "Yes. We arrange meet-and-greet pickups at SSR International Airport for any flight time. Mention your flight details in your WhatsApp message.",
  },
  {
    q: "What do I need to rent a car?",
    a: "A valid driving licence and a form of ID. A refundable deposit may be required depending on the vehicle.",
  },
  {
    q: "Can I pick up in one place and drop off in another?",
    a: "Often yes. Let us know your pickup and drop-off locations in your request and we will confirm whether it is possible and any fee.",
  },
];

export default function ContactPage() {
  const chatUrl = createWhatsAppChatUrl(
    "Hello Mobiz Car Rental, I have a question about renting a car in Mauritius."
  );

  return (
    <div className="bg-white">
      <section className="border-b border-line bg-sand/60">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
          <p className="eyebrow">Contact</p>
          <h1 className="mt-3 font-display text-4xl font-bold tracking-tight text-ink sm:text-5xl">
            Get in touch
          </h1>
          <div className="rule-gold mt-5" />
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink/70">
            The fastest way to reach us is WhatsApp. Send a message any time and
            we will get back to you quickly to confirm availability and pricing.
          </p>
          <div className="mt-7">
            <WhatsAppButton url={chatUrl}>Chat on WhatsApp</WhatsAppButton>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-3">
          {/* Form */}
          <div className="lg:col-span-2">
            <SectionHeading
              eyebrow="Quick enquiry"
              title="Send us a message"
              intro="Fill in the short form below and we will open WhatsApp with your message ready to send."
            />
            <div className="mt-6 rounded-2xl border border-line bg-white p-6 shadow-sm sm:p-8">
              <ContactForm />
            </div>
          </div>

          {/* Info */}
          <aside className="space-y-6">
            <div className="rounded-2xl border border-line bg-sand/40 p-6">
              <h2 className="font-display text-lg font-bold text-ink">
                Contact details
              </h2>
              <div className="rule-gold mt-3" />
              <dl className="mt-4 space-y-3 text-sm">
                <div>
                  <dt className="font-semibold text-ink">WhatsApp / Phone</dt>
                  <dd className="text-ink/70">{PHONE_DISPLAY}</dd>
                </div>
                <div>
                  <dt className="font-semibold text-ink">Location</dt>
                  <dd className="text-ink/70">Mauritius</dd>
                </div>
                <div>
                  <dt className="font-semibold text-ink">Email</dt>
                  <dd className="text-ink/70">hello@mobiz-car-rental.mu</dd>
                </div>
              </dl>
            </div>

            <div className="rounded-2xl border border-line bg-sand/40 p-6">
              <h2 className="font-display text-lg font-bold text-ink">
                Business hours
              </h2>
              <div className="rule-gold mt-3" />
              <ul className="mt-4 space-y-2 text-sm">
                {BUSINESS_HOURS.map((b) => (
                  <li key={b.day} className="flex justify-between gap-4">
                    <span className="text-ink/70">{b.day}</span>
                    <span className="font-medium text-ink">{b.hours}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-line bg-sand/40 p-6">
              <h2 className="font-display text-lg font-bold text-ink">
                Pickup locations
              </h2>
              <div className="rule-gold mt-3" />
              <ul className="mt-4 flex flex-wrap gap-2 text-xs">
                {PICKUP_LOCATIONS.filter((l) => !l.startsWith("Other")).map(
                  (l) => (
                    <li
                      key={l}
                      className="rounded-full border border-line bg-white px-3 py-1 font-medium text-ink/75"
                    >
                      {l}
                    </li>
                  )
                )}
              </ul>
            </div>
          </aside>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-line bg-sand/40">
        <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="FAQ"
            title="Frequently asked questions"
            center
          />
          <div className="mt-10 space-y-4">
            {FAQS.map((f) => (
              <details
                key={f.q}
                className="group rounded-xl border border-line bg-white p-5"
              >
                <summary className="flex cursor-pointer items-center justify-between gap-4 font-semibold text-ink marker:content-['']">
                  {f.q}
                  <span className="text-gold-deep transition-transform group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-ink/65">
                  {f.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
