import Image from "next/image";
import Link from "next/link";
import { CARS, CATEGORIES, CATEGORY_BLURB } from "@/lib/cars";

const CATEGORY_ICONS: Record<string, string> = {
  Economy:
    "M4 13l1.5-4.5A2 2 0 017.4 7h9.2a2 2 0 011.9 1.5L20 13m-16 0h16M4 13a1.5 1.5 0 00-1.5 1.5v2.5h3M20 13a1.5 1.5 0 011.5 1.5v2.5h-3M7 17a1.5 1.5 0 103 0 1.5 1.5 0 00-3 0zm7 0a1.5 1.5 0 103 0 1.5 1.5 0 00-3 0z",
  Hatchback:
    "M3 13l2-5a2 2 0 012-1.5h7l4 4 2 .5a1.5 1.5 0 011 1.4V16h-2M3 13v3h2m0 0a2 2 0 104 0m9 0a2 2 0 11-4 0",
  Sedan:
    "M3 14l2-6a2 2 0 012-1.4h10A2 2 0 0119 8l2 6m-18 0h18M3 14v3h2m14-3v3h-2M6 17a2 2 0 104 0m4 0a2 2 0 104 0",
  SUV: "M4 14V8a2 2 0 012-2h12a2 2 0 012 2v6m-16 0h16M4 14v3h2m14-3v3h-2M6 17a2 2 0 104 0m4 0a2 2 0 104 0M8 6v8m8-8v8",
  "7-Seater":
    "M3 14V9a2 2 0 012-2h14a2 2 0 012 2v5m-18 0h18M3 14v3h2m16-3v3h-2M6 17a2 2 0 104 0m4 0a2 2 0 104 0M9 7v7m6-7v7",
  Luxury:
    "M12 3l2.5 5 5.5.8-4 3.9.9 5.5L12 16l-4.9 2.6.9-5.5-4-3.9 5.5-.8L12 3z",
  "Family Cars":
    "M5 18v-2a3 3 0 013-3h0M19 18v-2a3 3 0 00-3-3M9 8a3 3 0 106 0 3 3 0 00-6 0zM10 13h4",
  "Airport Transfer":
    "M21 16v-2l-8-5V3.5a1.5 1.5 0 00-3 0V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5L21 16z",
  Automatic:
    "M12 4a8 8 0 018 8m-8-8a8 8 0 00-8 8m8-8v8l4 2M5 16h14M7 20h10",
};

export default function CategorySection() {
  const cards = CATEGORIES.map((category) => {
    const count =
      category === "Automatic"
        ? CARS.filter((car) => car.transmission === "Automatic").length
        : CARS.filter((car) => car.category === category).length;

    return {
      label: category,
      href: `/cars?category=${encodeURIComponent(category)}`,
      blurb: CATEGORY_BLURB[category],
      count,
      unit: count === 1 ? "car" : "cars",
    };
  });

  return (
    <section className="relative overflow-hidden bg-ink">
      {/* Desktop background */}
      <Image
        src="/images/cars/categories.png"
        alt="Premium car rental categories background"
        fill
        sizes="100vw"
        className="hidden object-cover object-center lg:block"
      />

      {/* Mobile background */}
      <Image
        src="/images/cars/categoriesmobile.png"
        alt="Premium car rental mobile categories background"
        fill
        sizes="100vw"
        className="object-cover object-center lg:hidden"
      />

      {/* Dark premium overlay */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-ink/90 via-ink/75 to-ink/95"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(198,161,91,0.20),transparent_34%),radial-gradient(circle_at_15%_80%,rgba(18,42,69,0.55),transparent_34%)]"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-3xl text-center">
         <p className="eyebrow text-gold/90">Find your category</p>

          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
             A car for every <span className="text-gold">Mauritius trip</span>
         </h2>

        <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-white/75 sm:text-base">
         From economy runabouts to airport minibuses and luxury saloons — choose the
          category that fits your journey.
       </p>
      </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:mt-12 lg:grid-cols-4">
          {cards.map((card) => (
            <Link
              key={card.label}
              href={card.href}
              className="group flex min-h-[230px] flex-col rounded-2xl border border-white/15 bg-white/[0.10] p-5 shadow-xl shadow-black/20 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-gold/70 hover:bg-white/[0.16] hover:shadow-2xl hover:shadow-black/30"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-navy text-gold shadow-lg shadow-black/20 ring-1 ring-gold/20 transition-all duration-300 group-hover:bg-ink group-hover:text-gold group-hover:ring-gold/60">
                <svg
                  className="h-6 w-6"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d={CATEGORY_ICONS[card.label]}
                  />
                </svg>
              </span>

              <h3 className="mt-5 font-display text-lg font-bold text-white">
                {card.label}
              </h3>

              <p className="mt-2 flex-1 text-sm leading-relaxed text-white/68">
                {card.blurb}
              </p>

              <span className="mt-4 inline-flex items-center text-xs font-bold uppercase tracking-[0.18em] text-gold">
                {card.count} {card.unit} →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
