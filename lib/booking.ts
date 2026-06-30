// ============================================================
// Mobiz Car Rental — rental-day calculation + pending booking
// ============================================================

import type { PaymentMethod } from "./constants";

const MS_PER_DAY = 1000 * 60 * 60 * 24;

/**
 * Calendar-day difference between two ISO dates (yyyy-mm-dd).
 * Rules: return must be after pickup; minimum rental is 1 day.
 * Example: 10 July → 15 July = 5 days.
 */
export function rentalDays(pickup?: string, returnDate?: string): number {
  if (!pickup || !returnDate) return 0;
  const a = new Date(pickup + "T00:00:00");
  const b = new Date(returnDate + "T00:00:00");
  if (Number.isNaN(a.getTime()) || Number.isNaN(b.getTime())) return 0;
  const diff = Math.round((b.getTime() - a.getTime()) / MS_PER_DAY);
  if (diff <= 0) return 0; // invalid (return not after pickup)
  return Math.max(1, diff);
}

export interface PriceBreakdown {
  days: number;
  pricePerDay: number;
  subtotal: number;
  extras: number;
  total: number;
}

/** Compute the price breakdown. `extras` is reserved for future add-ons. */
export function priceBreakdown(
  pricePerDay: number,
  pickup?: string,
  returnDate?: string,
  extras = 0
): PriceBreakdown {
  const days = rentalDays(pickup, returnDate);
  const subtotal = days * pricePerDay;
  return {
    days,
    pricePerDay,
    subtotal,
    extras,
    total: subtotal + extras,
  };
}

// ------------------------------------------------------------
// Pending booking — handed from the booking form to the payment page.
// Stored in sessionStorage so no personal data ever goes in the URL.
// ------------------------------------------------------------
export interface PendingBooking {
  carSlug: string;
  carName: string;
  category: string;
  pricePerDay: number;
  name: string;
  phone: string;
  email: string;
  pickupDate: string;
  returnDate: string;
  pickupLocation: string;
  dropoffLocation: string;
  specialRequest: string;
  rentalDays: number;
  total: number;
  paymentMethod?: PaymentMethod;
}

const PENDING_KEY = "mobiz-pending-booking";

export function savePendingBooking(booking: PendingBooking): void {
  if (typeof window === "undefined") return;
  try {
    window.sessionStorage.setItem(PENDING_KEY, JSON.stringify(booking));
  } catch {
    /* storage unavailable — ignore */
  }
}

export function loadPendingBooking(): PendingBooking | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.sessionStorage.getItem(PENDING_KEY);
    return raw ? (JSON.parse(raw) as PendingBooking) : null;
  } catch {
    return null;
  }
}

export function clearPendingBooking(): void {
  if (typeof window === "undefined") return;
  try {
    window.sessionStorage.removeItem(PENDING_KEY);
  } catch {
    /* ignore */
  }
}

// ------------------------------------------------------------
// Booking request log — lightweight demo record of submitted bookings.
// Stored in localStorage so the admin dashboard can show "demo bookings".
// Replace with a database write in production.
// ------------------------------------------------------------
export interface BookingLogEntry extends PendingBooking {
  id: string;
  createdAt: string; // ISO timestamp
  channel: "payment" | "whatsapp";
}

const BOOKINGS_KEY = "mobiz-bookings-v1";

export function appendBooking(
  booking: PendingBooking,
  channel: BookingLogEntry["channel"]
): void {
  if (typeof window === "undefined") return;
  try {
    const entry: BookingLogEntry = {
      ...booking,
      id:
        typeof crypto !== "undefined" && "randomUUID" in crypto
          ? crypto.randomUUID()
          : `bk_${Date.now()}`,
      createdAt: new Date().toISOString(),
      channel,
    };
    const existing = loadBookings();
    window.localStorage.setItem(
      BOOKINGS_KEY,
      JSON.stringify([entry, ...existing].slice(0, 100))
    );
  } catch {
    /* ignore */
  }
}

export function loadBookings(): BookingLogEntry[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(BOOKINGS_KEY);
    return raw ? (JSON.parse(raw) as BookingLogEntry[]) : [];
  } catch {
    return [];
  }
}

export function clearBookings(): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(BOOKINGS_KEY);
  } catch {
    /* ignore */
  }
}
