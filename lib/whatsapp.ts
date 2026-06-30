// ============================================================
// Mobiz Car Rental — WhatsApp booking helper
// All booking requests can be confirmed on the business WhatsApp number.
// Online payment (PayPal/MCB) is optional; WhatsApp confirmation always works.
// ============================================================

import { WHATSAPP_NUMBER, WHATSAPP_DEFAULT_MESSAGE } from "./constants";

export interface BookingData {
  carName?: string;
  category?: string;
  pricePerDay?: number;
  name?: string;
  phone?: string;
  email?: string;
  pickupDate?: string;
  returnDate?: string;
  pickupLocation?: string;
  dropoffLocation?: string;
  specialRequest?: string;
  // Rental calculation + checkout context
  rentalDays?: number;
  total?: number;
  paymentMethod?: string;
}

/** Format an ISO date string (yyyy-mm-dd) as "10 July 2026". */
export function formatDate(value?: string): string {
  if (!value) return "";
  const d = new Date(value + "T00:00:00");
  if (Number.isNaN(d.getTime())) return value;
  return d.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function money(value?: number): string {
  if (typeof value !== "number" || Number.isNaN(value)) return "";
  return "Rs " + value.toLocaleString("en-US");
}

/**
 * Build a clean, readable WhatsApp message from booking data and return a
 * ready-to-open wa.me link. Only the fields that are present are included.
 */
export function createWhatsAppBookingUrl(data: BookingData): string {
  const lines: string[] = [
    "Hello Mobiz Car Rental, I would like to request a car rental booking.",
    "",
  ];

  const bookingLines: string[] = [];
  if (data.carName) bookingLines.push(`Car: ${data.carName}`);
  if (data.category) bookingLines.push(`Category: ${data.category}`);
  if (data.pricePerDay)
    bookingLines.push(`Price per day: ${money(data.pricePerDay)}`);
  if (data.pickupDate) bookingLines.push(`Pickup Date: ${formatDate(data.pickupDate)}`);
  if (data.returnDate) bookingLines.push(`Return Date: ${formatDate(data.returnDate)}`);
  if (data.rentalDays)
    bookingLines.push(`Rental Days: ${data.rentalDays}`);
  if (data.pickupLocation) bookingLines.push(`Pickup Location: ${data.pickupLocation}`);
  if (data.dropoffLocation) bookingLines.push(`Drop-off Location: ${data.dropoffLocation}`);
  if (typeof data.total === "number")
    bookingLines.push(`Estimated Total: ${money(data.total)}`);

  if (bookingLines.length) {
    lines.push("Booking Details:", ...bookingLines, "");
  }

  const customerLines: string[] = [];
  if (data.name) customerLines.push(`Name: ${data.name}`);
  if (data.phone) customerLines.push(`Phone: ${data.phone}`);
  if (data.email) customerLines.push(`Email: ${data.email}`);

  if (customerLines.length) {
    lines.push("Customer Details:", ...customerLines, "");
  }

  if (data.paymentMethod) {
    lines.push(`Preferred Payment: ${data.paymentMethod}`, "");
  }

  if (data.specialRequest && data.specialRequest.trim()) {
    lines.push("Special Request:", data.specialRequest.trim(), "");
  } else {
    lines.push("Special Request:", "Please confirm availability and final price.", "");
  }

  lines.push("Thank you.");

  const message = lines.join("\n");
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

/** Generic "start a chat" link with an optional opening message. */
export function createWhatsAppChatUrl(message?: string): string {
  const text = message ?? WHATSAPP_DEFAULT_MESSAGE;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}

/** Open a WhatsApp URL in a new tab. Client-side only. */
export function openWhatsApp(url: string): void {
  if (typeof window !== "undefined") {
    window.open(url, "_blank", "noopener,noreferrer");
  }
}
