"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { formatPrice } from "@/lib/cars";
import { formatDate, createWhatsAppBookingUrl, openWhatsApp } from "@/lib/whatsapp";
import {
  loadPendingBooking,
  type PendingBooking,
} from "@/lib/booking";
import {
  BANK_DETAILS,
  PHONE_DISPLAY,
  PAYMENT_LABELS,
  type PaymentMethod,
} from "@/lib/constants";

// PayPal client id is public by design; empty string => setup mode.
const PAYPAL_READY =
  (process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID ?? "").trim() !== "";

function LockIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M6 11h12a1 1 0 011 1v7a1 1 0 01-1 1H6a1 1 0 01-1-1v-7a1 1 0 011-1z" />
    </svg>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4 text-sm">
      <dt className="text-ink/55">{label}</dt>
      <dd className="text-right font-medium text-ink">{value}</dd>
    </div>
  );
}

export default function PaymentClient() {
  const [booking, setBooking] = useState<PendingBooking | null>(null);
  const [ready, setReady] = useState(false);
  const [method, setMethod] = useState<PaymentMethod>("paypal");

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- client-only read of the pending booking after mount
    setBooking(loadPendingBooking());
    setReady(true);
  }, []);

  function whatsappUrl() {
    if (!booking) return "";
    return createWhatsAppBookingUrl({
      carName: booking.carName,
      category: booking.category,
      pricePerDay: booking.pricePerDay,
      name: booking.name,
      phone: booking.phone,
      email: booking.email,
      pickupDate: booking.pickupDate,
      returnDate: booking.returnDate,
      rentalDays: booking.rentalDays,
      total: booking.total,
      pickupLocation: booking.pickupLocation,
      dropoffLocation: booking.dropoffLocation,
      specialRequest: booking.specialRequest,
      paymentMethod: PAYMENT_LABELS[method],
    });
  }

  // Loading / empty states
  if (!ready) {
    return (
      <div className="py-20 text-center text-sm text-ink/50">Loading checkout…</div>
    );
  }

  if (!booking) {
    return (
      <div className="mx-auto max-w-xl rounded-2xl border border-line bg-white p-8 text-center shadow-sm">
        <h2 className="font-display text-2xl font-bold text-ink">
          No booking to pay for yet
        </h2>
        <p className="mt-3 text-sm text-ink/65">
          Start a booking and choose your dates first — we&apos;ll bring you here
          with your total ready to pay.
        </p>
        <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            href="/cars"
            className="inline-flex items-center justify-center rounded-md bg-gold px-6 py-3 text-sm font-semibold text-ink transition-colors hover:bg-gold-deep"
          >
            Browse Cars
          </Link>
          <Link
            href="/booking"
            className="inline-flex items-center justify-center rounded-md border border-ink/15 bg-white px-6 py-3 text-sm font-semibold text-ink transition-colors hover:border-gold-deep hover:text-gold-deep"
          >
            Start a Booking
          </Link>
        </div>
      </div>
    );
  }

  const methods: { id: PaymentMethod; title: string; note: string }[] = [
    { id: "paypal", title: "PayPal", note: "Pay securely with your PayPal account or card" },
    { id: "mcb", title: "MCB Payment", note: "MCB gateway, bank transfer or MCB Juice" },
    { id: "whatsapp", title: "WhatsApp", note: "Confirm your booking and arrange payment with us" },
  ];

  return (
    <div className="grid gap-8 lg:grid-cols-5">
      {/* Left: methods + active panel */}
      <div className="lg:col-span-3">
        <div className="flex items-center gap-2 rounded-lg border border-success/30 bg-success/5 px-4 py-2.5 text-sm font-medium text-success">
          <LockIcon />
          Secure checkout — your details are only used to process this booking.
        </div>

        <h2 className="mt-6 font-display text-xl font-bold text-ink">
          Choose a payment method
        </h2>
        <div className="mt-4 space-y-3">
          {methods.map((m) => (
            <label
              key={m.id}
              className={`flex cursor-pointer items-start gap-3 rounded-xl border p-4 transition-colors ${
                method === m.id
                  ? "border-gold bg-gold-soft/30"
                  : "border-line bg-white hover:border-gold/50"
              }`}
            >
              <input
                type="radio"
                name="payment-method"
                value={m.id}
                checked={method === m.id}
                onChange={() => setMethod(m.id)}
                className="mt-1 h-4 w-4 accent-[#c6a15b]"
              />
              <span>
                <span className="block font-semibold text-ink">{m.title}</span>
                <span className="block text-sm text-ink/60">{m.note}</span>
              </span>
            </label>
          ))}
        </div>

        {/* Active panel */}
        <div className="mt-6 rounded-2xl border border-line bg-white p-6 shadow-sm">
          {method === "paypal" && (
            <div>
              <h3 className="font-display text-lg font-bold text-ink">PayPal</h3>
              {PAYPAL_READY ? (
                <>
                  <p className="mt-2 text-sm text-ink/65">
                    You&apos;ll be redirected to PayPal to complete your payment
                    of{" "}
                    <span className="font-semibold text-ink">
                      {formatPrice(booking.total)}
                    </span>
                    .
                  </p>
                  <button
                    type="button"
                    className="mt-4 inline-flex w-full items-center justify-center rounded-md bg-[#003087] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#00256b]"
                  >
                    Pay with PayPal
                  </button>
                </>
              ) : (
                <div className="mt-2 rounded-lg border border-gold/30 bg-gold-soft/20 p-4 text-sm text-ink/75">
                  PayPal payment is currently in setup mode. Please contact us on
                  WhatsApp to confirm your booking.
                </div>
              )}
            </div>
          )}

          {method === "mcb" && (
            <div>
              <h3 className="font-display text-lg font-bold text-ink">MCB Payment</h3>
              <div className="mt-2 rounded-lg border border-navy/20 bg-navy/5 p-3 text-sm font-medium text-navy">
                MCB payment gateway setup ready. Online card processing will be
                enabled once the merchant keys are added.
              </div>

              <div className="mt-4">
                <p className="text-sm font-semibold text-ink">
                  Manual MCB bank transfer / Juice
                </p>
                <dl className="mt-2 space-y-1.5 text-sm">
                  <SummaryRow label="Bank" value={BANK_DETAILS.bankName} />
                  <SummaryRow label="Account name" value={BANK_DETAILS.accountName} />
                  <SummaryRow label="Account number" value={BANK_DETAILS.accountNumber} />
                  <SummaryRow label="MCB Juice" value={BANK_DETAILS.juiceNumber} />
                  <SummaryRow label="Amount" value={formatPrice(booking.total)} />
                </dl>
                <p className="mt-3 text-xs text-ink/50">
                  After transfer, send your payment proof on WhatsApp. Proof upload
                  inside the site will be added later.
                </p>
              </div>

              <button
                type="button"
                disabled
                className="mt-4 inline-flex w-full cursor-not-allowed items-center justify-center rounded-md bg-line px-6 py-3 text-sm font-semibold text-ink/40"
              >
                Pay with MCB (setup mode)
              </button>
            </div>
          )}

          {method === "whatsapp" && (
            <div>
              <h3 className="font-display text-lg font-bold text-ink">
                Confirm on WhatsApp
              </h3>
              <p className="mt-2 text-sm text-ink/65">
                Send your full booking summary to us on WhatsApp ({PHONE_DISPLAY}).
                We confirm availability and the final price, then arrange payment
                with you directly.
              </p>
            </div>
          )}

          {/* Universal WhatsApp confirm */}
          <button
            type="button"
            onClick={() => openWhatsApp(whatsappUrl())}
            className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-md bg-[#25D366] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#1da851]"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M.057 24l1.687-6.163a11.867 11.867 0 01-1.587-5.945C.16 5.335 5.495 0 12.05 0a11.82 11.82 0 018.413 3.488 11.82 11.82 0 013.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 01-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.86 9.86 0 001.51 5.26l-.999 3.648 3.488-.917zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.096 3.2 5.077 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.247-.694.247-1.289.173-1.413z" />
            </svg>
            Confirm on WhatsApp
          </button>
        </div>
      </div>

      {/* Right: order summary */}
      <aside className="lg:col-span-2">
        <div className="lg:sticky lg:top-24">
          <div className="rounded-2xl border border-line bg-white p-6 shadow-sm">
            <h2 className="font-display text-lg font-bold text-ink">
              Booking summary
            </h2>
            <div className="rule-gold mt-3" />

            <div className="mt-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-gold-deep">
                {booking.category}
              </p>
              <p className="font-display text-xl font-bold text-ink">
                {booking.carName}
              </p>
            </div>

            <dl className="mt-4 space-y-2 border-t border-line pt-4">
              <SummaryRow label="Name" value={booking.name} />
              <SummaryRow label="Phone" value={booking.phone} />
              {booking.email && <SummaryRow label="Email" value={booking.email} />}
              <SummaryRow label="Pickup" value={formatDate(booking.pickupDate)} />
              <SummaryRow label="Return" value={formatDate(booking.returnDate)} />
              <SummaryRow label="Pickup location" value={booking.pickupLocation} />
              <SummaryRow label="Drop-off" value={booking.dropoffLocation} />
            </dl>

            <dl className="mt-4 space-y-2 border-t border-line pt-4">
              <SummaryRow label="Price per day" value={formatPrice(booking.pricePerDay)} />
              <SummaryRow
                label="Rental days"
                value={`${booking.rentalDays} ${booking.rentalDays === 1 ? "day" : "days"}`}
              />
              <SummaryRow
                label="Subtotal"
                value={formatPrice(booking.pricePerDay * booking.rentalDays)}
              />
            </dl>

            <div className="mt-4 flex items-center justify-between border-t border-line pt-4">
              <span className="font-semibold text-ink">Total</span>
              <span className="plate px-3 py-1.5 text-base">
                {formatPrice(booking.total)}
              </span>
            </div>

            {booking.specialRequest && (
              <p className="mt-4 rounded-lg bg-sand/60 p-3 text-xs text-ink/60">
                <span className="font-semibold text-ink/80">Special request:</span>{" "}
                {booking.specialRequest}
              </p>
            )}

            <Link
              href="/booking"
              className="mt-4 block text-center text-xs font-semibold text-gold-deep hover:underline"
            >
              ← Edit booking details
            </Link>
          </div>

          <p className="mt-4 flex items-center justify-center gap-1.5 text-xs text-ink/45">
            <LockIcon />
            Demo checkout — no live payment is processed.
          </p>
        </div>
      </aside>
    </div>
  );
}
