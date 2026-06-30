"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { CARS, formatPrice, type Car } from "@/lib/cars";
import { PICKUP_LOCATIONS } from "@/lib/constants";
import { createWhatsAppBookingUrl, openWhatsApp } from "@/lib/whatsapp";
import { priceBreakdown, savePendingBooking, appendBooking } from "@/lib/booking";
import { WhatsAppIcon } from "./WhatsAppButton";

interface BookingFormProps {
  /** When set, the car is fixed (used on a car detail page). */
  lockedCar?: Car;
  /** Optional prefill from the homepage quick search. */
  initial?: {
    carSlug?: string;
    pickup?: string;
    return?: string;
    location?: string;
  };
}

interface Errors {
  name?: string;
  phone?: string;
  carSlug?: string;
  pickupDate?: string;
  returnDate?: string;
  pickupLocation?: string;
}

export default function BookingForm({ lockedCar, initial }: BookingFormProps) {
  const router = useRouter();
  const today = new Date().toISOString().split("T")[0];

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [carSlug, setCarSlug] = useState(lockedCar?.slug ?? initial?.carSlug ?? "");
  const [pickupDate, setPickupDate] = useState(initial?.pickup ?? "");
  const [returnDate, setReturnDate] = useState(initial?.return ?? "");
  const [pickupLocation, setPickupLocation] = useState(initial?.location ?? "");
  const [dropoffLocation, setDropoffLocation] = useState("");
  const [specialRequest, setSpecialRequest] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);

  const selectedCar = useMemo(
    () => lockedCar ?? CARS.find((c) => c.slug === carSlug),
    [lockedCar, carSlug]
  );

  const breakdown = useMemo(
    () =>
      selectedCar
        ? priceBreakdown(selectedCar.pricePerDay, pickupDate, returnDate)
        : null,
    [selectedCar, pickupDate, returnDate]
  );

  function validate(): Errors {
    const e: Errors = {};
    if (!name.trim()) e.name = "Please enter your name.";
    if (!phone.trim()) e.phone = "Please enter a contact number.";
    if (!lockedCar && !carSlug) e.carSlug = "Please choose a car.";
    if (!pickupDate) e.pickupDate = "Select a pickup date.";
    if (!returnDate) e.returnDate = "Select a return date.";
    else if (pickupDate && returnDate <= pickupDate)
      e.returnDate = "Return date must be after pickup.";
    if (!pickupLocation) e.pickupLocation = "Choose a pickup location.";
    return e;
  }

  function focusFirstError(e: Errors) {
    const firstId = Object.keys(e)[0];
    if (firstId) document.getElementById(`bf-${firstId}`)?.focus();
  }

  function buildWhatsAppUrl() {
    return createWhatsAppBookingUrl({
      carName: selectedCar?.name,
      category: selectedCar?.category,
      pricePerDay: selectedCar?.pricePerDay,
      name,
      phone,
      email,
      pickupDate,
      returnDate,
      rentalDays: breakdown?.days,
      total: breakdown?.total,
      pickupLocation,
      dropoffLocation: dropoffLocation || pickupLocation,
      specialRequest,
    });
  }

  // Primary action — go to the payment page with the booking saved.
  function handleContinue(ev: React.FormEvent) {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length > 0) return focusFirstError(e);
    if (!selectedCar || !breakdown) return;

    const pending = {
      carSlug: selectedCar.slug,
      carName: selectedCar.name,
      category: selectedCar.category,
      pricePerDay: selectedCar.pricePerDay,
      name,
      phone,
      email,
      pickupDate,
      returnDate,
      pickupLocation,
      dropoffLocation: dropoffLocation || pickupLocation,
      specialRequest,
      rentalDays: breakdown.days,
      total: breakdown.total,
    };
    savePendingBooking(pending);
    appendBooking(pending, "payment");
    router.push("/payment");
  }

  // Secondary action — confirm straight on WhatsApp.
  function handleWhatsApp() {
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length > 0) return focusFirstError(e);
    if (selectedCar && breakdown) {
      appendBooking(
        {
          carSlug: selectedCar.slug,
          carName: selectedCar.name,
          category: selectedCar.category,
          pricePerDay: selectedCar.pricePerDay,
          name,
          phone,
          email,
          pickupDate,
          returnDate,
          pickupLocation,
          dropoffLocation: dropoffLocation || pickupLocation,
          specialRequest,
          rentalDays: breakdown.days,
          total: breakdown.total,
        },
        "whatsapp"
      );
    }
    openWhatsApp(buildWhatsAppUrl());
    setSent(true);
  }

  const field =
    "w-full rounded-md border bg-white px-3.5 py-2.5 text-sm text-ink shadow-sm focus:outline-none focus:border-gold-deep";
  const ok = "border-line";
  const bad = "border-danger";
  const label = "mb-1.5 block text-sm font-medium text-ink";
  const errText = "mt-1 text-xs text-danger";

  return (
    <form onSubmit={handleContinue} noValidate className="space-y-5">
      {sent && (
        <div className="rounded-md border border-success/30 bg-success/10 px-4 py-3 text-sm text-success">
          WhatsApp should now be opening with your booking request pre-filled. If
          it did not open,{" "}
          <button
            type="button"
            onClick={() => openWhatsApp(buildWhatsAppUrl())}
            className="font-semibold underline"
          >
            tap here to open WhatsApp
          </button>
          .
        </div>
      )}

      {/* Car */}
      <div>
        <label htmlFor="bf-carSlug" className={label}>
          Selected car
        </label>
        {lockedCar ? (
          <div className="flex items-center justify-between rounded-md border border-line bg-sand px-3.5 py-2.5 text-sm">
            <span className="font-semibold text-ink">{lockedCar.name}</span>
            <span className="text-ink/60">{lockedCar.category}</span>
          </div>
        ) : (
          <>
            <select
              id="bf-carSlug"
              value={carSlug}
              onChange={(e) => setCarSlug(e.target.value)}
              className={`${field} ${errors.carSlug ? bad : ok}`}
            >
              <option value="">Choose a car…</option>
              {CARS.map((c) => (
                <option key={c.id} value={c.slug}>
                  {c.name} — {c.category} (Rs {c.pricePerDay.toLocaleString("en-US")}/day)
                </option>
              ))}
            </select>
            {errors.carSlug && <p className={errText}>{errors.carSlug}</p>}
          </>
        )}
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="bf-name" className={label}>
            Full name <span className="text-danger">*</span>
          </label>
          <input
            id="bf-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="John Doe"
            className={`${field} ${errors.name ? bad : ok}`}
            autoComplete="name"
          />
          {errors.name && <p className={errText}>{errors.name}</p>}
        </div>
        <div>
          <label htmlFor="bf-phone" className={label}>
            Phone / WhatsApp <span className="text-danger">*</span>
          </label>
          <input
            id="bf-phone"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+230 5XXX XXXX"
            className={`${field} ${errors.phone ? bad : ok}`}
            autoComplete="tel"
          />
          {errors.phone && <p className={errText}>{errors.phone}</p>}
        </div>
      </div>

      <div>
        <label htmlFor="bf-email" className={label}>
          Email <span className="text-ink/40">(optional)</span>
        </label>
        <input
          id="bf-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="john@example.com"
          className={`${field} ${ok}`}
          autoComplete="email"
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="bf-pickupDate" className={label}>
            Pickup date <span className="text-danger">*</span>
          </label>
          <input
            id="bf-pickupDate"
            type="date"
            min={today}
            value={pickupDate}
            onChange={(e) => setPickupDate(e.target.value)}
            className={`${field} ${errors.pickupDate ? bad : ok}`}
          />
          {errors.pickupDate && <p className={errText}>{errors.pickupDate}</p>}
        </div>
        <div>
          <label htmlFor="bf-returnDate" className={label}>
            Return date <span className="text-danger">*</span>
          </label>
          <input
            id="bf-returnDate"
            type="date"
            min={pickupDate || today}
            value={returnDate}
            onChange={(e) => setReturnDate(e.target.value)}
            className={`${field} ${errors.returnDate ? bad : ok}`}
          />
          {errors.returnDate && <p className={errText}>{errors.returnDate}</p>}
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="bf-pickupLocation" className={label}>
            Pickup location <span className="text-danger">*</span>
          </label>
          <select
            id="bf-pickupLocation"
            value={pickupLocation}
            onChange={(e) => setPickupLocation(e.target.value)}
            className={`${field} ${errors.pickupLocation ? bad : ok}`}
          >
            <option value="">Choose a location…</option>
            {PICKUP_LOCATIONS.map((l) => (
              <option key={l} value={l}>
                {l}
              </option>
            ))}
          </select>
          {errors.pickupLocation && <p className={errText}>{errors.pickupLocation}</p>}
        </div>
        <div>
          <label htmlFor="bf-dropoffLocation" className={label}>
            Drop-off location <span className="text-ink/40">(optional)</span>
          </label>
          <select
            id="bf-dropoffLocation"
            value={dropoffLocation}
            onChange={(e) => setDropoffLocation(e.target.value)}
            className={`${field} ${ok}`}
          >
            <option value="">Same as pickup</option>
            {PICKUP_LOCATIONS.map((l) => (
              <option key={l} value={l}>
                {l}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="bf-special" className={label}>
          Special request <span className="text-ink/40">(optional)</span>
        </label>
        <textarea
          id="bf-special"
          value={specialRequest}
          onChange={(e) => setSpecialRequest(e.target.value)}
          rows={3}
          placeholder="Child seat, GPS, specific colour, flight number…"
          className={`${field} ${ok} resize-y`}
        />
      </div>

      {/* Live rental calculation */}
      {selectedCar && (
        <div className="rounded-xl border border-gold/40 bg-gold-soft/30 p-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-gold-deep">
            Rental calculation
          </p>
          <dl className="mt-3 space-y-1.5 text-sm">
            <div className="flex justify-between">
              <dt className="text-ink/60">Price per day</dt>
              <dd className="font-medium text-ink">
                {formatPrice(selectedCar.pricePerDay)}
              </dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-ink/60">Rental days</dt>
              <dd className="font-medium text-ink">
                {breakdown && breakdown.days > 0 ? breakdown.days : "—"}
              </dd>
            </div>
            <div className="mt-1 flex justify-between border-t border-gold/30 pt-2">
              <dt className="font-semibold text-ink">Estimated total</dt>
              <dd className="font-display text-lg font-bold text-ink">
                {breakdown && breakdown.days > 0
                  ? formatPrice(breakdown.total)
                  : "—"}
              </dd>
            </div>
          </dl>
          <p className="mt-2 text-[0.7rem] text-ink/50">
            Final price is confirmed before payment. Minimum rental is 1 day.
          </p>
        </div>
      )}

      <div className="space-y-3">
        <button
          type="submit"
          className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-ink px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-navy"
        >
          Continue to Payment
          <span aria-hidden="true">→</span>
        </button>
        <button
          type="button"
          onClick={handleWhatsApp}
          className="inline-flex w-full items-center justify-center gap-2 rounded-md border border-[#25D366] bg-white px-6 py-3 text-sm font-semibold text-[#1da851] transition-colors hover:bg-[#25D366]/10"
        >
          <WhatsAppIcon />
          Or confirm directly on WhatsApp
        </button>
      </div>
      <p className="text-center text-xs text-ink/50">
        Secure checkout. You can pay with PayPal or MCB, or simply confirm your
        booking on WhatsApp — no payment is taken until we confirm availability.
      </p>
    </form>
  );
}
