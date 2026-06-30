import type { Car } from "@/lib/cars";
import CarCard from "./CarCard";

export default function CarGrid({ cars }: { cars: Car[] }) {
  if (cars.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-line bg-sand/60 px-6 py-16 text-center">
        <p className="font-display text-lg font-semibold text-ink">No cars match your filters</p>
        <p className="mt-2 text-sm text-ink/60">
          Try widening the price range or clearing a filter to see more vehicles.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {cars.map((car, i) => (
        <CarCard key={car.id} car={car} priority={i < 3} />
      ))}
    </div>
  );
}
