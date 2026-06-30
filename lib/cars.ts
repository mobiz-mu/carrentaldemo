// ============================================================
// Mobiz Car Rental — demo data + domain types
// ============================================================

export type Transmission = "Automatic" | "Manual";
export type Fuel = "Petrol" | "Diesel" | "Hybrid" | "Electric";

export type Category =
  | "Economy"
  | "Hatchback"
  | "Sedan"
  | "SUV"
  | "7-Seater"
  | "Luxury"
  | "Automatic"
  | "Family Cars"
  | "Airport Transfer";

export interface Car {
  id: string;
  name: string;
  slug: string;
  category: Category;
  pricePerDay: number; // in MUR (Rs)
  transmission: Transmission;
  fuel: Fuel;
  seats: number;
  luggage: number; // number of bags
  airConditioning: boolean;
  description: string;
  features: string[];
  imageUrl?: string; // optional remote image; falls back to gradient placeholder
  available: boolean;
  featured: boolean;
  /** hue (0-360) used by the gradient placeholder so each car looks distinct */
  hue: number;
}

export const CATEGORIES: Category[] = [
  "Economy",
  "Hatchback",
  "Sedan",
  "SUV",
  "7-Seater",
  "Luxury",
  "Automatic",
  "Family Cars",
  "Airport Transfer",
];

/** Short tagline shown under each category on the homepage. */
export const CATEGORY_BLURB: Record<Category, string> = {
  Economy: "Light on fuel, easy to park, ideal for island roads.",
  Hatchback: "Compact and nimble for town and coast drives.",
  Sedan: "Comfortable saloons for longer journeys.",
  SUV: "Extra ground clearance for every road in Mauritius.",
  "7-Seater": "Room for the whole group and the luggage.",
  Luxury: "Arrive in style with our premium fleet.",
  Automatic: "Easy automatic-transmission cars for stress-free island driving.",
  "Family Cars": "Spacious, safe and built for family trips.",
  "Airport Transfer": "Vans and minibuses for SSR Airport pickups.",
};

const INCLUDED_SERVICES = [
  "Unlimited mileage",
  "Free airport delivery & collection",
  "24/7 roadside assistance",
  "Basic insurance included",
  "Second driver on request",
];

export const DEFAULT_FEATURES = [
  "Air conditioning",
  "Bluetooth & USB",
  "Power steering",
  "ABS brakes",
  "Central locking",
];

export function includedServices(): string[] {
  return INCLUDED_SERVICES;
}

// ------------------------------------------------------------
// Seed fleet (12 cars across all categories)
// ------------------------------------------------------------
const RAW_CARS: Car[] = [
  {
    id: "toyota-aqua",
    name: "Toyota Aqua",
    slug: "toyota-aqua",
    category: "Economy",
    pricePerDay: 1200,
    transmission: "Automatic",
    fuel: "Hybrid",
    seats: 5,
    luggage: 2,
    airConditioning: true,
    description:
      "The Toyota Aqua is the smart choice for exploring Mauritius on a budget. Its hybrid engine sips fuel, making island-wide trips affordable, while the compact size makes town parking effortless.",
    features: [
      "Hybrid fuel economy",
      "Reverse camera",
      "Bluetooth & USB",
      "Air conditioning",
      "Keyless entry",
    ],
    available: true,
    featured: true,
    hue: 150,
  },
  {
    id: "suzuki-swift",
    name: "Suzuki Swift",
    slug: "suzuki-swift",
    category: "Hatchback",
    pricePerDay: 1300,
    transmission: "Automatic",
    fuel: "Petrol",
    seats: 5,
    luggage: 2,
    airConditioning: true,
    description:
      "A nimble, fun-to-drive hatchback that handles narrow coastal lanes and busy town centres with ease. The Suzuki Swift is a favourite for couples and small families.",
    features: [
      "Responsive handling",
      "Touchscreen audio",
      "Bluetooth & USB",
      "Air conditioning",
      "ABS brakes",
    ],
    available: true,
    featured: false,
    hue: 10,
  },
  {
    id: "nissan-note",
    name: "Nissan Note",
    slug: "nissan-note",
    category: "Economy",
    pricePerDay: 1400,
    transmission: "Automatic",
    fuel: "Petrol",
    seats: 5,
    luggage: 2,
    airConditioning: true,
    description:
      "Roomier than it looks, the Nissan Note offers economy-class running costs with surprising interior space — a dependable everyday companion for your Mauritius holiday.",
    features: [
      "Spacious cabin",
      "Fuel efficient",
      "Bluetooth & USB",
      "Air conditioning",
      "Power windows",
    ],
    available: true,
    featured: false,
    hue: 205,
  },
  {
    id: "toyota-axio",
    name: "Toyota Axio",
    slug: "toyota-axio",
    category: "Sedan",
    pricePerDay: 1600,
    transmission: "Automatic",
    fuel: "Petrol",
    seats: 5,
    luggage: 3,
    airConditioning: true,
    description:
      "A comfortable, quiet saloon with a generous boot. The Toyota Axio is ideal for business travellers and families wanting a smooth ride between the airport and the resorts.",
    features: [
      "Comfortable saloon",
      "Large boot",
      "Cruise control",
      "Air conditioning",
      "Reverse camera",
    ],
    available: true,
    featured: true,
    hue: 220,
  },
  {
    id: "honda-vezel",
    name: "Honda Vezel",
    slug: "honda-vezel",
    category: "SUV",
    pricePerDay: 2500,
    transmission: "Automatic",
    fuel: "Hybrid",
    seats: 5,
    luggage: 4,
    airConditioning: true,
    description:
      "A stylish hybrid crossover with a commanding view of the road. The Honda Vezel blends SUV practicality with excellent fuel economy — perfect for exploring the south and the mountains.",
    features: [
      "Hybrid powertrain",
      "Raised driving position",
      "Half-leather seats",
      "Air conditioning",
      "Reverse camera",
    ],
    available: true,
    featured: true,
    hue: 260,
  },
  {
    id: "nissan-qashqai",
    name: "Nissan Qashqai",
    slug: "nissan-qashqai",
    category: "SUV",
    pricePerDay: 2800,
    transmission: "Automatic",
    fuel: "Petrol",
    seats: 5,
    luggage: 4,
    airConditioning: true,
    description:
      "A robust and refined SUV with plenty of room for luggage and beach gear. The Nissan Qashqai is built for comfort on every type of road across the island.",
    features: [
      "Spacious boot",
      "Panoramic feel",
      "Touchscreen navigation",
      "Air conditioning",
      "Parking sensors",
    ],
    available: true,
    featured: false,
    hue: 280,
  },
  {
    id: "toyota-noah",
    name: "Toyota Noah",
    slug: "toyota-noah",
    category: "7-Seater",
    pricePerDay: 3500,
    transmission: "Automatic",
    fuel: "Petrol",
    seats: 7,
    luggage: 5,
    airConditioning: true,
    description:
      "Seven seats, sliding doors and a flexible cabin make the Toyota Noah the go-to choice for larger groups. Plenty of space for passengers and suitcases alike.",
    features: [
      "Seven seats",
      "Sliding doors",
      "Flexible seating",
      "Dual air conditioning",
      "USB charging",
    ],
    available: true,
    featured: true,
    hue: 30,
  },
  {
    id: "kia-carnival",
    name: "Kia Carnival",
    slug: "kia-carnival",
    category: "Family Cars",
    pricePerDay: 4000,
    transmission: "Automatic",
    fuel: "Diesel",
    seats: 7,
    luggage: 5,
    airConditioning: true,
    description:
      "The Kia Carnival is a premium people-mover with limousine-like space. Diesel efficiency and a smooth ride make it the family favourite for island-wide touring.",
    features: [
      "Premium interior",
      "Captain seats",
      "Tri-zone climate",
      "Reverse camera",
      "Cruise control",
    ],
    available: true,
    featured: false,
    hue: 200,
  },
  {
    id: "bmw-3-series",
    name: "BMW 3 Series",
    slug: "bmw-3-series",
    category: "Luxury",
    pricePerDay: 6500,
    transmission: "Automatic",
    fuel: "Petrol",
    seats: 5,
    luggage: 3,
    airConditioning: true,
    description:
      "Make an entrance with the BMW 3 Series. Precise handling, a refined cabin and a powerful yet smooth engine deliver a genuinely premium driving experience.",
    features: [
      "Sport handling",
      "Leather interior",
      "Premium sound system",
      "Dual-zone climate",
      "Ambient lighting",
    ],
    available: true,
    featured: true,
    hue: 215,
  },
  {
    id: "mercedes-benz-c-class",
    name: "Mercedes-Benz C-Class",
    slug: "mercedes-benz-c-class",
    category: "Luxury",
    pricePerDay: 7500,
    transmission: "Automatic",
    fuel: "Petrol",
    seats: 5,
    luggage: 3,
    airConditioning: true,
    description:
      "The Mercedes-Benz C-Class is the definition of understated luxury. Whisper-quiet, beautifully finished and effortlessly elegant for weddings, business or special occasions.",
    features: [
      "Luxury saloon",
      "Nappa leather",
      "Burmester sound",
      "Dual-zone climate",
      "Driver assistance",
    ],
    available: false,
    featured: false,
    hue: 235,
  },
  {
    id: "hyundai-h1",
    name: "Hyundai H1",
    slug: "hyundai-h1",
    category: "Airport Transfer",
    pricePerDay: 4500,
    transmission: "Automatic",
    fuel: "Diesel",
    seats: 8,
    luggage: 8,
    airConditioning: true,
    description:
      "The Hyundai H1 is purpose-built for airport transfers. Eight comfortable seats and a huge luggage bay mean the whole group and every suitcase arrive together.",
    features: [
      "Eight seats",
      "Huge luggage bay",
      "Rear air conditioning",
      "High roof comfort",
      "Sliding doors",
    ],
    available: true,
    featured: false,
    hue: 195,
  },
  {
    id: "toyota-hiace",
    name: "Toyota Hiace",
    slug: "toyota-hiace",
    category: "Airport Transfer",
    pricePerDay: 5500,
    transmission: "Manual",
    fuel: "Diesel",
    seats: 12,
    luggage: 10,
    airConditioning: true,
    description:
      "For large groups and events, the 12-seat Toyota Hiace is unbeatable. A reliable workhorse with ample luggage space — ideal for big airport pickups and island tours.",
    features: [
      "Twelve seats",
      "Maximum luggage",
      "Rear air conditioning",
      "Reliable diesel",
      "Group friendly",
    ],
    available: true,
    featured: false,
    hue: 25,
  },
];

// ------------------------------------------------------------
// Helpers
// ------------------------------------------------------------

/**
 * Public fleet. Each car gets a stock image path under /public/images/cars/.
 * If a file is missing or fails to load, <CarImage> falls back to a premium
 * gradient placeholder, so the UI never shows a broken image.
 */
export const CARS: Car[] = RAW_CARS.map((car) => ({
  ...car,
  imageUrl: car.imageUrl ?? `/images/cars/${car.slug}.jpg`,
}));

export function formatPrice(value: number): string {
  return "Rs " + value.toLocaleString("en-US");
}

export function getCarBySlug(slug: string, fleet: Car[] = CARS): Car | undefined {
  return fleet.find((c) => c.slug === slug);
}

export function similarCars(car: Car, fleet: Car[] = CARS, limit = 3): Car[] {
  return fleet
    .filter((c) => c.id !== car.id && c.category === car.category)
    .concat(fleet.filter((c) => c.id !== car.id && c.category !== car.category))
    .slice(0, limit);
}
