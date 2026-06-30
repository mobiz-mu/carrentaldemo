import type { Metadata } from "next";
import BookingForm from "@/components/BookingForm";
import { PHONE_DISPLAY } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Book a Car in Mauritius",
  description:
    "Send your car rental booking request to Mobiz Car Rental in Mauritius. Fill in your dates, pickup and drop-off locations, and we confirm availability and final price instantly on WhatsApp.",
  alternates: { canonical: "/booking" },
};

export default async function BookingPage({
  searchParams,
}: {
  searchParams: Promise<{
    car?: string;
    pickup?: string;
    return?: string;
    location?: string;
  }>;
}) {
  const sp = await searchParams;
  const initial = {
    carSlug: sp.car,
    pickup: sp.pickup,
    return: sp.return,
    location: sp.location,
  };

  return (
    <div className="bg-white">
      <section className="border-b border-line bg-sand/60">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
          <p className="eyebrow">Booking Request</p>
          <h1 className="mt-3 font-display text-4xl font-bold tracking-tight text-ink sm:text-5xl">
            Request Your Car Booking
          </h1>
          <div className="rule-gold mt-4" />
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink/65">
            Complete the form below and we will open WhatsApp with all your
            details pre-filled. There is no online payment — we confirm
            availability and the final price with you directly, then you decide.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="rounded-2xl border border-line bg-white p-6 shadow-sm sm:p-8">
              <BookingForm initial={initial} />
            </div>
          </div>

          <aside className="lg:col-span-1">
            <div className="rounded-2xl border border-line bg-sand/40 p-6">
              <h2 className="font-display text-xl font-bold text-ink">
                How it works
              </h2>
              <ol className="mt-4 space-y-4 text-sm text-ink/70">
                <li className="flex gap-3">
                  <span className="flex h-6 w-6 flex-none items-center justify-center rounded-full bg-gold text-xs font-bold text-ink">
                    1
                  </span>
                  Fill in your booking details and submit the form.
                </li>
                <li className="flex gap-3">
                  <span className="flex h-6 w-6 flex-none items-center justify-center rounded-full bg-gold text-xs font-bold text-ink">
                    2
                  </span>
                  WhatsApp opens with a ready-to-send message.
                </li>
                <li className="flex gap-3">
                  <span className="flex h-6 w-6 flex-none items-center justify-center rounded-full bg-gold text-xs font-bold text-ink">
                    3
                  </span>
                  We confirm availability and the final price.
                </li>
                <li className="flex gap-3">
                  <span className="flex h-6 w-6 flex-none items-center justify-center rounded-full bg-gold text-xs font-bold text-ink">
                    4
                  </span>
                  Pick up your car and enjoy Mauritius.
                </li>
              </ol>
              <div className="mt-6 rounded-xl border border-line bg-white p-4">
                <p className="text-sm font-semibold text-ink">
                  Prefer to talk first?
                </p>
                <p className="mt-1 text-sm text-ink/60">
                  Message or call us on{" "}
                  <span className="font-semibold text-ink">{PHONE_DISPLAY}</span>.
                </p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
