import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Rental Terms & Conditions",
  description:
    "Car rental terms and conditions for Mobiz Car Rental Mauritius — driving licence requirements, availability, deposits, fuel and late return policy, vehicle inspection, and WhatsApp confirmation.",
  alternates: { canonical: "/terms" },
};

const SECTIONS = [
  {
    h: "1. Driving licence",
    p: "The driver must hold a valid driving licence accepted in Mauritius and present it, along with a form of identification, before the vehicle is handed over.",
  },
  {
    h: "2. Booking & availability",
    p: "All bookings are requests and remain subject to availability. A booking is only confirmed once we have replied on WhatsApp to confirm the vehicle, the dates and the final price.",
  },
  {
    h: "3. Deposit",
    p: "A refundable security deposit may be required depending on the vehicle category. The amount and method are agreed during WhatsApp confirmation.",
  },
  {
    h: "4. Fuel policy",
    p: "Vehicles are provided with a set fuel level and should be returned at the same level (full-to-full unless agreed otherwise). Missing fuel may be charged.",
  },
  {
    h: "5. Late return",
    p: "Please return the vehicle at the agreed time and place. Late returns may incur an additional charge. Contact us on WhatsApp as early as possible if your plans change.",
  },
  {
    h: "6. Vehicle inspection",
    p: "The vehicle is inspected together at handover and on return. Any existing damage is noted at pickup so you are never held responsible for it.",
  },
  {
    h: "7. No online payment (demo)",
    p: "This is a demonstration website. No card or online payment is collected here. Any payment is arranged directly with us after WhatsApp confirmation.",
  },
  {
    h: "8. Final confirmation",
    p: "Final confirmation of every booking is done through WhatsApp. If you have not received a confirmation message, your booking is not yet secured.",
  },
];

export default function TermsPage() {
  return (
    <div className="bg-white">
      <section className="border-b border-line bg-sand/60">
        <div className="mx-auto max-w-4xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
          <p className="eyebrow">Legal</p>
          <h1 className="mt-3 font-display text-4xl font-bold tracking-tight text-ink sm:text-5xl">
            Rental Terms &amp; Conditions
          </h1>
          <div className="rule-gold mt-5" />
          <p className="mt-5 text-base leading-relaxed text-ink/65">
            These are the basic terms for renting a vehicle from Mobiz Car
            Rental. They are provided for this demo and may be tailored for the
            final business.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="space-y-8">
          {SECTIONS.map((s) => (
            <div key={s.h}>
              <h2 className="font-display text-xl font-bold text-ink">{s.h}</h2>
              <p className="mt-2 text-base leading-relaxed text-ink/70">
                {s.p}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-12 rounded-2xl border border-line bg-sand/40 p-6">
          <p className="text-sm text-ink/70">
            Questions about these terms? See our{" "}
            <Link href="/privacy" className="font-semibold text-gold-deep hover:underline">
              privacy policy
            </Link>{" "}
            or{" "}
            <Link href="/contact" className="font-semibold text-gold-deep hover:underline">
              contact us
            </Link>
            .
          </p>
        </div>
      </section>
    </div>
  );
}
