import Image from "next/image";
import Link from "next/link";
import type { Car } from "@/lib/cars";
import { formatPrice } from "@/lib/cars";

function SpecIcon({ path }: { path: string }) {
  return (
    <svg
      className="h-4 w-4 text-gold-deep"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d={path} />
    </svg>
  );
}

const ICONS = {
  transmission: "M6 4v16M6 8h6a2 2 0 012 2v0M14 16h2a2 2 0 002-2V4",
  fuel: "M14 20V6a2 2 0 00-2-2H6a2 2 0 00-2 2v14m0 0h10M4 10h8m6-2 2 2v6a2 2 0 01-4 0V7l-2-2",
  seats: "M5 18v-2a3 3 0 013-3h2m4 5v-2a3 3 0 013-3M7 8a3 3 0 106 0 3 3 0 00-6 0z",
  luggage: "M8 7V5a2 2 0 012-2h4a2 2 0 012 2v2m-9 0h12a1 1 0 011 1v11a1 1 0 01-1 1H6a1 1 0 01-1-1V8a1 1 0 011-1z",
};

function getCarImageSrc(car: Car) {
  return `/images/cars/${car.slug}.jpg`;
}

export default function CarCard({
  car,
  priority = false,
}: {
  car: Car;
  priority?: boolean;
}) {
  const imageSrc = getCarImageSrc(car);

  return (
    <article className="group flex flex-col overflow-hidden rounded-xl border border-line bg-white shadow-sm transition-shadow duration-200 hover:shadow-lg hover:shadow-ink/5">
      <Link
        href={`/cars/${car.slug}`}
        className="relative block overflow-hidden bg-white"
        aria-label={`View ${car.name} details`}
      >
        {/* Clean image only - no category/name overlay */}
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-white">
          <Image
            src={imageSrc}
            alt={car.name}
            fill
            priority={priority}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-contain p-3 transition-transform duration-500 group-hover:scale-105"
          />
        </div>

        <span
          className={`absolute right-3 top-3 rounded-full px-2.5 py-1 text-[0.65rem] font-semibold uppercase tracking-wide ${
            car.available ? "bg-success/95 text-white" : "bg-danger/95 text-white"
          }`}
        >
          {car.available ? "Available" : "Unavailable"}
        </span>

        {car.featured && (
          <span className="absolute left-3 top-3 rounded-full bg-gold px-2.5 py-1 text-[0.65rem] font-semibold uppercase tracking-wide text-ink">
            Featured
          </span>
        )}
      </Link>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-[0.7rem] font-semibold uppercase tracking-wider text-gold-deep">
              {car.category}
            </p>

            <h3 className="mt-1 font-display text-lg font-bold text-ink">
              <Link href={`/cars/${car.slug}`} className="hover:text-gold-deep">
                {car.name}
              </Link>
            </h3>
          </div>

          <div className="text-right">
            <span className="plate px-2 py-1 text-sm">
              {formatPrice(car.pricePerDay)}
            </span>
            <p className="mt-1 text-[0.65rem] text-ink/50">per day</p>
          </div>
        </div>

        <ul className="mt-4 grid grid-cols-2 gap-x-3 gap-y-2 text-sm text-ink/70">
          <li className="flex items-center gap-2">
            <SpecIcon path={ICONS.transmission} /> {car.transmission}
          </li>
          <li className="flex items-center gap-2">
            <SpecIcon path={ICONS.fuel} /> {car.fuel}
          </li>
          <li className="flex items-center gap-2">
            <SpecIcon path={ICONS.seats} /> {car.seats} seats
          </li>
          <li className="flex items-center gap-2">
            <SpecIcon path={ICONS.luggage} /> {car.luggage} bags
          </li>
        </ul>

        <div className="mt-5 flex flex-col gap-2 pt-1">
          <Link
            href={`/cars/${car.slug}`}
            className="inline-flex items-center justify-center rounded-md border border-ink/15 bg-white px-4 py-2.5 text-sm font-semibold text-ink transition-colors hover:border-gold-deep hover:text-gold-deep"
          >
            View Details
          </Link>

          <Link
            href={car.available ? `/booking?car=${car.slug}` : `/cars/${car.slug}`}
            aria-disabled={!car.available}
            className={`inline-flex items-center justify-center gap-2 rounded-md px-4 py-2.5 text-sm font-semibold transition-colors ${
              car.available
                ? "bg-gold text-ink hover:bg-gold-deep"
                : "cursor-not-allowed bg-line text-ink/40"
            }`}
          >
            {car.available ? "Book Now" : "Currently Unavailable"}
          </Link>
        </div>
      </div>
    </article>
  );
}
