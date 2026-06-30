// ============================================================
// Mobiz Car Rental — site-wide constants
// ============================================================

const ENV_URL = process.env.NEXT_PUBLIC_SITE_URL;

export const SITE = {
  name: "Mobiz Car Rental",
  shortName: "Mobiz",
  tagline: "Premium Car Rental — Mauritius",
  url: ENV_URL && ENV_URL.trim() !== "" ? ENV_URL : "https://mobiz-car-rental.mu",
  description:
    "Book premium car rental in Mauritius with economy cars, SUVs, 7-seaters, luxury vehicles, airport transfers, WhatsApp support and secure payment options.",
} as const;

// Raw international number, digits only — used in wa.me links.
export const WHATSAPP_NUMBER =
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.trim() || "23055068119";

// Human-readable phone for display.
export const PHONE_DISPLAY = "+230 5506 8119";

// Default opening line for the floating WhatsApp button.
export const WHATSAPP_DEFAULT_MESSAGE =
  "Hello Mobiz Car Rental, I would like more information about your car rental services.";

export const PICKUP_LOCATIONS = [
  "SSR International Airport",
  "Grand Baie",
  "Flic en Flac",
  "Port Louis",
  "Belle Mare",
  "Tamarin",
  "Le Morne",
  "Trou aux Biches",
  "Mahebourg",
  "Other (specify in WhatsApp)",
] as const;

export const BUSINESS_HOURS = [
  { day: "Monday – Friday", hours: "08:00 – 18:00" },
  { day: "Saturday", hours: "08:00 – 17:00" },
  { day: "Sunday & Public Holidays", hours: "09:00 – 13:00" },
  { day: "Airport pickups", hours: "By arrangement, any flight time" },
];

export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Cars", href: "/cars" },
  { label: "Booking", href: "/booking" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;

// ---- Manual MCB / bank transfer details (placeholders for demo) ----
export const BANK_DETAILS = {
  bankName: "Mauritius Commercial Bank (MCB)",
  accountName: "Mobiz Car Rental Ltd",
  accountNumber: "000-XXXXXXX-XXX (placeholder)",
  juiceNumber: "+230 5506 8119 (MCB Juice — placeholder)",
} as const;

// ---- Payment method identifiers ----
export type PaymentMethod = "paypal" | "mcb" | "whatsapp";

export const PAYMENT_LABELS: Record<PaymentMethod, string> = {
  paypal: "PayPal",
  mcb: "MCB Payment",
  whatsapp: "WhatsApp confirmation",
};
