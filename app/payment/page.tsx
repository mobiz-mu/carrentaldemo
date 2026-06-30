import type { Metadata } from "next";
import PaymentClient from "@/components/payment/PaymentClient";

export const metadata: Metadata = {
  title: "Secure Checkout",
  description:
    "Complete your Mobiz Car Rental booking. Pay with PayPal or MCB, or confirm your booking on WhatsApp. Secure checkout for car rental in Mauritius.",
  robots: { index: false, follow: false },
  alternates: { canonical: "/payment" },
};

export default function PaymentPage() {
  return (
    <div className="bg-white">
      <section className="border-b border-line bg-sand/60">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
          <p className="eyebrow">Checkout</p>
          <h1 className="mt-3 font-display text-4xl font-bold tracking-tight text-ink sm:text-5xl">
            Secure Checkout
          </h1>
          <div className="rule-gold mt-4" />
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink/65">
            Review your booking and choose how you&apos;d like to pay. You can use
            PayPal, MCB, or simply confirm on WhatsApp — no payment is taken until
            we confirm availability with you.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <PaymentClient />
      </div>
    </div>
  );
}
