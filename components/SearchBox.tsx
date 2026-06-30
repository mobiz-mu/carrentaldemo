"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CATEGORIES } from "@/lib/cars";
import { PICKUP_LOCATIONS } from "@/lib/constants";

export default function SearchBox({ compact = false }: { compact?: boolean }) {
  const router = useRouter();
  const [pickupDate, setPickupDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");

  const today = new Date().toISOString().split("T")[0];

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams();
    if (category) params.set("category", category);
    if (pickupDate) params.set("pickup", pickupDate);
    if (returnDate) params.set("return", returnDate);
    if (location) params.set("location", location);
    const qs = params.toString();
    router.push(qs ? `/cars?${qs}` : "/cars");
  }

  const field =
    "w-full rounded-md border border-line bg-white px-3 py-2.5 text-sm text-ink shadow-sm focus:border-gold-deep focus:outline-none";
  const label = "mb-1.5 block text-xs font-semibold uppercase tracking-wider text-ink/60";

  return (
    <form
      onSubmit={handleSearch}
      className={`grid gap-4 rounded-xl border border-line bg-white p-5 shadow-xl shadow-ink/5 ${
        compact ? "sm:grid-cols-2" : "sm:grid-cols-2 lg:grid-cols-5"
      }`}
    >
      <div>
        <label htmlFor="sb-pickup" className={label}>
          Pickup date
        </label>
        <input
          id="sb-pickup"
          type="date"
          min={today}
          value={pickupDate}
          onChange={(e) => setPickupDate(e.target.value)}
          className={field}
        />
      </div>
      <div>
        <label htmlFor="sb-return" className={label}>
          Return date
        </label>
        <input
          id="sb-return"
          type="date"
          min={pickupDate || today}
          value={returnDate}
          onChange={(e) => setReturnDate(e.target.value)}
          className={field}
        />
      </div>
      <div>
        <label htmlFor="sb-category" className={label}>
          Category
        </label>
        <select
          id="sb-category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className={field}
        >
          <option value="">Any category</option>
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="sb-location" className={label}>
          Pickup location
        </label>
        <select
          id="sb-location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className={field}
        >
          <option value="">Any location</option>
          {PICKUP_LOCATIONS.map((l) => (
            <option key={l} value={l}>
              {l}
            </option>
          ))}
        </select>
      </div>
      <div className="flex items-end">
        <button
          type="submit"
          className="w-full rounded-md bg-gold-deep px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-gold"
        >
          Search Cars
        </button>
      </div>
    </form>
  );
}
