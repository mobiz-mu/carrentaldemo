"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { type Car, formatPrice } from "@/lib/cars";
import { loadFleet, saveFleet, resetFleet, emptyCar } from "@/lib/storage";
import {
  loadBookings,
  clearBookings,
  type BookingLogEntry,
} from "@/lib/booking";
import { formatDate } from "@/lib/whatsapp";
import { PAYMENT_LABELS } from "@/lib/constants";
import AdminCarTable from "./AdminCarTable";
import AdminCarForm from "./AdminCarForm";

export default function AdminDashboard() {
  const router = useRouter();
  const [fleet, setFleet] = useState<Car[]>([]);
  const [bookings, setBookings] = useState<BookingLogEntry[]>([]);
  const [editing, setEditing] = useState<Car | null>(null);
  const [ready, setReady] = useState(false);
  const [toast, setToast] = useState("");
  const [loggingOut, setLoggingOut] = useState(false);

  // Hydrate from localStorage on mount (client-only to avoid hydration mismatch).
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- client-only hydration from localStorage after mount
    setFleet(loadFleet());
    setBookings(loadBookings());
    setReady(true);
  }, []);

  function persist(next: Car[]) {
    setFleet(next);
    saveFleet(next);
  }

  function flash(message: string) {
    setToast(message);
    window.setTimeout(() => setToast(""), 2500);
  }

  function handleSave(car: Car) {
    const exists = fleet.some((c) => c.id === car.id);
    const next = exists
      ? fleet.map((c) => (c.id === car.id ? car : c))
      : [car, ...fleet];
    persist(next);
    setEditing(null);
    flash(exists ? "Car updated" : "Car added");
  }

  function handleDelete(car: Car) {
    if (!window.confirm(`Delete ${car.name}? This only affects the local demo data.`)) return;
    persist(fleet.filter((c) => c.id !== car.id));
    flash("Car deleted");
  }

  function toggle(car: Car, key: "available" | "featured") {
    persist(fleet.map((c) => (c.id === car.id ? { ...c, [key]: !c[key] } : c)));
  }

  function handleReset() {
    if (!window.confirm("Reset the demo fleet back to the original cars?")) return;
    const seed = resetFleet();
    setFleet(seed);
    flash("Fleet reset to defaults");
  }

  function handleClearBookings() {
    if (!window.confirm("Clear all demo booking requests?")) return;
    clearBookings();
    setBookings([]);
    flash("Booking requests cleared");
  }

  async function handleLogout() {
    setLoggingOut(true);
    try {
      await fetch("/api/admin/logout", { method: "POST" });
    } catch {
      /* ignore */
    }
    router.replace("/admin/login");
    router.refresh();
  }

  const categoriesUsed = new Set(fleet.map((c) => c.category)).size;
  const stats = [
    { k: fleet.length, v: "Total cars" },
    { k: fleet.filter((c) => c.available).length, v: "Available" },
    { k: fleet.filter((c) => c.featured).length, v: "Featured" },
    { k: categoriesUsed, v: "Categories" },
    { k: bookings.length, v: "Demo bookings" },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-12">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="eyebrow">Admin dashboard</p>
          <h1 className="mt-2 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            Fleet management
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-ink/65">
            Add, edit, delete and toggle cars, and review incoming booking
            requests. Data is stored in this browser (localStorage) and is
            structured so it can be moved to a database later.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={handleReset}
            className="rounded-md border border-line px-4 py-2.5 text-sm font-semibold text-ink hover:bg-sand"
          >
            Reset demo
          </button>
          <button
            type="button"
            onClick={() => setEditing(emptyCar())}
            className="rounded-md bg-gold-deep px-5 py-2.5 text-sm font-semibold text-white hover:bg-gold"
          >
            + Add car
          </button>
          <button
            type="button"
            onClick={handleLogout}
            disabled={loggingOut}
            className="rounded-md bg-ink px-4 py-2.5 text-sm font-semibold text-white hover:bg-navy disabled:opacity-60"
          >
            {loggingOut ? "Logging out…" : "Log out"}
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {stats.map((s) => (
          <div key={s.v} className="rounded-xl border border-line bg-white px-4 py-5 text-center shadow-sm">
            <p className="font-display text-2xl font-bold text-ink">{ready ? s.k : "—"}</p>
            <p className="mt-1 text-xs uppercase tracking-wider text-ink/55">{s.v}</p>
          </div>
        ))}
      </div>

      {/* Fleet table */}
      <div className="mt-10">
        <h2 className="font-display text-xl font-bold text-ink">Fleet</h2>
        <div className="mt-4">
          {ready ? (
            <AdminCarTable
              cars={fleet}
              onEdit={(c) => setEditing(c)}
              onDelete={handleDelete}
              onToggleAvailable={(c) => toggle(c, "available")}
              onToggleFeatured={(c) => toggle(c, "featured")}
            />
          ) : (
            <div className="rounded-xl border border-line bg-white px-6 py-16 text-center text-sm text-ink/50">
              Loading demo fleet…
            </div>
          )}
        </div>
      </div>

      {/* Booking requests */}
      <div className="mt-12">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-xl font-bold text-ink">
            Booking requests
          </h2>
          {bookings.length > 0 && (
            <button
              type="button"
              onClick={handleClearBookings}
              className="text-xs font-semibold text-danger hover:underline"
            >
              Clear all
            </button>
          )}
        </div>

        {!ready ? (
          <div className="mt-4 rounded-xl border border-line bg-white px-6 py-12 text-center text-sm text-ink/50">
            Loading…
          </div>
        ) : bookings.length === 0 ? (
          <div className="mt-4 rounded-xl border border-dashed border-line bg-white px-6 py-12 text-center text-sm text-ink/50">
            No booking requests yet. Submitted bookings from the booking form will
            appear here (demo data, stored in this browser).
          </div>
        ) : (
          <div className="mt-4 overflow-x-auto rounded-xl border border-line bg-white shadow-sm">
            <table className="min-w-full divide-y divide-line text-sm">
              <thead className="bg-sand/60 text-left text-xs uppercase tracking-wider text-ink/55">
                <tr>
                  <th className="px-4 py-3 font-semibold">Customer</th>
                  <th className="px-4 py-3 font-semibold">Car</th>
                  <th className="px-4 py-3 font-semibold">Dates</th>
                  <th className="px-4 py-3 font-semibold">Days</th>
                  <th className="px-4 py-3 font-semibold">Total</th>
                  <th className="px-4 py-3 font-semibold">Via</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {bookings.map((b) => (
                  <tr key={b.id} className="align-top">
                    <td className="px-4 py-3">
                      <p className="font-semibold text-ink">{b.name}</p>
                      <p className="text-xs text-ink/55">{b.phone}</p>
                      {b.email && <p className="text-xs text-ink/45">{b.email}</p>}
                    </td>
                    <td className="px-4 py-3">
                      <p className="font-medium text-ink">{b.carName}</p>
                      <p className="text-xs text-ink/55">{b.category}</p>
                    </td>
                    <td className="px-4 py-3 text-xs text-ink/70">
                      <p>{formatDate(b.pickupDate)}</p>
                      <p className="text-ink/45">→ {formatDate(b.returnDate)}</p>
                      <p className="mt-1 text-ink/45">{b.pickupLocation}</p>
                    </td>
                    <td className="px-4 py-3 text-ink/80">{b.rentalDays}</td>
                    <td className="px-4 py-3 font-semibold text-ink">
                      {formatPrice(b.total)}
                    </td>
                    <td className="px-4 py-3">
                      <span className="rounded-full bg-sand px-2.5 py-1 text-xs font-medium text-ink/70">
                        {b.channel === "whatsapp" ? PAYMENT_LABELS.whatsapp : "Checkout"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <p className="mt-8 text-xs text-ink/50">
        Note: this dashboard is a demonstration. Authentication uses temporary demo
        credentials and all data lives in your browser. For production, move
        credentials and data to a secure backend/database.
      </p>

      {editing && (
        <AdminCarForm
          car={editing}
          existingSlugs={fleet.map((c) => c.slug)}
          onSave={handleSave}
          onCancel={() => setEditing(null)}
        />
      )}

      {toast && (
        <div className="fixed bottom-6 left-1/2 z-[70] -translate-x-1/2 rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-white shadow-lg">
          {toast}
        </div>
      )}
    </div>
  );
}
