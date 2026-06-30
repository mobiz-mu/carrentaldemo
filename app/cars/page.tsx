import type { Metadata } from "next";
import CarsView from "@/components/CarsView";

export const metadata: Metadata = {
  title: "Browse Cars for Rent in Mauritius",
  description:
    "Browse the full Mobiz fleet — economy cars, hatchbacks, sedans, SUVs, 7-seaters, luxury cars and airport transfer vans. Filter by category, transmission, fuel, seats and price, then book on WhatsApp.",
  alternates: { canonical: "/cars" },
};

export default async function CarsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; transmission?: string }>;
}) {
  const { category = "", transmission = "" } = await searchParams;

  return (
    <div className="bg-white">
      <section className="border-b border-line bg-sand/60">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
          <p className="eyebrow">Our Fleet</p>
          <h1 className="mt-3 font-display text-4xl font-bold tracking-tight text-ink sm:text-5xl">
            Cars for Rent in Mauritius
          </h1>
          <div className="rule-gold mt-4" />
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink/65">
            Every vehicle includes unlimited island mileage, basic insurance and
            24/7 roadside support. Choose a car, send your request on WhatsApp,
            and we confirm availability and the final price fast.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <CarsView initialCategory={category} initialTransmission={transmission} />
      </div>
    </div>
  );
}
