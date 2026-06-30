import Link from "next/link";
import { CARS } from "@/lib/cars";
import CarCard from "./CarCard";
import SectionHeading from "./SectionHeading";

export default function FeaturedCars() {
  const featured = CARS.slice(0, 12);

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <SectionHeading
          eyebrow="Complete fleet"
          title="Available cars in Mauritius"
          intro="Browse all 12 rental vehicles — from economy hybrids and SUVs to 7-seaters, luxury saloons and airport transfer vans."
        />

        <Link
          href="/cars"
          className="inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-gold-deep hover:text-gold"
        >
          View all cars
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
      </div>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {featured.map((car, i) => (
          <CarCard key={car.id} car={car} priority={i < 3} />
        ))}
      </div>
    </section>
  );
}
