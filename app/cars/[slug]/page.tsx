import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  CARS,
  getCarBySlug,
  similarCars,
  includedServices,
  formatPrice,
  CATEGORY_BLURB,
} from "@/lib/cars";
import { createWhatsAppBookingUrl } from "@/lib/whatsapp";
import CarImage from "@/components/CarImage";
import CarCard from "@/components/CarCard";
import BookingForm from "@/components/BookingForm";
import WhatsAppButton from "@/components/WhatsAppButton";
import SectionHeading from "@/components/SectionHeading";
import { SITE } from "@/lib/constants";

export function generateStaticParams() {
  return CARS.map((car) => ({ slug: car.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const car = getCarBySlug(slug);
  if (!car) {
    return { title: "Car Not Found" };
  }
  const title = `${car.name} — ${car.category} Car Rental Mauritius`;
  const description = `Rent the ${car.name} in Mauritius from ${formatPrice(
    car.pricePerDay
  )} per day. ${car.transmission}, ${car.fuel}, ${car.seats} seats, ${
    car.luggage
  } bags. Send your booking request on WhatsApp and confirm availability fast.`;
  return {
    title,
    description,
    alternates: { canonical: `/cars/${car.slug}` },
    openGraph: { title: `${title} | ${SITE.name}`, description, type: "website" },
  };
}

const CHECK =
  "M5 13l4 4L19 7";

function Spec({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-line bg-white px-4 py-3">
      <dt className="text-[0.7rem] font-semibold uppercase tracking-wider text-ink/45">
        {label}
      </dt>
      <dd className="mt-1 font-display text-base font-semibold text-ink">
        {value}
      </dd>
    </div>
  );
}

export default async function CarDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const car = getCarBySlug(slug);
  if (!car) notFound();

  const related = similarCars(car);
  const services = includedServices();
  const bookUrl = createWhatsAppBookingUrl({
    carName: car.name,
    category: car.category,
    pricePerDay: car.pricePerDay,
  });

  return (
    <div className="bg-white">
      {/* Breadcrumb */}
      <div className="border-b border-line bg-sand/50">
        <nav
          aria-label="Breadcrumb"
          className="mx-auto max-w-7xl px-4 py-4 text-sm text-ink/55 sm:px-6 lg:px-8"
        >
          <ol className="flex flex-wrap items-center gap-2">
            <li>
              <Link href="/" className="hover:text-gold-deep">
                Home
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link href="/cars" className="hover:text-gold-deep">
                Cars
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li className="font-medium text-ink" aria-current="page">
              {car.name}
            </li>
          </ol>
        </nav>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-5">
          {/* Gallery + details */}
          <div className="lg:col-span-3">
            <CarImage
              car={car}
              className="aspect-[16/10] w-full"
              rounded="rounded-2xl"
              priority
            />
            <div className="mt-4 grid grid-cols-3 gap-4">
              {[0, 1, 2].map((i) => (
                <CarImage
                  key={i}
                  car={{ ...car, hue: (car.hue + (i + 1) * 26) % 360 }}
                  className="aspect-[4/3] w-full"
                  rounded="rounded-xl"
                />
              ))}
            </div>

            {/* Header */}
            <div className="mt-8">
              <p className="text-xs font-semibold uppercase tracking-wider text-gold-deep">
                {car.category}
              </p>
              <h1 className="mt-2 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
                {car.name}
              </h1>
              <div className="rule-gold mt-4" />
              <p className="mt-4 text-base leading-relaxed text-ink/70">
                {car.description}
              </p>
              <p className="mt-2 text-sm italic text-ink/55">
                {CATEGORY_BLURB[car.category]}
              </p>
            </div>

            {/* Specs grid */}
            <dl className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
              <Spec label="Price / day" value={formatPrice(car.pricePerDay)} />
              <Spec label="Transmission" value={car.transmission} />
              <Spec label="Fuel" value={car.fuel} />
              <Spec label="Seats" value={`${car.seats} seats`} />
              <Spec label="Luggage" value={`${car.luggage} bags`} />
              <Spec
                label="Air Conditioning"
                value={car.airConditioning ? "Yes" : "No"}
              />
              <Spec
                label="Availability"
                value={car.available ? "Available" : "Currently out"}
              />
            </dl>

            {/* Features */}
            <div className="mt-8">
              <h2 className="font-display text-xl font-bold text-ink">
                Features
              </h2>
              <ul className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
                {car.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-ink/75">
                    <svg
                      className="h-4 w-4 flex-none text-gold-deep"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      aria-hidden="true"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d={CHECK} />
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>
            </div>

            {/* Included services */}
            <div className="mt-8 rounded-2xl border border-line bg-sand/40 p-6">
              <h2 className="font-display text-xl font-bold text-ink">
                Included with every rental
              </h2>
              <ul className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
                {services.map((s) => (
                  <li key={s} className="flex items-center gap-2 text-sm text-ink/75">
                    <svg
                      className="h-4 w-4 flex-none text-gold-deep"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      aria-hidden="true"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d={CHECK} />
                    </svg>
                    {s}
                  </li>
                ))}
              </ul>
            </div>

            {/* Terms summary */}
            <div className="mt-8">
              <h2 className="font-display text-xl font-bold text-ink">
                Terms summary
              </h2>
              <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm text-ink/70">
                <li>Valid driving licence required at handover.</li>
                <li>Booking is subject to availability and WhatsApp confirmation.</li>
                <li>A refundable deposit may apply depending on the vehicle.</li>
                <li>Full-to-full fuel policy.</li>
                <li>
                  No online payment on this demo — final price and payment are
                  agreed after WhatsApp confirmation.
                </li>
              </ul>
              <p className="mt-3 text-sm text-ink/55">
                See the full{" "}
                <Link href="/terms" className="font-semibold text-gold-deep hover:underline">
                  rental terms
                </Link>
                .
              </p>
            </div>
          </div>

          {/* Booking sidebar */}
          <div className="lg:col-span-2">
            <div className="lg:sticky lg:top-24">
              <div className="rounded-2xl border border-line bg-white p-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-ink/45">
                      From
                    </p>
                    <p className="mt-1 font-display text-2xl font-bold text-ink">
                      {formatPrice(car.pricePerDay)}
                      <span className="text-sm font-normal text-ink/50">
                        {" "}
                        / day
                      </span>
                    </p>
                  </div>
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide ${
                      car.available
                        ? "bg-success/10 text-success"
                        : "bg-danger/10 text-danger"
                    }`}
                  >
                    {car.available ? "Available" : "Unavailable"}
                  </span>
                </div>

                <div className="mt-4">
                  <WhatsAppButton url={bookUrl} fullWidth>
                    Quick book on WhatsApp
                  </WhatsAppButton>
                </div>

                <div className="my-6 flex items-center gap-3 text-xs uppercase tracking-wider text-ink/40">
                  <span className="h-px flex-1 bg-line" />
                  or request below
                  <span className="h-px flex-1 bg-line" />
                </div>

                <BookingForm lockedCar={car} />
              </div>
            </div>
          </div>
        </div>

        {/* Similar cars */}
        {related.length > 0 && (
          <section className="mt-16">
            <SectionHeading eyebrow="You may also like" title="Similar cars" />
            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((c) => (
                <CarCard key={c.id} car={c} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
