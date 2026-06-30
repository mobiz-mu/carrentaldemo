import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Privacy policy for Mobiz Car Rental Mauritius. Customer details are used only to handle booking requests sent through WhatsApp. No online payment is collected and no payment information is stored.",
  alternates: { canonical: "/privacy" },
};

const SECTIONS = [
  {
    h: "Information we use",
    p: "When you submit a booking or contact form, we use the details you provide — such as your name, phone number, email, dates and locations — only to handle your enquiry and arrange your rental.",
  },
  {
    h: "How requests are sent",
    p: "Your request is delivered through WhatsApp. The website builds a pre-filled message from the details you enter and opens WhatsApp so you can review and send it yourself. You stay in control of what is sent.",
  },
  {
    h: "No online payment",
    p: "This demo does not collect any online payment. We do not ask for, process or store card numbers or other payment information on this website.",
  },
  {
    h: "No sensitive payment data stored",
    p: "Because no payment is taken here, no sensitive payment information is stored. Any payment for an actual rental is arranged directly with us after WhatsApp confirmation.",
  },
  {
    h: "Admin demo data",
    p: "The admin dashboard in this demo stores fleet data only in your own browser (localStorage). It is not uploaded to any server and is visible only on your device.",
  },
  {
    h: "Your choices",
    p: "You can choose not to send a WhatsApp message at any point. If you would like us to remove details you have shared with us over WhatsApp, simply ask us in the chat.",
  },
];

export default function PrivacyPage() {
  return (
    <div className="bg-white">
      <section className="border-b border-line bg-sand/60">
        <div className="mx-auto max-w-4xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
          <p className="eyebrow">Legal</p>
          <h1 className="mt-3 font-display text-4xl font-bold tracking-tight text-ink sm:text-5xl">
            Privacy Policy
          </h1>
          <div className="rule-gold mt-5" />
          <p className="mt-5 text-base leading-relaxed text-ink/65">
            We keep things simple: your details are used only to handle your
            booking request. This policy explains how.
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
            See also our{" "}
            <Link href="/terms" className="font-semibold text-gold-deep hover:underline">
              rental terms
            </Link>{" "}
            or{" "}
            <Link href="/contact" className="font-semibold text-gold-deep hover:underline">
              get in touch
            </Link>
            .
          </p>
        </div>
      </section>
    </div>
  );
}
