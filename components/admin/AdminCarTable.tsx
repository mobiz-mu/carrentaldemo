"use client";

import { type Car, formatPrice } from "@/lib/cars";

export default function AdminCarTable({
  cars,
  onEdit,
  onDelete,
  onToggleAvailable,
  onToggleFeatured,
}: {
  cars: Car[];
  onEdit: (car: Car) => void;
  onDelete: (car: Car) => void;
  onToggleAvailable: (car: Car) => void;
  onToggleFeatured: (car: Car) => void;
}) {
  return (
    <div className="overflow-x-auto rounded-xl border border-line bg-white shadow-sm">
      <table className="w-full min-w-[760px] border-collapse text-sm">
        <thead>
          <tr className="border-b border-line bg-sand/60 text-left text-xs uppercase tracking-wider text-ink/60">
            <th className="px-4 py-3 font-semibold">Car</th>
            <th className="px-4 py-3 font-semibold">Category</th>
            <th className="px-4 py-3 font-semibold">Price/day</th>
            <th className="px-4 py-3 font-semibold">Specs</th>
            <th className="px-4 py-3 font-semibold">Status</th>
            <th className="px-4 py-3 text-right font-semibold">Actions</th>
          </tr>
        </thead>
        <tbody>
          {cars.map((car) => (
            <tr key={car.id} className="border-b border-line last:border-0 hover:bg-sand/30">
              <td className="px-4 py-3">
                <div className="flex items-center gap-3">
                  <span
                    className="h-9 w-12 shrink-0 rounded-md"
                    style={{ background: `linear-gradient(135deg, hsl(${car.hue} 38% 24%), #0b1220)` }}
                    aria-hidden="true"
                  />
                  <div>
                    <p className="font-semibold text-ink">{car.name}</p>
                    <p className="text-xs text-ink/50">/{car.slug}</p>
                  </div>
                </div>
              </td>
              <td className="px-4 py-3 text-ink/70">{car.category}</td>
              <td className="px-4 py-3 font-semibold text-ink">{formatPrice(car.pricePerDay)}</td>
              <td className="px-4 py-3 text-xs text-ink/60">
                {car.transmission} · {car.fuel} · {car.seats} seats
              </td>
              <td className="px-4 py-3">
                <div className="flex flex-wrap gap-1.5">
                  <button
                    type="button"
                    onClick={() => onToggleAvailable(car)}
                    className={`rounded-full px-2.5 py-1 text-[0.65rem] font-semibold uppercase tracking-wide transition-colors ${
                      car.available
                        ? "bg-success/15 text-success hover:bg-success/25"
                        : "bg-danger/15 text-danger hover:bg-danger/25"
                    }`}
                  >
                    {car.available ? "Available" : "Unavailable"}
                  </button>
                  <button
                    type="button"
                    onClick={() => onToggleFeatured(car)}
                    className={`rounded-full px-2.5 py-1 text-[0.65rem] font-semibold uppercase tracking-wide transition-colors ${
                      car.featured
                        ? "bg-gold/20 text-gold-deep hover:bg-gold/30"
                        : "bg-ink/5 text-ink/50 hover:bg-ink/10"
                    }`}
                  >
                    {car.featured ? "Featured" : "Not featured"}
                  </button>
                </div>
              </td>
              <td className="px-4 py-3">
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => onEdit(car)}
                    className="rounded-md border border-line px-3 py-1.5 text-xs font-semibold text-ink hover:border-gold-deep hover:text-gold-deep"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => onDelete(car)}
                    className="rounded-md border border-danger/30 px-3 py-1.5 text-xs font-semibold text-danger hover:bg-danger/10"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
          {cars.length === 0 && (
            <tr>
              <td colSpan={6} className="px-4 py-10 text-center text-sm text-ink/55">
                No cars in the demo fleet. Add one to get started.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
