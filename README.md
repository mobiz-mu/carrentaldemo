# Mobiz Car Rental — Premium Car Rental Website (Mauritius)

A premium, mobile-first car rental website for Mauritius built with **Next.js 16 (App Router)**, **React 19**, **TypeScript** and **Tailwind CSS v4**. It includes automatic rental-day pricing, a payment page (PayPal + MCB structure, no real keys), a protected admin dashboard with login, a floating WhatsApp chat button, and stock-image placeholders.

## Run locally

```bash
npm install
cp .env.example .env.local   # optional — the app also runs on built-in demo defaults
npm run dev                  # http://localhost:3000  (recommended for local testing)

npm run build                # production build
npm run start                # serve the production build (use HTTPS for the admin cookie)

npx tsc --noEmit             # type-check
npm run lint                 # eslint
```

> The admin session cookie is marked `Secure` in production, so for local testing
> use `npm run dev` (HTTP) or deploy behind HTTPS.

## Pages
- `/` — premium homepage (hero, search, featured cars, categories, why-us, how-it-works, airport transfer, testimonials, FAQ preview, WhatsApp CTA)
- `/cars` — fleet listing with filters (category, transmission, fuel, seats, price, availability) + sorting
- `/cars/[slug]` — car details: gallery, specs, features, included services, **rental calculation booking box**, similar cars, terms
- `/booking` — full booking form with live rental-day + total calculation and **Continue to Payment**
- `/payment` — secure checkout: booking summary + **PayPal / MCB / WhatsApp** options
- `/admin/login` — admin login page
- `/admin` — protected admin dashboard (fleet CRUD + booking requests + stats + logout)
- `/about`, `/contact`, `/terms`, `/privacy`
- `/api/admin/login`, `/api/admin/logout` — auth API routes
- `sitemap.xml`, `robots.txt`

## Admin login (temporary demo)
- **Email:** `test.mobiz.mu@gmail.com`
- **Password:** `MobizTest1`

Credentials are read from `ADMIN_EMAIL` / `ADMIN_PASSWORD` (server-side env, with these demo defaults) and compared **on the server** using a timing-safe comparison — the password is never shipped to the browser. A signed-out visitor to `/admin` is redirected to `/admin/login` by `middleware.ts`. Replace with a database + hashed passwords for production.

## Rental-day calculation
`rentalDays = max(1, calendarDays(returnDate − pickupDate))`, return must be after pickup. `total = rentalDays × pricePerDay`. Implemented in `lib/booking.ts` and shown live in the booking form and on the payment page.

Example: Toyota Aqua at Rs 1,200/day, 10 → 15 July = 5 days = **Rs 6,000**.

## Payment
- **PayPal** — uses `NEXT_PUBLIC_PAYPAL_CLIENT_ID`. If empty, the page shows: *"PayPal payment is currently in setup mode. Please contact us on WhatsApp to confirm your booking."*
- **MCB** — uses server-only `MCB_MERCHANT_ID` / `MCB_API_KEY` / `MCB_API_SECRET` (never exposed to the client). Shows *"MCB payment gateway setup ready."* plus manual bank-transfer / MCB Juice placeholders.
- **WhatsApp** — always available; sends the full booking summary to `+230 5506 8119`.

No real API keys are included and the site works without them.

## WhatsApp
All booking/contact actions build `https://wa.me/23055068119?text=...` via `lib/whatsapp.ts`. The floating WhatsApp button appears on every public page.

## Environment variables
See `.env.example`. All are optional — the app falls back to safe demo defaults.
