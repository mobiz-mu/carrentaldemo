"use client";

import { CATEGORIES, type Category } from "@/lib/cars";

export interface FilterState {
  category: string;
  transmission: string;
  fuel: string;
  seats: string;
  maxPrice: number;
  availableOnly: boolean;
}

interface CarFiltersProps {
  filters: FilterState;
  onChange: (next: Partial<FilterState>) => void;
  onReset: () => void;
  priceBounds: { min: number; max: number };
  resultCount: number;
}

const TRANSMISSIONS = ["Automatic", "Manual"];
const FUELS = ["Petrol", "Diesel", "Hybrid", "Electric"];
const SEAT_OPTIONS = ["5", "7", "8", "12"];

export default function CarFilters({
  filters,
  onChange,
  onReset,
  priceBounds,
  resultCount,
}: CarFiltersProps) {
  const field =
    "w-full rounded-md border border-line bg-white px-3 py-2.5 text-sm text-ink shadow-sm focus:border-gold-deep focus:outline-none";
  const groupLabel = "mb-2 block text-xs font-semibold uppercase tracking-wider text-ink/60";

  return (
    <div className="rounded-xl border border-line bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-lg font-bold text-ink">Filters</h2>
        <button
          type="button"
          onClick={onReset}
          className="text-xs font-semibold text-gold-deep hover:text-gold"
        >
          Reset all
        </button>
      </div>
      <p className="mt-1 text-xs text-ink/55">{resultCount} cars match</p>

      <div className="mt-5 space-y-5">
        <div>
          <label htmlFor="f-category" className={groupLabel}>
            Category
          </label>
          <select
            id="f-category"
            value={filters.category}
            onChange={(e) => onChange({ category: e.target.value })}
            className={field}
          >
            <option value="">All categories</option>
            {CATEGORIES.map((c: Category) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="f-transmission" className={groupLabel}>
            Transmission
          </label>
          <select
            id="f-transmission"
            value={filters.transmission}
            onChange={(e) => onChange({ transmission: e.target.value })}
            className={field}
          >
            <option value="">Any transmission</option>
            {TRANSMISSIONS.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="f-fuel" className={groupLabel}>
            Fuel type
          </label>
          <select
            id="f-fuel"
            value={filters.fuel}
            onChange={(e) => onChange({ fuel: e.target.value })}
            className={field}
          >
            <option value="">Any fuel</option>
            {FUELS.map((f) => (
              <option key={f} value={f}>
                {f}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="f-seats" className={groupLabel}>
            Seats
          </label>
          <select
            id="f-seats"
            value={filters.seats}
            onChange={(e) => onChange({ seats: e.target.value })}
            className={field}
          >
            <option value="">Any number</option>
            {SEAT_OPTIONS.map((s) => (
              <option key={s} value={s}>
                {s}+ seats
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="f-price" className={groupLabel}>
            Max price — Rs {filters.maxPrice.toLocaleString("en-US")}/day
          </label>
          <input
            id="f-price"
            type="range"
            min={priceBounds.min}
            max={priceBounds.max}
            step={100}
            value={filters.maxPrice}
            onChange={(e) => onChange({ maxPrice: Number(e.target.value) })}
            className="w-full accent-[#a8843d]"
          />
          <div className="mt-1 flex justify-between text-[0.65rem] text-ink/50">
            <span>Rs {priceBounds.min.toLocaleString("en-US")}</span>
            <span>Rs {priceBounds.max.toLocaleString("en-US")}</span>
          </div>
        </div>

        <label className="flex cursor-pointer items-center gap-2.5 rounded-md border border-line bg-sand/50 px-3 py-2.5">
          <input
            type="checkbox"
            checked={filters.availableOnly}
            onChange={(e) => onChange({ availableOnly: e.target.checked })}
            className="h-4 w-4 accent-[#1f7a4d]"
          />
          <span className="text-sm font-medium text-ink">Available cars only</span>
        </label>
      </div>
    </div>
  );
}
