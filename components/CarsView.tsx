"use client";

import { useMemo, useState } from "react";
import { CARS } from "@/lib/cars";
import CarFilters, { type FilterState } from "./CarFilters";
import CarGrid from "./CarGrid";

const PRICE_BOUNDS = {
  min: Math.min(...CARS.map((c) => c.pricePerDay)),
  max: Math.max(...CARS.map((c) => c.pricePerDay)),
};

type SortKey = "featured" | "price-asc" | "price-desc" | "seats-desc";

export default function CarsView({
  initialCategory = "",
  initialTransmission = "",
}: {
  initialCategory?: string;
  initialTransmission?: string;
}) {
  const [filters, setFilters] = useState<FilterState>({
    category: initialCategory,
    transmission: initialTransmission,
    fuel: "",
    seats: "",
    maxPrice: PRICE_BOUNDS.max,
    availableOnly: false,
  });
  const [sort, setSort] = useState<SortKey>("featured");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const updateFilters = (next: Partial<FilterState>) =>
    setFilters((prev) => ({ ...prev, ...next }));

  const resetFilters = () =>
    setFilters({
      category: "",
      transmission: "",
      fuel: "",
      seats: "",
      maxPrice: PRICE_BOUNDS.max,
      availableOnly: false,
    });

  const filtered = useMemo(() => {
    const result = CARS.filter((car) => {
      if (filters.category) {
        if (filters.category === "Automatic") {
          if (car.transmission !== "Automatic") return false;
        } else if (car.category !== filters.category) {
          return false;
        }
      }
      if (filters.transmission && car.transmission !== filters.transmission) return false;
      if (filters.fuel && car.fuel !== filters.fuel) return false;
      if (filters.seats && car.seats < Number(filters.seats)) return false;
      if (car.pricePerDay > filters.maxPrice) return false;
      if (filters.availableOnly && !car.available) return false;
      return true;
    });

    result.sort((a, b) => {
      switch (sort) {
        case "price-asc":
          return a.pricePerDay - b.pricePerDay;
        case "price-desc":
          return b.pricePerDay - a.pricePerDay;
        case "seats-desc":
          return b.seats - a.seats;
        default:
          return Number(b.featured) - Number(a.featured) || a.pricePerDay - b.pricePerDay;
      }
    });
    return result;
  }, [filters, sort]);

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-ink/65">
          Showing <span className="font-semibold text-ink">{filtered.length}</span>{" "}
          {filtered.length === 1 ? "vehicle" : "vehicles"}
        </p>
        <div className="flex items-center gap-2">
          <label htmlFor="sort" className="text-xs font-semibold uppercase tracking-wider text-ink/55">
            Sort
          </label>
          <select
            id="sort"
            value={sort}
            onChange={(e) => setSort(e.target.value as SortKey)}
            className="rounded-md border border-line bg-white px-3 py-2 text-sm text-ink shadow-sm focus:border-gold-deep focus:outline-none"
          >
            <option value="featured">Featured first</option>
            <option value="price-asc">Price: low to high</option>
            <option value="price-desc">Price: high to low</option>
            <option value="seats-desc">Most seats</option>
          </select>
        </div>
      </div>

      {/* Mobile filter toggle */}
      <button
        type="button"
        onClick={() => setMobileFiltersOpen((v) => !v)}
        className="mt-6 flex w-full items-center justify-center gap-2 rounded-md border border-line bg-white px-4 py-3 text-sm font-semibold text-ink shadow-sm lg:hidden"
        aria-expanded={mobileFiltersOpen}
      >
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 5h18M6 12h12M10 19h4" />
        </svg>
        {mobileFiltersOpen ? "Hide filters" : "Show filters"}
      </button>

      <div className="mt-6 grid gap-8 lg:grid-cols-[280px_1fr]">
        <aside className={`${mobileFiltersOpen ? "block" : "hidden"} lg:block`}>
          <div className="lg:sticky lg:top-20">
            <CarFilters
              filters={filters}
              onChange={updateFilters}
              onReset={resetFilters}
              priceBounds={PRICE_BOUNDS}
              resultCount={filtered.length}
            />
          </div>
        </aside>

        <div>
          <CarGrid cars={filtered} />
        </div>
      </div>
    </div>
  );
}
