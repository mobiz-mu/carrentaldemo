// ============================================================
// Mobiz Car Rental — admin demo storage (localStorage)
// The seed fleet ships with the site. The admin dashboard can
// override it locally for demo purposes only (no backend).
// ============================================================

import { CARS, type Car } from "./cars";

const STORAGE_KEY = "mobiz-fleet-v1";

/** Read the fleet from localStorage, falling back to the seed data. */
export function loadFleet(): Car[] {
  if (typeof window === "undefined") return CARS;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return CARS;
    const parsed = JSON.parse(raw) as Car[];
    if (!Array.isArray(parsed) || parsed.length === 0) return CARS;
    return parsed;
  } catch {
    return CARS;
  }
}

/** Persist the fleet to localStorage. */
export function saveFleet(fleet: Car[]): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(fleet));
  } catch {
    /* storage may be unavailable (private mode) — fail silently in demo */
  }
}

/** Reset the local fleet back to the shipped seed data. */
export function resetFleet(): Car[] {
  if (typeof window !== "undefined") {
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      /* ignore */
    }
  }
  return CARS;
}

/** Turn a car name into a URL-safe slug. */
export function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/** A blank car used to seed the "add new" form. */
export function emptyCar(): Car {
  return {
    id: "",
    name: "",
    slug: "",
    category: "Economy",
    pricePerDay: 1500,
    transmission: "Automatic",
    fuel: "Petrol",
    seats: 5,
    luggage: 2,
    airConditioning: true,
    description: "",
    features: [],
    imageUrl: "",
    available: true,
    featured: false,
    hue: Math.floor(Math.random() * 360),
  };
}
