"use client";

import { useEffect, useState } from "react";
import { CATEGORIES, type Car, type Category, type Fuel, type Transmission } from "@/lib/cars";
import { slugify } from "@/lib/storage";

const TRANSMISSIONS: Transmission[] = ["Automatic", "Manual"];
const FUELS: Fuel[] = ["Petrol", "Diesel", "Hybrid", "Electric"];

export default function AdminCarForm({
  car,
  onSave,
  onCancel,
  existingSlugs,
}: {
  car: Car;
  onSave: (car: Car) => void;
  onCancel: () => void;
  existingSlugs: string[];
}) {
  const [draft, setDraft] = useState<Car>(car);
  const [featuresText, setFeaturesText] = useState(car.features.join(", "));
  const [slugTouched, setSlugTouched] = useState(Boolean(car.slug));
  const [error, setError] = useState("");

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- re-sync form when a different car is selected for editing
    setDraft(car);
    setFeaturesText(car.features.join(", "));
    setSlugTouched(Boolean(car.slug));
  }, [car]);

  // Auto-slug from name until the user edits the slug manually.
  useEffect(() => {
    if (!slugTouched) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- derive slug from name while untouched
      setDraft((d) => ({ ...d, slug: slugify(d.name) }));
    }
  }, [draft.name, slugTouched]);

  function set<K extends keyof Car>(key: K, value: Car[K]) {
    setDraft((d) => ({ ...d, [key]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!draft.name.trim()) return setError("Name is required.");
    const slug = (draft.slug || slugify(draft.name)).trim();
    if (!slug) return setError("Slug is required.");
    const others = existingSlugs.filter((s) => s !== car.slug);
    if (others.includes(slug)) return setError("That slug is already in use.");

    const features = featuresText
      .split(",")
      .map((f) => f.trim())
      .filter(Boolean);

    const finalCar: Car = {
      ...draft,
      slug,
      id: draft.id || slug,
      features,
      pricePerDay: Number(draft.pricePerDay) || 0,
      seats: Number(draft.seats) || 1,
      luggage: Number(draft.luggage) || 0,
      hue: Number(draft.hue) || 215,
    };
    setError("");
    onSave(finalCar);
  }

  const field =
    "w-full rounded-md border border-line bg-white px-3 py-2 text-sm text-ink focus:border-gold-deep focus:outline-none";
  const label = "mb-1 block text-xs font-semibold uppercase tracking-wider text-ink/60";

  return (
    <div className="fixed inset-0 z-[60] flex items-start justify-center overflow-y-auto bg-ink/60 p-4 backdrop-blur-sm">
      <form
        onSubmit={handleSubmit}
        className="my-8 w-full max-w-2xl rounded-xl border border-line bg-white p-6 shadow-2xl"
      >
        <div className="flex items-center justify-between">
          <h2 className="font-display text-xl font-bold text-ink">
            {car.id ? "Edit car" : "Add a new car"}
          </h2>
          <button
            type="button"
            onClick={onCancel}
            className="rounded-md p-1.5 text-ink/50 hover:bg-sand hover:text-ink"
            aria-label="Close"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>

        {error && (
          <p className="mt-4 rounded-md bg-danger/10 px-3 py-2 text-sm text-danger">{error}</p>
        )}

        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label htmlFor="ac-name" className={label}>Name</label>
            <input id="ac-name" className={field} value={draft.name} onChange={(e) => set("name", e.target.value)} />
          </div>
          <div>
            <label htmlFor="ac-slug" className={label}>Slug</label>
            <input
              id="ac-slug"
              className={field}
              value={draft.slug}
              onChange={(e) => {
                setSlugTouched(true);
                set("slug", slugify(e.target.value));
              }}
            />
          </div>
          <div>
            <label htmlFor="ac-category" className={label}>Category</label>
            <select id="ac-category" className={field} value={draft.category} onChange={(e) => set("category", e.target.value as Category)}>
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="ac-price" className={label}>Price per day (Rs)</label>
            <input id="ac-price" type="number" min={0} className={field} value={draft.pricePerDay} onChange={(e) => set("pricePerDay", Number(e.target.value))} />
          </div>
          <div>
            <label htmlFor="ac-transmission" className={label}>Transmission</label>
            <select id="ac-transmission" className={field} value={draft.transmission} onChange={(e) => set("transmission", e.target.value as Transmission)}>
              {TRANSMISSIONS.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="ac-fuel" className={label}>Fuel type</label>
            <select id="ac-fuel" className={field} value={draft.fuel} onChange={(e) => set("fuel", e.target.value as Fuel)}>
              {FUELS.map((f) => (
                <option key={f} value={f}>{f}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="ac-seats" className={label}>Seats</label>
            <input id="ac-seats" type="number" min={1} className={field} value={draft.seats} onChange={(e) => set("seats", Number(e.target.value))} />
          </div>
          <div>
            <label htmlFor="ac-luggage" className={label}>Luggage (bags)</label>
            <input id="ac-luggage" type="number" min={0} className={field} value={draft.luggage} onChange={(e) => set("luggage", Number(e.target.value))} />
          </div>
          <div>
            <label htmlFor="ac-hue" className={label}>Placeholder hue (0–360)</label>
            <input id="ac-hue" type="number" min={0} max={360} className={field} value={draft.hue} onChange={(e) => set("hue", Number(e.target.value))} />
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="ac-image" className={label}>Image URL (optional)</label>
            <input id="ac-image" className={field} placeholder="https://… (falls back to gradient if empty/broken)" value={draft.imageUrl ?? ""} onChange={(e) => set("imageUrl", e.target.value)} />
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="ac-desc" className={label}>Description</label>
            <textarea id="ac-desc" rows={3} className={`${field} resize-y`} value={draft.description} onChange={(e) => set("description", e.target.value)} />
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="ac-features" className={label}>Features (comma separated)</label>
            <input id="ac-features" className={field} value={featuresText} onChange={(e) => setFeaturesText(e.target.value)} placeholder="Air conditioning, Bluetooth, Reverse camera" />
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-5">
          <label className="flex items-center gap-2 text-sm font-medium text-ink">
            <input type="checkbox" className="h-4 w-4 accent-[#1f7a4d]" checked={draft.available} onChange={(e) => set("available", e.target.checked)} />
            Available
          </label>
          <label className="flex items-center gap-2 text-sm font-medium text-ink">
            <input type="checkbox" className="h-4 w-4 accent-[#a8843d]" checked={draft.featured} onChange={(e) => set("featured", e.target.checked)} />
            Featured
          </label>
          <label className="flex items-center gap-2 text-sm font-medium text-ink">
            <input type="checkbox" className="h-4 w-4 accent-[#122a45]" checked={draft.airConditioning} onChange={(e) => set("airConditioning", e.target.checked)} />
            Air conditioning
          </label>
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button type="button" onClick={onCancel} className="rounded-md border border-line px-4 py-2.5 text-sm font-semibold text-ink hover:bg-sand">
            Cancel
          </button>
          <button type="submit" className="rounded-md bg-ink px-5 py-2.5 text-sm font-semibold text-white hover:bg-ink-soft">
            Save car
          </button>
        </div>
      </form>
    </div>
  );
}
